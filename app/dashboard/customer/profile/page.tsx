'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  LayoutDashboard, 
  Map, 
  Heart, 
  History, 
  Calendar as CalendarIcon,
  User as UserIcon
} from 'lucide-react';

import { ProfileView } from '@/components/profile-view';
import { getUserData } from '@/lib/auth';

const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
];

export default function CustomerProfilePage() {
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);
  }, []);

  return (
    <DashboardLayout 
      role="customer" 
      userName={user?.name || "Customer User"} 
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Profile</h1>
          <p className="text-gray-500">Manage your personal information and preferences.</p>
        </div>

        <ProfileView />
      </div>
    </DashboardLayout>
  );
}
