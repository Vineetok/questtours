'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { ProfileView } from '@/components/profile-view';

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
