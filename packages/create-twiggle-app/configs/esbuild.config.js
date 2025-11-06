const esbuild = require('esbuild');
const path = require('path');

esbuild.build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outfile: 'dist/bundle.js',
  loader: { '.tsx': 'tsx', '.ts': 'ts' },
  jsxFactory: 'createElement',
  jsxFragment: 'Fragment',
  // A shim to import createElement and Fragment
  inject: [path.resolve(__dirname, 'twiggle-jsx-shim.js')], 
  sourcemap: true,
}).catch(() => process.exit(1));
