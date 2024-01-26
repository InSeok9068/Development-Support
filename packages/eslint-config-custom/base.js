module.exports = {
  root: true,
  env: {},
  plugins: ['@typescript-eslint'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: '2022',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'off', //사용하지 않는 변수 경고 끄기
    '@typescript-eslint/no-explicit-any': 'off', //any 사용시 경고 끄기
    '@typescript-eslint/ban-types': 'off', //빈 타입 경고 끄기
  },
};
