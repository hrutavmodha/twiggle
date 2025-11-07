---
sidebar_label: 'esbuild'
---

# esbuild Integration

The `esbuild-plugin-twiggle` is the official esbuild plugin to integrate Twiggle into your development environment. It handles JSX transformations and enables reactive expressions.

## Installation

```bash
npm install esbuild-plugin-twiggle
# or
yarn add esbuild-plugin-twiggle
# or
pnpm add esbuild-plugin-twiggle
```

## Usage

Add the plugin to your esbuild configuration:

```javascript
import { build } from 'esbuild'
import twiggle from 'esbuild-plugin-twiggle'

build({
    // ... other esbuild configurations
    plugins: [twiggle()],
})
```
