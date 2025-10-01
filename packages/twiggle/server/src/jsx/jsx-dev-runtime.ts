import renderToString from '../renderToString'
export { Fragment } from './jsx-runtime'

export function jsxDEV(type: any, props: any): string {
    const vdom = { type, props: props || {} }
    return renderToString(vdom)
}
