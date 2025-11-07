declare module 'swc-plugin-twiggle' {
    interface SwcTwigglePlugin {
        name: string
        transform: (code: string, id: string) => Promise<string | void>
    }
    const swcTwigglePlugin: () => SwcTwigglePlugin
    export default swcTwigglePlugin
}
