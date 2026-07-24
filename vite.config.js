import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Warn when a chunk exceeds 500 kB
    chunkSizeWarningLimit: 500,
    // Minify with esbuild (default, fastest)
    minify: 'esbuild',
    // Enable CSS code splitting per chunk
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Split vendor code into separate cacheable chunks
        manualChunks(id) {
          // React core — smallest, most cached chunk
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-core';
          }
          // React Router
          if (id.includes('node_modules/react-router') || id.includes('node_modules/@remix-run')) {
            return 'router';
          }
          // Lucide icons — keep separate, large package
          if (id.includes('node_modules/lucide-react')) {
            return 'icons';
          }
          // All other node_modules → vendor chunk
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
        // Use content hash for long-term caching
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },
  // Optimize dependency pre-bundling
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})
