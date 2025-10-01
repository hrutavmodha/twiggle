import { runSideEffect } from "../state/state";

export default function handleChildren(
    element: HTMLElement,
    children: any
): void {
    if (!Array.isArray(children)) {
        children = [children]
    }
    children = children.filter(Boolean)
    children.forEach((child: any) => {
        if (
            typeof child === 'string' ||
            typeof child === 'number'
        ) {
            const text = document.createTextNode(String(child))
            element.appendChild(text)
        } else if (typeof child === 'function') {
            const text = document.createTextNode('')
            element.appendChild(text)
            runSideEffect(() => {
                text.textContent = child()
            })
        }
        else {
            element.appendChild(child as Node)
        }
    })
}