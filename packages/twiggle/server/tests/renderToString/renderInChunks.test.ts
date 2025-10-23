/** @vitest-environment node */
import { describe, it, expect } from 'vitest'
import renderToStream from '../../src/renderToString/renderInChunks'

describe('renderToStream', () => {
    it('should return a ReadableStream', () => {
        const stream = renderToStream('hello')
        expect(stream).toBeInstanceOf(ReadableStream)
    })

    it('should correctly chunk and emit the input string', async () => {
        const testString = 'Hello, world!'
        const stream = renderToStream(testString, 5)
        const reader = stream.getReader()
        let result = ''
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder().decode(value)
        }
        expect(result).toBe(testString)
    })

    it('should handle different chunk sizes', async () => {
        const testString = 'This is a longer string to test chunking.'
        const stream = renderToStream(testString, 10)
        const reader = stream.getReader()
        let result = ''
        let chunkCount = 0
        while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += new TextDecoder().decode(value)
            chunkCount++
        }
        expect(result).toBe(testString)
        expect(chunkCount).toBe(Math.ceil(testString.length / 10))
    })

    it('should handle an empty string', async () => {
        const testString = ''
        const stream = renderToStream(testString, 5)
        const reader = stream.getReader()
        const { done, value } = await reader.read()
        expect(done).toBe(true)
        expect(value).toBeUndefined()
    })
})
