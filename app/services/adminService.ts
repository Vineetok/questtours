import { api } from './api';
import { Agent, Customer, Booking, Ticket, Enquiry, Tour, Package, Plan } from '@/lib/types';

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

  // Tours Management
  getTours: () => api.get<Tour[]>('/tours'),
  addTour: (tour: Partial<Tour>) => api.post<Tour>('/admin/tours', tour),
  updateTour: (id: string | number, tour: Partial<Tour>) => api.put<Tour>(`/admin/tours/${id}`, tour),
  deleteTour: (id: string | number) => api.delete<{ message: string }>(`/admin/tours/${id}`),

  // Packages Management
  getPackages: () => api.get<Package[]>('/packages'),
  addPackage: (pkg: Partial<Package>) => api.post<Package>('/admin/packages', pkg),
  updatePackage: (id: string | number, pkg: Partial<Package>) => api.put<Package>(`/admin/packages/${id}`, pkg),
  deletePackage: (id: string | number) => api.delete<{ message: string }>(`/admin/packages/${id}`),

  // Plans (Itineraries) Management
  getPlans: async () => {
    const plans = await api.get<Plan[]>('/plans');
    return plans.map(p => {
      const title = (p.title || '').toLowerCase();
      if (title.includes('bhutan')) return { ...p, image: '/tours/bhutan-override.png' };
      if (title.includes('gir forest')) return { ...p, image: '/tours/gujarat-gir.png' };
      if (title.includes('ahmedabad heritage')) return { ...p, image: '/tours/gujarat-ahmedabad.png' };
      if (title.includes('dwarka') || title.includes('somnath')) return { ...p, image: '/tours/gujarat-dwarka.png' };
      if (title.includes('statue of unity')) return { ...p, image: '/tours/gujarat-statue.png' };
      if (title.includes('rann utsav')) return { ...p, image: '/tours/gujarat-rann.png' };
      // Catch-all for any other Gujarat plans with generic or missing images
      if (title.includes('gujarat')) return { ...p, image: '/tours/dest/gujarat.png' };
      return p;
    });
  },
  addPlan: (plan: Partial<Plan>) => api.post<Plan>('/admin/plans', plan),
  updatePlan: (id: string | number, plan: Partial<Plan>) => api.put<Plan>(`/admin/plans/${id}`, plan),
  deletePlan: (id: string | number) => api.delete<{ message: string }>(`/admin/plans/${id}`),
};
