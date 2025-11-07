---
sidebar_label: 'Webpack'
---

# Webpack Integration

The `webpack-plugin-twiggle` is the official Webpack plugin to integrate Twiggle into your development environment. It handles JSX transformations and enables reactive expressions.

## Installation

```bash
npm install webpack-plugin-twiggle
# or
yarn add webpack-plugin-twiggle
# or
pnpm add webpack-plugin-twiggle
```

## Usage

Add the plugin to your `webpack.config.js` file:

```javascript
const TwiggleWebpackPlugin = require('webpack-plugin-twiggle');

module.exports = {
  // ... other webpack configurations
  plugins: [new TwiggleWebpackPlugin()],
};
```
