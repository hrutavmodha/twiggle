export let isHydrating = false
let hydrationElements: HTMLElement[] = []
let hydrationIndex = 0

export default function render(
    element: HTMLElement | DocumentFragment,
    container: HTMLElement
): void {
    container.appendChild(element)
}

export function hydrate(fn: () => any, container: HTMLElement): void {
    isHydrating = true
    hydrationElements = getPostOrderElements(container)
    hydrationIndex = 0

    const originalCreateElement = document.createElement
    document.createElement = function(tagName: string, options?: ElementCreationOptions): HTMLElement {
        while (hydrationIndex < hydrationElements.length) {
            const el = hydrationElements[hydrationIndex++]!
            if (el.tagName.toLowerCase() === tagName.toLowerCase()) {
                const cleanEl = el.cloneNode(false) as HTMLElement
                while (el.firstChild) {
                    cleanEl.appendChild(el.firstChild)
                }
                if (el.parentNode) {
                    el.parentNode.replaceChild(cleanEl, el)
                }
                hydrationElements[hydrationIndex - 1] = cleanEl
                return cleanEl
            }
        }
        return originalCreateElement.call(document, tagName, options)
    }

    try {
        fn()
    } finally {
        document.createElement = originalCreateElement
        isHydrating = false
        hydrationElements = []
        hydrationIndex = 0
    }
}

function getPostOrderElements(root: HTMLElement): HTMLElement[] {
    const elements: HTMLElement[] = []
    function traverse(node: Node) {
        if (node instanceof HTMLElement) {
            for (let i = 0; i < node.childNodes.length; i++) {
                traverse(node.childNodes[i])
            }
            elements.push(node)
        }
    }
    traverse(root)
    return elements
}

