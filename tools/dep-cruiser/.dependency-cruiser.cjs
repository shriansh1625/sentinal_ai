/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: 'no-circular',
      severity: 'error',
      from: {},
      to: { circular: true },
    },
    {
      name: 'detection-engine-must-not-import-extension',
      severity: 'error',
      from: { path: '^packages/detection-engine' },
      to: {
        path: '^packages/(extension|browser-adapters|core|enterprise-backend)',
      },
    },
    {
      name: 'detection-engine-only-shared-types',
      comment: 'PART_28 / ADR-002 — engine depends inward on shared-types only',
      severity: 'error',
      from: { path: '^packages/detection-engine' },
      to: {
        path: '^packages/',
        pathNot: '^packages/(detection-engine|shared-types)',
      },
    },
    {
      name: 'extension-must-not-import-enterprise-backend',
      severity: 'error',
      from: { path: '^packages/extension' },
      to: { path: '^packages/enterprise-backend' },
    },
    {
      name: 'shared-types-must-stay-pure',
      severity: 'error',
      from: { path: '^packages/shared-types' },
      to: {
        path: '^packages/(core|browser-adapters|extension|detection-engine|enterprise-backend)',
      },
    },
  ],
  options: {
    doNotFollow: {
      path: 'node_modules|dist',
    },
    tsPreCompilationDeps: true,
    enhancedResolveOptions: {
      exportsFields: ['exports'],
      conditionNames: ['import', 'require', 'node', 'default'],
    },
  },
};
