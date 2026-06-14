import { type SSRContext } from '@types/server'
import escapeHtml from './escapeHtml'

export default function renderProps(props: any, context: SSRContext): string {
    if (!props) return ''

    let attrs = ''

    for (const key in props) {
        if (key === 'children' || key === 'key' || key === 'ref') {
            continue
        }

        const value = props[key]

        if (key.startsWith('on') && typeof value === 'function') {
            const eventId = `twiggle-event-${context.eventIdCounter++}`
            const eventName = key.slice(2).toLowerCase()

            context.events.set(eventId, {
                eventName,
                handler: value.toString(),
            })

            attrs += ` data-twiggle-event="${eventId}"`
            attrs += ` data-twiggle-event-type="${eventName}"`
            continue
        }

        const attrName = key === 'className' ? 'class' : key

        if (key === 'style' && typeof value === 'object' && value !== null) {
            const styleStr = Object.entries(value)
                .map(([k, v]) => {
                    const kebab = k.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
                    return `${kebab}:${v}`
                })
                .join(';')
            attrs += ` style="${escapeHtml(styleStr)}"`
            continue
        }

        if (typeof value === 'boolean') {
            if (value) {
                attrs += ` ${escapeHtml(attrName)}`
            }
            continue
        }

        if (value === null || value === undefined) {
            continue
        }

        if (typeof value === 'function') {
            const result = value()
            if (typeof result === 'boolean') {
                if (result) {
                    attrs += ` ${escapeHtml(attrName)}`
                }
            } else if (result !== null && result !== undefined) {
                attrs += ` ${escapeHtml(attrName)}="${escapeHtml(result)}"`
            }
            continue
        }

        attrs += ` ${escapeHtml(attrName)}="${escapeHtml(value)}"`
    }

    return attrs
}
