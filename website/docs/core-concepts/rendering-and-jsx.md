---
title: Rendering and JSX
---

## Rendering and JSX

Twiggle uses JSX as the developer-facing syntax for describing UI. Unlike React, Twiggle compiles JSX into direct DOM-producing calls and uses a small, dependency-tracking runtime to update the DOM in place.

### How JSX is transformed

During build time the `vite-plugin-twiggle` runs a transform which:

- Rewrites JSX into `createElement`/runtime calls compatible with Twiggle's renderer.
- Wraps `state.get()` reads inside tracked accessors so the runtime knows which components depend on which state.

This means runtime bookkeeping is minimal — dependency graphs are primarily discovered at compile time and wired to lightweight subscriber lists.

### Components

A component is a plain function that returns a JSX element. There are no special lifecycle hooks; the lifecycle is the simple sequence of mount -> update -> unmount.

Mount: the returned DOM nodes are created and attached to the parent.

Update: when a dependency used during the render changes, Twiggle re-runs the function and patches only mutated parts of the DOM.

Unmount: when a component is removed from the tree (for example a parent conditionally renders it away), Twiggle calls any cleanup returned by `runSideEffect` and detaches DOM nodes.

### Example: props and composition

```tsx
function Greeting({ name }: { name: string }) {
    return <h1>Hello, {name}!</h1>
}

function App() {
    return (
        <div>
            <Greeting name="Twiggle" />
            <Greeting name="World" />
        </div>
    )
}
```

### Event handling

Twiggle maps event handler props (`onclick`, `oninput`, etc.) to DOM event listeners. Provide a function and it will be attached to the element.

```tsx
import { createState } from 'twiggle'

function Counter() {
    const { get, set } = createState(0)
    return (
        <div>
            <p>Count: {get()}</p>
            <button onclick={() => set(get() + 1)}>Increment</button>
        </div>
    )
}
```

### Attributes, properties and special cases

- `class` / `className` — you **cannot** use `className` to set element classes; `class` is accepted in the JSX transform.
- Boolean attributes (disabled, checked) are set as properties when the value is true.
- For value inputs, prefer using `oninput` and `value` props together for controlled inputs.

### Conditional rendering

Any JavaScript expression that returns `null`, `undefined`, `false`, or an empty string will render as nothing. Use ternaries or short-circuiting to control presence.

```tsx
const loggedIn = createState(false)

function App() {
    return <div>{loggedIn.get() ? <p>Welcome back!</p> : <p>Please log in.</p>}</div>
}
```

### Lists and keys

Rendering list:

```tsx
function ItemList({ items }: { items: string[] }) {
    return (
        <ul>
            {items.map((item: any) => {
                return <li>{item}</li>
            })}
        </ul>
    )
}
```

### Optimizations and patterns

- Keep renders fast: don't perform expensive computations directly inside render — use derived state or memoization.
- Limit deep object mutation: prefer replacing object references when state changes so subscribers see the update.
- Event delegation: the renderer attaches handlers directly to elements. For very large lists consider manual event delegation if you see performance costs from many listeners.

### Interop notes

Twiggle's runtime is small and designed to interoperate with other libraries. When embedding third-party components that manipulate the DOM, ensure you coordinate mounting/unmounting and side-effects via `runSideEffect` so resources are cleaned up correctly.
