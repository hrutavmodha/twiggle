import { defineConfig } from 'vite'
import { join } from 'path'
import { __dirname } from './constants'

export default defineConfig({
    resolve: {
        alias: {
            '@jsx': join(__dirname, 'client', 'src', 'jsx'),
            '@client': join(__dirname, 'client')
        }
    },
    esbuild: {
        jsx: 'automatic',
        jsxDev: false,
        jsxImportSource: '@jsx'
    },
    build: {
        outDir: 'dist/client',
        lib: {
            entry: '@client/index.ts',
            formats: [
                'es'
            ],
            fileName: (format) => {
                return `twiggle-${format}.js`
            }
        },
        rollupOptions: {
            input: {
                client: '@client'
            }
        }
    }
})