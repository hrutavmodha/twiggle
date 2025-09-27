import { defineConfig } from 'vite'
import {
    dirname,
    join
} from 'path'
import { fileURLToPath } from 'url' 

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
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
            formats: [
                'es'
            ],
            fileName: (format) => {
                return `build-${format}.js`
            }
        }
    }
})