import { transform } from 'twiggle-plugin-core'

export default function turbopackTwigglePlugin() {
    return {
        name: 'turbopack-twiggle-plugin',
        async transform(code: string, id: string) {
            if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
                const result = await transform(code, id)
                return result.code || code
            }
            return code
        },
    }
}
