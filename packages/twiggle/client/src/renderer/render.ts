import { cleanupElement } from './handleChildren'

export default function render(
    element: HTMLElement | DocumentFragment,
    container: HTMLElement
): () => void {
    container.innerHTML = ''
    container.appendChild(element)

    return () => {
        cleanupElement(container)
        container.innerHTML = ''
    }
}
