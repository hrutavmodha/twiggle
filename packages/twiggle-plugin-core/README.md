# twiggle-plugin-core

Core transformation logic for Twiggle plugins.

This package provides the fundamental Babel plugin that performs the reactive JSX transformations for Twiggle. It is a dependency for various bundler and transpiler plugins (e.g., `babel-plugin-twiggle`, `vite-plugin-twiggle`).

## Installation

```bash
npm install twiggle-plugin-core
# or
yarn add twiggle-plugin-core
```

## Usage

This package is primarily intended for internal use by other Twiggle plugins and is not typically consumed directly by end-user applications.

For developers building Twiggle plugins, you can import and use the core Babel plugin:

```javascript
import twigglePlugin from 'twiggle-plugin-core';

// Use `twigglePlugin` in your Babel configuration or custom transformation logic.
```
