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

        // Handle primitive (string or number) in-place without reallocation
        if (typeof newContent === 'string' || typeof newContent === 'number') {
            const textContent = String(newContent)
            if (currentNodes.length === 1 && currentNodes[0]?.nodeType === Node.TEXT_NODE) {
                const textNode = currentNodes[0] as Text
                if (textNode.nodeValue !== textContent) {
                    textNode.nodeValue = textContent
                }
                return
            }

            const textNode = document.createTextNode(textContent)
            currentNodes.forEach((node) => {
                if (node.parentNode === element) {
                    element.removeChild(node)
                }
            })
            element.insertBefore(textNode, endMarker)
            currentNodes = [textNode]
            return
        }

        // Handle single DOM Node in-place
        if (newContent instanceof Node) {
            if (currentNodes.length === 1 && currentNodes[0] === newContent) {
                return
            }

            currentNodes.forEach((node) => {
                if (node.parentNode === element) {
                    element.removeChild(node)
                }
            })
            element.insertBefore(newContent, endMarker)
            currentNodes = [newContent]
            return
        }

        // Handle null, undefined, false
        if (newContent === null || newContent === undefined || newContent === false) {
            currentNodes.forEach((node) => {
                if (node.parentNode === element) {
                    element.removeChild(node)
                }
            })
            currentNodes = []
            return
        }

        // Fallback to array handling
        const newChildren = Array.isArray(newContent) ? newContent : [newContent]
        const newNodes: Node[] = []

        newChildren
            .filter((child) => child !== null && child !== undefined && child !== false)
            .forEach((child) => {
                const node = renderChild(child)
                newNodes.push(node)
            })

        // If both old and new lists consist only of text nodes of matching lengths, update in-place
        let onlyTextNodes = true
        if (currentNodes.length === newNodes.length && currentNodes.length > 0) {
            for (let i = 0; i < currentNodes.length; i++) {
                if (
                    currentNodes[i]?.nodeType !== Node.TEXT_NODE ||
                    newNodes[i]?.nodeType !== Node.TEXT_NODE
                ) {
                    onlyTextNodes = false
                    break
                }
            }
            if (onlyTextNodes) {
                for (let i = 0; i < currentNodes.length; i++) {
                    const oldNode = currentNodes[i]!
                    const newNode = newNodes[i]!
                    if (oldNode.nodeValue !== newNode.nodeValue) {
                        oldNode.nodeValue = newNode.nodeValue
                    }
                }
                return
            }
        }

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
