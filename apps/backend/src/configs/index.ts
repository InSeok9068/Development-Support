import { firebaseAdmin } from './firebase.config';
import { logger } from './logger.config';
import { transporter } from './mail.config';
import { prisma } from './prisma.config';
import { redis } from './redis.config';

export { firebaseAdmin as admin, logger, prisma, redis, transporter };
