import navigate from '../router/router';

export default function About() {
    return (
        <>
            <h1>About Page</h1>
            <p>This is the about page.</p>
            <button onclick={() => {
                navigate('/');
            }}>
                Go to Home
            </button>
        </>
    );
}