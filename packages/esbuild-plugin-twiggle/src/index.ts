import { transformAsync } from '@babel/core';
import { Plugin } from 'esbuild';
import twiggleBabelPlugin from 'babel-plugin-twiggle';

interface Options {
  filter?: RegExp;
}

export default function twiggleEsbuildPlugin(options: Options = {}): Plugin {
  const filter = options.filter || /\.(js|ts|jsx|tsx)$/;

  return {
    name: 'twiggle-esbuild-plugin',
    setup(build) {
      build.onLoad({ filter }, async (args) => {
        const code = await require('fs').promises.readFile(args.path, 'utf8');

        const result = await transformAsync(code, {
          plugins: [
            twiggleBabelPlugin,
          ],
          filename: args.path,
          sourceMaps: true,
        });

        if (result && result.code) {
          return {
            contents: result.code,
            loader: 'ts', // or 'tsx' depending on the file extension
          };
        }

        return { contents: code, loader: 'ts' };
      });
    },
  };
}
