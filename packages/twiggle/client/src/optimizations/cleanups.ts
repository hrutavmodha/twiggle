export const elementCleanups = new WeakMap<Node, Array<() => void>>()

export function storeCleanup(element: Node, cleanup: () => void): void {
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
