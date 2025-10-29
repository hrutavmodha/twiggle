import { render } from 'twiggle/client'
import App from './App'
import './styles.css'

const rootElement = document.getElementById('root') as HTMLDivElement

render(<App />, rootElement)
