import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
    cssCodeSplit: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log'],
        passes: 2,
      },
      mangle: true,
    },
    target: 'es2015',
    sourcemap: false,
    assetsInlineLimit: 4096,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  server: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
  preview: {
    headers: {
      'Cache-Control': 'public, max-age=31536000',
    },
  },
}) 