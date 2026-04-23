import { Request } from 'express';

export interface UserPayload {
  id: string | number;
  role: 'admin' | 'customer' | 'agent';
}

export interface AuthenticatedRequest extends Request {
  user: UserPayload;
}
