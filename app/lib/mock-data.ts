export const adminStats = [
  { label: 'Total Revenue', value: '₹128,430', change: '+12.5%', trend: 'up' },
  { label: 'Total Bookings', value: '1,248', change: '+8.2%', trend: 'up' },
  { label: 'Active Users', value: '3,842', change: '+5.4%', trend: 'up' },
  { label: 'Pending Approvals', value: '14', change: '-2', trend: 'down' },
];

export const recentBookings = [
  { id: 'BK-001', customer: 'Alice Johnson', tour: 'Alpine Escape', status: 'Confirmed', amount: '₹1,200', date: '2024-04-20' },
  { id: 'BK-002', customer: 'Bob Smith', tour: 'Tokyo Nights', status: 'Pending', amount: '₹2,400', date: '2024-04-21' },
  { id: 'BK-003', customer: 'Charlie Brown', tour: 'Safari Adventure', status: 'Confirmed', amount: '₹3,500', date: '2024-04-19' },
  { id: 'BK-004', customer: 'Diana Prince', tour: 'Greek Odyssey', status: 'Cancelled', amount: '₹1,800', date: '2024-04-18' },
  { id: 'BK-005', customer: 'Edward Norton', tour: 'Icelandic Wonders', status: 'Confirmed', amount: '₹2,100', date: '2024-04-21' },
];

export const agentStats = [
  { label: 'My Bookings', value: '42', change: '+5', trend: 'up' },
  { label: 'Commision', value: '₹8,400', change: '+₹1,200', trend: 'up' },
  { label: 'Avg. Rating', value: '4.8', change: '+0.1', trend: 'up' },
  { label: 'Active Tours', value: '6', change: '0', trend: 'neutral' },
];

export const agentBookings = [
  { id: 'BK-002', customer: 'Bob Smith', tour: 'Tokyo Nights', status: 'Pending', amount: '₹2,400', date: '2024-04-21' },
  { id: 'BK-005', customer: 'Edward Norton', tour: 'Icelandic Wonders', status: 'Confirmed', amount: '₹2,100', date: '2024-04-21' },
  { id: 'BK-008', customer: 'Fiona Apple', tour: 'Paris Romance', status: 'Pending', amount: '₹1,500', date: '2024-04-22' },
];

export const customerStats = [
  { label: 'Past Trips', value: '12', change: '', trend: 'none' },
  { label: 'Wishlist', value: '24', change: '', trend: 'none' },
  { label: 'Reward Points', value: '1,250', change: '+150', trend: 'up' },
  { label: 'Travel Credits', value: '₹120', change: '', trend: 'none' },
];

export const customerBookings = [
  { id: 'BK-001', tour: 'Alpine Escape', status: 'Confirmed', date: '2024-05-15', price: 1200, image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop' },
  { id: 'BK-105', tour: 'Bali Retreat', status: 'Completed', date: '2023-11-10', price: 950, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop' },
];

export const wishlistTours = [
  { id: 'T-001', name: 'Swiss Alps Hiking', location: 'Switzerland', price: 2400, rating: 4.9, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop' },
  { id: 'T-002', name: 'Moroccan Desert Safari', location: 'Morocco', price: 1800, rating: 4.7, image: 'https://images.unsplash.com/photo-1509060445200-6f13a7209420?q=80&w=800&auto=format&fit=crop' },
  { id: 'T-003', name: 'Kyoto Temples', location: 'Japan', price: 3200, rating: 5.0, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=800&auto=format&fit=crop' },
];

export const revenueData = [
  { name: 'Jan', total: 1500 },
  { name: 'Feb', total: 2300 },
  { name: 'Mar', total: 3200 },
  { name: 'Apr', total: 4500 },
  { name: 'May', total: 3800 },
  { name: 'Jun', total: 5200 },
];

export const customers = [
  { id: 'CUST-001', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', joined: '2023-01-15', totalBookings: 5, totalSpent: '₹12,500', avatar: 'AJ' },
  { id: 'CUST-002', name: 'Bob Smith', email: 'bob@example.com', status: 'Active', joined: '2023-03-22', totalBookings: 3, totalSpent: '₹8,400', avatar: 'BS' },
  { id: 'CUST-003', name: 'Charlie Brown', email: 'charlie@example.com', status: 'Inactive', joined: '2022-11-10', totalBookings: 12, totalSpent: '₹45,200', avatar: 'CB' },
  { id: 'CUST-004', name: 'Diana Prince', email: 'diana@example.com', status: 'Active', joined: '2024-02-05', totalBookings: 1, totalSpent: '₹1,800', avatar: 'DP' },
  { id: 'CUST-005', name: 'Edward Norton', email: 'edward@example.com', status: 'Blocked', joined: '2023-08-14', totalBookings: 2, totalSpent: '₹4,200', avatar: 'EN' },
];

export const supportRequests = [
  { id: 'SR-101', customer: 'Alice Johnson', subject: 'Refund for Alpine Escape', priority: 'High', status: 'Open', date: '2024-04-22' },
  { id: 'SR-102', customer: 'Bob Smith', subject: 'Login issue', priority: 'Medium', status: 'Resolved', date: '2024-04-20' },
  { id: 'SR-103', customer: 'Charlie Brown', subject: 'Dietary requirements for Safari', priority: 'Low', status: 'In Progress', date: '2024-04-21' },
];

export const transactions = [
  { id: 'TX-901', customer: 'Alice Johnson', amount: '₹1,200', method: 'Credit Card', status: 'Success', date: '2024-04-20', type: 'Payment' },
  { id: 'TX-902', customer: 'Bob Smith', amount: '₹2,400', method: 'UPI', status: 'Success', date: '2024-04-21', type: 'Payment' },
  { id: 'TX-903', customer: 'Diana Prince', amount: '₹1,800', method: 'Net Banking', status: 'Failed', date: '2024-04-18', type: 'Payment' },
  { id: 'TX-904', customer: 'Edward Norton', amount: '₹2,100', method: 'Credit Card', status: 'Refunded', date: '2024-04-21', type: 'Refund' },
];

export const coupons = [
  { id: 'CPN-001', code: 'SUMMER24', discount: '20%', type: 'Percentage', status: 'Active', expiry: '2024-08-31', usage: 145 },
  { id: 'CPN-002', code: 'WELCOME500', discount: '₹500', type: 'Fixed', status: 'Active', expiry: '2024-12-31', usage: 892 },
  { id: 'CPN-003', code: 'WINTER23', discount: '15%', type: 'Percentage', status: 'Expired', expiry: '2024-02-28', usage: 320 },
];

export const destinationPerformance = [
  { name: 'Swiss Alps', bookings: 450, revenue: 540000, color: '#3b82f6' },
  { name: 'Tokyo', bookings: 380, revenue: 912000, color: '#10b981' },
  { name: 'Bali', bookings: 320, revenue: 304000, color: '#f59e0b' },
  { name: 'Paris', bookings: 290, revenue: 435000, color: '#ef4444' },
  { name: 'Iceland', bookings: 210, revenue: 441000, color: '#8b5cf6' },
];

