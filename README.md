# Framework

A simple and lightweight frontend framework for building web applications.

## Features

- **JSX Support:** Write your components using JSX syntax.
- **Routing:** A simple and powerful router to handle client-side routing.
- **State Management:** A basic state management system to manage your application's state.
- **Lightweight:** The framework is very lightweight and has a small footprint.

## Getting Started

To get started with the framework, you can use the example application as a starting point.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 18.x or higher)
- [npm](https://www.npmjs.com/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/hrutavmodha/framework.git
```

2. Install the dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

This will start the development server and open the example application in your browser.

## Building

To build the application, you can use the following command:

```bash
npm run build
```

This will build the application and create a `dist` directory with the bundled files.

## Usage

### Components

Components are the building blocks of your application. You can create a component by creating a function that returns a JSX element.

```tsx
function MyComponent() {
  return <h1>Hello, World!</h1>;
}
```

### Routing

The framework provides a simple and powerful router to handle client-side routing. You can define your routes in your main application component.

```tsx
import { Route, Routes } from 'framework';
import Home from './pages/Home';
import About from './pages/About';

function App() {
  return (
    <Routes>
      <Route to="/" element={<Home />} />
      <Route to="/about" element={<About />} />
    </Routes>
  );
}
```

You can use the `Link` component to navigate between routes.

```tsx
import { Link } from 'framework';

function MyComponent() {
  return <Link to="/about">About</Link>;
}
```

You can also navigate programmatically using the `navigate` function.

```tsx
import { navigate } from 'framework';

function MyComponent() {
  return <button onclick={() => navigate("/about")}>About</button>;
}
```

### State Management

The framework provides a basic state management system to manage your application's state. You can create a state object using the `createState` function.

```tsx
import { createState } from 'framework';

const counter = createState(0);

function MyComponent() {
  return (
    <div>
      <h1>{counter.get()}</h1>
      <button onclick={() => counter.set(counter.get() + 1)}>Increment</button>
    </div>
  );
}
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have any ideas or suggestions.