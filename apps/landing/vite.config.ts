import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vidyamaxx/ui': path.resolve(__dirname, '../../packages/ui/index.ts'),
      '@vidyamaxx/types': path.resolve(__dirname, '../../packages/types/index.ts'),
      '@vidyamaxx/utils': path.resolve(__dirname, '../../packages/utils/index.ts'),
      '@vidyamaxx/constants': path.resolve(__dirname, '../../packages/constants/index.ts'),
    },
  },
  server: {
    port: 3001,
  },
  build: {
    sourcemap: true,
  },
});
