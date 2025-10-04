import { createState } from 'twiggle/client';

function App() {
  const count = createState(0);

  const increment = () => {
    count.set(count.get() + 1);
  };

  return (
    <div>
      <h1>Hello, Twiggle!</h1>
      <p>Count: {count.get()}</p>
      <button onclick={increment}>Increment</button>
    </div>
  );
}

export default App;
