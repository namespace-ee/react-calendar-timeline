import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

// https://vitejs.dev/config/
export default defineConfig({

  build: {
    copyPublicDir: false,
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'react-calendar-timeline',
      fileName: 'index',
      formats: ['es'],
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react(), libInjectCss(), dts({ include: ['src'] })],
})
