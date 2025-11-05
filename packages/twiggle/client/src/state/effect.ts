const effects: Array<() => void> = []

export default function runSideEffect(fn: () => void) {
    effects.push(fn)
    fn()
    effects.pop()
}

export { effects }
