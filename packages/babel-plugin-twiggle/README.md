# babel-plugin-twiggle

The Babel Plugin for Twiggle.

This plugin enables Twiggle's reactive JSX syntax transformation within your Babel build pipeline.

## Installation

```bash
npm install babel-plugin-twiggle
# or
yarn add babel-plugin-twiggle
```

## Usage

Add `babel-plugin-twiggle` to your Babel configuration (e.g., `.babelrc` or `babel.config.js`):

```json
{
    "plugins": ["babel-plugin-twiggle"]
}
```

Or with options:

```javascript
// babel.config.js
module.exports = {
    plugins: [
        [
            'babel-plugin-twiggle',
            {
                /* options here */
            },
        ],
    ],
}
```
