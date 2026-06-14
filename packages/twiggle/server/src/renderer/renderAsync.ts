import type { SSRContext } from 'types/server'
import generateHydrationScript from './hydate'
import { renderElementAsync } from './renderElement'

export function renderToStreamAsync(element: any): ReadableStream<Uint8Array> {
    const context: SSRContext = {
        events: new Map(),
        eventIdCounter: 0,
        suspenseIdCounter: 0,
    }

    const encoder = new TextEncoder()
    const generator = renderElementAsync(element, context)

    return new ReadableStream({
        async start(controller) {
            try {
                for await (const chunk of generator) {
                    controller.enqueue(encoder.encode(chunk))
                }

                const script = generateHydrationScript(context)
                if (script) {
                    controller.enqueue(encoder.encode(script))
                }

                controller.close()
            } catch (error: any) {
                controller.error(error)
            }
        },
    })
}
