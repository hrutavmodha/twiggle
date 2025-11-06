import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';

export default {
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
};
