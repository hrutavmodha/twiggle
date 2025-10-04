# vite-plugin-twiggle

The `vite-plugin-twiggle` is the official Vite plugin meticulously crafted to seamlessly integrate the Twiggle frontend library into your development environment. This plugin is an essential component for any Twiggle project, as it intelligently handles the complex JSX transformations and enables the powerful reactive expression capabilities that are fundamental to Twiggle's runtime. By abstracting away the underlying configuration, it ensures a smooth, efficient, and highly productive development experience for Twiggle applications.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hrutavmodha/twiggle/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.5-brightgreen)](https://www.npmjs.com/package/vite-plugin-twiggle)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/vite-plugin-twiggle)](https://bundlephobia.com/package/vite-plugin-twiggle)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [How it Works](#how-it-works)
- [Configuration Options](#configuration-options)
- [Troubleshooting](#troubleshooting)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

In the modern frontend landscape, build tools like Vite have become indispensable for their speed and developer-friendly features. Twiggle, with its unique approach to JSX and reactivity, requires specific transformations during the build process. The `vite-plugin-twiggle` bridges this gap, providing a robust and optimized solution for compiling your Twiggle components. It ensures that your JSX code is correctly interpreted and that Twiggle's reactive expressions function as intended, all while leveraging Vite's lightning-fast hot module replacement (HMR) and optimized builds. This plugin is designed to be a drop-in solution, minimizing setup time and allowing developers to focus on writing application logic rather than build configurations.

---

## Features

The `vite-plugin-twiggle` offers a suite of features designed to streamline Twiggle development:

*   **Effortless JSX Transformation:**
    *   Automatically configures Babel to process JSX syntax within your `.js`, `.ts`, `.jsx`, and `.tsx` files.
    *   Utilizes `@babel/preset-react` with a precise configuration (`runtime: 'automatic'`, `importSource: 'twiggle/jsx'`) to ensure that all JSX elements are correctly compiled into calls to Twiggle's custom `jsx` and `jsxs` functions. This is crucial for Twiggle's direct DOM manipulation approach.

*   **Powerful Reactive Expression Support:**
    *   Integrates a specialized custom Babel plugin (`babel-plugin-twiggle-jsx`) that intelligently identifies and transforms Twiggle's reactive expressions.
    *   This transformation is key to enabling Twiggle's efficient state management system, allowing your UI components to react dynamically to state changes without the overhead of a virtual DOM.

*   **First-Class TypeScript Integration:**
    *   Provides seamless support for TypeScript projects, automatically applying `@babel/preset-typescript` to transpile TypeScript syntax into standard JavaScript.
    *   Ensures type safety and leverages TypeScript's powerful features throughout your Twiggle application.

*   **Optimized for Vite:**
    *   Designed from the ground up to work harmoniously with Vite's architecture, taking full advantage of its speed and efficiency.
    *   Benefits from Vite's instant server start, lightning-fast HMR, and optimized production builds.

*   **Minimal Configuration:**
    *   Requires minimal setup, typically just adding the plugin to your `vite.config.js` or `vite.config.ts` file.
    *   The `create-twiggle-app` CLI further simplifies this by automatically configuring the plugin for new projects.

---

## Installation

To incorporate `vite-plugin-twiggle` into your existing Vite project, follow these simple steps:

1.  **Install the package:**
    Open your terminal in your project's root directory and run the following command:

    ```bash
    npm install vite-plugin-twiggle
    # or using yarn
    yarn add vite-plugin-twiggle
    # or using pnpm
    pnpm add vite-plugin-twiggle
    ```

2.  **Add to your Vite configuration:**
    Open your `vite.config.js` (or `vite.config.ts`) file and import the plugin, then add it to the `plugins` array:

    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite';
    import twiggle from 'vite-plugin-twiggle';

    export default defineConfig({
      plugins: [
        twiggle() // Add the Twiggle Vite plugin here
      ],
      // Other Vite configurations...
    });
    ```

    If you are using TypeScript, your `vite.config.ts` might look like this:

    ```typescript
    // vite.config.ts
    import { defineConfig } from 'vite';
    import twiggle from 'vite-plugin-twiggle';

    export default defineConfig({
      plugins: [
        twiggle() // Add the Twiggle Vite plugin here
      ],
      // Other Vite configurations...
    });
    ```

---

## Usage

Once installed and configured, the `vite-plugin-twiggle` works transparently in the background. You can simply write your Twiggle components using JSX syntax, and the plugin will ensure they are correctly transformed for the Twiggle runtime.

**Example Twiggle Component (`src/App.tsx`):**

```tsx
import { createState } from 'twiggle';

function App() {
  const count = createState(0);

  const increment = () => {
    count.set(count.get() + 1);
  };

  return (
    <div>
      <h1>Hello, Twiggle!</h1>
      <p>Count: {count.get()}</p>
      <button onclick={increment}>Increment</button>
    </div>
  );
}

export default App;
```

**Example Entry Point (`src/main.tsx`):**

```tsx
import { render } from 'twiggle';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  render(<App />, rootElement);
}
```

The plugin ensures that the JSX in `App.tsx` is correctly transformed into `createElement` calls that Twiggle understands, and that the reactive `createState` and `increment` logic functions as expected.

---

## How it Works

The `vite-plugin-twiggle` operates by hooking into Vite's transformation pipeline. When Vite processes a JavaScript or TypeScript file, the plugin steps in and applies a series of Babel transformations. This process can be broken down into several key stages:

1.  **File Filtering:** The plugin first uses `@rollup/pluginutils`'s `createFilter` to identify relevant files. By default, it targets files with `.js`, `.ts`, `.jsx`, and `.tsx` extensions, while explicitly excluding files within `node_modules` to optimize performance.

2.  **Babel Transformation:** For each file that passes the filter, Babel is invoked (`babel.transformSync`). The transformation is configured with a set of presets and plugins:

    *   **`@babel/preset-react`**: This preset is fundamental for JSX transformation. It's configured with:
        *   `runtime: 'automatic'`: This modern runtime automatically imports the necessary JSX helper functions (`jsx`, `jsxs`, `Fragment`) from the specified `importSource`, eliminating the need for manual `import React from 'react'` statements.
        *   `importSource: 'twiggle/jsx'`: This critical setting tells Babel to import the JSX helper functions from `twiggle/jsx` (which maps to Twiggle's custom JSX runtime) instead of the default `react` or `react/jsx-runtime`.

    *   **`@babel/preset-typescript`**: If the processed file is a TypeScript file (`.ts` or `.tsx`), this preset is dynamically applied to strip away TypeScript-specific syntax, leaving clean JavaScript for the browser.

    *   **`babel-plugin-twiggle-jsx`**: This is a custom-developed Babel plugin, specifically designed for Twiggle. Its primary role is to identify and transform Twiggle's reactive expressions. For instance, if you have a `createState` getter being used directly in JSX, this plugin might wrap it in an arrow function to ensure it's treated as a reactive expression that can be tracked by Twiggle's state management system. This is where the magic of Twiggle's reactivity truly comes alive in the build process.

3.  **Source Map Generation:** The plugin is configured to generate source maps (`sourceMaps: true`), which are invaluable for debugging your Twiggle applications, allowing you to trace compiled code back to its original source.

4.  **AST Exclusion:** For performance and simplicity, the plugin explicitly disables AST generation (`ast: false`) from Babel, as the Abstract Syntax Tree is not needed for the final output.

By orchestrating these transformations, `vite-plugin-twiggle` ensures that your Twiggle source code is correctly prepared for execution in the browser, fully leveraging its unique features.

---

## Configuration Options

Currently, the `vite-plugin-twiggle` is designed to be a zero-configuration plugin, working out-of-the-box with its default settings. This simplifies its usage and reduces the cognitive load on developers.

In future iterations, we may introduce configurable options to allow for more fine-grained control over aspects like:

*   **Custom `importSource`:** Allowing users to specify a different import source for JSX helper functions.
*   **Exclusion Patterns:** Providing options to customize which files or directories the plugin should ignore.
*   **Babel Plugin Options:** Exposing options for the underlying Babel plugins if advanced customization is required.

For now, simply adding `twiggle()` to your Vite plugins array is sufficient.

---

## Troubleshooting

If you encounter issues while using `vite-plugin-twiggle`, consider the following:

*   **JSX Transformation Errors:**
    *   Ensure that your `vite.config.js` (or `vite.config.ts`) correctly includes `twiggle()` in the `plugins` array.
    *   Verify that your `tsconfig.json` (if using TypeScript) is set up to correctly handle JSX, especially the `jsx` and `jsxImportSource` options if you are not using `create-twiggle-app` to scaffold your project.
    *   Check for any conflicting Babel configurations or other Vite plugins that might interfere with JSX processing.

*   **Reactive Expression Issues:**
    *   If your reactive state updates are not triggering UI re-renders as expected, ensure that you are using `createState().get()` within a `runSideEffect` or directly within JSX where the plugin can transform it.
    *   Review the `babel-plugin-twiggle-jsx.ts` source code in the monorepo for a deeper understanding of how reactive expressions are transformed.

*   **Build Failures:**
    *   Examine the build logs for specific error messages. These often provide clues about misconfigurations or syntax errors.
    *   Ensure all dependencies are correctly installed (`npm install`).

*   **General Debugging:**
    *   Try creating a minimal reproducible example to isolate the issue.
    *   Consult the Twiggle documentation and community forums for similar issues.
    *   If you believe you've found a bug in the plugin, please report it on the [GitHub Issues page](https://github.com/hrutavmodha/twiggle/issues).

---

## Development

If you're interested in contributing to `vite-plugin-twiggle` or understanding its internals, here's how to set up your development environment:

1.  **Clone the Monorepo:**
    The `vite-plugin-twiggle` is part of the larger Twiggle monorepo. Clone the entire repository:

    ```bash
    git clone https://github.com/hrutavmodha/twiggle.git
    cd twiggle
    ```

2.  **Install Dependencies:**
    Navigate to the plugin's directory and install its dependencies:

    ```bash
    cd packages/vite-plugin-twiggle
    npm install
    ```

3.  **Build the Plugin:**
    To compile the plugin's TypeScript source code into JavaScript, run the build script:

    ```bash
    npm run build
    ```

    This command uses `esbuild` for fast bundling and `tsc` for generating declaration files.

4.  **Testing Changes:**
    To test your changes, you can link the plugin to a local Twiggle project or the `create-twiggle-app` template.

    ```bash
    # In packages/vite-plugin-twiggle
    npm link

    # In your test project (e.g., a project created with create-twiggle-app)
    npm link vite-plugin-twiggle
    ```

    Then, run your test project's development server or build process to see your changes in action.

---

## Contributing

We welcome contributions to `vite-plugin-twiggle`! Whether it's bug reports, feature requests, or code contributions, your input is valuable. Please refer to the main [CONTRIBUTING.md](https://github.com/hrutavmodha/twiggle/blob/main/CONTRIBUTING.md) file in the monorepo root for detailed guidelines on how to contribute.

Before submitting a pull request, ensure you have:

*   Followed the coding style and conventions.
*   Written clear and concise commit messages.
*   Added or updated tests for your changes.
*   Ensured all existing tests pass.

---

## License

`vite-plugin-twiggle` is open-source software licensed under the [MIT License](./LICENSE).