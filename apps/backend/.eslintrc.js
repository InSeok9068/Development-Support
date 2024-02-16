// eslint-disable-next-line @typescript-eslint/no-var-requires
const eslintBaseConfig = require('@support/eslint-config-custom/base');

module.exports = {
  ...eslintBaseConfig,
  env: {
    ...eslintBaseConfig.env,
    node: true,
  },
  extends: ['eslint:recommended', ...eslintBaseConfig.extends],
  rules: {
    ...eslintBaseConfig.rules,
  },
};
