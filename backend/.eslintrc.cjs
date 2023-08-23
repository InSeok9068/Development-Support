// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseEslintConfig = require('../.eslintrc.cjs');

module.exports = {
  ...baseEslintConfig,
  env: {
    node: true,
  },
  extends: ['eslint:recommended', ...baseEslintConfig.extends],
};
