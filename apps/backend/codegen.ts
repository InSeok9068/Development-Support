import { writeFileSync } from 'fs';
import { mergeSchemaPrint } from './src/graphql/schema';

writeFileSync('mergeSchema.graphql', mergeSchemaPrint);

process.exit();
