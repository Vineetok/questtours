import {
  LayoutDashboard,
  Users,
  Briefcase,
  Ticket,
  Map,
  Package as PackageIcon,
  ListTodo,
  UploadCloud,
  Mail
} from 'lucide-react';

export const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Master Import', url: '/dashboard/admin/import', icon: UploadCloud },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Agents', url: '/dashboard/admin/agents', icon: Briefcase },
  { title: 'Enquiries', url: '/dashboard/admin/enquiries', icon: Mail },
  { title: 'Support Tickets', url: '/dashboard/admin/tickets', icon: Ticket },
  { title: 'Manage Tours', url: '/dashboard/admin/tours', icon: Map },
  { title: 'Manage Packages', url: '/dashboard/admin/packages', icon: PackageIcon },
  { title: 'Manage Plans', url: '/dashboard/admin/plans', icon: ListTodo },
];
