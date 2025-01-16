import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import typescript from '@rollup/plugin-typescript'
import { typescriptPaths } from 'rollup-plugin-typescript-paths'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    copyPublicDir: false,
    outDir: 'dist',
    sourcemap: true,
    lib: {
      entry: {
        index: resolve("src", 'index.ts'),
        styles: resolve("src/lib", 'Timeline.scss')
      },
      name: 'react-calendar-timeline',
      fileName: (format) => `react-calendar-timeline.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react/jsx-runtime', 'react-dom', 'react-dom/client'],
      output: {
        globals: {
          react: 'React'
        }
      },
      plugins: [
        typescriptPaths({
          preserveExtensions: true,
        }),
        typescript({
          outDir: 'dist',
          declaration: true,
        }),
      ],
    },
  },
  server: {
    port: 3000,
  },
  plugins: [react(), viteStaticCopy({
    targets: [
      {
        src: 'src/lib/Timeline.scss',
        dest: ''
      }
    ]
  })],
})
