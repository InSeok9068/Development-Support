import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: true,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off', //사용하지 않는 변수 경고 끄기
      '@typescript-eslint/no-explicit-any': 'off', //any 사용시 경고 끄기
      '@typescript-eslint/ban-types': 'off', //빈 타입 경고 끄기

      // TODO 잠시 ESlint 업그레이드로 인한 오류 추후 수정
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
);
