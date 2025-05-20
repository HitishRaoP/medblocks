import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  worker: {
    format: 'es',
  },
  optimizeDeps: {
    exclude: ['@electric-sql/pglite'],
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    }
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  },
})
