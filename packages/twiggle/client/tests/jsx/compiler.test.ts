import { describe, it, expect } from 'vitest'
import { transform } from '../../../../twiggle-plugin-core/src/index'

describe('Babel Compiler: For Component transformation', () => {
    it('should transform <For each={item} of={list}> syntax', () => {
        const input = `
            const App = () => (
                <For each={element} of={list}>
                    <p>{element}</p>
                </For>
            );
        `
        const result = transform(input, 'test.tsx')
        expect(result.code).toContain('For of={list}')
        expect(result.code).toContain('element =>')
    })
})
