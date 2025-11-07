# swc-plugin-twiggle

The SWC Plugin for Twiggle.

This plugin allows you to use Twiggle's JSX transformations within an SWC-powered build pipeline.

## Installation

```bash
npm install swc-plugin-twiggle
# or
yarn add swc-plugin-twiggle
```

## Usage

This plugin provides a JavaScript utility that wraps Twiggle's Babel-based JSX transformation. You can integrate it into your build process where you use SWC.

Example (e.g., in a custom build script or a tool that allows custom SWC configuration):

```typescript
import { transform } from '@swc/core'
import swcTwigglePlugin from 'swc-plugin-twiggle'

async function processCode(code: string, filename: string) {
    // Apply Twiggle's JSX transform using the plugin's internal Babel transformation
    const twiggleTransformedCode = await swcTwigglePlugin().transform(code, filename)

    // Then, you can use SWC for further transformations if needed
    const swcResult = await transform(twiggleTransformedCode, {
        filename,
        jsc: {
            parser: {
                syntax: 'typescript',
                tsx: true,
            },
            transform: {
                react: {
                    runtime: 'automatic',
                },
            },
        },
    })

    return swcResult.code
}

// Example usage:
// const myCode = `function App() { return <div $state={{ count: 0 }}>Hello {count.get()}</div>; }`;
// processCode(myCode, 'App.tsx').then(console.log);
```
