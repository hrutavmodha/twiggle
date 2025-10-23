---
title: Introduction
---

## Introduction to Twiggle

Twiggle is a compact, reactive UI micro-framework focused on clarity, performance, and a tiny runtime surface. It provides a small set of primitives for building UI: a lightweight reactivity system, a JSX-friendly renderer, and a Vite plugin that compiles developer-friendly JSX into highly predictable runtime calls.

Why use Twiggle?

- Minimal mental overhead: a handful of functions (createState, runSideEffect, render) are all you need to start building reactive UI.
- Small runtime: no virtual DOM and no heavyweight scheduler — results in a small bundle and predictable updates.
- Compile-time assists: the `vite-plugin-twiggle` rewrites JSX to track state dependencies with minimal runtime cost.

### Key Principles

1.  **Direct DOM Manipulation** — Twiggle avoids a virtual DOM. Components produce DOM nodes and Twiggle updates only what changed. This reduces allocation and indirection in many common UI patterns.
2.  **Explicit, Intuitive Reactivity** — State is explicit: you call `get()` to read and `set()` to update. Because reads are explicit, Twiggle can track dependencies precisely at compile time and wire updates with minimal bookkeeping.
3.  **Low Magic, High Composability** — Components are plain functions; hooks-like complexity and opaque lifecycle states are avoided in favor of transparent, testable primitives.

### Who is this for?

- Authors who want a small, understandable runtime with explicit reactivity.
- Projects where bundle size and runtime predictability are important.
- Developers who like JSX and compile-time transformations (via Vite) but prefer more direct DOM control than a full virtual-DOM framework.

## Features

- Tiny reactive state primitives (createState, runSideEffect).
- JSX support via an official Vite plugin (`vite-plugin-twiggle`).
- Direct DOM rendering with a small renderer and simple lifecycle semantics.
- First-class support for derived/computed state and fine-grained subscriptions.

## Prerequisites

Make sure you have a recent Node.js (LTS recommended) and a package manager (npm, Yarn, or pnpm). Twiggle projects are typically built with Vite, so familiarity with Vite is helpful but not required.

## Quick Start

Create a new project scaffold using the official CLI:

```bash
npm create twiggle-app@latest my-twiggle-app
cd my-twiggle-app
npm install
npm run dev
```

Open http://localhost:5173 in your browser to see your app.

## Minimal Example

The following is a complete minimal app that demonstrates state, events, and rendering.

```tsx
// src/App.tsx
import { createState } from 'twiggle'

const { get: getCount, set: setCount } = createState(0)

export default function App() {
    return (
        <div>
            <h1>Twiggle Counter</h1>
            <p>Count: {getCount()}</p>
            <button onclick={() => setCount(getCount() + 1)}>Increment</button>
        </div>
    )
}

// src/main.tsx
import { render } from 'twiggle'
import App from './App'

render(<App />, document.getElementById('root'))
```

## Project Layout

When you scaffold a Twiggle app you’ll typically see:

```
my-twiggle-app/
├─ index.html       # app entry
├─ src/
│  ├─ main.tsx      # bootstraps the app
│  └─ App.tsx       # top-level component
├─ package.json
└─ vite.config.ts   # Vite + vite-plugin-twiggle
```

## Next Reading

Read the docs pages on Reactivity and Rendering & JSX to learn the mental model and practical patterns. If you are comparing frameworks, see the new Comparison page for a concise breakdown between Twiggle and other popular frameworks.
