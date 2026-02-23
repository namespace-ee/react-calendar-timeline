import { defineConfig } from 'vitest/config'
import { resolve } from 'path'

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['__tests__/setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}', '__tests__/utils/**/*.js'],
  },
  resolve: {
    alias: {
      lib: resolve(__dirname, 'src/lib'),
      'test-utility': resolve(__dirname, '__tests__/test-utility'),
    },
  },
})
