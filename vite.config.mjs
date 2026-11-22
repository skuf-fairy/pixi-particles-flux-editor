import {fileURLToPath} from 'node:url';

import react from '@vitejs/plugin-react';

import {defineConfig} from 'vite';

export default defineConfig({
  plugins: [react()],
  base: './',
  resolve: {
    alias: {
      src: fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 8080,
    strictPort: true,
  },
  build: {
    outDir: 'build',
    sourcemap: true,
  },
});
