import { logger } from '@/configs';
import { NextFunction, Request, Response } from 'express';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`error ${err.message}`);
  res.status(res.statusCode).json(err);
};

export { errorMiddleware };
