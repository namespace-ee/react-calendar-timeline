// import {NodePackageImporter} from "sass";
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {resolve} from 'path'
import {fileURLToPath, URL} from 'node:url'
// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern", scss: {
       //   preprocessorOptions: {importers: [new NodePackageImporter()],}
        }
      }
    }
  },
  resolve: {
    alias: {
      // "~": resolve(__dirname, "node_modules/"),

    //  '@': fileURLToPath(new URL('./node_modules', import.meta.url)),

      // 'react-calendar-timeline-4e': resolve(__dirname, '../dist'),
      // 'react-calendar-timeline-4ef': resolve(__dirname, '../dist/react-calendar-timeline-4ef.es.js'),
      'react-calendar-timeline/dist/Timeline.scss': resolve(__dirname, '../src/lib/Timeline.scss'),
      'react-calendar-timeline/style.css': resolve(__dirname, '../dist/style.css'),
      'react-calendar-timeline': resolve(__dirname, '../src/index.ts'),


    },
  },
  plugins: [react()],
})
