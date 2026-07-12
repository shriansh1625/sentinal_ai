import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/node_modules/**',
      '**/coverage/**',
      '.turbo/**',
      'blueprint/**',
      'handbook/**',
      'eslint.config.js',
      'playwright.config.ts',
      'vitest.workspace.ts',
      '**/vitest.config.ts',
      '**/vite.config.ts',
      '**/*.mjs',
      '**/*.cjs',
      'tools/**',
      'tests/**',
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/require-await': 'off',
      'no-restricted-syntax': [
        'error',
        {
          selector: "CallExpression[callee.name='eval']",
          message: 'eval is forbidden (ADR-031 / PART_14).',
        },
        {
          selector: "NewExpression[callee.name='Function']",
          message: 'Function constructor is forbidden (ADR-031).',
        },
      ],
    },
  },
  {
    files: ['packages/detection-engine/**/*.ts'],
    rules: {
      'no-restricted-globals': [
        'error',
        { name: 'fetch', message: 'detection-engine must stay network-free (ADR-002).' },
        { name: 'XMLHttpRequest', message: 'detection-engine must stay network-free.' },
        { name: 'WebSocket', message: 'detection-engine must stay network-free.' },
      ],
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'chrome',
              message: 'detection-engine must not import browser APIs (PART_09 purity).',
            },
          ],
          patterns: [
            {
              group: ['@sentinel-shield/browser-adapters', '@sentinel-shield/extension'],
              message: 'detection-engine must not depend on extension packages.',
            },
          ],
        },
      ],
    },
  },
);
