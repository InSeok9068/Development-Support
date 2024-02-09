import { admin } from '@/configs';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization && req.headers.authorization.length !== 0) {
    const decodedToken = await admin.auth().verifyIdToken(req.headers.authorization);
    req.headers.uid = decodedToken.uid;
  }

  next();
};

export { authMiddleware };
