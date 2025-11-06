import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import serve from 'rollup-plugin-serve'
import { RollupOptions } from 'rollup' // Assuming rollup types are installed

const config: RollupOptions = {
    input: 'src/main.tsx',
    output: {
        file: 'dist/bundle.js',
        format: 'iife',
        sourcemap: true,
    },
    plugins: [
        nodeResolve(),
        typescript(),
        serve({
            contentBase: ['dist', '.'],
            port: 3000,
        }),
    ],
}

export default config
