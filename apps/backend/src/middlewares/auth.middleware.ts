import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // if (req.headers.authorization) {
  //   req.headers.authorization.length === 0 ? res.sendStatus(401) : next();
  // } else {
  //   res.sendStatus(401);
  // }
  next();
};

export { authMiddleware };
