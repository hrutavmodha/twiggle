declare module 'twiggle/client' {
    export function render(element: Element, container: Element): void

    export function runSideEffect(effect: () => void): void

    export function createState<T>(initialValue: T): {
        get: () => T
        set: (newValue: T) => void
    }

    export function createElement<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element
}

declare module 'twiggle/server' {
    export function renderToString(element: any): {
        html: string
        script: string
    }
}

declare module 'twiggle/client/jsx-runtime' {
    export function jsx<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function jsxs<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment
}

declare module 'twiggle/client/jsx-dev-runtime' {
    export function jsxDEV<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment
}

declare module 'twiggle/server/jsx-runtime' {
    export function jsx<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function jsxs<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment
}

declare module 'twiggle/server/jsx-dev-runtime' {
    export function jsxDEV<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment
}
