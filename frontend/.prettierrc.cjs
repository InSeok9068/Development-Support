const basePrettierConfig = require('../.prettierrc.cjs');

module.exports = {
  ...basePrettierConfig,
  plugins: [...basePrettierConfig.plugins, 'prettier-plugin-tailwindcss'],
};
