// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintBaseConfig = require('@support/eslint-config-custom/base');

module.exports = {
  ...eslintBaseConfig,
  env: {
    browser: true,
  },
  parser: 'vue-eslint-parser',
  extends: ['plugin:vue/vue3-recommended', ...eslintBaseConfig.extends],
};
