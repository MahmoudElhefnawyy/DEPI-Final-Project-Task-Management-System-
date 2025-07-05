import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    force: true
  },
  optimizeDeps: {
    include: ['jspdf', 'html2canvas']
  },
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.json'] // Add this
  }
});