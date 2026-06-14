import { describe, it, expect } from 'vitest'
import { render } from '../../src/renderer'
import { createState } from '../../src/state'
import createElement from '../../src/renderer/createElement'
import For from '../../src/renderer/For'

describe('For Component', () => {
    it('should render a list of items and reactively update it', () => {
        const parent = document.createElement('div')
        const listState = createState(['apple', 'banana'])

        const App = () =>
            createElement('div', {
                children: [
                    createElement(For, {
                        of: listState,
                        children: (item: string) => createElement('p', { children: item }),
                    }),
                ],
            })

        render(App(), parent)
        expect(parent.innerHTML).toBe(
            '<div><!--reactive-start--><p>apple</p><p>banana</p><!--reactive-end--></div>'
        )

        // Add an item
        listState.set(['apple', 'banana', 'cherry'])
        expect(parent.innerHTML).toBe(
            '<div><!--reactive-start--><p>apple</p><p>banana</p><p>cherry</p><!--reactive-end--></div>'
        )

        // Remove an item
        listState.set(['apple', 'cherry'])
        expect(parent.innerHTML).toBe(
            '<div><!--reactive-start--><p>apple</p><p>cherry</p><!--reactive-end--></div>'
        )
    })
})
