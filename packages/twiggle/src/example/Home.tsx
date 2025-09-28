import navigate from '../router/router'

export default function Home() {
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
        </>
    )
}
