import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/shared-types',
      'packages/core',
      'packages/browser-adapters',
      'packages/detection-engine',
      'packages/extension',
      'tests/integration',
    ],
  },
});
