import handleChildren from './handleChildren'

export default function handleProps(
    element: HTMLElement | DocumentFragment,
    props: {
        [key: string]: any,
        children?: Array<any> | string | number
    }
): void {
    element = element as HTMLElement
    for (let key in props) {
        if (key.startsWith('on')) {
            element.addEventListener(key.substring(2), props[key])
        }
        else if (key === 'children') {
            handleChildren(element, props[key])
        }
        else {
            element.setAttribute(key, props[key])
        }
    }
}