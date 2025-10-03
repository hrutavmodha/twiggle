import renderToString from '../renderToString/renderToString'

export function Fragment(props: any) {
    return jsx("Fragment", props)
}

export function jsx(type: any, props: any): string {
    const vdom = { type, props: props || {} }
    return renderToString(vdom)
}

export function jsxs(type: any, props: any): string {
    return jsx(type, props)
}