import { fileURLToPath, URL } from 'node:url';
import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components/app'],
      dts: true,
    }),
    splitVendorChunkPlugin(),
    removeConsole(),
  ],
  build: {
    outDir: '../backend/public',
    chunkSizeWarningLimit: 600,
  },
  //개발시 CORS 회피를 위해서 프록시 사용
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@backend/types/*': fileURLToPath(new URL('../backend/src/types', import.meta.url)),
    },
  },
});
