import {
    type Plugin
} from 'vite'
import { transform } from 'esbuild'

export default function twiggle(): Plugin {
    return {
        name: 'vite-plugin-twiggle',
        enforce: 'pre',
        async transform(content, id) {
            if (
                !id.endsWith('.jsx') &&
                !id.endsWith('.tsx')
            ) {
                return null
            }
            const transformed = await transform(content, {
                loader: id.endsWith('.tsx') ? 'tsx' : 'jsx',
                target: 'esnext',
                jsxFactory: 'createElement',
                jsxFragment: 'Fragment'
            })
            const {
                code,
                map
            } = transformed
            return {
                code: code,
                map: map
            }
        }
    }
}