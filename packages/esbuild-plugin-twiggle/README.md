# esbuild-plugin-twiggle

The esbuild Plugin for Twiggle.

This plugin integrates Twiggle's reactive JSX syntax transformation into your esbuild build process.

## Installation

```bash
npm install esbuild-plugin-twiggle
# or
yarn add esbuild-plugin-twiggle
```

## Usage

Add `esbuild-plugin-twiggle` to your esbuild plugins:

```javascript
// esbuild.config.js
import esbuild from 'esbuild'
import twigglePlugin from 'esbuild-plugin-twiggle'

esbuild
    .build({
        entryPoints: ['src/index.tsx'],
        bundle: true,
        outfile: 'dist/bundle.js',
        plugins: [twigglePlugin()],
    })
    .catch(() => process.exit(1))
```
