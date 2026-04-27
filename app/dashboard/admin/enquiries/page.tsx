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
  RefreshCw,
  Inbox,
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
import { cn } from '@/lib/utils';

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
    } catch {
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
    } catch {
      toast.error('Failed to update enquiry status');
    }
  };

  const filteredEnquiries = enquiries.filter(enquiry => 
    enquiry.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    enquiry.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Helper for dynamic status colors
  const getStatusStyles = (status: string) => {
    switch (status.toLowerCase()) {
      case 'new': 
        return "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100";
      case 'contacted': 
        return "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100";
      default: 
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin User"}
      userEmail={user?.email || "admin@questtours.com"}
      navItems={adminNavItems}
    >
      {/* Container length remains full as per original */}
      <div className="space-y-8 pb-10">
        
        {/* Header Section with subtle color */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <Inbox className="h-6 w-6 text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">User Enquiries</h1>
                <p className="text-slate-500 font-medium">Manage and respond to customer messages.</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
             <Button 
                variant="outline" 
                size="icon" 
                onClick={fetchEnquiries} 
                className="shrink-0 border-slate-200 hover:bg-blue-50 hover:text-blue-600 transition-colors"
             >
                <RefreshCw className={cn("h-4 w-4", loading && "animate-spin")} />
             </Button>
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search name, email..."
                  className="pl-10 border-slate-200 focus:border-blue-400 focus:ring-blue-100 bg-white shadow-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
          </div>
        </div>

        {/* Desktop Table - Enhanced Colors */}
        <div className="hidden md:block">
          <Card className="border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden bg-white">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-slate-50/80 border-b border-slate-200">
                  <TableRow>
                    <TableHead className="font-bold text-slate-700 py-4">User Info</TableHead>
                    <TableHead className="font-bold text-slate-700">Subject</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Date</TableHead>
                    <TableHead className="font-bold text-slate-700 text-center">Status</TableHead>
                    <TableHead className="text-right font-bold text-slate-700 pr-8">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array(5).fill(0).map((_, i) => <TableSkeleton key={i} />)
                  ) : filteredEnquiries.length === 0 ? (
                    <EmptyState />
                  ) : (
                    filteredEnquiries.map((enquiry) => (
                      <TableRow key={enquiry.id} className="group hover:bg-blue-50/30 transition-colors border-b border-slate-100 last:border-0">
                        <TableCell className="py-4">
                          <div className="flex flex-col">
                            <span className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                                {enquiry.firstName} {enquiry.lastName}
                            </span>
                            <span className="text-xs text-slate-500">{enquiry.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-slate-600 line-clamp-1 max-w-[300px]">{enquiry.subject}</span>
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm text-center tabular-nums">{enquiry.date}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={cn("rounded-full px-3 py-0.5 border shadow-sm", getStatusStyles(enquiry.status))}>
                            {enquiry.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right pr-8">
                          <EnquiryDetailDialog enquiry={enquiry} onUpdateStatus={handleUpdateStatus} colorClass={getStatusStyles(enquiry.status)} />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Mobile View - Visual Indicators added */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {loading ? (
             Array(3).fill(0).map((_, i) => <MobileSkeleton key={i} />)
          ) : filteredEnquiries.length === 0 ? (
            <EmptyState />
          ) : (
            filteredEnquiries.map((enquiry) => (
              <Card key={enquiry.id} className="border-none shadow-md bg-white relative overflow-hidden group">
                {/* Status Indicator Bar */}
                <div className={cn(
                    "absolute left-0 top-0 bottom-0 w-1.5",
                    enquiry.status === 'New' ? 'bg-amber-400' : 'bg-emerald-400'
                )} />
                
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-3 pl-2">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 text-lg">{enquiry.firstName} {enquiry.lastName}</span>
                      <span className="text-xs text-blue-600 font-medium">{enquiry.email}</span>
                    </div>
                    <Badge className={cn("text-[10px] uppercase font-bold", getStatusStyles(enquiry.status))}>
                      {enquiry.status}
                    </Badge>
                  </div>
                  <div className="mb-5 pl-2">
                    <p className="text-sm font-semibold text-slate-700 line-clamp-2 leading-relaxed">{enquiry.subject}</p>
                    <p className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <RefreshCw className="h-3 w-3" /> Received on {enquiry.date}
                    </p>
                  </div>
                  <EnquiryDetailDialog enquiry={enquiry} onUpdateStatus={handleUpdateStatus} isMobile colorClass={getStatusStyles(enquiry.status)} />
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

function EnquiryDetailDialog({ enquiry, onUpdateStatus, isMobile, colorClass }: { enquiry: Enquiry, onUpdateStatus: (id: number, s: string) => void, isMobile?: boolean, colorClass: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant={isMobile ? "secondary" : "ghost"} 
          className={cn(
            isMobile ? "w-full bg-slate-100 hover:bg-blue-600 hover:text-white font-bold transition-all" : 
            "text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-semibold"
          )}
        >
          <Eye className="h-4 w-4 mr-2" /> View Enquiry
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[650px] w-[95vw] rounded-3xl border-none shadow-2xl p-0 overflow-hidden">
        <div className="bg-blue-600 p-6 md:p-8 text-white relative">
            <div className="absolute top-4 right-12 opacity-10">
                <Mail className="h-24 w-24" />
            </div>
            <div className="flex items-center gap-3 mb-4">
                <Badge className={cn("bg-white/20 border-white/30 text-white backdrop-blur-md rounded-full px-4", colorClass.includes('amber') ? 'text-amber-200' : 'text-emerald-200')}>
                    {enquiry.status}
                </Badge>
                <span className="text-xs text-blue-100">{enquiry.date}</span>
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-bold leading-tight mb-2">
                {enquiry.subject}
            </DialogTitle>
            <DialogDescription className="text-blue-50 flex flex-col gap-1">
                <span className="opacity-80">From:</span>
                <span className="text-lg font-medium text-white">{enquiry.firstName} {enquiry.lastName}</span>
                <span className="text-sm opacity-90">{enquiry.email}</span>
            </DialogDescription>
        </div>

        <div className="p-6 md:p-8 bg-white">
          <div className="mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <div className="h-1 w-6 bg-blue-600 rounded-full" />
                Customer Message
            </h4>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed italic">
                    &quot;{enquiry.message}&quot;
                </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t border-slate-100">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto rounded-xl h-11 border-slate-200 text-slate-600 hover:bg-slate-50"
              onClick={() => onUpdateStatus(enquiry.id, 'Contacted')}
              disabled={enquiry.status === 'Contacted'}
            >
              Mark as Contacted
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto rounded-xl h-11 shadow-lg shadow-blue-200 transition-all active:scale-95"
              onClick={() => window.location.href = `mailto:${enquiry.email}`}
            >
              Reply via Email
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Visual Helpers
function TableSkeleton() {
  return (
    <TableRow className="animate-pulse">
      <TableCell><div className="h-12 w-48 bg-slate-100 rounded-xl"></div></TableCell>
      <TableCell><div className="h-6 w-64 bg-slate-50 rounded-lg"></div></TableCell>
      <TableCell><div className="h-6 w-20 bg-slate-50 rounded-lg mx-auto"></div></TableCell>
      <TableCell><div className="h-6 w-24 bg-slate-100 rounded-full mx-auto"></div></TableCell>
      <TableCell><div className="h-10 w-24 bg-slate-100 rounded-xl ml-auto"></div></TableCell>
    </TableRow>
  );
}

function MobileSkeleton() {
  return (
    <Card className="animate-pulse border-none shadow-sm">
      <CardContent className="p-5 space-y-4">
        <div className="flex justify-between"><div className="h-6 w-1/2 bg-slate-100 rounded"></div><div className="h-5 w-16 bg-slate-100 rounded-full"></div></div>
        <div className="h-4 w-1/3 bg-slate-50 rounded"></div>
        <div className="h-12 w-full bg-slate-50 rounded-xl"></div>
        <div className="h-10 w-full bg-slate-100 rounded-xl"></div>
      </CardContent>
    </Card>
  );
}

function EmptyState() {
  return (
    <div className="py-24 flex flex-col items-center justify-center text-center">
      <div className="bg-blue-50 p-6 rounded-full mb-6 border border-blue-100">
        <Mail className="h-12 w-12 text-blue-300" />
      </div>
      <h3 className="text-xl font-bold text-slate-900">No enquiries found</h3>
      <p className="text-slate-500 max-w-sm mx-auto mt-2">
        We couldn&apos;t find any messages. If you have active filters, try clearing them to see all enquiries.
      </p>
    </div>
  );
}