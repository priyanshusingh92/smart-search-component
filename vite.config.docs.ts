import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'docs-build',
    emptyOutDir: true,
    rollupOptions: {
      input: 'docs/index.html'
    }
  }
});
