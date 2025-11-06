# twiggle-plugin-webpack

A Webpack plugin for the Twiggle framework, enabling reactive JSX expressions in your Webpack-powered projects.

## Installation

```bash
npm install twiggle-plugin-webpack @babel/core @babel/preset-react @babel/preset-typescript babel-loader webpack
# or
yarn add twiggle-plugin-webpack @babel/core @babel/preset-react @babel/preset-typescript babel-loader webpack
```

## Usage

Add `twiggle-plugin-webpack` to your `webpack.config.js` file:

```javascript
const TwiggleWebpackPlugin = require('twiggle-plugin-webpack')

module.exports = {
    // ... other webpack configurations
    plugins: [new TwiggleWebpackPlugin()],
    // ...
}
```

Ensure you have `babel-loader` configured in your webpack rules if you have other Babel transformations. `twiggle-plugin-webpack` will automatically apply the necessary Babel presets and plugins for Twiggle's reactive JSX.

## Contributing

See the [main Twiggle repository](https://github.com/your-org/twiggle) for contribution guidelines.

## License

[MIT License](LICENSE)
