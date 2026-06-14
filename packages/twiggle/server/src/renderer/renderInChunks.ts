import type { SSRContext } from 'types/server'
import generateHydrationScript from './hydate'
import { renderElementSync } from './renderToString'

export default function renderToStream(element: any): ReadableStream<Uint8Array> {
    const context: SSRContext = {
        events: new Map(),
        eventIdCounter: 0,
    }

    const encoder = new TextEncoder()
    const generator = renderElementSync(element, context)

    return new ReadableStream({
        start(controller) {
            try {
                for (const chunk of generator) {
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
