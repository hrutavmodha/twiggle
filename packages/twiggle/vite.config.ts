import { defineConfig } from 'vite'
import {
    dirname,
    join
} from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const _mod = require('vite-plugin-twiggle')
let twigglePlugin = null

if (typeof _mod === 'function') {
    twigglePlugin = _mod
}
else if (_mod && typeof _mod.default === 'function') {
    twigglePlugin = _mod.default
}
else if (_mod && _mod.__esModule && typeof _mod.default === 'function') {
    twigglePlugin = _mod.default
}
if (typeof twigglePlugin !== 'function') {
    throw new Error(`vite-plugin-twiggle did not export a plugin function. Imported value keys: ${_mod ? Object.keys(_mod).join(',') : 'null'}`)
}

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
    // @ts-ignore
    test: {
        globals: true,
        environment: 'jsdom',
    }
})