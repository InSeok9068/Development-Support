import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: '../backend/src/graphql/types/*',
  documents: './src/graphql/operations/*',
  generates: {
    '../../packages/shared/types/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
    },
    '../../packages/shared/validators/index.ts': {
      plugins: ['typescript-validation-schema'],
      config: {
        importFrom: '../types',
        useTypeImports: true,
        notAllowEmptyString: true,
        schema: 'zod',
        directives: {
          constraint: {
            format: {
              email: 'email',
              url: 'url',
              uuid: 'uuid',
              ip: 'ip',
            },
            min: 'min',
            max: 'max',
            gt: 'gt',
            gte: 'gte',
            lt: 'lt',
            lte: 'lte',
            regex: 'regex',
            includes: 'includes',
            startsWith: 'startsWith',
            endsWith: 'endsWith',
          },
        },
      },
    },
  },
};
export default config;
