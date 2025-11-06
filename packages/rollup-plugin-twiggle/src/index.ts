import { transformAsync } from '@babel/core';
import { createFilter } from '@rollup/pluginutils';
import twiggleBabelPlugin from 'babel-plugin-twiggle';

interface Options {
  include?: string | string[];
  exclude?: string | string[];
}

export default function twiggleRollupPlugin(options: Options = {}) {
  const filter = createFilter(options.include || /\.(js|ts|jsx|tsx)$/, options.exclude || /node_modules/);

  return {
    name: 'twiggle-rollup-plugin',

    async transform(code: string, id: string) {
      if (!filter(id)) {
        return null;
      }

      const result = await transformAsync(code, {
        plugins: [
          twiggleBabelPlugin,
        ],
        filename: id,
        sourceMaps: true,
      });

      if (result && result.code) {
        return {
          code: result.code,
          map: result.map,
        };
      }

      return null;
    },
  };
}
