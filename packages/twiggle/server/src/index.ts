export const selfClosingTags = [
    'area',
    'base',
    'br',
    'col',
    'embed',
    'hr',
    'img',
    'input',
    'link',
    'meta',
    'param',
    'source',
    'track',
    'wbr',
]

export { default as renderToString } from './renderer/renderToString'
export { default as renderToStream } from './renderer/renderInChunks'
export * from './jsx/index'
