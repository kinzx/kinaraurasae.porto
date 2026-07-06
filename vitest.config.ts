import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./__tests__/setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next', 'e2e'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'lcov', 'html'],
      exclude: [
        'node_modules/',
        '.next/',
        'e2e/',
        '**/*.config.*',
        '**/*.d.ts',
        '__tests__/setup.ts',
      ],
    },
  },
  resolve: {
    alias: {
      '@': root,
    },
  },
});
