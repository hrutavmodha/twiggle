import navigate from '../router/router';

export default function Service() {
    return (
        <>
            <h1>Service Page</h1>
            <p>This is the service page.</p>
            <button onclick={() => {
                navigate('/');
            }}>
                Go to Home
            </button>
        </>
    );
}