'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  CreditCard, 
  TicketPercent,
  UserCircle
} from 'lucide-react';
import { ProfileView } from '@/components/profile-view';

const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Offers', url: '/dashboard/admin/offers', icon: TicketPercent },
  { title: 'Analytics', url: '/dashboard/admin/analytics', icon: TrendingUp },
  { title: 'Profile', url: '/dashboard/admin/profile', icon: UserCircle },
];

export default function AdminProfilePage() {
  return (
    <DashboardLayout
      role="admin"
      userName="Admin User"
      userEmail="admin@questtours.com"
      navItems={adminNavItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Profile</h1>
          <p className="text-gray-500">View and manage your administrative profile.</p>
        </div>

        <ProfileView />
      </div>
    </DashboardLayout>
  );
}
