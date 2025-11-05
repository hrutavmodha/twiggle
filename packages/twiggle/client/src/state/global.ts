import createState from './state'

export default function createGlobalState<T>(initialValue: T): {
    get: () => T
    // eslint-disable-next-line
    set: (newValue: T) => void
} {
    const state = createState(initialValue)
    return {
        get: state.get,
        set: state.set,
    }
}
