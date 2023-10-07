import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/src/graphql/types/*',
  documents: './src/graphql/operations/*',
  generates: {
    '../../packages/shared/types/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
  },
};
export default config;
