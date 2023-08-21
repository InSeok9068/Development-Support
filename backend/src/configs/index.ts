import { prisma } from './prisma.config';
import { logger, morganMiddleware } from './logger.config';

export { prisma, logger, morganMiddleware };
