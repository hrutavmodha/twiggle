import { createFilter } from '@rollup/pluginutils';
import { transform } from 'twiggle-plugin-core';

export default function twiggle() {
  const filter = createFilter(/\.(js|ts|jsx|tsx)$/, /node_modules/);
  return {
    name: 'twiggle',
    transform(code: any, id: any) {
      if (filter(id)) {
        return transform(code, id);
      }
    },
  };
}