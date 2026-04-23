"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminController_1 = require("../controllers/adminController");
const auth_1 = require("../middleware/auth");
const router = (0, express_1.Router)();
// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    const authReq = req;
    if (authReq.user && authReq.user.role === 'admin') {
        next();
    }
    else {
        res.status(403).json({ message: 'Access denied. Admins only.' });
    }
};
// @route   GET api/admin/stats
// @desc    Get dashboard statistics
// @access  Private (Admin only)
router.get('/stats', auth_1.auth, isAdmin, adminController_1.getDashboardStats);
// @route   GET api/admin/customers
// @desc    Get all customers
// @access  Private (Admin only)
router.get('/customers', auth_1.auth, isAdmin, adminController_1.getCustomers);
// @route   GET api/admin/agents
// @desc    Get all agents
// @access  Private (Admin only)
router.get('/agents', auth_1.auth, isAdmin, adminController_1.getAgents);
// @route   GET api/admin/bookings
// @desc    Get all bookings
// @access  Private (Admin only)
router.get('/bookings', auth_1.auth, isAdmin, adminController_1.getAllBookings);
// @route   GET api/admin/support-requests
// @desc    Get all support requests
// @access  Private (Admin only)
router.get('/support-requests', auth_1.auth, isAdmin, adminController_1.getSupportRequests);
// @route   GET api/admin/enquiries
// @desc    Get all user enquiries
// @access  Private (Admin only)
router.get('/enquiries', auth_1.auth, isAdmin, adminController_1.getEnquiries);
// @route   POST api/admin/enquiries
// @desc    Submit a new enquiry
// @access  Public
router.post('/enquiries', adminController_1.createEnquiry);
// @route   PATCH api/admin/enquiries/:id
// @desc    Update enquiry status
// @access  Private (Admin only)
router.patch('/enquiries/:id', auth_1.auth, isAdmin, adminController_1.updateEnquiryStatus);
exports.default = router;
