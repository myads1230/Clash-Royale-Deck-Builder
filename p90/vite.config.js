import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/p90/',
  build: {
    outDir: 'docs'
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api.clashroyale.com/v1',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
