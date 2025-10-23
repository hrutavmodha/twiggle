export default function render(element: HTMLElement, parent: HTMLElement): void {
    parent.innerHTML = ''
    parent.appendChild(element)
}
