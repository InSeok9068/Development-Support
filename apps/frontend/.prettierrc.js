const prettierBaseConfig = require('prettier-config-custom/base');

module.exports = {
  ...prettierBaseConfig,
  plugins: [...prettierBaseConfig.plugins, 'prettier-plugin-tailwindcss'],
};
