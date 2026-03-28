import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'docs-build',
    emptyOutDir: true,
    rollupOptions: {
      input: 'docs/index.html'
    }
  }
});
