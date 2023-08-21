module.exports = {
  root: true,
  env: {
    brower: true,
  },
  plugins: ['@typescript-eslint'],
  extends: ['plugin:vue/vue3-recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
  },
  rules: {},
};
