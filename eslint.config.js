const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
// Additional plugins & flat-config helpers
const importPlugin = require('eslint-plugin-import');
const promisePlugin = require('eslint-plugin-promise');
const unicornPlugin = require('eslint-plugin-unicorn');
const sonarjsPlugin = require('eslint-plugin-sonarjs');
const prettierConfig = require('eslint-config-prettier');

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      // Type-aware TS rules (stricter set)
      ...tseslint.configs.strictTypeChecked,
      ...angular.configs.tsRecommended,
      // Keep Prettier last to disable formatting rules and avoid clashes
      prettierConfig,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    processor: angular.processInlineTemplates,
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      unicorn: unicornPlugin,
      sonarjs: sonarjsPlugin,
    },
    rules: {
      // Require semicolons in TS files
      semi: ['error', 'always'],
      // Note: member delimiter style is handled by Prettier; TS-ESLint v8 moved stylistic rules
      // Import hygiene
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          // Don't block on newline grouping; keep it suggestive
          'newlines-between': 'ignore',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import/newline-after-import': ['warn', { count: 1 }],
      // Promise/async best practices
      '@typescript-eslint/no-misused-promises': 'warn',
      'promise/no-return-wrap': 'warn',
      // Helpful general rules (kept minimal to avoid rule-resolution issues)
      // Keep sonar suggestions as warnings to start
      'sonarjs/no-duplicate-string': 'warn',

      // Angular-friendly: decorated empty classes are fine
      '@typescript-eslint/no-extraneous-class': ['off', { allowWithDecorator: true }],
      // Deprecations should inform, not fail build
      '@typescript-eslint/no-deprecated': 'warn',
      // Common strict rules that are noisy in existing codebase -> warn
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unnecessary-condition': 'warn',
      '@typescript-eslint/no-unnecessary-type-arguments': 'warn',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/use-unknown-in-catch-callback-variable': 'warn',
      '@typescript-eslint/no-confusing-void-expression': 'warn',
      // Allow numbers in template strings
      '@typescript-eslint/restrict-template-expressions': ['warn', { allowNumber: true }],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
      // Prettier compatibility (turns off conflicting formatting rules)
      prettierConfig,
    ],
    rules: {},
  },
);
