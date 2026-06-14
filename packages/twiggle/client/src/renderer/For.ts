import { cleanupElement } from '../optimizations/cleanups'

export default function For(props: {
    of: any
    children: (item: any, index: number) => any
}): () => any[] {
    const cache = new Map<any, any>()

    return () => {
        const rawOf = props.of
        const list = typeof rawOf === 'function'
            ? rawOf()
            : (rawOf && typeof rawOf.get === 'function' ? rawOf.get() : rawOf)

        if (!Array.isArray(list)) {
            return []
        }

        const renderedNodes = list.map((item, index) => {
            if (cache.has(item)) {
                return cache.get(item)
            }
            const node = props.children(item, index)
            cache.set(item, node)
            return node
        })

        // Clean up unused items from the cache
        const listSet = new Set(list)
        for (const cachedItem of cache.keys()) {
            if (!listSet.has(cachedItem)) {
                const node = cache.get(cachedItem)
                if (node instanceof Node) {
                    cleanupElement(node)
                }
                cache.delete(cachedItem)
            }
        }

        return renderedNodes
    }
}
