---
title: Reactivity
---

# Reactivity in Twiggle


Twiggle's reactivity is intentionally small and explicit. It centers on two primitives:

- createState(initial) -> `{ get, set }`
- runSideEffect(fn) -> unsubscribe

The design goals are: predictable updates, explicit reads (no hidden proxies), and cheap subscriptions.

## API Contract

- createState(initialValue)
  - Input: any serializable value (primitive or object).
  - Output: object with `get()` and `set(newValue)`.
  - Error modes: `set` should accept the same shape as the initial value; passing functions for functional updates is supported (see examples).

- runSideEffect(fn)
  - Input: a function which may call state `get` methods.
  - Output: a cleanup/unsubscribe function.
  - Behavior: the effect runs immediately; any state `get` calls during the run are recorded as dependencies. When any of those states change, the effect re-runs.

## Basic usage

```tsx
import { createState } from 'twiggle';

const counter = createState(0);

console.log(counter.get()); // 0
counter.set(1);
console.log(counter.get()); // 1
```

### Functional updates

`set` supports passing a function which receives the previous value — useful for updates that depend on the current state, and to avoid race conditions in async flows:

```tsx
const s = createState(0);
s.set(prev => prev + 1);
```

## How UI updates work

When you use `get()` inside a component's rendering function (JSX), the `vite-plugin-twiggle` transforms that read into a tracked read. At runtime the renderer subscribes the component to the state. On `set()`, Twiggle schedules a synchronous (microtask-sized) update for the affected components/effects and updates only the relevant parts of the DOM.

This model gives fine-grained updates without a global reconciliation pass.

## Computed and Derived State

Computed state in Twiggle is implemented with explicit derived state and side-effects. You can create a derived state and keep it in sync using `runSideEffect`:

```tsx
import { createState, runSideEffect } from 'twiggle';

const count = createState(0);
const double = createState(() => count.get() * 2); // lazy initializer

runSideEffect(() => {
  double.set(count.get() * 2);
});

count.set(2);
console.log(double.get()); // 4
```

Patterns for derived values:

- Lightweight derived: store a getter-only derived value and compute on access (cheap for simple cases).
- Cached derived: keep a cached derived `createState` and update it from `runSideEffect` when dependencies change (good when computation is expensive).

## runSideEffect details

`runSideEffect` is like a minimal effect hook

- It runs the provided function immediately.
- During the run any `get()` calls register a dependency between the effect and the state.
- When a dependency updates, the effect re-runs.
- The returned cleanup function can be used to unsubscribe.

```tsx
const unsub = runSideEffect(() => {
  console.log('value:', counter.get());
});

// later
unsub();
```

## Edge cases and best practices

- Avoid mutating objects stored in state directly. Instead, set a new object reference so subscribers detect the change.
- Use functional `set(prev => newVal)` when the new value depends on the previous value, particularly in async code or when multiple updates may be batched.
- Keep expensive computations outside render paths; use cached derived state when necessary.

## Examples

Debounced autosave (example using a simple timeout):

```tsx
import { createState, runSideEffect } from 'twiggle';

const text = createState('');

runSideEffect(() => {
  let timer: ReturnType<typeof setTimeout> | null = null;
  const value = text.get();
  timer = setTimeout(() => saveToServer(value), 300);
  return () => { if (timer) clearTimeout(timer); };
});
```

Multiple independent counters (showing local state per component):

```tsx
function Counter() {
  const { get, set } = createState(0);
  return (
    <div>
      <p>{get()}</p>
      <button onclick={() => set(prev => prev + 1)}>+</button>
    </div>
  );
}
```

## Implementation notes (for contributors)

- State objects are lightweight and keep a set of subscribers (effects/components) which are called when `set` updates the value.
- The plugin's compile-time transformation wraps `get()` calls so the renderer/effect runner can register dependencies during rendering or effect execution.

## Troubleshooting

- If your component doesn't update, ensure the `get()` call happens during the JSX render path (reads outside render won't be tracked automatically).
- If derived state doesn't update, verify that the `runSideEffect` function is created at module/component initialization and that it reads the dependent state using `get()`.