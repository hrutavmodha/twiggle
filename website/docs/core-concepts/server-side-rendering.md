---
title: Server-Side Rendering
---

# Server-Side Rendering in Twiggle

Twiggle provides first-class support for server-side rendering (SSR), allowing you to generate HTML on the server for fast initial loads and improved SEO. SSR in Twiggle is designed to be simple, efficient, and easy to integrate with Node.js servers like Express.

## Why SSR?

- **Faster Initial Page Load**: The server sends a fully rendered HTML page, so users see meaningful content immediately, even before JavaScript loads.
- **Improved SEO**: Search engines can index your content more reliably when it's present in the initial HTML.
- **Predictable hydration**: Twiggle's SSR model is straightforward—there's no virtual DOM diffing, so hydration is fast and predictable.

## SSR API Overview

Twiggle exposes two main SSR functions from `twiggle/server`:

- `renderToString(element)` — renders a component tree to a complete HTML string and returns `{ html, script }`.
- `renderToStream(element)` — renders a component tree to a Node.js stream for efficient streaming responses; returns `{ stream, script }`.

Both functions serialize event handlers and state so the client can attach interactivity after the initial HTML is loaded.

### `renderToString`

Use this for simple SSR setups or when you want the entire HTML in memory before sending the response.

**Signature:**

```ts
function renderToString(element: JSX.Element): { html: string, script: string }
```

### `renderToStream`

Use this for large pages or when you want to start sending HTML to the client before the whole tree is rendered (for example, with HTTP chunked responses).

**Signature:**

```ts
function renderToStream(element: JSX.Element): { stream: NodeJS.ReadableStream, script: string }
```

## How SSR Works in Twiggle

Twiggle's SSR engine recursively walks your component tree, rendering each node to HTML. It tracks event handlers and state dependencies, serializing them into a `<script>` tag. When the page loads, this script attaches the correct event listeners and restores interactivity—this is sometimes called "hydration", but in Twiggle it's simpler because there's no virtual DOM reconciliation.

### What gets serialized?

- The HTML markup for your component tree
- Event handlers (onclick, oninput, etc.)
- State values needed for initial render

## Example Components

Here's a simple interactive counter component:

```tsx
import { createState } from 'twiggle';

export function Counter() {
  const { get, set } = createState(0);
  return (
    <div>
      <h2>Counter Example</h2>
      <p>Count: {get()}</p>
      <button onclick={() => set(get() + 1)}>Increment</button>
    </div>
  );
}

export function App() {
  return (
    <main>
      <h1>Welcome to Twiggle SSR</h1>
      <Counter />
    </main>
  );
}
```

## Using `renderToString` in Express

Here's a basic Express server that uses `renderToString` to serve SSR HTML:

```tsx
import express from 'express';
import { renderToString } from 'twiggle/server';
import { App } from './App';

const app = express();

app.get('/', (req, res) => {
  const { html, script } = renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Twiggle SSR Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>${script}</script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

## Using `renderToStream` in Express

For large pages or streaming SSR, use `renderToStream`:

```tsx
import express from 'express';
import { renderToStream } from 'twiggle/server';
import { App } from './App';

const app = express();

app.get('/', (req, res) => {
  const { stream, script } = renderToStream(<App />);
  res.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Twiggle SSR Streaming Example</title>
      </head>
      <body>
        <div id="root">
  `);
  stream.pipe(res, { 
    end: false 
  });
  stream.on('end', () => {
    res.write(`</div><script>${script}</script></body></html>`);
    res.end();
  });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

## SSR Best Practices

- Use SSR for public-facing pages where SEO and fast initial load matter.
- For interactive widgets, ensure event handlers are attached via the serialized script.
- Use `renderToStream` for large or dynamic pages to reduce time-to-first-byte.
- Always test hydration: verify that interactive elements work after the initial HTML loads.

---

Twiggle's SSR is designed to be simple and predictable. If you need advanced SSR features (data prefetching, streaming, partial hydration), you can build on top of these primitives or integrate with your own server logic.