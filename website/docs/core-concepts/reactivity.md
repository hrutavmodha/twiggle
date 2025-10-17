---
title: Reactivity
---

# Reactivity in Twiggle

Twiggle provides a simple yet powerful reactivity model that allows you to build dynamic user interfaces with ease. At the heart of this model is the `createState` function.

## `createState`

The `createState` function takes an initial value and returns an object with two methods: `get` and `set`.

- `get()`: Returns the current value of the state.
- `set(newValue)`: Updates the value of the state.

Here's an example of how to use `createState`:

```tsx
import { createState } from 'twiggle';

const count = createState(0);

console.log(count.get()); // 0

count.set(1);

console.log(count.get()); // 1
```

## Automatic UI Updates

What makes `createState` powerful is that it automatically updates your UI whenever the state changes. When you use the `get` method within a component's JSX, Twiggle automatically subscribes that component to the state. When you then use the `set` method to update the state, Twiggle will automatically re-render the component with the new value.

This is made possible by the `vite-plugin-twiggle`, which transforms your JSX code at build time to wrap any state `get` calls in a function. This allows Twiggle to track which components depend on which state.

Here's an example of a reactive component:

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

In this example, whenever the `increment` function is called and `count.set()` is executed, the component will automatically re-render to display the new count.

## Destructuring `get` and `set`

For convenience, you can destructure the `get` and `set` functions from the object returned by `createState`:

```tsx
import { createState } from 'twiggle';

const { 
  get: getCount, 
  set: setCount 
} = createState(0);

function Counter() {
  const increment = () => {
    setCount(getCount() + 1);
  };

  return (
    <div>
      <p>Count: {getCount()}</p>
      <button onclick={increment}>Increment</button>
    </div>
  );
}
```

This can be useful for improving the readability of your code, especially when you are working with multiple state variables.

**Note:** You must rename the `get` and `set` properties when you destructure them if you want to use a different name. The `createState` function returns an object with properties literally named `get` and `set`. If you have multiple state variables, you will need to give their `get` and `set` functions unique names to avoid conflicts.

For example, this would cause a conflict:

```javascript
const { get, set } = createState(0); // get and set for count
const { get, set } = createState('hello'); // Error: get and set are already defined
```

This is why renaming is important:

```javascript
const { 
  get: getCount, 
  set: setCount 
} = createState(0);

const { 
  get: getText, 
  set: setText 
} = createState('hello');
```

## Computed State

You can also create state that depends on other state. This is often called "computed" or "derived" state. In Twiggle, you can create computed state by using the `get` method of one state within the `createState` call of another.

```tsx
import { createState, runSideEffect } from 'twiggle';

const count = createState(0);
const double = createState(count.get() * 2);

runSideEffect(() => {
  double.set(count.get() * 2);
});

console.log(double.get()); // 0

count.set(2);

console.log(double.get()); // 4
```

In this example, the `double` state will automatically update whenever the `count` state changes.

## `runSideEffect`

For more complex scenarios where you need to manually run a function whenever a state changes, you can use the `runSideEffect` function. This function takes a function as an argument and runs it immediately. If you call any state `get` methods inside this function, Twiggle will subscribe the function to those states. Whenever any of those states change, Twiggle will re-run your function.

```tsx
import { createState, runSideEffect } from 'twiggle';

const count = createState(0);

runSideEffect(() => {
  console.log('The count is:', count.get());
});

count.set(1); // This will log "The count is: 1"
count.set(2); // This will log "The count is: 2"
```

This is useful for things like logging, making API requests, or updating the DOM in ways that are not directly related to a component's rendering.