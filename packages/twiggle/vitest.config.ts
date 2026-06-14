import { defineConfig } from 'vitest/config'
import { join } from 'path'
import { __dirname } from '../constants'

export default defineConfig({
    test: {
        environment: 'jsdom',
    },
    resolve: {
        alias: {
            '@jsx': join(__dirname, 'twiggle', 'server', 'src', 'jsx'),
            '@server': join(__dirname, 'twiggle', 'server'),
            '@types': join(__dirname, 'twiggle', 'types'),
        },
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.d.ts'],
    },
})
