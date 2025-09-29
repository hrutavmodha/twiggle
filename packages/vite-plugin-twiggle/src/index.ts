// @ts-ignore
import { createFilter } from '@rollup/pluginutils';
import * as babel from '@babel/core';
// @ts-ignore
import twiggleJsxReactiveExpressions from './babel-plugin-twiggle-jsx.ts';

export default function twiggle() {
    const filter = createFilter(/\.(js|ts|jsx|tsx)$/, /node_modules/);

    return {
        name: 'twiggle',
        transform(code: any, id: any) {
            if (filter(id)) {
                const isTypeScript = id.endsWith('.ts') || id.endsWith('.tsx');

                const result = babel.transformSync(code, {
                    filename: id,
                    presets: [
                        // Preset for React JSX transformation, configured for Twiggle's custom JSX runtime
                        ['@babel/preset-react', { runtime: 'automatic', importSource: 'twiggle/jsx' }],
                        // Preset for TypeScript if the file is a TypeScript file
                        isTypeScript && ['@babel/preset-typescript'],
                    ].filter(Boolean), // Filter out any null presets
                    plugins: [
                        twiggleJsxReactiveExpressions, // Our custom plugin for reactive expressions
                    ],
                    sourceMaps: true, // Generate source maps
                    ast: false, // Do not return AST
                });

                return {
                    code: result?.code || code,
                    map: result?.map,
                };
            }
        }
    };
}