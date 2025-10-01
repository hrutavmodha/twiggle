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

    it('should render a string', () => {
        expect(renderToString('hello')).toBe('hello')
    })

    it('should render a number', () => {
        expect(renderToString(123)).toBe('123')
    })

    it('should render null or undefined as an empty string', () => {
        expect(renderToString(null)).toBe('')
        expect(renderToString(undefined)).toBe('')
    })

    it('should render an array of elements', () => {
        expect(renderToString(['hello', 123, 'world'])).toBe('hello123world')
    })

    it('should render a simple div', () => {
        const element = { type: 'div', props: { children: 'Hello' } }
        expect(renderToString(element)).toBe('<div>Hello</div>')
    })

    it('should render a div with an id and class', () => {
        const element = { type: 'div', props: { id: 'test', class: 'my-class', children: 'Hello' } }
        expect(renderToString(element)).toBe('<div id="test" class="my-class">Hello</div>')
    })

    it('should render a self-closing tag', () => {
        const element = { type: 'img', props: { src: 'image.jpg', alt: 'My Image' } }
        expect(renderToString(element)).toBe('<img src="image.jpg" alt="My Image" />')
    })

    it('should render nested elements', () => {
        const element = {
            type: 'div',
            props: {
                children: {
                    type: 'span',
                    props: {
                        children: 'Nested Span'
                    }
                }
            }
        }
        expect(renderToString(element)).toBe('<div><span>Nested Span</span></div>')
    })
})