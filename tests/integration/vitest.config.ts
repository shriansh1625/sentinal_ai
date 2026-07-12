import { defineConfig } from 'vitest/config';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root,
  resolve: {
    alias: {
      '@sentinel-shield/core': join(root, '../../packages/core/src/index.ts'),
      '@sentinel-shield/browser-adapters': join(
        root,
        '../../packages/browser-adapters/src/index.ts',
      ),
      '@sentinel-shield/shared-types': join(root, '../../packages/shared-types/src/index.ts'),
    },
  },
  test: {
    environment: 'node',
    include: ['**/*.test.ts'],
  },
});
