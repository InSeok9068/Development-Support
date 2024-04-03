import vue from '@vitejs/plugin-vue';
import { fileURLToPath, URL } from 'node:url';
import { PrimeVueResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';
import { defineConfig } from 'vite';
import removeConsole from 'vite-plugin-remove-console';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: ['src/components/app'],
      dts: true,
      resolvers: [PrimeVueResolver()],
    }),
    removeConsole(),
  ],
  build: {
    outDir: '../backend/public',
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
