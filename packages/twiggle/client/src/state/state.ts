import runSideEffect, { getCurrentEffect, registerCleanup } from './effect'

let isBatching = false
const pendingUpdates = new Set<() => void>()

export function batchUpdates(fn: () => void): void {
    if (isBatching) {
        fn()
        return
    }
    isBatching = true
    try {
        fn()
    } finally {
        isBatching = false
        const updates = Array.from(pendingUpdates)
        pendingUpdates.clear()
        updates.forEach((update) => update())
    }
}

export default function createState<T>(initialValue: T): {
    get: () => T
    // eslint-disable-next-line
    set: (newValue: T | ((prev: T) => T)) => void
} {
    let value = initialValue
    const subscribers = new Set<() => void>()
    return {
        get: () => {
            const currentEffect = getCurrentEffect()
            if (currentEffect && !subscribers.has(currentEffect)) {
                subscribers.add(currentEffect)
                registerCleanup(() => {
                    subscribers.delete(currentEffect)
                })
            }
            return value
        },
        // eslint-disable-next-line
        set: (newValue: T | ((prev: T) => T)) => {
            const nextValue =
                // eslint-disable-next-line
                typeof newValue === 'function' ? (newValue as (prev: T) => T)(value) : newValue
            if (Object.is(value, nextValue)) {
                return
            }
            value = nextValue
            const subs = Array.from(subscribers)
            if (isBatching) {
                subs.forEach((sub) => pendingUpdates.add(sub))
            } else {
                subs.forEach((sub) => sub())
            }
        },
    }
}

/**
 * Creates a read-only cached state that automatically re-evaluates
 * when its underlying reactive dependencies update.
 *
 * @param fn - The computation function to cache.
 * @returns An object containing a reactive `get()` method.
 */
export function cacheState<T>(fn: () => T): { get: () => T } {
    let memoizedValue: T
    const subscribers = new Set<() => void>()

    runSideEffect(() => {
        memoizedValue = fn()
        const subs = Array.from(subscribers)
        subs.forEach((sub) => sub())
    })

    return {
        get: () => {
            const currentEffect = getCurrentEffect()
            if (currentEffect && !subscribers.has(currentEffect)) {
                subscribers.add(currentEffect)
                registerCleanup(() => {
                    subscribers.delete(currentEffect)
                })
            }
            return memoizedValue
        },
    }
}

