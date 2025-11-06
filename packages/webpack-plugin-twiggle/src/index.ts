import type { Compiler } from 'webpack'
import { twiggleBabelConfig } from 'twiggle-plugin-core'

class TwiggleWebpackPlugin {
    apply(compiler: Compiler) {
        compiler.options.module?.rules.push({
            test: /\.(js|ts|jsx|tsx)$/,
            exclude: /node_modules/,
            use: {
                loader: require.resolve('babel-loader'),
                options: {
                    ...twiggleBabelConfig(true), // Assuming TypeScript for webpack projects
                },
            },
        })
    }
}

export default TwiggleWebpackPlugin