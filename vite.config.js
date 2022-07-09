/// <reference types="vitest" />
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require("path")

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/install.js'),
      name: 'vue-draggable-resizable',
      fileName: (format) => `vue-draggable-resizable.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          'vue': 'Vue',
        }
      }
    },
  },
  server: {
    port: 8080
  },
  resolve: {
    dedupe: ['vue'],
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [vue()]
})
