import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './src/graphql/types/*',
  generates: {
    '../../packages/shared/types/index.ts': {
      plugins: ['typescript'],
    },
  },
};
export default config;
