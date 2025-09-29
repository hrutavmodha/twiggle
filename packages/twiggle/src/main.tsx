import render from './renderer/render'
import Home from './example/Home'
import App from './example/App'

App()
const rootElement = document.getElementById('root');
if (rootElement) {
    render(<Home />, rootElement);
} else {
    console.error('Root element with ID "root" not found in main.tsx.');
}