module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', //사용하지 않는 변수 경고 끄기
    '@typescript-eslint/no-explicit-any': 'off', //any 사용시 경고 끄기
  },
};
