---
title: Rendering and JSX
---

# Rendering and JSX

Twiggle uses JSX to define the structure of your UI. If you've used React, you'll feel right at home. However, Twiggle's approach to rendering is different from React's. Twiggle does not use a virtual DOM. Instead, it directly manipulates the DOM, which can be more efficient in many cases.

## JSX

JSX is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files. Here's an example of a simple Twiggle component using JSX:

```tsx
function Greeting({ name }) {
  return <h1>Hello, {name}!</h1>;
}
```

When you build your application, the `vite-plugin-twiggle` transpiles this JSX into JavaScript function calls that Twiggle can understand.

## Components and Props

Components are the building blocks of your UI. In Twiggle, a component is just a JavaScript function that returns a JSX element. You can compose components to create complex UIs.

You can pass data to components using "props". Props are passed as attributes in the JSX, and they are received as an object in the component function.

```tsx
function App() {
  return (
    <div>
      <Greeting name="Twiggle" />
      <Greeting name="World" />
    </div>
  );
}
```

## Event Handling

You can handle DOM events like `onclick`, `onchange`, and `onsubmit` by passing a function to the corresponding prop.

```tsx
import { createState } from 'twiggle';

function Counter() {
  const count = createState(0);

  const increment = () => {
    count.set(count.get() + 1);
  };

  return (
    <div>
      <p>Count: {count.get()}</p>
      <button onclick={increment}>Increment</button>
    </div>
  );
}
```

## Conditional Rendering

You can use standard JavaScript `if` statements, ternary operators, or logical AND (`&&`) to conditionally render parts of your UI.

```tsx
import { createState } from 'twiggle';

function App() {
  const loggedIn = createState(false);

  return (
    <div>
      {loggedIn.get() ? <p>Welcome back!</p> : <p>Please log in.</p>}
    </div>
  );
}
```

## Rendering Lists

To render a list of items, you can use the `map` function to iterate over an array and return a JSX element for each item.

```tsx
const items = ['Apple', 'Banana', 'Cherry'];

function ItemList() {
  return (
    <ul>
      {items.map(item => <li>{item}</li>)}
    </ul>
  );
}
```