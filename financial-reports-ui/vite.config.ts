import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reports': 'http://localhost:5292',
      '/transactions': 'http://localhost:5292',
    },
  },
})
