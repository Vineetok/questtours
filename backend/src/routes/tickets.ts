import { Router } from 'express';
import { 
  createTicket, 
  getUserTickets, 
  getAllTickets, 
  updateTicketStatus 
} from '../controllers/ticketController';
import { auth } from '../middleware/auth';

const router = Router();

// Middleware to check if user is admin
const isAdmin = (req: any, res: any, next: any) => {
  if (req.user && req.user.role === 'admin') {
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
