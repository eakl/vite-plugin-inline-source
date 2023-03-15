import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { inlineSource } from '@eakl/vite-plugin-inline-source'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte(), inlineSource()],
})
