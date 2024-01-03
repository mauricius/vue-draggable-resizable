/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom'
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/install.js'),
      name: 'VueDraggableResizable',
      fileName: 'vue-draggable-resizable'
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
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './src')
    },
  },
  plugins: [vue()]
})
