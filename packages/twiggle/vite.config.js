import { defineConfig } from 'vite'
import {
    dirname,
    join
} from 'path'
import { fileURLToPath } from 'url' 
import twigglePlugin from 'vite-plugin-twiggle' // Import the plugin

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    plugins: [
        twigglePlugin() // Add the plugin here
    ],
    resolve: {
        alias: {
            '@jsx': join(__dirname, 'src', 'jsx')
        }
    },
    esbuild: {
        jsx: 'automatic',
        jsxImportSource: '@jsx'
    },
    build: {
        lib: {
            entry: 'src/index.ts',
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
    }
})