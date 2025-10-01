import {
    describe,
    it,
    expect
} from 'vitest'
import renderToString from '../src/renderToString'

describe('renderToString', () => {
    it('should be a function', () => {
        expect(typeof renderToString).toBe('function')
    })
})