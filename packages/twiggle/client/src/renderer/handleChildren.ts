import runSideEffect from '../state/effect'
import shouldSkipUpdate from '../optimizations/diff'
import { storeCleanup } from '../optimizations/cleanups'
import { isHydrating } from './render'

export default function handleChildren(
    element: HTMLElement | DocumentFragment,
    children: any
): void {
    const nodes = Array.isArray(children) ? children : [children]
    let currentChildIndex = 0

    nodes
        .filter((child) => child !== null && child !== undefined && child !== false)
        .forEach((child) => {
            if (typeof child === 'function') {
                const consumed = handleReactiveChild(element, child, currentChildIndex)
                if (isHydrating) {
                    currentChildIndex += consumed
                }
            } else {
                if (isHydrating) {
                    currentChildIndex++
                    return
                }
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

function handleReactiveChild(
    element: HTMLElement | DocumentFragment,
    childFn: () => any,
    index?: number
): number {
    let startMarker: Comment
    let endMarker: Comment
    let currentNodes: Node[] = []

    if (isHydrating && index !== undefined && index < element.childNodes.length) {
        const potentialStart = element.childNodes[index]!
        if (
            potentialStart.nodeType === Node.COMMENT_NODE &&
            potentialStart.nodeValue === 'reactive-start'
        ) {
            startMarker = potentialStart as Comment
            // Find matching reactive-end comment
            let endNode: Node | null = startMarker.nextSibling
            const collectedNodes: Node[] = []
            while (endNode) {
                if (
                    endNode.nodeType === Node.COMMENT_NODE &&
                    endNode.nodeValue === 'reactive-end'
                ) {
                    break
                }
                collectedNodes.push(endNode)
                endNode = endNode.nextSibling
            }
            if (endNode) {
                endMarker = endNode as Comment
                currentNodes = collectedNodes
            } else {
                endMarker = document.createComment('reactive-end')
                if (startMarker.nextSibling) {
                    element.insertBefore(endMarker, startMarker.nextSibling)
                } else {
                    element.appendChild(endMarker)
                }
                currentNodes = collectedNodes
            }
        } else {
            // Fallback: the node at index is not reactive-start comment
            startMarker = document.createComment('reactive-start')
            endMarker = document.createComment('reactive-end')
            const existingChild = element.childNodes[index]!
            element.insertBefore(startMarker, existingChild)
            if (existingChild.nextSibling) {
                element.insertBefore(endMarker, existingChild.nextSibling)
            } else {
                element.appendChild(endMarker)
            }
            currentNodes = [existingChild]
        }
    } else {
        startMarker = document.createComment('reactive-start')
        endMarker = document.createComment('reactive-end')
        element.appendChild(startMarker)
        element.appendChild(endMarker)
    }

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
    return currentNodes.length + 2
}
