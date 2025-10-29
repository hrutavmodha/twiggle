import { runSideEffect, createState } from 'twiggle/client'

export default function App() {
    const count = createState<number>(0)
    runSideEffect(() => {
        console.log('Hello World')
    })
    return (
        <div>
            <h1>Twiggle Counter App</h1>
            <button
                onclick={(event: Event) => {
                    event.preventDefault()
                    count.set(count.get() + 1)
                }}
            >
                Increment
            </button>
            <p>{count.get()}</p>
            <button
                onclick={(event: Event) => {
                    event.preventDefault()
                    count.set(count.get() - 1)
                }}
            >
                Decrement
            </button>
        </div>
    )
}
