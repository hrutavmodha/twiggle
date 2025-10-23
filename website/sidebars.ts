// @ts-ignore
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'
const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            items: ['intro', 'comparison'],
        },
        {
            type: 'category',
            label: 'Core Concepts',
            items: [
                'core-concepts/reactivity',
                'core-concepts/rendering-and-jsx',
                'core-concepts/server-side-rendering',
            ],
        },
    ],
}

export default sidebars
