import escapeHtml from './escapeHtml';

export default function renderProps(props: any): string {
    let attrs = '';
    if (!props) return attrs;
    for (const key in props) {
        if (key === 'children' || typeof props[key] === 'function') continue;
        attrs += ` ${escapeHtml(key)}="${escapeHtml(props[key])}"`;
    }
    return attrs;
}