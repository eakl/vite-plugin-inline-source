import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    index: './src/main.ts'
  },
  format: ['esm'],
  splitting: false,
  minify: true,
  clean: true,
  dts: true,
  shims: true,
  treeshake: 'recommended'
})
