import { defineConfig } from 'vite'
import {
    dirname,
    join
} from 'path'
import { fileURLToPath } from 'url' 
import twigglePlugin from 'vite-plugin-twiggle'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        twigglePlugin()
    ],
    resolve: {
        alias: {
            '@jsx': join(__dirname, 'client', 'src', 'jsx')
        }
    },
    esbuild: {
        jsx: 'automatic',
        jsxImportSource: '@jsx'
    },
    build: {
        lib: {
            entry: 'client/index.ts',
            name: 'twiggle',
            formats: [
                'es',
                'cjs',
                'iife',
                'system',
                'umd'
            ],
            fileName: (format) => {
                return `twiggle-${format}.js`
            }
        }
    },
    test: { 
        globals: true,
        environment: 'jsdom',
        include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    }
})