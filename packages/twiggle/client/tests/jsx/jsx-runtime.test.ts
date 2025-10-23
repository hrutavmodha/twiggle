import { describe, it, expect, vi } from 'vitest'
import { jsx, jsxs, Fragment } from '../../src/jsx/jsx-runtime'
import createElement from '../../src/renderer/createElement'

vi.mock('../../src/renderer/createElement', () => ({
    default: vi.fn((type, props) => ({
        type,
        props,
        mocked: true,
    })),
}))

describe('jsx-runtime', () => {
    it('jsx should call createElement with the correct arguments', () => {
        const type = 'div'
        const props = { id: 'test' }
        const result = jsx(type, props)
        expect(createElement).toHaveBeenCalledWith(type, props)
        expect(result).toEqual({ type, props, mocked: true })
    })

    it('jsxs should call createElement with the correct arguments', () => {
        const type = 'span'
        const props = { class: 'my-class' }
        const result = jsxs(type, props)
        expect(createElement).toHaveBeenCalledWith(type, props)
        expect(result).toEqual({ type, props, mocked: true })
    })

    it("Fragment should call createElement with 'Fragment' and the correct props", () => {
        const props = { children: 'Hello' }
        const result = Fragment(props)
        expect(createElement).toHaveBeenCalledWith('Fragment', props)
        expect(result).toEqual({ type: 'Fragment', props, mocked: true })
    })
})
