import { Router } from 'express';
import {
  getDashboardStats,
  getCustomers,
  getAllBookings,
  getSupportRequests,
  getAgents,
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus
} from '../controllers/adminController';
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

// @route   GET api/admin/enquiries
// @desc    Get all user enquiries
// @access  Private (Admin only)
router.get('/enquiries', auth, isAdmin, getEnquiries);

// @route   POST api/admin/enquiries
// @desc    Submit a new enquiry
// @access  Public
router.post('/enquiries', createEnquiry);

// @route   PATCH api/admin/enquiries/:id
// @desc    Update enquiry status
// @access  Private (Admin only)
router.patch('/enquiries/:id', auth, isAdmin, updateEnquiryStatus);

export default router;
