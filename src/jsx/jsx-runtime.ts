import createElement from '../renderer/createElement'

export function jsx(
    type: any,
    props: any
): any {
    return createElement(type, props)
}

export function jsxs(
    type: any,
    props: any
): any {
    return jsx(type, props)
}

export function Fragment(props: any) {
    return jsx('Fragment', props)
}