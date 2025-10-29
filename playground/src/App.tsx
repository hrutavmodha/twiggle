import { createState } from 'twiggle/client'

export default function App() {
    const count = createState(0)

    const increment = () => {
        count.set(count.get() + 1)
    }

    return (
        <div class="container">
            <h1>Hello, Twiggle!</h1>
            <p>Count: {count.get()}</p>
            <button
                class="button"
                onclick={increment}
            >
                Increment
            </button>
            <p>
                Try editing the file at <code>src/App.tsx</code> to see changes!
            </p>
        </div>
    )
}
