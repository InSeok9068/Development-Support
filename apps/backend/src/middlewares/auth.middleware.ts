import { admin } from '@/configs';
import { NextFunction, Request, Response } from 'express';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    try {
      await admin.auth().verifyIdToken(authorization);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(403).json({ errors: [{ message: err.message }] });
      }
    }
  }

  next();
};

export { authMiddleware };
