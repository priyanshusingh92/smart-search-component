import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs-build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'docs/index.html')
      }
    }
  }
});
