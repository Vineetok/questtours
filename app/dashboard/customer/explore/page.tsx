'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { Destinations } from '@/components/destinations';
import { FeaturedPlans } from '@/components/featured-plans';

export default function ExplorePage() {
  const { user } = useUser();

  return (
    <DashboardLayout
      role="customer"
      userName={user?.name || "Traveler"}
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-6 animate-in fade-in duration-700">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Explore Destinations</h1>
          <p className="text-gray-500 text-sm">Discover and book your next dream adventure.</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden py-8">
          <Destinations showAll={true} linkPrefix="/dashboard/customer/explore" />
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <FeaturedPlans linkPrefix="/dashboard/customer/explore" />
        </div>
      </div>
    </DashboardLayout>
  );
}
