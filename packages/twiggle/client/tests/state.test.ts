import { describe, it, expect } from 'vitest'
import createState, { cacheState } from '../src/state/state'

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

describe('cacheState', () => {
    it('should cache derived computations and reactively update', () => {
        const count = createState(2)
        const doubled = cacheState(() => count.get() * 2)

        expect(doubled.get()).toBe(4)

        count.set(5)
        expect(doubled.get()).toBe(10)
    })
})

