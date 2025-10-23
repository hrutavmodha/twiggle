import { defineConfig } from 'vite'
import { join } from 'path'
import { __dirname } from '../constants'

export default defineConfig({
    resolve: {
        alias: {
            '@jsx': join(__dirname, 'twiggle', 'server', 'src', 'jsx'),
            '@server': join(__dirname, 'twiggle', 'server'),
        },
    },
    esbuild: {
        jsx: 'automatic',
        jsxDev: false,
        jsxImportSource: '@jsx',
    },
    build: {
        outDir: 'dist/server',
        lib: {
            entry: '@server/index.ts',
            formats: ['es'],
            fileName: (format) => {
                return `twiggle-${format}.js`
            },
        },
        rollupOptions: {
            input: {
                server: '@server',
            },
        },
    },
})
