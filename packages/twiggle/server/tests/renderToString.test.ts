import { describe, it, expect } from 'vitest';
import renderToString from '../src/renderToString';

describe('renderToString', () => {
    it('should be a function', () => {
        expect(typeof renderToString).toBe('function');
    });

    it('should render a string', () => {
        const { html } = renderToString('hello');
        expect(html).toBe('hello');
    });

    it('should render a number', () => {
        const { html } = renderToString(123);
        expect(html).toBe('123');
    });

    it('should render null or undefined as an empty string', () => {
        const { html: nullHtml } = renderToString(null);
        expect(nullHtml).toBe('');
        const { html: undefinedHtml } = renderToString(undefined);
        expect(undefinedHtml).toBe('');
    });

    it('should render an array of elements', () => {
        const { html } = renderToString(['hello', 123, 'world']);
        expect(html).toBe('hello123world');
    });

    it('should render a simple div', () => {
        const element = { type: 'div', props: { children: 'Hello' } };
        const { html } = renderToString(element);
        expect(html).toBe('<div>Hello</div>');
    });

    it('should render a div with an id and class', () => {
        const element = { type: 'div', props: { id: 'test', class: 'my-class', children: 'Hello' } };
        const { html } = renderToString(element);
        expect(html).toBe('<div id="test" class="my-class">Hello</div>');
    });

    it('should render a self-closing tag', () => {
        const element = { type: 'img', props: { src: 'image.jpg', alt: 'My Image' } };
        const { html } = renderToString(element);
        expect(html).toBe('<img src="image.jpg" alt="My Image" />');
    });

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
        };
        const { html } = renderToString(element);
        expect(html).toBe('<div><span>Nested Span</span></div>');
    });

    it('should handle event handlers', () => {
        const onClick = () => console.log('clicked');
        const element = { type: 'button', props: { onClick, children: 'Click me' } };
        const { html, script } = renderToString(element);

        expect(html).toBe('<button data-twiggle-event-id="twiggle-event-0">Click me</button>');
        expect(script).toContain('const eventsMap = {');
        expect(script).toContain('"twiggle-event-0": { eventName: "click", handler: () => console.log("clicked") }');
        expect(script).toContain('el.addEventListener(eventsMap[eventId].eventName, eventsMap[eventId].handler);');
    });
});