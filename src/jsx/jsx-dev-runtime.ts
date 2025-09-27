import { jsx } from './jsx-runtime'

export function jsxDEV(
    type: any,
    props: any
): any {
    return jsx(type, props)
}

export { 
    jsx,
    jsxs,
    Fragment
} from './jsx-runtime'