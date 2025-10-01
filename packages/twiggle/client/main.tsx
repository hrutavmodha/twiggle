import render from './src/renderer/render'
import Home from './src/example/Home'
import App from './src/example/App'

<App /> // For rendering routes properly
const root = document.getElementById('root') as HTMLDivElement
render(<Home />, root)