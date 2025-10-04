import { render } from 'twiggle/client';
import App from './App';

const rootElement = document.getElementById('root') as HTMLDivElement;

render(<App />, rootElement);
