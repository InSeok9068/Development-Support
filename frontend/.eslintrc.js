module.exports = {
  root: true,
  env: {
    brower: true,
  },
  parser: 'vue-eslint-parser',
  plugins: ['@typescript-eslint'],
  extends: ['plugin:vue/vue3-recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  rules: {},
};
