import renderProps from './renderProps'
// @ts-expect-error - IDE issues for not recognizing path aliases in Vite config file
import { type SSRContext } from '@types/server'
import escapeHtml from './escapeHtml'
import generateHydrationScript from './hydate'
import { renderElement } from './renderElement'
import { selfClosingTags } from '..'

export function* renderElementSync(element: any, context: SSRContext): Generator<string> {
    if (element === null || element === undefined || element === false) {
        return
    }

    if (
        typeof element === 'string' ||
        typeof element === 'number' ||
        typeof element === 'boolean'
    ) {
        const value = String(element)
        if (value) {
            yield escapeHtml(value)
        }
        return
    }

    if (Array.isArray(element)) {
        for (const child of element) {
            yield* renderElementSync(child, context)
        }
        return
    }

    if (typeof element === 'function') {
        yield* renderElementSync(element(), context)
        return
    }

    if (!element || typeof element !== 'object' || !element.type) {
        return
    }

    const { type, props = {} } = element

    if (type === 'Fragment') {
        if (props.children) {
            yield* renderElementSync(props.children, context)
        }
        return
    }

    if (typeof type === 'function') {
        const result = type(props)
        yield* renderElementSync(result, context)
        return
    }

    if (selfClosingTags.includes(type)) {
        yield `<${type}${renderProps(props, context)} />`
        return
    }

    yield `<${type}${renderProps(props, context)}>`

    if (props.children) {
        yield* renderElementSync(props.children, context)
    }

    yield `</${type}>`
}

export default function renderToString(element: any): {
    html: string
    script: string
} {
    const context: SSRContext = {
        events: new Map(),
        eventIdCounter: 0,
    }

    const html = renderElement(element, context)
    const script = generateHydrationScript(context)

    return { html, script }
}
