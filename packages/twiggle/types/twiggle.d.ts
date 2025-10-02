declare module 'twiggle' {
    export function render(element: Element, container: Element): void;

    export function runSideEffect(effect: () => void): void;

    export function createState<T>(initialValue: T): {
        get: () => T;
        set: (newValue: T) => void;
    };

    export function createElement<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element;

    export interface LinkProps {
        to: string;
        children: (Element | string | number)[];
    }
    export function Link(props: LinkProps): Element;

    export interface RouteProps {
        to: string;
        element: () => Element;
    }
    export function Route(props: RouteProps): { to: string; element: () => Element };

    export interface RoutesProps {
        children: { to: string; element: () => Element }[];
    }
    export function Routes(props: RoutesProps): null;

    export function navigate(path: string): void;
}

declare module 'twiggle/jsx-runtime' {
    export function jsx<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element;

    export function jsxs<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element;

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment;
}
declare module 'twiggle/jsx-dev-runtime' {
    export function jsxDEV<P extends {}>(
        type: string | ((props: P) => Element),
        props: P,
        ...children: (Element | string | number)[]
    ): Element;

    export function Fragment(props: { children: (Element | string | number)[] }): DocumentFragment;
}