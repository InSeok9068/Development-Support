// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintBaseConfig = require('@support/eslint-config-custom/base');

module.exports = {
  ...eslintBaseConfig,
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', ...eslintBaseConfig.extends],
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', //사용하지 않는 변수 경고 끄기
    '@typescript-eslint/no-explicit-any': 'off', //any 사용시 경고 끄기
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
  },
};
