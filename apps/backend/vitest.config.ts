import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    testTimeout: 0,
    setupFiles: ['./src/__tests__/setup.ts'],
  },
});
