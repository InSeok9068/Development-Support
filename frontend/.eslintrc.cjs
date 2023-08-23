// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseEslintConfig = require('../.eslintrc.cjs');

module.exports = {
  ...baseEslintConfig,
  parser: 'vue-eslint-parser',
  env: {
    browser: true,
  },
  extends: ['plugin:vue/vue3-recommended', ...baseEslintConfig.extends],
};
