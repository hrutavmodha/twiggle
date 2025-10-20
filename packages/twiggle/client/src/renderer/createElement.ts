import handleProps from './handleProps'

export default function createElement(
    type: keyof HTMLElementTagNameMap | 'Fragment' | ((props?: any) => HTMLElement),
    props: {
        [key: string]: any,
        children?: Array<any> | string | number
    }
): any {
    if (typeof type === 'function') {
        return type(props)
    }
    else if (type === 'Fragment') {
        const fragment = document.createDocumentFragment()
        handleProps(fragment, props)
        return fragment
    }
    else {
        const element = document.createElement(type)
        handleProps(element, props)
        return element
    }
}