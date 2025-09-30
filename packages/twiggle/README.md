# Twiggle — Tiny front-end primitives

A small, focused collection of front-end primitives for building tiny component-based apps with a custom JSX runtime, minimal renderer, router, and reactive state system.

This repository is a monorepo (workspace) containing:

- `packages/twiggle` — the core library (JSX runtime, renderer, router, state).
- `packages/vite-plugin-twiggle` — a Vite/Rollup plugin that compiles JSX to use Twiggle's runtime and applies a small Babel plugin for reactive expressions.

Author: Hrutav Modha
License: MIT

---

## Why Twiggle?

Twiggle is intentionally minimal. It provides a tiny, dependency-free set of building blocks for rendering DOM nodes, writing function components with a custom JSX runtime, routing, and a simple reactive state API. It's ideal for learning, tiny demos, playgrounds, or embedding in projects that need a very small runtime surface area.

Goals:

- Understandable source and small footprint.
- Zero virtual DOM — direct DOM manipulation through a simple renderer.
- A minimal reactive state primitive with subscriber tracking.
- A small router for single-page apps.
- Integration with modern tooling via a Vite plugin.

---

## Packages

Root workspace: `twiggle-monorepo` (see `package.json`)

Primary published package: `twiggle` (located at `packages/twiggle`).

Key files and exports (from `packages/twiggle`):

- `src/index.ts` — aggregate exports: renderer, router, state, jsx.
- `src/renderer` — `createElement`, `render`, and helpers.
- `src/router` — `navigate`, `setRoutes`, `Routes`, `Route`, `Link`.
- `src/state` — `createState`, `runSideEffect`.
- `src/jsx/*` — custom JSX runtime files (JSX dev/runtime wrappers and types).

Vite plugin: `packages/vite-plugin-twiggle` — a plugin which configures Babel to transform JSX to use `twiggle/jsx` as the import source and runs a custom Babel plugin for reactive expressions.

---

## Quick Start

This repository uses Yarn/NPM workspaces. From the monorepo root you can run the regular scripts inside `packages/twiggle` when developing that package.

Install dependencies (mono-repo root):

```bash
# If you use npm (v7+ workspaces) or yarn
npm install
# or
# yarn
```

Open the example dev server for the `twiggle` package:

```bash
cd packages/twiggle
npm run start
```

Available package scripts (from `packages/twiggle/package.json`):

- `start` — run Vite dev server.
- `build` — build for production (Vite build).
- `test` — run unit tests via Vitest.
- `test:ui` — run Vitest with UI.

---

## Installing the package

If you want to use the published package (when published to npm):

```bash
npm install twiggle
```

Or, to use the local package in another local project with npm link or via a workspace, reference the package path or add the monorepo workspace.

---

## Basic usage examples

Note: Twiggle exposes a small runtime for JSX and DOM creation. The examples below show the common patterns used in the `packages/twiggle` example app.

### Rendering a simple component

The renderer expects DOM nodes (or fragments) created by the `createElement` function (the JSX transform will call this automatically when you use JS/TSX).

```tsx
import { render } from 'twiggle'
import App from './pages/App'

const root = document.getElementById('root') as HTMLDivElement
render(<Home />, root)
```

### Function components and createElement

Twiggle's `createElement` supports:

- string tag names (e.g. `'div'`) — creates DOM elements and applies props/children
- `Fragment` — returns a `DocumentFragment`
- function components — the function is called with `props` and should return a DOM node or fragment

Example function component (JSX):

```tsx
function Greeting(props: { name: string }) {
  return <div>Hello, {props.name}!</div>
}

// Render
render(<Greeting name="Alice" />, document.getElementById('root'))
```

### Router

Twiggle provides a tiny router with `Routes`, `Route`, and `Link` helpers plus a `navigate` function.

Important note: `Route` in Twiggle accepts an `element` prop that is a function returning the rendered element. `Routes` collects the `Route` children and registers them via `setRoutes`.

Example:

```tsx
import { 
  Routes,
  Route,
  Link,
  navigate
} from 'twiggle'

function Home() { 
  return <div>Home</div> 
}
function About() { 
  return <div>About</div> 
}

// Register routes (JSX example inside an entry point)
<Routes>
  <Route to="/" element={() => <Home />} />
  <Route to="/about" element={() => <About />} />
</Routes>

// Use Links
<Link to="/about">About</Link>

// Programmatic navigation
navigate('/about')
```

Router internals:

- `navigate(to: string)` — updates history and renders the route.
- `setRoutes(routes)` — internal function called by `Routes` to set the routing table.
- `Routes(props)` — a helper component: it inspects `props.children`, maps `to` -> `element` and calls `setRoutes`.
- `Route({ to, element })` — returns a plain object used by `Routes`.
- `Link({ to, children })` — renders an `<a>` that prevents default and calls `navigate`.

### State

Twiggle's state system is intentionally tiny. It supports basic subscriptions via an effect stack.

- `createState<T>(initialValue)` — returns `{ get: () => T, set: (newValue: T) => void }`.
- `runSideEffect(fn: () => void)` — runs `fn` and tracks reads to `createState().get()` while executing. When a state used by a tracked effect is updated, the effect is re-run.

Example counter:

```tsx
import { createState, runSideEffect } from 'twiggle/state/state'

const counter = createState(0)

function Counter() {
  // an effect that depends on counter.get()
  runSideEffect(() => {
    const value = counter.get()
    // This effect will re-run whenever `counter.set` changes the value
    console.log('counter is now', value)
  })

  return (
    <div>
      <span>{counter.get()}</span>
      <button onclick={() => counter.set(counter.get() + 1)}>Increment</button>
    </div>
  )
}
```

Note: To update the UI when state changes, structure your components to re-run `runSideEffect` while reading `state.get()` so that the effect is subscribed.

---

## API Reference

From `packages/twiggle` exports (see `src/index.ts` which re-exports modules):

Renderer

- `createElement(type, props)` — internal JSX runtime entry. `type` may be a string tag, `'Fragment'`, or a function component. `props.children` may be strings, numbers, arrays, or other elements.
- `render(element, parent)` — mounts a DOM node or fragment to `parent` (clears `parent.innerHTML` and appends the element).

Router

- `navigate(to: string)` — push new history entry and render the route.
- `setRoutes(routes)` — set internal routing table (used by `Routes`).
- `Routes(props)` — JSX helper to collect `Route` children and register them.
- `Route({ to, element })` — returns an object with `to` and `element` keys (intended to be used as a child of `Routes`).
- `Link({ to, children })` — anchor element that uses `navigate` under the hood.

State

- `createState<T>(initial: T)` — returns `{ get: () => T, set: (newVal: T) => void }`.
- `runSideEffect(fn: () => void)` — runs and tracks the effect; re-runs when tracked state values change.

JSX Runtime

- The repository contains custom `jsx-runtime` and `jsx-dev-runtime` files configured to be used as an import source for JSX (see Vite plugin section below).

---

## Vite plugin

`packages/vite-plugin-twiggle` provides a plugin that transforms JS/TS/JSX/TSX files via Babel and sets the JSX runtime to use Twiggle's custom JSX source.

Typical usage in `vite.config.js`:

```js
import { defineConfig } from 'vite'
import twiggle from 'vite-plugin-twiggle'

export default defineConfig({
  plugins: [twiggle()]
})
```

The plugin configures Babel to use `@babel/preset-react` with `runtime: 'automatic'` and `importSource: 'twiggle/jsx'`. It also runs a small custom Babel plugin shipped in `packages/vite-plugin-twiggle/src/babel-plugin-twiggle-jsx.ts` for reactive expression transforms.

---

## Development notes

- Code is authored in TypeScript and uses Vite for development in the `packages/twiggle` package.
- Tests are configured with Vitest. Run `npm run test` in the package directory.
- The JSX runtime is intentionally small; if you change its shape, update the Vite plugin `importSource` accordingly.

Quality gates (when contributing):

- Build passes: `cd packages/twiggle && npm run build`
- Tests pass: `cd packages/twiggle && npm run test`
- Linting/typing: add TypeScript checks as needed (this project includes `tsconfig.json`).

---

## Contributing

Contributions are welcome. Please follow the repository's contribution guidelines:

1. Fork the repository and create a feature branch.
2. Keep changes small and focused; add tests for new behavior.
3. Open a PR with a clear description and motivation.

See `CONTRIBUTING.md` for more details.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file.

---

## Contact / Maintainers

Maintainer: Hrutav Modha

If you discover bugs or have feature requests, please open an issue in this repository.

---

Thank you for checking out Twiggle!