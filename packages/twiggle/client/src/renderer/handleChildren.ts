import runSideEffect from '../state/effect'

const elementCleanups = new WeakMap<Node, Array<() => void>>()

export default function handleChildren(
    element: HTMLElement | DocumentFragment,
    children: any
): void {
    const processChildren = (childNodes: any) => {
        const nodes = Array.isArray(childNodes) ? childNodes : [childNodes]

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

    processChildren(children)
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

function shouldSkipUpdate(oldNodes: Node[], newNodes: Node[]): boolean {
    if (oldNodes.length !== newNodes.length) return false

    for (let i = 0; i < oldNodes.length; i++) {
        const oldNode = oldNodes[i]
        const newNode = newNodes[i]

        if (oldNode?.nodeType !== newNode?.nodeType) return false

        if (oldNode?.nodeType === Node.TEXT_NODE) {
            if (oldNode.textContent !== newNode?.textContent) return false
        } else {
            return false
        }
    }

    return true
}

function storeCleanup(element: Node, cleanup: () => void): void {
    if (!elementCleanups.has(element)) {
        elementCleanups.set(element, [])
    }
    elementCleanups.get(element)!.push(cleanup)
}

export function cleanupElement(element: Node): void {
    const cleanups = elementCleanups.get(element)
    if (cleanups) {
        cleanups.forEach((cleanup) => cleanup())
        elementCleanups.delete(element)
    }

    if (element instanceof HTMLElement || element instanceof DocumentFragment) {
        const children =
            element instanceof HTMLElement
                ? Array.from(element.children)
                : Array.from(element.childNodes)

        children.forEach((child) => cleanupElement(child))
    }
}
