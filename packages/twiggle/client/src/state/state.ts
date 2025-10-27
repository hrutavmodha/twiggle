const context: Array<() => void> = []

export function runSideEffect(fn: () => void) {
    context.push(fn)
    fn()
    context.pop()
}

export function createState<T>(value: T): {
    get: () => T
    // eslint-disable-next-line
    set: (newValue: T) => void
} {
    const subscribers = new Set<() => void>()
    return {
        get: () => {
            const currentEffect = context[context.length - 1]
            if (currentEffect) {
                subscribers.add(currentEffect)
            }
            return value
        },
        set: (newValue: T) => {
            value = newValue
            for (const sub of subscribers) {
                sub()
            }
        },
    }
}
