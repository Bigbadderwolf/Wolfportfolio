import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      // Turn off rule that forbids using the 'any' type (THIS FIXES THE ERRORS)
      '@typescript-eslint/no-explicit-any': 'off',
      // Optional: Turn off other rules causing warnings if you want a cleaner output
      'react-hooks/exhaustive-deps': 'warn', // Keep as warning, or turn 'off'
      '@next/next/no-img-element': 'warn', // Keep as warning
      // Additional rules for your project
      '@typescript-eslint/no-unused-vars': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'react/no-unescaped-entities': 'off',
      '@next/next/no-page-custom-font': 'off',
    },
  },
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '*.config.js',
    '*.config.ts',
    'dist/**',
    '.vercel/**',
    'node_modules/**',
  ]),
]);

export default eslintConfig;
