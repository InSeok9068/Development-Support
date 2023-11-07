import { NextFunction, Request, Response } from 'express';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // req.headers.authorization?.length === 0 ? res.redirect('/login') : next();
  next();
};

export { authMiddleware };
