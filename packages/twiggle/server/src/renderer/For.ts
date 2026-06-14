export default function For(props: {
    of: any
    children: (item: any, index: number) => any
}): any[] {
    const rawOf = props.of
    const list =
        typeof rawOf === 'function'
            ? rawOf()
            : rawOf && typeof rawOf.get === 'function'
              ? rawOf.get()
              : rawOf

    if (!Array.isArray(list)) {
        return []
    }

    return list.map((item, index) => props.children(item, index))
}
