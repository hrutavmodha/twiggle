---
title: Comparison
---


# Comparing Twiggle to Other Frontend Frameworks

This page gives a concise, practical comparison between Twiggle and several widely-used frontend frameworks: React, Vue, Svelte, Solid, and Preact. It focuses on mental model, reactivity style, runtime characteristics, typical use-cases, and migration considerations.

Below each framework heading you’ll find a focused comparison that covers:

- A short summary of the other framework
- How Twiggle differs in mental model and reactivity
- Typical use-cases where that framework shines
- Practical migration notes and mapping to Twiggle primitives

---

## Twiggle vs React

React summary

- React uses a component-based mental model with Hooks for local state and lifecycle. It renders components into a virtual DOM and uses a diffing/reconciliation process to patch the real DOM.

How Twiggle differs

- Twiggle uses explicit state reads (`get()`/`set()`) and avoids a virtual DOM. Dependency tracking is performed at compile time by the Vite plugin and updates are applied directly to the DOM.
- React's hooks and component lifecycle map conceptually to Twiggle's `createState` and `runSideEffect`, but React provides many built-in conventions (Context, Suspense, Error Boundaries) and a larger runtime ecosystem.

When to choose React

- Large teams and projects that need ecosystem, stable patterns, and many existing libraries.

Migration notes

- Small presentational components (JSX, props) port easily.
- Replace useState/useReducer with `createState` and useEffect with `runSideEffect` for side effects. For context-like needs, implement a small shared store using `createState`.

---

## Twiggle vs Vue

Vue summary

- Vue uses templates (Single File Components) and a reactivity system based on proxies. Vue tracks property access implicitly and performs efficient patching.

How Twiggle differs

- Twiggle is explicit: you call `get()` to read state. Vue's proxy-based reactivity makes reads implicit which can be convenient but sometimes surprising.

When to choose Vue

- Teams that prefer template-driven authoring, SFCs, and a more opinionated framework with built-in features (router, CLI, devtools).

Migration notes

- Porting templates requires translating implicit reactive variable access into explicit `get()` calls or wrapper helpers in Twiggle.
- Vue's refs can be mapped to `createState` in Twiggle; lifecycle hooks translate to `runSideEffect` patterns.

---

## Twiggle vs Svelte

Svelte summary

- Svelte is a compiler-first framework that compiles components into minimal imperative DOM-updating code. Its reactivity is expressed as assignments that the compiler tracks.

How Twiggle differs

- Both avoid a virtual DOM, but Svelte aims to remove most runtime cost by shifting work to compile-time entirely. Twiggle keeps a tiny runtime and exposes explicit state primitives.

When to choose Svelte

- When you want extremely small bundles and very efficient component-local code without needing a runtime library.

Migration notes

- Svelte `$:` reactive statements map to derived state patterns in Twiggle — usually `createState` + `runSideEffect` or getter-only derived values.

---

## Twiggle vs Solid

Solid summary

- Solid provides fine-grained reactivity with JSX and compiles tracked reads to efficient runtime subscriptions. It's one of the closest frameworks to Twiggle conceptually.

How Twiggle differs

- Solid offers a slightly richer set of primitives (createSignal, createEffect, createMemo) and a more mature ecosystem. Twiggle focuses on a smaller surface area and intentionally explicit APIs.

When to choose Solid

- If you want JSX-first fine-grained reactivity with highly optimized runtime and a growing ecosystem.

Migration notes

- Mapping is straightforward: Solid's `createSignal` ≈ Twiggle's `createState`, `createEffect` ≈ `runSideEffect`. Advanced helpers (memos, split) will need small equivalents or libraries.

---

## Twiggle vs Preact

Preact summary

- Preact is a lightweight React-compatible library that uses a virtual DOM like React but with a much smaller runtime.

How Twiggle differs

- Preact keeps the React mental model and ecosystem compatibility; Twiggle trades that for a tiny, explicit runtime and a different reactivity model.

When to choose Preact

- When you want React compatibility but need a smaller runtime.

Migration notes

- Converting React code to Twiggle follows the same guidance as React migration: map state/effects to `createState`/`runSideEffect` and port JSX components; libraries may need replacements.

---

## Practical guidance

- When to use Twiggle

	- Small-to-medium apps where predictable, low-overhead updates and small bundle size matter.
	- Projects that benefit from an explicit, easy-to-reason-about reactivity model.

- When not to choose Twiggle

	- Large teams that rely heavily on a mature ecosystem and many off-the-shelf UI libraries.
	- Projects that need advanced framework features out of the box (opinionated SSR workflows, Suspense-like data loading primitives, etc.).

## Quick Migration Checklist

1. Port presentational components (JSX + props) first — these are usually straightforward.
2. Replace local state: map useState/useReducer/ref to `createState`.
3. Replace effects: map useEffect/created hooks to `runSideEffect`.
4. Replace derived values: use `runSideEffect` to keep cached derived `createState` values in sync, or create getter-only derived helpers.
5. Gradually add routing/SSR and any ecosystem pieces — don't try to migrate everything at once.

---

If you'd like, I can add a printable cheat-sheet or a migration checklist that maps common React/Vue/Svelte idioms to Twiggle equivalents.
