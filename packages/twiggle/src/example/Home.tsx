import { createState } from '../state/state';
import navigate from '../router/router';
export default function Home() {
    const count = createState(0)
    console.log(count.get())
    return (
        <>
            <h1>Hello World</h1>
            <button onclick={() => {
                navigate('/home')
            }}>
                Go Home
            </button>
            <br />
            <button onclick={() => {
                navigate('/about')
            }}>
                Go About
            </button>
            <br />
            <p>{count.get()}</p>
            <button onclick={() => {
                count.set(count.get() + 1)
            }}>
                Increase
            </button>
        </>
    )
}