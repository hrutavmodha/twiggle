// @ts-ignore
import { render } from 'twiggle/client'
// @ts-ignore
import { jsx } from 'twiggle/client'

function App() {
    return jsx(
        'h1', {
        children: 'Hello from Twiggle!'
    })
}

render(App(), document.getElementById('root'))