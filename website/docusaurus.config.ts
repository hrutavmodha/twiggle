import { themes as prismThemes } from 'prism-react-renderer'
// @ts-ignore
import type { Config } from '@docusaurus/types'
// @ts-ignore
import type * as Preset from '@docusaurus/preset-classic'

const config: Config = {
    title: 'Twiggle',
    tagline: 'A lightweight reactive UI framework',
    favicon: 'logo.png',
    url: 'http://localhost:3000/',
    future: {
        v4: true,
    },
    baseUrl: '/',
    organizationName: 'hrutavmodha',
    projectName: 'twiggle',
    onBrokenLinks: 'throw',
    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            {
                docs: {
                    sidebarPath: './sidebars.ts',
                    remarkPlugins: [require('remark-livecodes')],
                },
                theme: {
                    customCss: './src/styles/index.css',
                },
            } satisfies Preset.Options,
        ],
    ],
    themeConfig: {
        colorMode: {
            respectPrefersColorScheme: true,
        },
        navbar: {
            hideOnScroll: false,
            title: 'Twiggle',
            logo: {
                alt: 'Twiggle Logo',
                src: 'logo.png',
            },
            items: [
                {
                    type: 'docSidebar',
                    sidebarId: 'tutorialSidebar',
                    position: 'left',
                    label: 'Docs',
                },
                {
                    href: 'https://github.com/hrutavmodha/twiggle',
                    label: 'GitHub',
                    position: 'right',
                },
            ],
        },
        footer: {
            style: 'dark',
            links: [],
            copyright: `Copyright &copy ${new Date().getFullYear()} Hrutav Modha`,
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
        },
    } satisfies Preset.ThemeConfig,
}

export default config
