# Twiggle

Tiny, focused front-end primitives: a custom JSX runtime, minimal DOM renderer, a tiny router, and a reactive state primitive.

[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](#license)
[![Version](https://img.shields.io/badge/version-1.1.1-brightgreen)](https://www.npmjs.com/package/twiggle)

> **Note:** Twiggle is currently in its early stage and should not be used in the production apps.

Maintainer: Hrutav Modha

License: MIT

---

## Table of Contents

- [Why Twiggle](#why-twiggle)
- [Installation](#installation)
- [Quick start](#quick-start)
- [Core concepts](#core-concepts)
  - [JSX & createElement](#jsx--createelement)
  - [Renderer](#renderer)
  - [State primitive](#state-primitive)
  - [Router](#router)
- [Vite plugin](#vite-plugin)
- [API reference](#api-reference)
- [Development](#development)
- [Contributing](#contributing)
- [FAQ](#faq)
- [License](#license)

---

## Why Twiggle

Twiggle is intentionally minimal. It focuses on clarity and a small runtime surface for use-cases like:

- Learning how frameworks work under the hood.
- Small demos, playgrounds, documentation sites.
- Projects that prefer direct DOM manipulation and minimal dependencies.

Design principles:

- Minimal and transparent (small, well-commented code).
- Simple reactivity — explicit effect tracking and subscription.
- Works with modern tooling via a small Vite plugin.

---

## Installation

Install from npm:

```bash
npm install twiggle
```

Or use the package from the monorepo during local development (root of workspace):

```bash
npm install
cd packages/twiggle
npm run start
```

Available scripts (in `packages/twiggle/package.json`):

- `start` — start Vite dev server
- `build` — run Vite build
- `test` — run Vitest
- `test:ui` — run Vitest UI

---

## Quick Start

Minimal example (TypeScript / TSX):

```tsx
/** src/main.tsx */
import render from 'twiggle'
import Home from './pages/Home'

const root = document.getElementById('root')!
render(<Home />, root)
```

Function component example:

```tsx
function Greeting(props: { name: string }) {
  return <div>Hello, {props.name}!</div>
}

render(<Greeting name="Alice" />, document.getElementById('root'))
```

Note: The JSX transform must target Twiggle's runtime (see Vite plugin section) or you can import the runtime directly in your build config.

---

## Core Concepts

### JSX & CreateElement

Twiggle implements a small JSX runtime. When JSX is compiled it calls `createElement(type, props)`. Supported `type` values:

- string tag (e.g. `'div'`) — creates a DOM element and applies props/children
- `'Fragment'` — returns a `DocumentFragment`
- function component — `type(props)` is invoked and must return a DOM node or fragment

Props convention:

- `children` may be string, number, element, array of elements
- DOM event handlers use lowercase names (e.g. `onclick`, not `onClick`)

### Renderer

`render(element, parent)` mounts a DOM node or fragment to the `parent` node. The current implementation clears `parent.innerHTML` and appends the element. This is intentionally simple to keep the runtime small.

### State Primitive

API:

- `createState<T>(initial)` — returns `{ get: () => T, set: (v: T) => void }`
- `runSideEffect(fn)` — runs `fn` and tracks any `get()` calls performed during the execution. When a tracked state updates, the effect is re-run.

This is a minimal reactive system built around an effect stack and per-state subscriber lists. It is not a full reactive framework but is tiny and easy to reason about.

Example counter:

```tsx
import { 
  createState, 
  runSideEffect 
} from 'twiggle'

const counter = createState(0)

export default function Counter() {
  runSideEffect(() => {
    // reads counter.get() to subscribe
    const value = counter.get()
    // re-run when counter.set is called
    console.log('counter', value)
  })

  return (
    <div>
      <span>{counter.get()}</span>
      <button onclick={() => counter.set(counter.get() + 1)}>Increment</button>
    </div>
  )
}
```

### Router

Twiggle ships a tiny client-side router built on the History API.

Components and functions:

- `Routes` — collects `Route` children and registers them via `setRoutes`
- `Route({ to, element })` — lightweight route descriptor; `element` is a function that returns the element to render
- `Link({ to, children })` — anchor element that prevents default navigation and calls `navigate`
- `navigate(to)` — programmatic navigation; pushes a new history entry and renders the route

Example:

```tsx
<Routes>
  <Route to="/" element={() => <Home />} />
  <Route to="/about" element={() => <About />} />
</Routes>

<Link to="/about">About</Link>
```

---

## Vite Plugin

Use the official Vite plugin in this monorepo to compile JSX for Twiggle and enable reactive transforms.

Install and add to `vite.config.js`:

```js
import { defineConfig } from 'vite'
import twiggle from 'vite-plugin-twiggle'

export default defineConfig({
  plugins: [twiggle()]
})
```

What the plugin does:

- Runs Babel to transform JSX using `@babel/preset-react` configured with `runtime: 'automatic'` and `importSource: 'twiggle/jsx'`.
- Applies a small custom Babel plugin bundled in `packages/vite-plugin-twiggle` to support reactive expression transforms used by Twiggle's runtime.

If you don't use the plugin, ensure your JSX compiler targets the Twiggle runtime or import the proper runtime functions directly.

---

## API Reference

Renderer

- `createElement(type, props)` — internal JSX entry point.
- `render(element: HTMLElement | DocumentFragment, parent: HTMLElement): void` — mount node to parent.

Router

- `navigate(to: string): void`
- `setRoutes(routes: Record<string, () => HTMLElement>): void` — internal
- `Routes(props: { children: any[] }): null`
- `Route(props: { to: string, element: () => HTMLElement }): any`
- `Link(props: { to: string, children: any }): HTMLElement`

State

- `createState<T>(value: T): { get: () => T; set: (v: T) => void }`
- `runSideEffect(fn: () => void): void`

See the `src` folder for implementation details and comments.

---

## Development

Clone and install dependencies from the monorepo root:

```bash
git clone https://github.com/hrutavmodha/twiggle.git
npm install
```

Run the example/dev server for the `twiggle` package:

```bash
cd packages/twiggle
npm run start
```

Build the package:

```bash
cd packages/twiggle
npm run build
```

Run tests:

```bash
cd packages/twiggle
npm run test
```

Quality checks you should run before opening a PR:

- Build: `npm run build`
- Tests: `npm run test`
- Type checks (optional): `tsc --noEmit` from the package directory

---

## Contributing

Contributions are welcome. Please follow these guidelines:

1. Fork the repo and create a descriptive branch name.
2. Keep changes small and focused. Add tests where applicable.
3. Run the test suite and ensure the build passes.
4. Open a pull request describing the problem, approach, and any migration notes.

See `CONTRIBUTING.md` for the project's broader contribution rules.

---

## FAQ

1. Is Twiggle a full framework?

  No. Twiggle is a tiny set of primitives meant for learning, demos, and small apps. 
It lacks many features of full frameworks (advanced component lifecycles, SSR, etc.)

2. Can I use Twiggle in production?

  You can, but consider the tradeoffs (small feature set, simpler reactivity). For production apps that need scaling, a more feature-complete framework is recommended.

---

## License

MIT — see the `LICENSE` file for details.

---

Maintainer: Hrutav Modha — please open issues for bugs or feature requests.
