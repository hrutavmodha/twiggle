import renderProps from '../utils/renderProps';

function renderElement(element: any, context: any): string {
    if (typeof element === 'string' || typeof element === 'number') {
        return String(element);
    }
    if (!element) {
        return '';
    }
    if (Array.isArray(element)) {
        return element.map((el) => renderElement(el, context)).join('');
    }
    if (typeof element === 'function') {
        return renderElement(element(), context);
    }
    const { type, props } = element;
    console.log('type:', type, 'props:', props);
    if (typeof type === 'function') {
        return renderElement(type(props), context);
    }

    const children = props.children ? renderElement(props.children, context) : '';
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
        'wbr',
    ];

    if (selfClosingTags.includes(type)) {
        return `<${type}${renderProps(props, context)} />`;
    } else {
        return `<${type}${renderProps(props, context)}>${children}</${type}>`;
    }
}

export default function renderToString(element: any): { html: string; script: string } {
    const context = {
        events: new Map(),
        eventIdCounter: 0,
    };

    const html = renderElement(element, context);

    let script = '<script>\n';
    script += 'document.addEventListener("DOMContentLoaded", () => {\n';
    script += 'const eventsMap = {\n';
    for (const [eventId, { eventName, handler }] of context.events) {
        script += `  "${eventId}": { eventName: "${eventName}", handler: ${handler} },\n`;
    }
    script += '};\n';

    script += 'for (const eventId in eventsMap) {\n';
    script += '  const el = document.querySelector(`[data-twiggle-event-id="${eventId}"]`);\n';
    script += '  if (el) {\n';
    script += '    el.addEventListener(eventsMap[eventId].eventName, eventsMap[eventId].handler);\n';
    script += '  }\n';
    script += '}\n';

    script += '});\n';
    script += '</script>';

    return { html, script };
}