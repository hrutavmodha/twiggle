---
sidebar_label: 'Vite'
---

# Vite Integration

The `vite-plugin-twiggle` is the official Vite plugin to integrate Twiggle into your development environment. It handles JSX transformations and enables reactive expressions.

## Installation

1.  **Install the package:**

    ```bash
    npm install vite-plugin-twiggle
    # or
    yarn add vite-plugin-twiggle
    # or
    pnpm add vite-plugin-twiggle
    ```

2.  **Add to your Vite configuration:**

    Open your `vite.config.js` (or `vite.config.ts`) file and add the plugin:

    ```javascript
    // vite.config.js
    import { defineConfig } from 'vite'
    import twiggle from 'vite-plugin-twiggle'

    export default defineConfig({
        plugins: [
            twiggle(),
        ],
    })
    ```

## Usage

Once installed, the plugin works in the background. You can write Twiggle components using JSX, and the plugin will transform them.

**Example `App.tsx`:**

```tsx
import { createState } from 'twiggle'

function App() {
    const count = createState(0)

    const increment = () => {
        count.set(count.get() + 1)
    }

    return (
        <div>
            <h1>Hello, Twiggle!</h1>
            <p>Count: {count.get()}</p>
            <button onclick={increment}>Increment</button>
        </div>
    )
}

export default App
```
