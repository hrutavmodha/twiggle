export default function shouldSkipUpdate(oldNodes: Node[], newNodes: Node[]): boolean {
    if (oldNodes.length !== newNodes.length) return false

    for (let i = 0; i < oldNodes.length; i++) {
        const oldNode = oldNodes[i]
        const newNode = newNodes[i]

        if (oldNode?.nodeType !== newNode?.nodeType) return false

        if (oldNode?.nodeType === Node.TEXT_NODE) {
            if (oldNode.textContent !== newNode?.textContent) return false
        } else {
            return false
        }
    }

    return true
}
