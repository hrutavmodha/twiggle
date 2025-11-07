---
sidebar_label: 'Rollup'
---

# Rollup Integration

The `rollup-plugin-twiggle` is the official Rollup plugin to integrate Twiggle into your development environment. It handles JSX transformations and enables reactive expressions.

## Installation

```bash
npm install rollup-plugin-twiggle
# or
yarn add rollup-plugin-twiggle
# or
pnpm add rollup-plugin-twiggle
```

## Usage

Add the plugin to your `rollup.config.js` file:

```javascript
import twiggle from 'rollup-plugin-twiggle'

export default {
    // ... other rollup configurations
    plugins: [twiggle()],
}
```
