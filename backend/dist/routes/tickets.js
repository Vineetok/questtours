"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ticketController_1 = require("../controllers/ticketController");
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
// Customer routes
router.post('/', auth_1.auth, ticketController_1.createTicket);
router.get('/my', auth_1.auth, ticketController_1.getUserTickets);
// Admin routes
router.get('/all', auth_1.auth, isAdmin, ticketController_1.getAllTickets);
router.patch('/:id', auth_1.auth, isAdmin, ticketController_1.updateTicketStatus);
exports.default = router;
