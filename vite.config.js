import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
    'process.env': {},
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
  },
  build: {
    sourcemap: false,
  }
});
