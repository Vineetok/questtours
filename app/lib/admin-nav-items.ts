import {
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  TicketPercent,
  TrendingUp,
  UserCircle,
  Mail,
  Ticket
} from 'lucide-react';

export const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Agents', url: '/dashboard/admin/agents', icon: Briefcase },
  { title: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Offers', url: '/dashboard/admin/offers', icon: TicketPercent },
  { title: 'Tickets', url: '/dashboard/admin/tickets', icon: Ticket },
  { title: 'Enquiries', url: '/dashboard/admin/enquiries', icon: Mail },
  { title: 'Analytics', url: '/dashboard/admin/analytics', icon: TrendingUp },
  { title: 'Profile', url: '/dashboard/admin/profile', icon: UserCircle },
];
