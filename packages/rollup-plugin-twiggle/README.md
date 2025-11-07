# rollup-plugin-twiggle

The Rollup Plugin for Twiggle.

This plugin enables Twiggle's reactive JSX syntax transformation within your Rollup build pipeline.

## Installation

```bash
npm install rollup-plugin-twiggle
# or
yarn add rollup-plugin-twiggle
```

## Usage

Add `rollup-plugin-twiggle` to your Rollup configuration:

```javascript
// rollup.config.js
import twiggle from 'rollup-plugin-twiggle';

export default {
  input: 'src/main.jsx',
  output: {
    file: 'bundle.js',
    format: 'esm'
  },
  plugins: [twiggle()]
};
```
