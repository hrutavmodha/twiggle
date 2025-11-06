import jsx from '@babel/plugin-transform-react-jsx';

export default function twiggleBabelPlugin() {
  return {
    plugins: [
      [jsx, { pragma: 'createElement', pragmaFrag: 'Fragment', importSource: 'twiggle/client' }],
    ],
  };
}
