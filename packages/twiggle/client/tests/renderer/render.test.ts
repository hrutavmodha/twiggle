import { describe, it, expect } from 'vitest'
import render from '../../src/renderer/render'

describe('render', () => {
    it('should render a simple element to a parent', () => {
        const parent = document.createElement('div')
        const element = document.createElement('span')
        render(element, parent)
        expect(parent.children[0]).toBe(element)
    })

    it('should replace existing children when rendering a new element', () => {
        const parent = document.createElement('div')
        const oldChild = document.createElement('p')
        parent.appendChild(oldChild)

        const newElement = document.createElement('span')
        render(newElement, parent)

        expect(parent.children.length).toBe(2)
        expect(parent.children[0]).toBe(oldChild)
        expect(parent.children[1]).toBe(newElement)
    })
})
