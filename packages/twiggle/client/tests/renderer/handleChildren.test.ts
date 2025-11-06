import { describe, it, expect } from 'vitest'
import handleChildren from '../../src/renderer/handleChildren'
import createState from '../../src/state/state'

describe('handleChildren', () => {
    it('should append a string child', () => {
        const element = document.createElement('div')
        handleChildren(element, 'Hello')
        expect(element.textContent).toBe('Hello')
    })

    it('should append a number child', () => {
        const element = document.createElement('div')
        handleChildren(element, 123)
        expect(element.textContent).toBe('123')
    })

    it('should append a node child', () => {
        const element = document.createElement('div')
        const child = document.createElement('span')
        handleChildren(element, child)
        expect(element.children[0]).toBe(child)
    })

    it('should append an array of children', () => {
        const element = document.createElement('div')
        const child1 = document.createElement('span')
        const child2 = document.createElement('p')
        handleChildren(element, [child1, child2])
        expect(element.children[0]).toBe(child1)
        expect(element.children[1]).toBe(child2)
    })

    it('should append a function child (state)', () => {
        const element = document.createElement('div')
        const state = createState('Hello')
        handleChildren(element, state.get)
        expect(element.textContent).toBe('Hello')
    })
})
