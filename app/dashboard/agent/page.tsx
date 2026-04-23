'use client';;
import { DashboardLayout } from '@/components/dashboard-layout';
import { useUser } from '@/hooks/use-user';
import {
  LayoutDashboard,
  Users,
  MessageSquare,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  TrendingUp,
  IndianRupee,
} from 'lucide-react';
import { agentStats, agentBookings } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/display/table';

const agentNavItems = [
  { title: 'Dashboard', url: '/dashboard/agent', icon: LayoutDashboard },
  { title: 'My Bookings', url: '#', icon: Calendar },
  { title: 'Messages', url: '#', icon: MessageSquare },
  { title: 'Customers', url: '#', icon: Users },
];

export default function AgentDashboard() {
  const { user } = useUser();
  
  return (
    <DashboardLayout
      role="agent"
      userName={user?.name || "Agent User"}
      userEmail={user?.email || "agent@questtours.com"}
      navItems={agentNavItems}
    >
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agent Portal</h1>
            <p className="text-gray-500">Manage your bookings and interact with travelers.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              Generate Report
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              Create Custom Quote
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {agentStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <div className="h-4 w-4 text-gray-400">
                  {stat.label === 'Commision' ? <IndianRupee className="h-4 w-4" /> : <TrendingUp className="h-4 w-4" />}
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-blue-600 font-medium mt-1">
                  {stat.change} in last 30 days
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Booking Requests Table */}
          <Card className="md:col-span-2 border-none shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Booking Requests</CardTitle>
                <CardDescription>Action required on {agentBookings.filter(b => b.status === 'Pending').length} requests.</CardDescription>
              </div>
              <Button variant="link" className="text-blue-600">View All</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-gray-100">
                    <TableHead>Customer</TableHead>
                    <TableHead>Package</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentBookings.map((booking) => (
                    <TableRow key={booking.id} className="border-gray-50 hover:bg-gray-50/50 transition-colors">
                      <TableCell className="font-medium">{booking.customer}</TableCell>
                      <TableCell>{booking.tour}</TableCell>
                      <TableCell>{booking.date}</TableCell>
                      <TableCell>
                        <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={
                          booking.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-yellow-200' : ''
                        }>
                          {booking.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {booking.status === 'Pending' ? (
                          <div className="flex justify-end gap-2">
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-green-600 hover:bg-green-50">
                              <CheckCircle2 className="h-4 w-4" />
                            </Button>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:bg-red-50">
                              <XCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <Button variant="ghost" size="sm">Manage</Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Activity/Communications Feed */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Communications</CardTitle>
              <CardDescription>Recent messages from travelers.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: 'Bob Smith', msg: 'Is the flight included in the package?', time: '10m ago' },
                  { user: 'Alice Johnson', msg: 'Sent you the requested documents.', time: '2h ago' },
                  { user: 'Charlie Brown', msg: 'Interested in the Safari package for 4 people.', time: '5h ago' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs shrink-0">
                      {item.user[0]}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-semibold">{item.user}</p>
                        <span className="text-[10px] text-gray-400">{item.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-2">{item.msg}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-gray-50 text-blue-600 hover:bg-blue-100 border-none">
                Open Messenger
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Calendar Preview / Timeline */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>Upcoming Tours Timeline</CardTitle>
            <CardDescription>Your schedule for the next 14 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-24 bg-gray-50 rounded-xl border border-dashed border-gray-200 flex items-center justify-center">
              <div className="text-center">
                <Clock className="h-6 w-6 text-gray-300 mx-auto mb-2" />
                <p className="text-sm text-gray-400 font-medium">Timeline visualization coming soon</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}

