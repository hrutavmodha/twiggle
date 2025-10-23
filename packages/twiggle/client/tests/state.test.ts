import { describe, it, expect } from 'vitest'
import { createState } from '../src/state/state'

describe('createState', () => {
    it('should create a state with an initial value', () => {
        const state = createState(0)
        expect(state.get()).toBe(0)
    })
    it('should update the state when set is called', () => {
        const state = createState(0)
        state.set(1)
        expect(state.get()).toBe(1)
    })
})
