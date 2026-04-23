import {
  LayoutDashboard,
  Calendar as CalendarIcon,
  Heart,
  History,
  User as UserIcon,
  Map,
  Ticket
} from 'lucide-react';

export const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
  { title: 'Tickets', url: '/dashboard/customer/tickets', icon: Ticket },
];
