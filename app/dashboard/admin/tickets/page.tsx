'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Ticket,
  Search,
  MoreVertical,
  LayoutDashboard,
  Users,
  Briefcase,
  CreditCard,
  TicketPercent,
  TrendingUp,
  UserCircle,
  Mail,
  Eye,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import { ticketService } from '@/services/ticketService';
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
import { Input } from '@/components/ui/inputs/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/inputs/select";
import { adminNavItems } from '@/lib/admin-nav-items';
import { TicketDetailsDialog } from '@/components/ticket-details-dialog';

export default function AdminTicketsPage() {
  const [tickets, setTickets] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [searchQuery, setSearchQuery] = React.useState('');

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await ticketService.getAllTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: number, status: string) => {
    try {
      await ticketService.updateTicketStatus(id, { status });
      toast.success('Ticket status updated');
      fetchTickets();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const filteredTickets = tickets.filter(ticket => 
    (ticket.subject || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ticket.customer_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (ticket.customer_email || '').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin"}
      userEmail={user?.email || "admin@example.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customer Tickets</h1>
            <p className="text-gray-500">Manage support requests and technical issues.</p>
          </div>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search tickets or customers..."
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
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  Array(5).fill(0).map((_, i) => (
                    <TableRow key={i} className="animate-pulse">
                      <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-10 w-40 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-48 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-16 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-20 bg-gray-100 rounded"></div></TableCell>
                      <TableCell><div className="h-6 w-10 bg-gray-100 rounded ml-auto"></div></TableCell>
                    </TableRow>
                  ))
                ) : filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-20 text-gray-500">
                      No tickets found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-xs">T-{String(ticket.id).padStart(3, '0')}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">{ticket.customer_name}</span>
                          <span className="text-xs text-gray-500">{ticket.customer_email}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm font-medium line-clamp-1">{ticket.subject}</span>
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          ticket.priority === 'Urgent' ? 'destructive' :
                          ticket.priority === 'High' ? 'default' : 'secondary'
                        }>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={
                          ticket.status === 'Open' ? "bg-blue-50 text-blue-700 border-blue-100" :
                          ticket.status === 'In Progress' ? "bg-orange-50 text-orange-700 border-orange-100" :
                          ticket.status === 'Resolved' ? "bg-green-50 text-green-700 border-green-100" :
                          "bg-gray-50 text-gray-700 border-gray-100"
                        }>
                          {ticket.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <TicketDetailsDialog 
                          ticket={ticket}
                          onUpdate={fetchTickets}
                          trigger={
                            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Eye className="h-4 w-4 mr-1" /> Manage
                            </Button>
                          }
                        />
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
