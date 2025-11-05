import { effects } from './effect'

export default function createState<T>(value: T): {
    get: () => T
    // eslint-disable-next-line
    set: (newValue: T) => void
} {
    const subscribers = new Set<() => void>()
    return {
        get: () => {
            const currentEffect = effects[effects.length - 1]
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
