# parcel-plugin-twiggle

A Parcel plugin for the Twiggle framework, enabling reactive JSX expressions in your Parcel-powered projects.

## Installation

```bash
npm install parcel-plugin-twiggle @babel/core @babel/preset-react @babel/preset-typescript
# or
yarn add parcel-plugin-twiggle @babel/core @babel/preset-react @babel/preset-typescript
```

## Usage

Create a `.parcelrc` file in your project root with the following content:

```json
{
    "extends": "@parcel/config-default",
    "transformers": {
        "*.{js,jsx,ts,tsx}": ["parcel-plugin-twiggle", "..."]
    }
}
```

This will apply the Twiggle transformer to your JavaScript and TypeScript files.

## Contributing

See the [main Twiggle repository](https://github.com/your-org/twiggle) for contribution guidelines.

## License

[MIT License](LICENSE)
