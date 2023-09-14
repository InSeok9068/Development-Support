import { PrismaClient } from '@prisma/client';
import { logger } from './logger.config';

const prisma = new PrismaClient({
  log: [
    {
      emit: 'event',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ],
});

// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#event-types
type QueryEvent = {
  timestamp: Date;
  query: string;
  params: string;
  duration: number;
  target: string;
};

prisma.$on('query', (e: QueryEvent) => {
  logger.debug('Query: ' + e.query);
  logger.debug('Params: ' + e.params);
  logger.debug('Duration: ' + e.duration + 'ms');
});

export { prisma };
