import {
  LayoutDashboard,
  User as UserIcon,
  Map,
  History,
  Ticket
} from 'lucide-react';

export const customerNavItems = [
  { title: 'My Itineraries', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'Past Trips', url: '/dashboard/customer/history', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Support', url: '/dashboard/customer/tickets', icon: Ticket },
];
