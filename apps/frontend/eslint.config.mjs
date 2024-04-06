import eslint from '@support/eslint-config-custom/base.js';
import pluginVue from 'eslint-plugin-vue';

export default [
  ...eslint,
  ...pluginVue.configs['flat/recommended'],
  {
    languageOptions: {
      parserOptions: {
        project: 'tsconfig.app.json',
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.vue'],
      },
    },
  },
  {
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/no-reserved-component-names': 'off',

      // TODO 잠시 ESlint 업그레이드로 인한 오류 추후 수정
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/restrict-plus-operands': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  },
];
