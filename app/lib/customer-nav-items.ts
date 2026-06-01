import {
  LayoutDashboard,
  User as UserIcon,
  Map,
  Calendar,
  Heart,
  CreditCard,
  Ticket as TicketIcon,
} from 'lucide-react';

export const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: Calendar },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: CreditCard },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Support Tickets', url: '/dashboard/customer/tickets', icon: TicketIcon },
  { title: 'Explore', url: '/dashboard/customer/explore', icon: Map },
];
