import type { CodegenConfig } from '@graphql-codegen/cli';

const scalars = {
  Date: 'Date',
  DateTime: 'Date',
};

const config: CodegenConfig = {
  schema: '../backend/mergeSchema.graphql',
  documents: './src/graphql/operations/*',
  generates: {
    '../../packages/shared/types/index.ts': {
      plugins: ['typescript', 'typescript-operations'],
      config: {
        enumsAsConst: true,
        scalars,
      },
    },
    '../../packages/shared/validators/index.ts': {
      plugins: ['typescript-validation-schema'],
      config: {
        schema: 'zod',
        scalarSchemas: {
          Date: 'z.date()',
          DateTime: 'z.date()',
        },
        importFrom: '../types',
        useTypeImports: true,
        enumsAsTypes: true,
        notAllowEmptyString: true,
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
