import type { Compiler } from 'webpack';
import twiggleJsx from './transform';

const PLUGIN_NAME = 'TwiggleWebpackPlugin';

class TwiggleWebpackPlugin {
  apply(compiler: Compiler) {
    compiler.options.module?.rules.push({
      test: /\.(js|ts|jsx|tsx)$/,
      exclude: /node_modules/,
      use: {
        loader: require.resolve('babel-loader'),
        options: {
          presets: [
            ['@babel/preset-react', { runtime: 'automatic', importSource: 'twiggle/jsx' }],
            ['@babel/preset-typescript'],
          ],
          plugins: [twiggleJsx],
        },
      },
    });
  }
}

export default TwiggleWebpackPlugin;