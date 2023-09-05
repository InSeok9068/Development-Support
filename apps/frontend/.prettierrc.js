const prettierBaseConfig = require('@support/prettier-config-custom/base');

module.exports = {
  ...prettierBaseConfig,
  plugins: [...prettierBaseConfig.plugins, 'prettier-plugin-tailwindcss'],
};
