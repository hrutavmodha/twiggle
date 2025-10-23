import { describe, it, expect, vi } from 'vitest'
import createElement from '../../src/renderer/createElement'

describe('createElement', () => {
    it('should create a simple element', () => {
        const element = createElement('div', {})
        expect(element.tagName).toBe('DIV')
    })

    it('should create an element with props', () => {
        const element = createElement('div', { id: 'test', class: 'my-class' })
        expect(element.id).toBe('test')
        expect(element.className).toBe('my-class')
    })

    it('should create a fragment', () => {
        const fragment = createElement('Fragment', {})
        expect(fragment.nodeType).toBe(Node.DOCUMENT_FRAGMENT_NODE)
    })

    it('should create a component', () => {
        const MyComponent = vi.fn((props) => {
            const el = document.createElement('div')
            el.textContent = `Hello, ${props.name}!`
            return el
        })
        const element = createElement(MyComponent, { name: 'World' })
        expect(MyComponent).toHaveBeenCalledWith({ name: 'World' })
        expect(element.tagName).toBe('DIV')
        expect(element.textContent).toBe('Hello, World!')
    })
})
