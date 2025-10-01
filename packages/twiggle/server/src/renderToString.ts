import renderProps from './utils/renderProps'

export default function renderToString(element: any): string {
    if (typeof element === 'string' || typeof element === 'number') {
        return String(element)
    }
    if (!element) {
        return ''
    }
    if (Array.isArray(element)) {
        return element.map(renderToString).join('')
    }
    if (typeof element === 'function') {
        return renderToString(element())
    }
    const { type, props } = element
    if (typeof type === 'function') {    
        return renderToString(type(props))
    }

    const children = props.children ? renderToString(props.children) : ''
    const selfClosingTags = [
        'area',
        'base',
        'br',
        'col',
        'embed',
        'hr',
        'img',
        'input',
        'link',
        'meta',
        'param',
        'source',
        'track',
        'wbr'
    ]
    
    if (selfClosingTags.includes(type)) {
        return `<${type}${renderProps(props)} />`
    }
    else {
        return `<${type}${renderProps(props)}>
            ${children}
        </${type}>`
    }
}