'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  TicketPercent,
  Plus,
  Copy,
  ExternalLink,
  Calendar,
  Clock,
  Users,
  LayoutDashboard,
  TrendingUp,
  CreditCard,
  Tag,
  Gift
} from 'lucide-react';
import { coupons } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Offers', url: '/dashboard/admin/offers', icon: TicketPercent },
  { title: 'Analytics', url: '/dashboard/admin/analytics', icon: TrendingUp },
];

export default function OffersPage() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Code copied to clipboard!');
  };

  return (
    <DashboardLayout
      role="admin"
      userName="Admin User"
      userEmail="admin@questtours.com"
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Offers & Discounts</h1>
            <p className="text-gray-500">Manage promotional campaigns, coupon codes, and seasonal deals.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Create New Offer
          </Button>
        </div>

        {/* Featured Seasonal Offers */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-none shadow-sm bg-gradient-to-br from-blue-600 to-blue-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Gift size={120} />
            </div>
            <CardHeader>
              <Badge className="w-fit bg-white/20 hover:bg-white/30 text-white border-none">Active Now</Badge>
              <CardTitle className="text-2xl mt-2">Summer Getaway 2024</CardTitle>
              <CardDescription className="text-blue-100">Up to 25% off on all beach destinations.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4" />
                  <span>Valid until Aug 31, 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">25% OFF</span>
                  <div className="h-10 w-px bg-white/20 mx-2" />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider opacity-70">Code</span>
                    <span className="font-mono font-bold text-lg">BEACH24</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white text-blue-700 hover:bg-blue-50 border-none">
                    Edit Offer
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    View Performance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-gradient-to-br from-purple-600 to-purple-800 text-white overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Tag size={120} />
            </div>
            <CardHeader>
              <Badge className="w-fit bg-white/20 hover:bg-white/30 text-white border-none">Coming Soon</Badge>
              <CardTitle className="text-2xl mt-2">Early Bird Winter Deals</CardTitle>
              <CardDescription className="text-purple-100">Flat ₹2,000 off for bookings made 3 months in advance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4" />
                  <span>Starts in 12 days</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold">₹2,000</span>
                  <div className="h-10 w-px bg-white/20 mx-2" />
                  <div className="flex flex-col">
                    <span className="text-xs uppercase tracking-wider opacity-70">Code</span>
                    <span className="font-mono font-bold text-lg">EARLYWINTER</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm" className="bg-white text-purple-700 hover:bg-purple-50 border-none">
                    Schedule
                  </Button>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coupon Codes Table */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Active Coupon Codes</CardTitle>
            <CardDescription>Monitor usage and manage individual discount codes.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Discount</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Usage</TableHead>
                  <TableHead>Expiry Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="bg-gray-100 px-2 py-1 rounded font-mono text-blue-700 font-bold">
                          {coupon.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-gray-400 hover:text-blue-600"
                          onClick={() => copyToClipboard(coupon.code)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{coupon.discount}</TableCell>
                    <TableCell className="text-gray-600">{coupon.type}</TableCell>
                    <TableCell>
                      <Badge variant={
                        coupon.status === 'Active' ? 'default' :
                          coupon.status === 'Expired' ? 'secondary' : 'destructive'
                      }>
                        {coupon.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{coupon.usage}</span>
                        <span className="text-xs text-gray-400">uses</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-500 text-sm">{coupon.expiry}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
