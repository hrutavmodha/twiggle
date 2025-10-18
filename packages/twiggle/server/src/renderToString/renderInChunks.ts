export default function* renderToStream(
    element: string,
    chunkSize: number = 1024
): any {
    const encoder = new TextEncoder()
    const stream = new ReadableStream({
        start(controller) {
            try {
                for (let i = 0; i < element.length; i += chunkSize) { 
                    const chunk = element.slice(i, i + chunkSize)
                    controller.enqueue(encoder.encode(chunk))
                }
            }
            catch (error: any) {
                controller.error(error)
            }
        }
    })
    return stream
}