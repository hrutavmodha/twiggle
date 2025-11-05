import { Transformer } from '@parcel/plugin';
import babel from '@parcel/transformer-babel';
import twiggleJsx from './transform';

export default new Transformer({
  async transform({ asset, options }) {
    const babelConfig = await (babel as any).config({
      asset,
      options: {
        ...options,
        plugins: [
          twiggleJsx,
        ],
        presets: [
          ['@babel/preset-react', { runtime: 'automatic', importSource: 'twiggle/jsx' }],
          ['@babel/preset-typescript'],
        ],
      },
    });

    if (babelConfig) {
      asset.setAST(babelConfig.ast);
      asset.setCode(babelConfig.code);
    }

    return [asset];
  },
});