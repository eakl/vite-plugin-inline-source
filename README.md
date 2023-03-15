# vite-plugin-inline-source

![npm version](https://img.shields.io/npm/v/@eakl/vite-plugin-inline-source?label=npm%20version)
![npm size](https://img.shields.io/bundlephobia/minzip/@eakl/vite-plugin-inline-source?color=success&label=gzip%20size)
![license](https://img.shields.io/npm/l/@eakl/vite-plugin-inline-source)

Inlines JS and CSS in the final HTML build.

## Features
- Inline JS and CSS into HTML

## Install

```bash
pnpm add -D @eakl/vite-plugin-inline-source
```

## Usage

```ts
import { defineConfig } from 'vite'
import { inlineSource } from '@eakl/vite-plugin-inline-source'

export default defineConfig({
  plugins: [inlineSource()],
})
```

## Playground

```bash
pnpm install

cd ./playground/basic

pnpm run dev
```

| Playground | Description |
| --- | --- |
| basic | Applies the plugin bare bone, without options |


## Roadmap
- Move to PostHTML
- HTML Minification
- Support EJS templating
- Support customizable options

## Thanks
- Inspiration from [vite-plugin-html](https://github.com/vbenjs/vite-plugin-html)

## License
MIT
