import { describe, it, expect } from 'vitest'
import { hydrate } from '../../src/renderer'
import { createState } from '../../src/state'
import createElement from '../../src/renderer/createElement'

describe('Client Hydration', () => {
    it('should hydrate server-rendered elements and attach event listeners', () => {
        const container = document.createElement('div')
        container.innerHTML = `
            <div id="app">
                <button>Click me</button>
            </div>
        `
        document.body.appendChild(container)

        const clickState = createState(0)
        const onClick = () => clickState.set(clickState.get() + 1)

        const App = () =>
            createElement('div', {
                id: 'app',
                children: [
                    createElement('button', {
                        onclick: onClick,
                        children: 'Click me',
                    }),
                ],
            })

        // Run hydrate
        hydrate(() => App(), container)

        const buttonAfter = container.querySelector('button')!

        expect(buttonAfter.tagName).toBe('BUTTON')
        expect(buttonAfter.textContent).toBe('Click me')

        buttonAfter.click()
        expect(clickState.get()).toBe(1)

        document.body.removeChild(container)
    })

    it('should hydrate server-rendered reactive child in-place', () => {
        const container = document.createElement('div')
        container.innerHTML = `
            <div id="app">Prefix: <!--reactive-start-->initial<!--reactive-end--> Suffix</div>
        `
        document.body.appendChild(container)

        const textState = createState('initial')

        const App = () =>
            createElement('div', {
                id: 'app',
                children: ['Prefix: ', () => textState.get(), ' Suffix'],
            })

        // Run hydrate
        hydrate(() => App(), container)

        const appDiv = container.querySelector('#app')!
        expect(appDiv.innerHTML).toBe('Prefix: <!--reactive-start-->initial<!--reactive-end--> Suffix')

        textState.set('updated')
        expect(appDiv.innerHTML).toBe('Prefix: <!--reactive-start-->updated<!--reactive-end--> Suffix')

        document.body.removeChild(container)
    })
})
