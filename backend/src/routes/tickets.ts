import { Router } from 'express';
import { 
  createTicket, 
  getUserTickets, 
  getAllTickets, 
  updateTicketStatus 
} from '../controllers/ticketController';
import { auth } from '../middleware/auth';

import { Request, Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../types';

const router = Router();

// Middleware to check if user is admin
const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authReq = req as unknown as AuthenticatedRequest;
  if (authReq.user && authReq.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied. Admins only.' });
  }
};

// Customer routes
router.post('/', auth, createTicket);
router.get('/my', auth, getUserTickets);

// Admin routes
router.get('/all', auth, isAdmin, getAllTickets);
router.patch('/:id', auth, isAdmin, updateTicketStatus);

export default router;
