export default function render(
    element: HTMLElement | DocumentFragment,
    container: HTMLElement
): void {
    container.appendChild(element)
}
