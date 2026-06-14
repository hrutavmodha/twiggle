import runSideEffect from '../state/effect'
import shouldSkipUpdate from '../optimizations/diff'
import { storeCleanup } from '../optimizations/cleanups'

export default function handleChildren(
    element: HTMLElement | DocumentFragment,
    children: any
): void {
    const nodes = Array.isArray(children) ? children : [children]

    nodes
        .filter((child) => child !== null && child !== undefined && child !== false)
        .forEach((child) => {
            if (typeof child === 'function') {
                handleReactiveChild(element, child)
            } else {
                element.appendChild(renderChild(child))
            }
        })
}

function renderChild(child: any): Node {
    if (typeof child === 'string' || typeof child === 'number') {
        return document.createTextNode(String(child))
    }
    if (child instanceof Node) {
        return child
    }
    if (child === null || child === undefined || child === false) {
        return document.createComment('empty')
    }
    return document.createTextNode(String(child))
}

function handleReactiveChild(element: HTMLElement | DocumentFragment, childFn: () => any): void {
    const startMarker = document.createComment('reactive-start')
    const endMarker = document.createComment('reactive-end')

    element.appendChild(startMarker)
    element.appendChild(endMarker)

    let currentNodes: Node[] = []

    const cleanup = runSideEffect(() => {
        const newContent = childFn()
        const newChildren = Array.isArray(newContent) ? newContent : [newContent]
        const newNodes: Node[] = []

        newChildren
            .filter((child) => child !== null && child !== undefined && child !== false)
            .forEach((child) => {
                const node = renderChild(child)
                newNodes.push(node)
            })

        if (shouldSkipUpdate(currentNodes, newNodes)) {
            return
        }

        const fragment = document.createDocumentFragment()
        newNodes.forEach((node) => fragment.appendChild(node))

        currentNodes.forEach((node) => {
            if (node.parentNode === element) {
                element.removeChild(node)
            }
        })

        element.insertBefore(fragment, endMarker)

        currentNodes = newNodes
    })

    storeCleanup(element, cleanup)
}
