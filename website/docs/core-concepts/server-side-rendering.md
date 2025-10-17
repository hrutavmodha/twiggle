---
title: Server-Side Rendering
---

# Server-Side Rendering

Twiggle has built-in support for server-side rendering (SSR), which can help improve your application's performance and SEO.

## Benefits of SSR

-   **Faster Initial Page Load**: With SSR, the server sends a fully rendered HTML page to the client. This means the user can see the content of the page much faster, as they don't have to wait for the JavaScript to download and execute.
-   **Improved SEO**: Search engine crawlers can easily read the content of a server-rendered page, which can lead to better search engine rankings.

## `renderToString`

To render a component to an HTML string on the server, you can use the `renderToString` function from the `twiggle/server` entry point. This function takes a component as an argument and returns an object with two properties:

- `html`: The HTML string representation of the component.
- `script`: A script tag that includes the event handlers for the component.

Here's an example of how to use `renderToString`:

```tsx
import { renderToString } from 'twiggle/server';
import App from './App';

const { html, script } = renderToString(<App />);

console.log(html);
console.log(script);
```

## How it Works

The `renderToString` function recursively traverses your component tree and generates an HTML string. It also keeps track of any event handlers that are attached to your components. These event handlers are then serialized into a script tag that you can include in your HTML page. When the page loads on the client, this script will attach the event handlers to the DOM elements, making your server-rendered page interactive.

This process is sometimes called "hydration", although in Twiggle's case, it's a bit simpler than in other frameworks because there is no virtual DOM to reconcile.

## Example Server

Here's an example of a simple Express server that uses `renderToString` to render a Twiggle application:

```tsx
import express from 'express';
import { renderToString } from 'twiggle/server';
import App from './App';

const app = express();

app.get('/', (req, res) => {
  const { html, script } = renderToString(<App />);

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Twiggle App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          ${script}
        </script>
      </body>
    </html>
  `);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
```

In this example, when a user visits the root of the site, the server will render the `App` component to an HTML string and send it to the client along with the necessary script to make the page interactive.