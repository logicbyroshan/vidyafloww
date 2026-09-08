import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@vidyafloww/ui': path.resolve(__dirname, './src/ui'),
    },
  },
  server: {
    port: 8013,
    strictPort: true,
    host: true,
  },
  preview: {
    port: 8013,
  },
});
