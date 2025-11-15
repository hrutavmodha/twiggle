import { Plugin } from 'rollup';

interface Options {
    include?: string | string[];
    exclude?: string | string[];
}

declare function twiggleRollupPlugin(options?: Options): Plugin;
export default twiggleRollupPlugin;
