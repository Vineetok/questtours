'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  LayoutDashboard,
  Users,
  Map,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  MoreVertical,
  Plus,
  CreditCard,
  TicketPercent,
  UserCircle,
  Briefcase
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { adminService } from '@/services/adminService';
import { getUserData } from '@/lib/auth';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell
} from 'recharts';

const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Agents', url: '/dashboard/admin/agents', icon: Briefcase },
  { title: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Offers', url: '/dashboard/admin/offers', icon: TicketPercent },
  { title: 'Analytics', url: '/dashboard/admin/analytics', icon: TrendingUp },
  { title: 'Profile', url: '/dashboard/admin/profile', icon: UserCircle },
];

export default function AdminDashboard() {
  const [stats, setStats] = React.useState<any>(null);
  const [revenueData, setRevenueData] = React.useState<any[]>([]);
  const [recentBookings, setRecentBookings] = React.useState<any[]>([]);
  const [user, setUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);

    const fetchDashboardData = async () => {
      try {
        const data = await adminService.getStats();
        setStats(data);
        setRevenueData(data.revenueData || []);
        setRecentBookings(data.recentBookings || []);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statsConfig = React.useMemo(() => {
    if (!stats) return [];
    return [
      {
        label: 'Total Revenue',
        value: `₹${stats.totalRevenue.toLocaleString()}`,
        change: stats.trends.revenue.change,
        trend: stats.trends.revenue.trend,
        icon: TrendingUp,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
      },
      {
        label: 'Trips Done',
        value: stats.totalTrips.toLocaleString(),
        change: stats.trends.bookings.change,
        trend: stats.trends.bookings.trend,
        icon: TicketPercent,
        color: 'text-purple-600',
        bg: 'bg-purple-50'
      },
      {
        label: 'Active Customers',
        value: stats.totalCustomers.toLocaleString(),
        change: stats.trends.customers.change,
        trend: stats.trends.customers.trend,
        icon: Users,
        color: 'text-teal-600',
        bg: 'bg-teal-50'
      },
      {
        label: 'Active Agents',
        value: stats.totalAgents.toLocaleString(),
        change: stats.trends.agents.change,
        trend: stats.trends.agents.trend,
        icon: Briefcase,
        color: 'text-orange-600',
        bg: 'bg-orange-50'
      }
    ];
  }, [stats]);
  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin User"}
      userEmail={user?.email || "admin@questtours.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-gray-500">Welcome back, here's what's happening today.</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="mr-2 h-4 w-4" /> Add New Tour
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <Card key={i} className="border-none shadow-sm animate-pulse">
                <CardHeader className="pb-2">
                  <div className="h-4 w-24 bg-gray-100 rounded"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-8 w-16 bg-gray-100 rounded mb-2"></div>
                  <div className="h-3 w-32 bg-gray-100 rounded"></div>
                </CardContent>
              </Card>
            ))
          ) : (
            statsConfig.map((stat) => (
              <Card key={stat.label} className="border-none shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
                  <div className={`${stat.bg} ${stat.color} p-2 rounded-xl group-hover:scale-110 transition-transform`}>
                    <stat.icon size={16} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <p className={cn(
                    "text-xs flex items-center mt-1 font-medium",
                    stat.trend === 'up' ? "text-teal-600" : "text-red-600"
                  )}>
                    {stat.trend === 'up' ? <ArrowUpRight className="h-3 w-3 mr-1" strokeWidth={3} /> : <ArrowDownRight className="h-3 w-3 mr-1" strokeWidth={3} />}
                    {stat.change} <span className="text-gray-400 font-normal ml-1">from last month</span>
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          {/* Revenue Chart */}
          <Card className="col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Revenue Overview</CardTitle>
              <CardDescription>Monthly revenue growth for the current year.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `Rs. ${value}`}
                    />
                    <Tooltip
                      cursor={{ fill: '#f5f5f5' }}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                    />
                    <Bar dataKey="total" radius={[4, 4, 0, 0]}>
                      {revenueData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={index === revenueData.length - 1 ? '#2563eb' : '#93c5fd'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Bookings */}
          <Card className="col-span-3 border-none shadow-sm">
            <CardHeader>
              <CardTitle>Recent Bookings</CardTitle>
              <CardDescription>You have {recentBookings.length} new bookings this week.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentBookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs">
                      {booking.customer[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{booking.customer}</p>
                      <p className="text-xs text-gray-500 truncate">{booking.tour}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{booking.amount}</p>
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="text-[10px] h-4">
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" className="w-full mt-4 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                View All Bookings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Table */}
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Management Overview</CardTitle>
              <CardDescription>A detailed look at recent system activity.</CardDescription>
            </div>
            <Button variant="outline" size="sm">Download Report</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Tour</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.tour}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        booking.status === 'Confirmed' ? 'default' :
                          booking.status === 'Pending' ? 'secondary' : 'destructive'
                      }>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">{booking.amount}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
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

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
