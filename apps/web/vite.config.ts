import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    TanStackRouterVite(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vidyamaxx/api': path.resolve(__dirname, '../../packages/api/index.ts'),
      '@vidyamaxx/ui': path.resolve(__dirname, '../../packages/ui/index.ts'),
      '@vidyamaxx/types': path.resolve(__dirname, '../../packages/types/index.ts'),
      '@vidyamaxx/utils': path.resolve(__dirname, '../../packages/utils/index.ts'),
      '@vidyamaxx/constants': path.resolve(__dirname, '../../packages/constants/index.ts'),
      '@vidyamaxx/hooks': path.resolve(__dirname, '../../packages/hooks/index.ts'),
      '@vidyamaxx/validation': path.resolve(__dirname, '../../packages/validation/index.ts'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
      },
      '/ws': {
        target: 'ws://localhost:8000',
        ws: true,
      },
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          router: ['@tanstack/react-router'],
          query: ['@tanstack/react-query'],
        },
      },
    },
  },
});
