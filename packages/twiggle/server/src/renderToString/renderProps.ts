import escapeHtml from './escapeHtml'

export default function renderProps(props: any, context: any): string {
    let attrs = ''
    if (!props) return attrs
    for (const key in props) {
        if (key === 'children') continue

        if (typeof props[key] === 'function' && key.startsWith('on')) {
            const eventId = `twiggle-event-${context.eventIdCounter++}`
            const eventName = key.slice(2).toLowerCase()
            context.events.set(eventId, {
                eventName,
                handler: props[key].toString(),
            })
            attrs += ` data-twiggle-event-id="${eventId}"`
        } else {
            attrs += ` ${escapeHtml(key)}="${escapeHtml(props[key])}"`
        }
    }
    return attrs
}
