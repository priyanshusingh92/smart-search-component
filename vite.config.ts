import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/components/smart-search.ts',
      formats: ['es'],
      fileName: 'smart-search'
    },
    rollupOptions: {
      external: /^lit/
    }
  }
});