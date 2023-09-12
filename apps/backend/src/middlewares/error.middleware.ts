import { NextFunction, Request, Response } from 'express';
import { logger } from '../configs';

const errorMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(`error ${err.message}`);
  res.status(res.statusCode).send({ err });
};

export { errorMiddleware };
