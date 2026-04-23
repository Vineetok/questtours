'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  Ticket,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Search,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Heart,
  History,
  User as UserIcon,
  Map
} from 'lucide-react';
import { ticketService, TicketData } from '@/services/ticketService';
import { getUserData } from '@/lib/auth';
import { toast } from 'sonner';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
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

const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
  { title: 'Tickets', url: '/dashboard/customer/tickets', icon: Ticket },
];

export default function CustomerTicketsPage() {
  const [tickets, setTickets] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [user, setUser] = React.useState<any>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const [formData, setFormData] = React.useState<TicketData>({
    subject: '',
    description: '',
    priority: 'Medium'
  });

  React.useEffect(() => {
    const data = getUserData();
    setUser(data);
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const data = await ticketService.getUserTickets();
      setTickets(data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
      toast.error('Failed to load tickets');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await ticketService.createTicket(formData);
      toast.success('Ticket raised successfully!');
      setOpen(false);
      setFormData({ subject: '', description: '', priority: 'Medium' });
      fetchTickets();
    } catch (error) {
      console.error('Error raising ticket:', error);
      toast.error('Failed to raise ticket');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DashboardLayout
      role="customer"
      userName={user?.name || "Customer"}
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
            <p className="text-gray-500">Raise a ticket and track its resolution progress.</p>
          </div>
          
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="mr-2 h-4 w-4" /> Raise New Ticket
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Raise a New Ticket</DialogTitle>
                <DialogDescription>
                  Explain your issue or request in detail. We'll get back to you as soon as possible.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleCreateTicket} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Subject</label>
                  <Input 
                    placeholder="e.g., Payment issue, Tour cancellation" 
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Priority</label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(val) => setFormData({...formData, priority: val})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea 
                    className="w-full min-h-[120px] px-3 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    placeholder="Describe your issue here..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    required
                  />
                </div>
                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                  <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
                    {isSubmitting ? 'Raising Ticket...' : 'Submit Ticket'}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Summary */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Total Tickets</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Ticket className="h-5 w-5 text-blue-600" />
                {tickets.length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Open Tickets</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2 text-orange-600">
                <Clock className="h-5 w-5" />
                {tickets.filter(t => t.status === 'Open' || t.status === 'In Progress').length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardDescription>Resolved</CardDescription>
              <CardTitle className="text-2xl flex items-center gap-2 text-green-600">
                <CheckCircle2 className="h-5 w-5" />
                {tickets.filter(t => t.status === 'Resolved').length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        {/* Tickets List */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle>My Ticket History</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-20" />
                <p>You haven't raised any tickets yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div key={ticket.id} className="p-6 rounded-2xl border border-gray-100 hover:border-blue-100 transition-all group">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{ticket.subject}</h3>
                          <Badge variant={
                            ticket.priority === 'Urgent' ? 'destructive' :
                            ticket.priority === 'High' ? 'default' : 'secondary'
                          } className="text-[10px]">
                            {ticket.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-1">{ticket.description}</p>
                        <div className="flex items-center gap-4 pt-2">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {ticket.date}
                          </span>
                          <span className="text-xs text-gray-400">ID: T-{String(ticket.id).padStart(3, '0')}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={
                          ticket.status === 'Open' ? "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100" :
                          ticket.status === 'In Progress' ? "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100" :
                          ticket.status === 'Resolved' ? "bg-green-50 text-green-700 border-green-100 hover:bg-green-100" :
                          "bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100"
                        }>
                          {ticket.status}
                        </Badge>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="ghost" size="sm">Details</Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge>{ticket.status}</Badge>
                                <span className="text-xs text-gray-500">{ticket.date}</span>
                              </div>
                              <DialogTitle className="text-2xl">{ticket.subject}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-6 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Description</h4>
                              <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                {ticket.description}
                              </p>
                            </div>
                            <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                              <AlertCircle className="h-4 w-4" />
                              <span>Priority set to <strong>{ticket.priority}</strong></span>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
