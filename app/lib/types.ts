export const APP_TYPES = true;

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: 'admin' | 'customer' | 'agent';
  avatar?: string | null;
}

export interface Tour {
  id: string | number;
  name: string;
  title?: string;
  location: string;
  price: number;
  rating: number;
  image: string;
  description?: string;
  duration?: string;
  groupSize?: string;
}

export interface Booking {
  id: string;
  tour: string;
  customer?: string;
  customer_email?: string;
  status: string;
  date: string;
  price?: number;
  amount?: string | number;
  image?: string;
}

export interface Enquiry {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  date: string;
}

export interface Ticket {
  id: string | number;
  subject: string;
  description?: string;
  status: string;
  priority: string;
  date: string;
  customer_name?: string;
  customer?: string;
  customer_email?: string;
}

export interface Agent extends User {
  status: string;
  joined: string;
  totalTours: number;
  totalEarnings: string | number;
}

export interface Customer extends User {
  status: string;
  joined: string;
  totalBookings: number;
  totalSpent: string | number;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password?: string;
  role: 'customer' | 'agent' | 'admin';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface Payment {
  id: string;
  bookingId: string;
  date: string;
  amount: string | number;
  method: string;
  status: string;
}
