---
sidebar_label: 'Getting Started'
---

# Getting Started

`create-twiggle-app` is the official CLI tool to bootstrap a new Twiggle project. It automates the setup of your development environment, including project structure, build configurations, and dependencies.

## Create a New Project

To create a new Twiggle project, run one of the following commands in your terminal:

**Using `npm`:**

```bash
npx create-twiggle-app my-twiggle-app
```

**Using `Yarn`:**

```bash
yarn create twiggle-app my-twiggle-app
```

**Using `pnpm`:**

```bash
pnpm create twiggle-app my-twiggle-app
```

Replace `my-twiggle-app` with your project name.

## Start the Development Server

Once the project is created, navigate into the project directory and start the development server:

```bash
cd my-twiggle-app
npm run dev
```

Your Twiggle application will be running at `http://localhost:5173`.

## Live Code Example

Here's a simple Twiggle counter component:

```tsx livecodes
/** @jsxImportSource twiggle/client */
import { createState, render } from 'twiggle/client'

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
