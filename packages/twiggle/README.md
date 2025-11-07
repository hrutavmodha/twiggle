# Twiggle

Twiggle is a tiny, focused frontend library designed for building user interfaces. It provides core primitives for JSX rendering and reactive state management, aiming for clarity and a minimal runtime footprint.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/hrutavmodha/twiggle/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.0-brightgreen)](https://www.npmjs.com/package/twiggle)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/twiggle)](https://bundlephobia.com/package/twiggle)

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Core Concepts](#core-concepts)
    - [JSX & createElement](#jsx--createelement)
    - [Renderer](#renderer)
    - [State Primitive](#state-primitive)
- [Development](#development)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

Twiggle is an innovative, minimalist frontend library that empowers developers to construct dynamic and responsive user interfaces with unparalleled clarity and efficiency. Unlike larger, more opinionated frameworks, Twiggle focuses on providing essential primitives: a custom JSX runtime for declarative UI composition, a robust reactive state management system for predictable data flow. Its design philosophy prioritizes a minimal runtime footprint and direct manipulation of the DOM, making it an ideal choice for projects where performance and control are paramount. Twiggle is perfect for learning the intricacies of frontend frameworks, building small to medium-sized applications, or integrating into existing projects where a lightweight, yet powerful, UI solution is needed.

---

## Features

Twiggle offers a carefully curated set of features, each designed to be powerful yet easy to understand and use:

- **Custom JSX Runtime:**
    - At its core, Twiggle provides its own JSX runtime, allowing you to write declarative UI code that feels familiar to React developers.
    - This runtime directly translates your JSX into efficient DOM operations, bypassing the need for a virtual DOM and offering direct control over the browser's rendering engine.

- **Minimal DOM Renderer:**
    - Twiggle's renderer is optimized for performance and simplicity. It efficiently mounts and updates real DOM nodes and fragments.
    - The design ensures that updates are precise and performant, leading to highly responsive user interfaces.

- **Reactive State Primitive:**
    - Experience predictable and manageable state with Twiggle's reactive state primitive.
    - `createState<T>(initialValue: T)`: Easily create state variables that hold any type of data.
    - `get()`: Retrieve the current value of a state variable.
    - `set(newValue: T)`: Update the state, triggering automatic re-renders of components that depend on it.
    - `runSideEffect(fn: () => void)`: A powerful mechanism to define side effects that automatically re-run when any observed state changes, providing a clean way to manage complex interactions and data flows.

---

## Installation

To integrate Twiggle into your project, you can easily install it using your preferred Node.js package manager:

```bash
npm install twiggle
# or using yarn
yarn add twiggle
# or using pnpm
pnpm add twiggle
```

---

## Quick Start

Get your first Twiggle application up and running in minutes. This example demonstrates a simple counter application using Twiggle's state management and JSX rendering.

**1. Create your main application file (e.g., `src/main.tsx`):**

```tsx
// src/main.tsx
import { render, createState } from 'twiggle'

function Counter() {
    const count = createState(0)

    const increment = () => {
        count.set(count.get() + 1)
    }

    return (
        <div>
            <h1>Counter App</h1>
            <p>Count: {count.get()}</p>
            <button onclick={increment}>Increment</button>
        </div>
    )
}

const root = document.getElementById('root')
if (root) {
    render(<Counter />, root)
}
```

**2. Ensure your `index.html` has a root element:**

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
        />
        <title>Twiggle App</title>
    </head>
    <body>
        <div id="root"></div>
        <script
            type="module"
            src="/src/main.tsx"
        ></script>
    </body>
</html>
```

**3. Configure your `vite.config.ts` (if using Vite):**

Make sure you have `vite-plugin-twiggle` installed and configured in your Vite setup to handle JSX transformations correctly.

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import twiggle from 'vite-plugin-twiggle'

export default defineConfig({
    plugins: [twiggle()],
    esbuild: {
        jsx: 'automatic',
        jsxDev: true, // Set to false for production
        jsxImportSource: 'twiggle/client', // Ensure this points to Twiggle's client-side JSX runtime
    },
})
```

**4. Run your development server:**

```bash
npm run dev
```

Your Twiggle application should now be running in your browser!

---

## Core Concepts

Understanding these core concepts will help you leverage Twiggle's full potential:

### JSX & CreateElement

Twiggle's approach to UI construction is centered around JSX, a syntax extension for JavaScript. When your code is compiled, JSX elements are transformed into calls to Twiggle's `createElement` function.

- **`type`**: This argument determines the kind of element to create. It can be:
    - A `string` (e.g., `'div'`, `'span'`, `'p'`) to create standard HTML DOM elements.
    - The special string `'Fragment'` to create a `DocumentFragment`, useful for grouping multiple children without adding an extra node to the DOM tree.
    - A `function` (your component) which will be invoked with `props` and is expected to return a DOM node or fragment.
- **`props`**: An object containing attributes, event handlers, and children for the element.
    - `children`: A special prop that can be a `string`, `number`, another Twiggle `Element`, or an `Array` of these types.
    - **DOM Event Handlers**: Twiggle expects DOM event handlers to be named in lowercase (e.g., `onclick`, `oninput`, `onchange`), aligning with native DOM event attributes.

### Renderer

The `render(element, parent)` function is the entry point for mounting your Twiggle application into the DOM.

- `element`: The Twiggle element (or component instance) you wish to render.
- `parent`: The target HTML DOM element where your Twiggle application will be attached.

The current implementation is intentionally straightforward: it clears the `parent.innerHTML` and then appends the `element`. This direct approach contributes to Twiggle's small bundle size and high performance.

### State Primitive

Twiggle's state management is built around a simple yet effective reactive primitive, allowing for explicit control over data flow and UI updates.

- **`createState<T>(initialValue: T)`**: This function initializes a new reactive state variable. It returns an object with two methods:
    - `get(): T`: Retrieves the current value of the state. When called within a `runSideEffect`, it automatically registers the effect as a subscriber to this state.
    - `set(newValue: T)`: Updates the state variable to `newValue`. This action triggers all registered side effects that depend on this state to re-execute.

- **`runSideEffect(fn: () => void)`**: This function is central to Twiggle's reactivity. It executes the provided `fn` function. During its execution, any `createState().get()` calls are observed, and the `fn` is registered as a subscriber to those state variables. Consequently, whenever any of those subscribed state variables are updated via `set()`, the `fn` will automatically re-execute, ensuring your UI or other logic remains synchronized with your application's state.

This minimal reactive system, based on an effect stack and per-state subscriber lists, offers a transparent and easy-to-reason-about approach to reactivity, without the complexity of a full-blown reactive framework.

---

## Development

For those interested in contributing to Twiggle or exploring its internal architecture, follow these steps to set up your development environment:

1.  **Clone the Monorepo:**
    Twiggle is developed as part of a monorepo. Begin by cloning the entire repository from GitHub:

    ```bash
    git clone https://github.com/hrutavmodha/twiggle.git
    cd twiggle
    ```

2.  **Install Dependencies:**
    Navigate to the `twiggle` package directory and install all its development and runtime dependencies:

    ```bash
    cd packages/twiggle
    npm install
    ```

3.  **Start Development Server:**
    To run the example/dev server for the `twiggle` package and see changes live:

    ```bash
    npm run start
    ```

4.  **Build the Package:**
    To compile the Twiggle library for distribution:

    ```bash
    npm run build
    ```

---

## Testing

Twiggle uses Vitest for its testing framework. To run the test suite and ensure all components are functioning as expected:

```bash
cd packages/twiggle
npm run test
```

You can also run the tests with a UI for a more interactive experience:

```bash
npm run test:ui
```

---

## Contributing

We warmly welcome contributions to Twiggle! Your efforts help improve the library for everyone. Please refer to the main [CONTRIBUTING.md](https://github.com/hrutavmodha/twiggle/blob/main/CONTRIBUTING.md) file in the monorepo root for comprehensive guidelines on how to contribute effectively to the Twiggle project.

Before submitting a pull request, please ensure that you have:

- Adhered to the project's established coding style and conventions.
- Crafted clear, concise, and descriptive commit messages.
- Added new tests or updated existing ones to cover your changes.
- Verified that all existing tests pass successfully.

---

## License

Twiggle is open-source software, freely available under the terms of the [MIT License](https://github.com/hrutavmodha/twiggle/blob/main/LICENSE).
