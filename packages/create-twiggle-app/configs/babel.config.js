module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-typescript'],
    plugins: [['babel-plugin-twiggle', { pragma: 'createElement', pragmaFrag: 'Fragment' }]],
}
