'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  Download,
  CreditCard,
  Search,
  Filter,
  History
} from 'lucide-react';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardHeader } from '@/components/ui/display/card';
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
import { Input } from '@/components/ui/inputs/input';
import { userService } from '@/services/userService';
import { toast } from 'sonner';
import { Payment } from '@/lib/types';

export default function CustomerPaymentsPage() {
  const { user } = useUser();
  const [payments, setPayments] = React.useState<Payment[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    let isMounted = true;
    const fetchPaymentsData = async () => {
      try {
        const data = await userService.getPayments();
        if (isMounted) {
          setPayments(data);
        }
      } catch (error: unknown) {
        if (isMounted) {
          toast.error('Failed to load payment history');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchPaymentsData();
    return () => { isMounted = false; };
  }, []);

  const filteredPayments = payments.filter(p => 
    p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.bookingId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      role="customer" 
      userName={user?.name || "Customer User"} 
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Payment History</h1>
            <p className="text-gray-500">View and manage your transactions and invoices.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" /> Export All (CSV)
          </Button>
        </div>

        <Card className="border-none shadow-sm bg-white">
          <CardHeader className="pb-0">
            <div className="flex flex-col md:flex-row md:items-center gap-4 py-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search transactions..." 
                  className="pl-10 h-10 bg-gray-50/50 border-gray-100" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="h-10 gap-2 font-medium">
                <Filter className="h-4 w-4" /> Filter
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="rounded-xl border border-gray-100 overflow-hidden">
              <Table>
                <TableHeader className="bg-gray-50/50">
                  <TableRow className="border-gray-100 hover:bg-transparent">
                    <TableHead className="font-semibold text-gray-700">Transaction ID</TableHead>
                    <TableHead className="font-semibold text-gray-700">Booking ID</TableHead>
                    <TableHead className="font-semibold text-gray-700">Date</TableHead>
                    <TableHead className="font-semibold text-gray-700">Amount</TableHead>
                    <TableHead className="font-semibold text-gray-700">Method</TableHead>
                    <TableHead className="font-semibold text-gray-700">Status</TableHead>
                    <TableHead className="font-semibold text-right text-gray-700">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array(3).fill(0).map((_, i) => (
                      <TableRow key={i} className="animate-pulse">
                        <TableCell><div className="h-4 w-16 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-4 w-16 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-4 w-24 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-4 w-20 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-4 w-24 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-6 w-20 bg-gray-100 rounded"></div></TableCell>
                        <TableCell><div className="h-8 w-20 bg-gray-100 rounded ml-auto"></div></TableCell>
                      </TableRow>
                    ))
                  ) : filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-10 text-gray-500">
                        No transactions found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id} className="border-gray-100 hover:bg-gray-50/50 transition-colors">
                        <TableCell className="font-mono text-xs text-gray-500">{payment.id}</TableCell>
                        <TableCell className="font-medium">{payment.bookingId}</TableCell>
                        <TableCell className="text-gray-600">{payment.date}</TableCell>
                        <TableCell className="font-bold text-gray-900">{payment.amount}</TableCell>
                        <TableCell className="text-gray-600">
                          <div className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            {payment.method}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              payment.status === 'Succeeded' 
                                ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none shadow-none'
                                : payment.status === 'Refunded'
                                ? 'bg-blue-100 text-blue-700 hover:bg-blue-100 border-none shadow-none'
                                : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100 border-none shadow-none'
                            }
                          >
                            {payment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" className="h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                            <Download className="h-4 w-4 mr-1.5" /> Invoice
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
            {!loading && filteredPayments.length === 0 && (
              <div className="py-20 text-center">
                <History className="h-12 w-12 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-500">No transactions found.</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Security Info Card */}
        <div className="rounded-2xl bg-blue-600 p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">Secure Payments & Data</h3>
            <p className="text-blue-100 max-w-lg">All your financial transactions are protected by industry-standard encryption and processed through certified gateways.</p>
          </div>
          <div className="flex gap-4 relative z-10 shrink-0">
             <div className="h-12 w-20 bg-white/10 rounded-lg flex items-center justify-center font-bold text-white/40">VISA</div>
             <div className="h-12 w-20 bg-white/10 rounded-lg flex items-center justify-center font-bold text-white/40">MASTER</div>
             <div className="h-12 w-20 bg-white/10 rounded-lg flex items-center justify-center font-bold text-white/40">STRIPE</div>
          </div>
          <div className="absolute right-0 top-0 opacity-10 -translate-y-1/4 translate-x-1/4">
            <CreditCard className="h-64 w-64" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
