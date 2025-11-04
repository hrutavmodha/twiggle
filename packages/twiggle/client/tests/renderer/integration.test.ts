import { describe, it, expect } from 'vitest'
import { render } from '../../src/renderer'
import { createState } from '../../src/state'
import createElement from '../../src/renderer/createElement'

describe('Integration Test: Expression Evaluation', () => {
    it('should render a simple reactive expression and update it automatically', () => {
        const parent = document.createElement('div')
        const myState = createState({ value: 'initial' })
        // @ts-expect-error - createElement children can be a function
        const App = () => createElement('div', { children: () => myState.get().value })
        render(App(), parent)
        expect(parent.innerHTML).toBe('<div>initial</div>')
        myState.set({ value: 'updated' })
        expect(parent.innerHTML).toBe('<div>updated</div>')
    })

    it('should render a complex reactive expression and update it automatically', () => {
        const parent = document.createElement('div')
        const myState = createState({ value: 'initial' })
        const App = () => {
            return createElement('div', {
                children: ['Prefix: ', () => myState.get().value, ' Suffix'],
            })
        }
        render(App(), parent)
        expect(parent.innerHTML).toBe('<div>Prefix: initial Suffix</div>')
        myState.set({ value: 'updated' })
        expect(parent.innerHTML).toBe('<div>Prefix: updated Suffix</div>')
    })

    it('should render a static array using .map()', () => {
        const parent = document.createElement('div')
        const items = ['one', 'two', 'three']
        const App = () =>
            createElement('ul', {
                children: items.map((item) => createElement('li', { key: item, children: item })),
            })
        render(App(), parent)
        expect(parent.innerHTML).toBe('<ul><li>one</li><li>two</li><li>three</li></ul>')
    })

    it('should render a reactive array and update it', () => {
        const parent = document.createElement('div')
        const listState = createState(['one', 'two'])

        const App = () =>
            createElement('ul', {
                children: listState.get().map((item) => createElement('li', { children: item })),
            })

        render(App(), parent)

        // Initial render
        expect(parent.innerHTML).toBe('<ul><li>one</li><li>two</li></ul>')

        // Update state using spread operator
        listState.set(['one', 'three'])
        console.log(listState.get())
        // Assert that the DOM is updated automatically
        expect(parent.innerHTML).toBe('<ul><li>one</li><li>three</li></ul>')
    })
})
