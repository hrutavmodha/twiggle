import { Transformer } from '@parcel/plugin'
import babel from '@parcel/transformer-babel'
import { twiggleBabelConfig } from 'twiggle-plugin-core'

export default new Transformer({
    async transform({ asset, options }) {
        const isTypeScript = asset.filePath.endsWith('.ts') || asset.filePath.endsWith('.tsx')
        const babelConfig = await (babel as any).config({
            asset,
            options: {
                ...options,
                ...twiggleBabelConfig(isTypeScript),
            },
        })

        if (babelConfig) {
            asset.setAST(babelConfig.ast)
            asset.setCode(babelConfig.code)
        }

        return [asset]
    },
})
