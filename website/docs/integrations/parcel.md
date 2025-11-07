---
sidebar_label: 'Parcel'
---

# Parcel Integration

The `parcel-plugin-twiggle` is the official Parcel plugin to integrate Twiggle into your development environment. It handles JSX transformations and enables reactive expressions.

## Installation

```bash
npm install parcel-plugin-twiggle
# or
yarn add parcel-plugin-twiggle
# or
pnpm add parcel-plugin-twiggle
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
