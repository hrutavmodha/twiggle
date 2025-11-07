import { transformAsync } from '@babel/core';
import twigglePlugin from 'twiggle-plugin-core';

export default function turbopackTwigglePlugin() {
  return {
    name: 'turbopack-twiggle-plugin',
    async transform(code: string, id: string) {
      if (id.endsWith('.tsx') || id.endsWith('.jsx')) {
        const result = await transformAsync(code, {
          filename: id,
          plugins: [twigglePlugin],
          parserOpts: { sourceType: 'module', plugins: ['jsx', 'typescript'] },
        });
        return result?.code || code;
      }
      return code;
    },
  };
}
