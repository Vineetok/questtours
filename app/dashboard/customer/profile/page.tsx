'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { ProfileView } from '@/components/profile-view';
import { useUser } from '@/hooks/use-user';

export default function CustomerProfilePage() {
  const { user } = useUser();

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
