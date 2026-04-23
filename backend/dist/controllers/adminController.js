"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnquiryStatus = exports.createEnquiry = exports.getEnquiries = exports.getAgents = exports.getSupportRequests = exports.getAllBookings = exports.getCustomers = exports.getDashboardStats = void 0;
const db_1 = __importDefault(require("../config/db"));
const getDashboardStats = async (req, res) => {
    try {
        // 1. Core Stats with Current vs Last Month for Trends
        const statsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM users WHERE role = 'customer') as total_customers,
        (SELECT COUNT(*) FROM users WHERE role = 'agent') as total_agents,
        (SELECT COUNT(*) FROM bookings WHERE status = 'completed' OR status = 'confirmed') as total_trips,
        (SELECT SUM(amount) FROM bookings WHERE status = 'completed' OR status = 'confirmed') as total_revenue,
        
        -- Current month stats for trends
        (SELECT COUNT(*) FROM users WHERE role = 'customer' AND created_at >= date_trunc('month', current_date)) as cur_month_customers,
        (SELECT COUNT(*) FROM users WHERE role = 'customer' AND created_at >= date_trunc('month', current_date - interval '1 month') AND created_at < date_trunc('month', current_date)) as last_month_customers,
        
        (SELECT COUNT(*) FROM users WHERE role = 'agent' AND created_at >= date_trunc('month', current_date)) as cur_month_agents,
        (SELECT COUNT(*) FROM users WHERE role = 'agent' AND created_at >= date_trunc('month', current_date - interval '1 month') AND created_at < date_trunc('month', current_date)) as last_month_agents,
        
        (SELECT COUNT(*) FROM bookings WHERE (status = 'completed' OR status = 'confirmed') AND booking_date >= date_trunc('month', current_date)) as cur_month_bookings,
        (SELECT COUNT(*) FROM bookings WHERE (status = 'completed' OR status = 'confirmed') AND booking_date >= date_trunc('month', current_date - interval '1 month') AND booking_date < date_trunc('month', current_date)) as last_month_bookings,
        
        (SELECT SUM(amount) FROM bookings WHERE (status = 'completed' OR status = 'confirmed') AND booking_date >= date_trunc('month', current_date)) as cur_month_revenue,
        (SELECT SUM(amount) FROM bookings WHERE (status = 'completed' OR status = 'confirmed') AND booking_date >= date_trunc('month', current_date - interval '1 month') AND booking_date < date_trunc('month', current_date)) as last_month_revenue
    `;
        const statsResult = await db_1.default.query(statsQuery);
        const row = statsResult.rows[0];
        const calculateTrend = (cur, last) => {
            if (!last || last === 0)
                return { trend: 'up', change: cur > 0 ? '100%' : '0%' };
            const diff = ((cur - last) / last) * 100;
            return {
                trend: diff >= 0 ? 'up' : 'down',
                change: `${Math.abs(Math.round(diff))}%`
            };
        };
        // 2. Revenue Data (Last 6 months) for Chart
        const revenueDataQuery = `
      SELECT 
        to_char(m, 'Mon') as name,
        COALESCE(SUM(b.amount), 0) as total
      FROM generate_series(
        date_trunc('month', current_date - interval '5 months'),
        date_trunc('month', current_date),
        interval '1 month'
      ) m
      LEFT JOIN bookings b ON date_trunc('month', b.booking_date) = m AND (b.status = 'completed' OR b.status = 'confirmed')
      GROUP BY m
      ORDER BY m ASC;
    `;
        const revenueDataResult = await db_1.default.query(revenueDataQuery);
        // 3. Recent Bookings with details
        const recentBookingsQuery = `
      SELECT 
        'BK-' || LPAD(b.id::text, 3, '0') as id, 
        COALESCE(u.name, '') as customer, 
        COALESCE(t.title, '') as tour, 
        to_char(b.booking_date, 'YYYY-MM-DD') as date, 
        INITCAP(b.status) as status, 
        '₹' || TO_CHAR(b.amount, 'FM9,99,999') as amount 
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN tours t ON b.tour_id = t.id
      ORDER BY b.booking_date DESC
      LIMIT 10;
    `;
        const recentBookingsResult = await db_1.default.query(recentBookingsQuery);
        res.json({
            totalCustomers: parseInt(row.total_customers),
            totalAgents: parseInt(row.total_agents),
            totalTrips: parseInt(row.total_trips),
            totalRevenue: parseFloat(row.total_revenue || 0),
            trends: {
                customers: calculateTrend(parseInt(row.cur_month_customers), parseInt(row.last_month_customers)),
                agents: calculateTrend(parseInt(row.cur_month_agents), parseInt(row.last_month_agents)),
                bookings: calculateTrend(parseInt(row.cur_month_bookings), parseInt(row.last_month_bookings)),
                revenue: calculateTrend(parseFloat(row.cur_month_revenue || 0), parseFloat(row.last_month_revenue || 0))
            },
            revenueData: revenueDataResult.rows.map(r => ({ name: r.name, total: parseFloat(r.total) })),
            recentBookings: recentBookingsResult.rows
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getDashboardStats = getDashboardStats;
const getCustomers = async (req, res) => {
    try {
        const customersQuery = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.avatar as avatar_url,
        SUBSTRING(u.name FROM 1 FOR 1) as avatar,
        'Active' as status,
        to_char(u.created_at, 'YYYY-MM-DD') as joined,
        (SELECT COUNT(*) FROM bookings b WHERE b.user_id = u.id) as "totalBookings",
        '₹' || COALESCE((SELECT TO_CHAR(SUM(amount), 'FM9,99,999') FROM bookings b WHERE b.user_id = u.id AND (b.status = 'completed' OR b.status = 'confirmed')), '0') as "totalSpent"
      FROM users u
      WHERE u.role = 'customer'
      ORDER BY u.created_at DESC;
    `;
        const result = await db_1.default.query(customersQuery);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCustomers = getCustomers;
const getAllBookings = async (req, res) => {
    try {
        const bookingsQuery = `
      SELECT 
        'BK-' || LPAD(b.id::text, 3, '0') as id, 
        COALESCE(u.name, '') as customer, 
        COALESCE(t.title, '') as tour, 
        to_char(b.booking_date, 'YYYY-MM-DD') as date, 
        INITCAP(b.status) as status, 
        '₹' || TO_CHAR(b.amount, 'FM9,99,999') as amount 
      FROM bookings b
      LEFT JOIN users u ON b.user_id = u.id
      LEFT JOIN tours t ON b.tour_id = t.id
      ORDER BY b.booking_date DESC;
    `;
        const result = await db_1.default.query(bookingsQuery);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllBookings = getAllBookings;
const getSupportRequests = async (req, res) => {
    try {
        const supportQuery = `
      SELECT 
        'T-' || LPAD(s.id::text, 3, '0') as id, 
        COALESCE(u.name, '') as customer, 
        s.subject, 
        s.priority, 
        s.status, 
        to_char(s.created_at, 'YYYY-MM-DD') as date
      FROM tickets s
      LEFT JOIN users u ON s.user_id = u.id
      ORDER BY s.created_at DESC;
    `;
        const result = await db_1.default.query(supportQuery);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getSupportRequests = getSupportRequests;
const getAgents = async (req, res) => {
    try {
        const agentsQuery = `
      SELECT 
        u.id, 
        u.name, 
        u.email, 
        u.avatar as avatar_url,
        SUBSTRING(u.name FROM 1 FOR 1) as avatar,
        'Active' as status,
        to_char(u.created_at, 'YYYY-MM-DD') as joined,
        (SELECT COUNT(*) FROM tours t WHERE t.location ILIKE '%' || u.name || '%') as "totalTours",
        '₹' || COALESCE((SELECT TO_CHAR(SUM(amount), 'FM9,99,999') FROM bookings b WHERE b.user_id = u.id AND (b.status = 'completed' OR b.status = 'confirmed')), '0') as "totalEarnings"
      FROM users u
      WHERE u.role = 'agent'
      ORDER BY u.created_at DESC;
    `;
        const result = await db_1.default.query(agentsQuery);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAgents = getAgents;
const getEnquiries = async (req, res) => {
    try {
        const enquiriesQuery = `
      SELECT 
        id,
        first_name as "firstName",
        last_name as "lastName",
        email,
        subject,
        message,
        status,
        to_char(created_at, 'YYYY-MM-DD HH24:MI') as date
      FROM enquiries
      ORDER BY created_at DESC;
    `;
        const result = await db_1.default.query(enquiriesQuery);
        res.json(result.rows);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getEnquiries = getEnquiries;
const createEnquiry = async (req, res) => {
    try {
        const { firstName, lastName, email, subject, message } = req.body;
        if (!firstName || !lastName || !email || !subject || !message) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const insertQuery = `
      INSERT INTO enquiries (first_name, last_name, email, subject, message)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
        const result = await db_1.default.query(insertQuery, [firstName, lastName, email, subject, message]);
        res.status(201).json({ message: 'Enquiry submitted successfully', enquiry: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createEnquiry = createEnquiry;
const updateEnquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }
        const updateQuery = `
      UPDATE enquiries 
      SET status = $1 
      WHERE id = $2 
      RETURNING *;
    `;
        const result = await db_1.default.query(updateQuery, [status, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Enquiry not found' });
        }
        res.json({ message: 'Enquiry status updated', enquiry: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateEnquiryStatus = updateEnquiryStatus;
