import { getCurrentEffect, registerCleanup } from './effect'

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
