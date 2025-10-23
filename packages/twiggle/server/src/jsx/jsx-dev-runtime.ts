import renderToString from '../renderToString/renderToString'

export function jsxDEV(type: any, props: any) {
    const vdom = { type, props: props || {} }
    return renderToString(vdom)
}

export { jsx, jsxs, Fragment } from './jsx-runtime'
