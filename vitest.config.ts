import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: [
      '__tests__/**/*.{test,spec}.{js,cjs,mjs,ts,cts,mts}'
    ],
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{rollup,vite,vitest,tsup,build}.config.*'
    ],
    globals: true,
    coverage: {
      provider: 'istanbul'
    }
  },
})