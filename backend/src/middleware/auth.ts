import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserPayload, AuthenticatedRequest } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_jwt_key';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as UserPayload;
    (req as unknown as AuthenticatedRequest).user = decoded;
    next();
  } catch (_err) { // eslint-disable-line @typescript-eslint/no-unused-vars
    res.status(401).json({ message: 'Token is not valid' });
  }
};
