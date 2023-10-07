import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { print } from 'graphql';
import path from 'path';

const typesArray = loadFilesSync(path.join(__dirname, '/types/*.graphql'));
const resolversArray = loadFilesSync(path.join(__dirname, '/resolvers/*.ts'));

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);

export const schema = makeExecutableSchema({ typeDefs, resolvers });
export const mergeSchemaPrint = print(typeDefs);
