import { app } from './firebase.config';
import { logger } from './logger.config';
import { transporter } from './mail.config';
import { prisma } from './prisma.config';

export { app, logger, prisma, transporter };
