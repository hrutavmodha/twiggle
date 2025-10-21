
import { describe, it, expect, vi } from 'vitest';
import { jsx, jsxs, Fragment } from '../../src/jsx/jsx-runtime';
import renderToString from '../../src/renderToString/renderToString';

vi.mock('../../src/renderToString/renderToString', () => ({
    default: vi.fn((vdom) => ({
        html: `mocked-html-${vdom.type}`,
        script: `mocked-script-${vdom.type}`,
    }))
}));

describe('server jsx-runtime', () => {
    it('jsx should call renderToString with the correct arguments', () => {
        const type = 'div';
        const props = { id: 'test' };
        const result = jsx(type, props);
        expect(renderToString).toHaveBeenCalledWith({ type, props });
        expect(result).toEqual({ html: 'mocked-html-div', script: 'mocked-script-div' });
    });

    it('jsxs should call jsx with the correct arguments', () => {
        const type = 'span';
        const props = { class: 'my-class' };
        const result = jsxs(type, props);
        // Since jsxs internally calls jsx, and jsx is mocked to call renderToString,
        // we expect renderToString to be called with the arguments passed to jsxs.
        expect(renderToString).toHaveBeenCalledWith({ type, props });
        expect(result).toEqual({ html: 'mocked-html-span', script: 'mocked-script-span' });
    });

    it('Fragment should call jsx with "Fragment" and the correct props', () => {
        const props = { children: 'Hello' };
        const result = Fragment(props);
        // Fragment internally calls jsx, which then calls renderToString.
        expect(renderToString).toHaveBeenCalledWith({ type: 'Fragment', props });
        expect(result).toEqual({ html: 'mocked-html-Fragment', script: 'mocked-script-Fragment' });
    });
});
