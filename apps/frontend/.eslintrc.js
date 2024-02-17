// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintBaseConfig = require('@support/eslint-config-custom/base');

module.exports = {
  ...eslintBaseConfig,
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', ...eslintBaseConfig.extends],
  rules: {
    ...eslintBaseConfig.rules,
    'vue/multi-word-component-names': 'off',
    'vue/no-reserved-component-names': 'off',
  },
};
