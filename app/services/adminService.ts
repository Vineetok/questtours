import { api } from './api';

export const adminService = {
  getStats: () => {
    return api.get<any>('/admin/stats');
  },
  
  getAgents: () => {
    return api.get<any[]>('/admin/agents');
  },
  
  getCustomers: () => {
    return api.get<any[]>('/admin/customers');
  },
  
  getBookings: () => {
    return api.get<any[]>('/admin/bookings');
  },
  
  getSupportRequests: () => {
    return api.get<any[]>('/admin/support-requests');
  },
  
  getEnquiries: () => {
    return api.get<any[]>('/admin/enquiries');
  },
  
  updateEnquiryStatus: (id: number, status: string) => {
    return api.patch<any>(`/admin/enquiries/${id}`, { status });
  },
};
