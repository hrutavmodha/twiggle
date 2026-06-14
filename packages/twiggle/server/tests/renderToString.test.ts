import { describe, it, expect } from 'vitest'
import renderToString from '../src/renderer/renderToString'
import createState from '../../client/src/state/state'

describe('renderToString', () => {
    it('should render a string', () => {
        const { html } = renderToString('hello')
        expect(html).toBe('hello')
    })

    it('should render a number', () => {
        const { html } = renderToString(123)
        expect(html).toBe('123')
    })

    it('should render null or undefined as an empty string', () => {
        const { html: nullHtml } = renderToString(null)
        expect(nullHtml).toBe('')
        const { html: undefinedHtml } = renderToString(undefined)
        expect(undefinedHtml).toBe('')
    })

    it('should render an array of elements', () => {
        const { html } = renderToString(['hello', 123, 'world'])
        expect(html).toBe('hello123world')
    })

    it('should render a simple div', () => {
        const element = { type: 'div', props: { children: 'Hello' } }
        const { html } = renderToString(element)
        expect(html).toBe('<div>Hello</div>')
    })

    it('should render a div with an id and class', () => {
        const element = {
            type: 'div',
            props: {
                id: 'test',
                class: 'my-class',
                children: 'Hello',
            },
        }
        const { html } = renderToString(element)
        expect(html).toBe('<div id="test" class="my-class">Hello</div>')
    })

    it('should render a self-closing tag', () => {
        const element = {
            type: 'img',
            props: {
                src: 'image.jpg',
                alt: 'My Image',
            },
        }
        const { html } = renderToString(element)
        expect(html).toBe('<img src="image.jpg" alt="My Image" />')
    })

    it('should render nested elements', () => {
        const element = {
            type: 'div',
            props: {
                children: {
                    type: 'span',
                    props: {
                        children: 'Nested Span',
                    },
                },
            },
        }
        const { html } = renderToString(element)
        expect(html).toBe('<div><span>Nested Span</span></div>')
    })

    it('should handle event handlers', () => {
        const onClick = () => console.log('clicked')
        const element = {
            type: 'button',
            props: {
                onClick,
                children: 'Click me',
            },
        }
        const { html, script } = renderToString(element)

        expect(html).toBe(
            '<button data-twiggle-event="twiggle-event-0" data-twiggle-event-type="click">Click me</button>'
        )
        expect(script).toContain('const handlers = {')
        expect(script).toContain('"twiggle-event-0": () => console.log("clicked")')
        expect(script).toContain('el.addEventListener(eventName, handlers[eventId]);')
    })

    it('should render a function child representing a reactive state value', () => {
        const reactiveValueFn = () => 'Hello from state'
        const element = { type: 'div', props: { children: reactiveValueFn } }
        const { html, script } = renderToString(element)

        expect(html).toBe('<div><!--reactive-start-->Hello from state<!--reactive-end--></div>')
        expect(script).toBe('')
    })

    it('should render component using createState and reflect updated value on re-render', () => {
        const myState = createState('Initial Value')

        const MyComponent = ({ state }: any) => ({
            type: 'p',
            props: { children: () => state.get() },
        })

        const { html: html1, script: script1 } = renderToString({
            type: MyComponent,
            props: { state: myState },
        })
        expect(html1).toBe('<p><!--reactive-start-->Initial Value<!--reactive-end--></p>')
        expect(script1).toBe('')

        myState.set('Updated Value')

        const { html: html2, script: script2 } = renderToString({
            type: MyComponent,
            props: { state: myState },
        })
        expect(html2).toBe('<p><!--reactive-start-->Updated Value<!--reactive-end--></p>')
        expect(script2).toBe('')
    })
})
