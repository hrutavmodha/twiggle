import * as babel from '@babel/core'
import twiggleJsx from 'babel-plugin-twiggle'

export function transform(code: string, id: string) {
    const isTypeScript = id.endsWith('.ts') || id.endsWith('.tsx')

    const result = babel.transformSync(code, {
        filename: id,
        presets: [
            ['@babel/preset-react', { runtime: 'automatic', importSource: 'twiggle/jsx' }],
            isTypeScript && ['@babel/preset-typescript'],
        ].filter(Boolean) as babel.PluginItem[],
        plugins: [twiggleJsx],
        sourceMaps: true,
        ast: false,
    })

    return {
        code: result?.code || code,
        map: result?.map,
    }
}

export const twiggleBabelConfig = (isTypeScript: boolean) => ({
    presets: [
        ['@babel/preset-react', { runtime: 'automatic', importSource: 'twiggle/jsx' }],
        isTypeScript && ['@babel/preset-typescript'],
    ].filter(Boolean) as babel.PluginItem[],
    plugins: [twiggleJsx],
})
