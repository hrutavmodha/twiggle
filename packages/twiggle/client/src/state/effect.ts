const effects: Array<() => void> = []
const cleanupCallbacks: Array<Array<() => void>> = []

export default function runSideEffect(fn: () => void): () => void {
    const cleanups: Array<() => void> = []

    effects.push(fn)
    cleanupCallbacks.push(cleanups)
    fn()

    effects.pop()
    cleanupCallbacks.pop()
    return () => {
        cleanups.forEach((cleanup) => cleanup())
    }
}

export function getCurrentEffect(): (() => void) | undefined {
    return effects[effects.length - 1]
}

export function registerCleanup(cleanup: () => void): void {
    const currentCleanups = cleanupCallbacks[cleanupCallbacks.length - 1]
    if (currentCleanups) {
        currentCleanups.push(cleanup)
    }
}

export { effects }
