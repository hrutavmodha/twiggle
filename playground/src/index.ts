import { render } from '../../packages/twiggle'
import App from './App'

const root = document.getElementById('root') as HTMLDivElement
render(App(), root)