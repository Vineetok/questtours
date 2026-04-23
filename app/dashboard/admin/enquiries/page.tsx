'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Mail,
  Search,
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  TicketPercent,
  TrendingUp,
  UserCircle,
  Eye,
} from 'lucide-react';
import { adminService } from '@/services/adminService';
import { useUser } from '@/hooks/use-user';
import { Enquiry } from '@/lib/types';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/display/card';
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
import { Input } from '@/components/ui/inputs/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";

const adminNavItems = [
  { title: 'Overview', url: '/dashboard/admin', icon: LayoutDashboard },
  { title: 'Customers', url: '/dashboard/admin/customers', icon: Users },
  { title: 'Agents', url: '/dashboard/admin/agents', icon: Briefcase },
  { title: 'Payments', url: '/dashboard/admin/payments', icon: CreditCard },
  { title: 'Offers', url: '/dashboard/admin/offers', icon: TicketPercent },
  { title: 'Enquiries', url: '/dashboard/admin/enquiries', icon: Mail },
  { title: 'Analytics', url: '/dashboard/admin/analytics', icon: TrendingUp },
  { title: 'Profile', url: '/dashboard/admin/profile', icon: UserCircle },
];

export default function EnquiriesPage() {
  const { user } = useUser();
  const [enquiries, setEnquiries] = React.useState<Enquiry[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  const fetchEnquiries = React.useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.getEnquiries();
      setEnquiries(data);
    } catch (error: unknown) {
      toast.error('Failed to load enquiries');
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    fetchEnquiries();
  }, [fetchEnquiries]);

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await adminService.updateEnquiryStatus(id, status);
      toast.success(`Enquiry marked as ${status}`);
      fetchEnquiries();
    } catch (error: unknown) {
      toast.error('Failed to update enquiry status');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => 
    enquiry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin User"}
      userEmail={user?.email || "admin@questtours.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">User Enquiries</h1>
            <p className="text-gray-500">View and manage messages from the Contact Us form.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search enquiries..."
              className="pl-9 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card className="border-none shadow-sm">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell><div className="h-10 w-40 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-48 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-24 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-10 bg-gray-100 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredEnquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-20 text-gray-500">
                      <div className="flex flex-col items-center gap-2">
                        <Mail className="h-12 w-12 text-gray-200" />
                        <p>No enquiries found.</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredEnquiries.map((enquiry) => (
                    <TableRow key={enquiry.id}>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-gray-900">{enquiry.firstName} {enquiry.lastName}</span>
                          <span className="text-xs text-gray-500">{enquiry.email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm text-gray-600 line-clamp-1">{enquiry.subject}</span>
                      </TableCell>
                      <TableCell className="text-gray-600 text-sm">{enquiry.date}</TableCell>
                      <TableCell>
                        <Badge variant={
                          enquiry.status === 'New' ? 'default' :
                            enquiry.status === 'Contacted' ? 'secondary' : 'outline'
                        }>
                          {enquiry.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            >
                              <Eye className="h-4 w-4 mr-1" /> View
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge>{enquiry.status}</Badge>
                                <span className="text-xs text-gray-500">{enquiry.date}</span>
                              </div>
                              <DialogTitle className="text-2xl">{enquiry.subject}</DialogTitle>
                              <DialogDescription>
                                From: {enquiry.firstName} {enquiry.lastName} ({enquiry.email})
                              </DialogDescription>
                            </DialogHeader>
                            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Message</h4>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {enquiry.message}
                              </p>
                            </div>
                            <div className="mt-8 flex justify-end gap-3">
                              <Button 
                                variant="outline" 
                                onClick={() => handleUpdateStatus(enquiry.id, 'Contacted')}
                                disabled={enquiry.status === 'Contacted'}
                              >
                                Mark as Contacted
                              </Button>
                              <Button 
                                className="bg-blue-600 hover:bg-blue-700"
                                onClick={() => window.location.href = `mailto:${enquiry.email}`}
                              >
                                Reply via Email
                              </Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  )))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
