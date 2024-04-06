import eslint from '@support/eslint-config-custom/base.js';

export default [
  ...eslint,
  {
    languageOptions: {
      parserOptions: {
        project: ['./apps/*/tsconfig.json'],
      },
    },
  },
];
