import renderToString from '../renderToString/renderToString'

export function Fragment(props: any) {
    return jsx('Fragment', props)
}

export function jsx(
    type: any,
    props: any
): {
    html: string
    script: string
} {
    const vdom = { type, props: props || {} }
    return renderToString(vdom)
}

export function jsxs(
    type: any,
    props: any
): {
    html: string
    script: string
} {
    return jsx(type, props)
}
