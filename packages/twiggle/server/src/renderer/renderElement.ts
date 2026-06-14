import type { SSRContext } from 'types/server'
import escapeHtml from './escapeHtml'
import renderProps from './renderProps'
import { selfClosingTags } from '..'

export async function* renderElementAsync(
    element: any,
    context: SSRContext
): AsyncGenerator<string> {
    if (element === null || element === undefined || element === false) {
        return
    }

    if (
        typeof element === 'string' ||
        typeof element === 'number' ||
        typeof element === 'boolean'
    ) {
        yield escapeHtml(String(element))
        return
    }

    if (Array.isArray(element)) {
        for (const child of element) {
            yield* renderElementAsync(child, context)
        }
        return
    }

    if (typeof element === 'function') {
        yield '<!--reactive-start-->'
        const result = element()

        if (result instanceof Promise) {
            // @ts-expect-error - suspenseIdCounter can be undefined
            const suspenseId = `twiggle-suspense-${context.suspenseIdCounter++}`

            yield `<div id="${suspenseId}" data-twiggle-suspense>`
            yield `<div class="twiggle-loading">Loading...</div>`
            yield `</div>`

            const resolved = await result

            let replacementHTML = ''
            for await (const chunk of renderElementAsync(resolved, context)) {
                replacementHTML += chunk
            }

            yield `<script>
                (function() {
                    const el = document.getElementById("${suspenseId}");
                    if (el) {
                        el.outerHTML = ${JSON.stringify(replacementHTML)};
                    }
                })();
            </script>`
            yield '<!--reactive-end-->'
            return
        }

        yield* renderElementAsync(result, context)
        yield '<!--reactive-end-->'
        return
    }

    if (!element || typeof element !== 'object' || !element.type) {
        return
    }

    const { type, props = {} } = element

    if (type === 'Fragment') {
        if (props.children) {
            yield* renderElementAsync(props.children, context)
        }
        return
    }

    if (typeof type === 'function') {
        const result = type(props)

        if (result instanceof Promise) {
            const resolved = await result
            yield* renderElementAsync(resolved, context)
            return
        }

        yield* renderElementAsync(result, context)
        return
    }

    if (selfClosingTags.includes(type)) {
        yield `<${type}${renderProps(props, context)} />`
        return
    }

    yield `<${type}${renderProps(props, context)}>`

    if (props.children) {
        yield* renderElementAsync(props.children, context)
    }

    yield `</${type}>`
}

export function renderElement(element: any, context: SSRContext): string {
    if (element === null || element === undefined || element === false) {
        return ''
    }

    if (
        typeof element === 'string' ||
        typeof element === 'number' ||
        typeof element === 'boolean'
    ) {
        return escapeHtml(String(element))
    }

    if (Array.isArray(element)) {
        return element.map((el) => renderElement(el, context)).join('')
    }

    if (typeof element === 'function') {
        return `<!--reactive-start-->${renderElement(element(), context)}<!--reactive-end-->`
    }

    if (!element.type) {
        return ''
    }

    const { type, props = {} } = element

    // Fragment
    if (type === 'Fragment') {
        return props.children ? renderElement(props.children, context) : ''
    }

    // Function component
    if (typeof type === 'function') {
        return renderElement(type(props), context)
    }

    const children = props.children ? renderElement(props.children, context) : ''

    if (selfClosingTags.includes(type)) {
        return `<${type}${renderProps(props, context)} />`
    }

    return `<${type}${renderProps(props, context)}>${children}</${type}>`
}
