import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  server: {
    port: 5377,
    proxy: {
      '/api': {
        target: 'api',
        secure: false,
        rewrite: (p) => p.replace(/^\/api/, '/'),
        changeOrigin: true,
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
  },
  build: {
    outDir: 'dist',
  },
  plugins: [vue()],
})
