import { describe, it, expect, vi } from 'vitest'
import handleProps from '../../src/renderer/handleProps'
import { createState } from '../../src/state/state'

describe('handleProps', () => {
    it('should set a simple attribute', () => {
        const element = document.createElement('div')
        handleProps(element, { id: 'test' })
        expect(element.getAttribute('id')).toBe('test')
    })

    it('should set an event listener', () => {
        const element = document.createElement('button')
        const onClick = vi.fn()
        handleProps(element, { onClick })
        element.click()
        expect(onClick).toHaveBeenCalled()
    })

    it('should handle children', () => {
        const element = document.createElement('div')
        handleProps(element, { children: 'Hello' })
        expect(element.textContent).toBe('Hello')
    })

    it('should set an attribute with a function (state)', () => {
        const element = document.createElement('div')
        const state = createState('dynamic-id')
        handleProps(element, { id: state.get })
        expect(element.getAttribute('id')).toBe('dynamic-id')
    })
})
