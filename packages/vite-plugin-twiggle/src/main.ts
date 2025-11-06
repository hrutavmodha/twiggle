import { createFilter } from '@rollup/pluginutils'
import * as babel from '@babel/core'
import twiggleJsx from 'babel-plugin-twiggle'

export default function twiggle() {
    const filter = createFilter(/\.(js|ts|jsx|tsx)$/, /node_modules/)
    return {
        name: 'twiggle',
        transform(code: any, id: any) {
            if (filter(id)) {
                const isTypeScript = id.endsWith('.ts') || id.endsWith('.tsx')

                const result = babel.transformSync(code, {
                    filename: id,
                    presets: [
                        [
                            '@babel/preset-react',
                            { runtime: 'automatic', importSource: 'twiggle/jsx' },
                        ],
                        isTypeScript && ['@babel/preset-typescript'],
                    ].filter(Boolean),
                    plugins: [twiggleJsx],
                    sourceMaps: true,
                    ast: false,
                })

                return {
                    code: result?.code || code,
                    map: result?.map,
                }
            }
        },
    }
}
