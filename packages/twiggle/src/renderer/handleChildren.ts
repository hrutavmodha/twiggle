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
        }
        else {
            element.appendChild(child as Node)
        }
    })
}