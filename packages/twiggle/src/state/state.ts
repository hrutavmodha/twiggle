let state: Array<any> = []
let index: number = 0

export default function createState<T>(value: T): {
    get: () => T,
    set: (newValue: T) => void
} {
    const currentIndex = index
    if (state[currentIndex] == undefined) {
        state[currentIndex] = value
    }
    index++;
    return {
        get: () => {
            return state[currentIndex]
        },
        set: (newValue) => {
            state[currentIndex] = newValue
        }
    }
}