'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminService } from '@/services/adminService';
import { getUserData } from '@/lib/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/display/table';
import { Badge } from '@/components/ui/display/badge';
import { Avatar, AvatarFallback } from '@/components/ui/display/avatar';
import { Input } from '@/components/ui/inputs/input';
import { adminNavItems } from '@/lib/admin-nav-items';
import {
  Users,
  Search,
  MoreVertical,
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { TicketDetailsDialog } from '@/components/ticket-details-dialog';

export default function CustomersPage() {
  const [customerList, setCustomerList] = React.useState<any[]>([]);
  const [bookingList, setBookingList] = React.useState<any[]>([]);
  const [supportList, setSupportList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);

    const fetchData = async () => {
      setLoading(true);
      try {
        const [customers, bookings, support] = await Promise.all([
          adminService.getCustomers(),
          adminService.getBookings(),
          adminService.getSupportRequests()
        ]);

        setCustomerList(customers);
        setBookingList(bookings);
        setSupportList(support);

      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Connection error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchSupportRequests = async () => {
    try {
      const support = await adminService.getSupportRequests();
      setSupportList(support);
    } catch (error) {
      console.error('Error fetching support requests:', error);
    }
  };

  const filteredCustomers = customerList.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin User"}
      userEmail={user?.email || "admin@questtours.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Customer Management</h1>
          <p className="text-gray-500">Manage your customers, their bookings, and support requests.</p>
        </div>

        <Tabs defaultValue="profiles" className="space-y-4">
          <TabsList className="bg-gray-100 p-1">
            <TabsTrigger value="profiles">User Profiles</TabsTrigger>
            <TabsTrigger value="bookings">Booking History</TabsTrigger>
            <TabsTrigger value="support">Support Requests</TabsTrigger>
          </TabsList>

          {/* User Profiles Tab */}
          <TabsContent value="profiles" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="relative w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search customers..."
                  className="pl-9 bg-white"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">Add Customer</Button>
            </div>

            <Card className="border-none shadow-sm">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Total Bookings</TableHead>
                      <TableHead>Total Spent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <TableRow key={i} className="animate-pulse">
                          <TableCell><div className="h-10 w-40 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-24 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-10 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-20 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-10 bg-gray-100 rounded ml-auto"></div></TableCell>
                        </TableRow>
                      ))
                    ) : filteredCustomers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                          No customers found matching "{searchQuery}".
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCustomers.map((customer) => (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-blue-100 text-blue-600 font-bold">
                                  {customer.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{customer.name}</div>
                                <div className="text-xs text-gray-500">{customer.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              customer.status === 'Active' ? 'default' :
                                customer.status === 'Inactive' ? 'secondary' : 'destructive'
                            }>
                              {customer.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-gray-600">{customer.joined}</TableCell>
                          <TableCell>{customer.totalBookings}</TableCell>
                          <TableCell className="font-medium text-blue-600">{customer.totalSpent}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      )))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking History Tab */}
          <TabsContent value="bookings" className="space-y-4">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>All Bookings</CardTitle>
                <CardDescription>Comprehensive history of all customer bookings.</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Booking ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Tour</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {loading ? (
                      Array(5).fill(0).map((_, i) => (
                        <TableRow key={i} className="animate-pulse">
                          <TableCell><div className="h-6 w-20 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-32 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-40 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-24 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                          <TableCell><div className="h-6 w-16 bg-gray-100 rounded ml-auto"></div></TableCell>
                        </TableRow>
                      ))
                    ) : bookingList.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                          No bookings found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      bookingList.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.id}</TableCell>
                          <TableCell>{booking.customer}</TableCell>
                          <TableCell>{booking.tour}</TableCell>
                          <TableCell>{booking.date}</TableCell>
                          <TableCell>
                            <Badge variant={
                              booking.status === 'Confirmed' ? 'default' :
                                booking.status === 'Pending' ? 'secondary' :
                                  booking.status === 'Completed' ? 'default' : 'destructive'
                            }>
                              {booking.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">{booking.amount}</TableCell>
                        </TableRow>
                      )))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Support Requests Tab */}
          <TabsContent value="support" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <Card key={i} className="border-none shadow-sm animate-pulse">
                    <CardHeader className="pb-2">
                      <div className="h-4 w-20 bg-gray-100 rounded"></div>
                      <div className="h-6 w-48 bg-gray-100 rounded mt-2"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="h-10 bg-gray-100 rounded mb-4"></div>
                      <div className="h-8 bg-gray-100 rounded"></div>
                    </CardContent>
                  </Card>
                ))
              ) : supportList.length === 0 ? (
                <div className="col-span-3 text-center py-20 bg-white rounded-xl text-gray-500">
                  No support requests found.
                </div>
              ) : (
                supportList.map((request) => (
                  <Card key={request.id} className="border-none shadow-sm hover:ring-1 hover:ring-blue-100 transition-all">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <Badge variant={
                          request.priority === 'High' ? 'destructive' :
                            request.priority === 'Medium' ? 'default' : 'secondary'
                        } className="text-[10px]">
                          {request.priority} Priority
                        </Badge>
                        <span className="text-xs text-gray-500">{request.date}</span>
                      </div>
                      <CardTitle className="text-lg mt-2">{request.subject}</CardTitle>
                      <CardDescription>Request ID: {request.id}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold">
                          {request.customer?.[0] || 'U'}
                        </div>
                        <span className="text-sm font-medium">{request.customer}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={
                          request.status === 'Open' ? "bg-blue-50 text-blue-700 border-blue-100" :
                            request.status === 'Resolved' ? "bg-green-50 text-green-700 border-green-100" :
                              "bg-gray-50 text-gray-700 border-gray-100"
                        }>
                          {request.status}
                        </Badge>
                        <TicketDetailsDialog 
                          ticket={request}
                          onUpdate={fetchSupportRequests}
                          trigger={
                            <Button variant="link" className="text-blue-600 text-sm h-auto p-0">View Details</Button>
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>
                )))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

