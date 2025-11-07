// @ts-ignore
import type { SidebarsConfig } from '@docusaurus/plugin-content-docs'
const sidebars: SidebarsConfig = {
    tutorialSidebar: [
        {
            type: 'category',
            label: 'Getting Started',
            items: ['getting-started', 'intro', 'comparison'],
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
        {
            type: 'category',
            label: 'Integrations',
            items: [
                'integrations/vite',
                'integrations/webpack',
                'integrations/rollup',
                'integrations/esbuild',
                'integrations/babel',
                'integrations/parcel',
            ],
        },
    ],
}

export default sidebars
