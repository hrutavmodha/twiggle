import { Transformer } from '@parcel/plugin'

declare module '@parcel/transformer-babel'

declare const twiggleParcelPlugin: Transformer
export default twiggleParcelPlugin
