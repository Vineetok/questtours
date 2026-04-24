import { api } from './api';
import { Agent, Customer, Booking, Ticket, Enquiry } from '@/lib/types';

export interface RecentBooking {
  id: string;
  customer: string;
  tour: string;
  date: string;
  status: string;
  amount: string;
}

export interface AdminStats {
  totalCustomers: number;
  totalAgents: number;
  totalTrips: number;
  totalRevenue: number;
  trends: {
    customers: { trend: 'up' | 'down'; change: string };
    agents: { trend: 'up' | 'down'; change: string };
    bookings: { trend: 'up' | 'down'; change: string };
    revenue: { trend: 'up' | 'down'; change: string };
  };
  revenueData: { name: string; total: number }[];
  recentBookings: RecentBooking[];
}

export const adminService = {
  getStats: () => {
    return api.get<AdminStats>('/admin/stats');
  },
  
  getAgents: () => {
    return api.get<{agents:Agent[]}>('/admin/agents');
  },
  
  getCustomers: () => {
    return api.get<Customer[]>('/admin/customers');
  },
  
  getBookings: () => {
    return api.get<Booking[]>('/admin/bookings');
  },
  
  getSupportRequests: () => {
    return api.get<Ticket[]>('/admin/support-requests');
  },
  
  getEnquiries: () => {
    return api.get<Enquiry[]>('/admin/enquiries');
  },
  
  updateEnquiryStatus: (id: number, status: string) => {
    return api.patch<{ message: string; enquiry: Enquiry }>(`/admin/enquiries/${id}`, { status });
  },
};
