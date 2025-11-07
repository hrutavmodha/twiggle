declare module 'turbopack-plugin-twiggle' {
  interface TurbopackTwigglePlugin {
    name: string;
    transform: (code: string, id: string) => Promise<string | void>;
  }
  const turbopackTwigglePlugin: () => TurbopackTwigglePlugin;
  export default turbopackTwigglePlugin;
}
