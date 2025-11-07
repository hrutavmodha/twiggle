# turbopack-plugin-twiggle

The Turbopack Plugin for Twiggle.

This plugin allows you to use Twiggle's JSX transformations within a Turbopack-powered build pipeline.

## Installation

```bash
npm install turbopack-plugin-twiggle
# or
yarn add turbopack-plugin-twiggle
```

## Usage

This plugin provides a JavaScript utility that wraps Twiggle's Babel-based JSX transformation. You can integrate it into your build process where you use Turbopack.

Example (e.g., in a custom build script or a tool that allows custom Turbopack configuration):

```typescript
import turbopackTwigglePlugin from 'turbopack-plugin-twiggle';

async function processCode(code: string, filename: string) {
  // Apply Twiggle's JSX transform using the plugin's internal Babel transformation
  const twiggleTransformedCode = await turbopackTwigglePlugin().transform(code, filename);

  // You would then feed `twiggleTransformedCode` into your Turbopack build process.
  // Note: Turbopack's JavaScript API for plugins is not yet stable or widely documented.
  // This plugin provides the transformation logic, and its integration will depend on
  // how Turbopack evolves its extensibility for JavaScript-based tools.

  return twiggleTransformedCode;
}

// Example usage:
// const myCode = `function App() { return <div $state={{ count: 0 }}>Hello {count.get()}</div>; }`;
// processCode(myCode, 'App.tsx').then(console.log);
```
