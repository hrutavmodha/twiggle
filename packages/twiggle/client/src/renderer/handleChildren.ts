import runSideEffect from '../state/effect'

export default function handleChildren(element: HTMLElement, children: any): void {
    const renderChild = (child: any): Node => {
        if (typeof child === 'string' || typeof child === 'number') {
            return document.createTextNode(String(child));
        }
        if (child instanceof Node) {
            return child;
        }
        // Handle cases where child might be null/undefined after map
        return document.createComment('empty');
    };

    const processChildren = (childNodes: any) => {
        const nodes = Array.isArray(childNodes) ? childNodes : [childNodes];
        nodes.filter(Boolean).forEach(child => {
            if (typeof child === 'function') {
                const startNode = document.createComment('reactive-start');
                const endNode = document.createComment('reactive-end');
                element.appendChild(startNode);
                element.appendChild(endNode);

                runSideEffect(() => {
                    const newContent = child();
                    // Clear previous nodes between markers
                    while (startNode.nextSibling && startNode.nextSibling !== endNode) {
                        element.removeChild(startNode.nextSibling);
                    }
                    // Render new content
                    const newNodes = Array.isArray(newContent) ? newContent : [newContent];
                    newNodes.filter(Boolean).forEach(newChild => {
                        element.insertBefore(renderChild(newChild), endNode);
                    });
                });
            } else {
                element.appendChild(renderChild(child));
            }
        });
    };

    processChildren(children);
}
