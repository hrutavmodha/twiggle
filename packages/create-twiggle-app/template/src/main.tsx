import { render } from 'twiggle'
import App from './App';

const rootElement = document.getElementById('root') as HTMLDivElement;

render(<App />, rootElement);
