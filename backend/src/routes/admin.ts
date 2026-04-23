import { Router } from 'express';
import { 
  getDashboardStats, 
  getCustomers, 
  getAllBookings, 
  getSupportRequests,
  getAgents
} from '../controllers/adminController';
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

// @route   GET api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/stats', auth, isAdmin, getDashboardStats);

// @route   GET api/admin/customers
// @desc    Get all customers
// @access  Private (Admin only)
router.get('/customers', auth, isAdmin, getCustomers);

// @route   GET api/admin/agents
// @desc    Get all agents
// @access  Private (Admin only)
router.get('/agents', auth, isAdmin, getAgents);

// @route   GET api/admin/bookings
// @desc    Get all bookings
// @access  Private (Admin only)
router.get('/bookings', auth, isAdmin, getAllBookings);

// @route   GET api/admin/support-requests
// @desc    Get all support requests
// @access  Private (Admin only)
router.get('/support-requests', auth, isAdmin, getSupportRequests);

export default router;
