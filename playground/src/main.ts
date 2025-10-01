import {
  render,
  createElement
} from '../../packages/twiggle'

function App() {
  return createElement('div', {
    children: [
      createElement('h1', { children: 'Hello from Twiggle in Vite!' }),
      createElement('p', { children: 'This is a basic example using twiggle/client.' })
    ]
  });
}

render(createElement(App, {}), document.getElementById('app') as HTMLDivElement)