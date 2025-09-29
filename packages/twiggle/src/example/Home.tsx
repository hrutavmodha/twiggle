import { createState } from '../state/state';
import navigate from '../router/router';

const count = createState(0);

export default function Home() {
    return (
        <>
            <h1>Home Page</h1>
            <p>Count: {() => count.get()}</p>
            <button onclick={() => {
                count.set(count.get() + 1);
            }}>
                Increase Count
            </button>
            <br />
            <button onclick={() => {
                navigate('/about');
            }}>
                Go to About
            </button>
            <br />
            <button onclick={() => {
                navigate('/home');
            }}>
                Go to Service
            </button>
        </>
    );
}