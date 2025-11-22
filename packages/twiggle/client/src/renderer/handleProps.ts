import runSideEffect from '../state/effect'
import handleChildren from './handleChildren'

export default function handleProps(
    element: HTMLElement | DocumentFragment,
    props: {
        [key: string]: any
        children?: Array<any> | string | number
    }
): void {
    for (const key in props) {
        if (key === 'key') {
            continue
        }

        if (key === 'children') {
            handleChildren(element, props[key])
            continue
        }

        if (!(element instanceof HTMLElement)) {
            continue
        }

        if (key.startsWith('on')) {
            const eventName = key.substring(2).toLowerCase()
            element.addEventListener(eventName, props[key])
            continue
        }

        const attrName = key === 'className' ? 'class' : key

        if (key === 'style' && typeof props[key] === 'object') {
            Object.assign(element.style, props[key])
            continue
        }

        if (typeof props[key] === 'boolean') {
            if (props[key]) {
                element.setAttribute(attrName, '')
            } else {
                element.removeAttribute(attrName)
            }
            continue
        }

        if (typeof props[key] === 'function') {
            runSideEffect(() => {
                const value = props[key]()
                if (typeof value === 'boolean') {
                    if (value) {
                        element.setAttribute(attrName, '')
                    } else {
                        element.removeAttribute(attrName)
                    }
                } else {
                    element.setAttribute(attrName, String(value))
                }
            })
            continue
        }

        element.setAttribute(attrName, String(props[key]))
    }
}
