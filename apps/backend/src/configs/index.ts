import { logger } from './logger.config';
import { transporter } from './mail.config';
import { passportConfigInit } from './passport.config';
import { prisma } from './prisma.config';

export { logger, passportConfigInit, prisma, transporter };
