'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  Calendar as CalendarIcon, 
  ChevronRight, 
  Download, 
  MapPin, 
  Star, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  TrendingUp,
  Backpack,
  Wallet,
  Receipt,
  Loader2
} from 'lucide-react';
import { customerBookings } from '@/lib/mock-data';
import { Card, CardContent } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { customerNavItems } from '@/lib/customer-nav-items';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';
import Image from 'next/image';
import { Booking } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';

export default function BookingsPage() {
  const { user } = useUser();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    const loadBookings = () => {
      if (isMounted) {
        const localBookingsStr = localStorage.getItem('quest_tours_bookings');
        const localBookings = localBookingsStr ? JSON.parse(localBookingsStr) : [];
        setBookings([...localBookings, ...customerBookings] as Booking[]);
        setLoading(false);
      }
    };
    
    const timer = setTimeout(loadBookings, 100);
    return () => { 
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  const upcomingBookings = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const pastBookings = bookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  const stats = [
    { label: 'Total Trips', value: bookings.length, icon: Backpack, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Upcoming', value: upcomingBookings.length, icon: CalendarIcon, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Total Spent', value: formatCurrency(bookings.reduce((acc, b) => {
      const price = typeof b.price === 'string' 
        ? parseFloat(b.price.replace(/[^0-9.-]/g, '')) 
        : (typeof b.price === 'number' ? b.price : 0);
      return acc + (isNaN(price) ? 0 : price);
    }, 0)), icon: Wallet, color: 'text-amber-600', bg: 'bg-amber-50' }
  ];

  return (
    <DashboardLayout 
      role="customer" 
      userName={user?.name || "Customer User"} 
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="max-w-7xl mx-auto space-y-10 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">My Bookings</h1>
            <p className="text-slate-500 text-lg font-medium">Your global travel map and history, all in one place.</p>
          </div>
          <div className="flex items-center gap-3">
             <Link href="/dashboard/customer/explore">
               <Button className="h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black shadow-xl shadow-slate-200 px-8 transition-all hover:scale-105">
                 Explore New Destinations
               </Button>
             </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="border-none shadow-sm ring-1 ring-slate-100 bg-white rounded-2xl overflow-hidden group hover:ring-blue-200 transition-all">
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`h-10 w-10 rounded-xl ${stat.bg} ${stat.color} flex items-center justify-center transition-all group-hover:scale-110`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">{stat.label}</p>
                  <p className="text-xl font-black text-slate-900">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <div className="flex items-center justify-between mb-10">
            <TabsList className="bg-slate-100/50 p-1.5 rounded-2xl h-auto gap-2">
              <TabsTrigger 
                value="upcoming" 
                className="rounded-xl px-8 py-3 text-sm font-black text-slate-400 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg shadow-blue-900/5 transition-all outline-none"
              >
                Upcoming Trips
                {upcomingBookings.length > 0 && (
                  <span className="ml-3 bg-blue-600 text-white text-[10px] px-2.5 py-1 rounded-full">{upcomingBookings.length}</span>
                )}
              </TabsTrigger>
              <TabsTrigger 
                value="past" 
                className="rounded-xl px-8 py-3 text-sm font-black text-slate-400 data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-lg shadow-blue-900/5 transition-all outline-none"
              >
                Travel History
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="upcoming" className="grid grid-cols-1 xl:grid-cols-2 gap-8 outline-none">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-64 w-full bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
              ))
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking as any} />
              ))
            ) : (
              <div className="col-span-full"><EmptyBookings message="No upcoming trips. Ready to explore?" /></div>
            )}
          </TabsContent>

          <TabsContent value="past" className="grid grid-cols-1 xl:grid-cols-2 gap-8 outline-none">
            {loading ? (
              Array(2).fill(0).map((_, i) => (
                <div key={i} className="h-64 w-full bg-slate-50 animate-pulse rounded-[2.5rem]"></div>
              ))
            ) : pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking as any} />
              ))
            ) : (
              <div className="col-span-full"><EmptyBookings message="Your travel history is empty." /></div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function BookingCard({ booking }: { booking: any }) {
  const { user } = useUser();
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadInvoice = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDownloading(true);
    
    try {
      const invoiceHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Invoice - ${booking.id}</title>
            <style>
              @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
              * { margin: 0; padding: 0; box-sizing: border-box; }
              body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f8fafc; padding: 20px; color: #1e293b; }
              .invoice-container { background: white; max-width: 800px; margin: 0 auto; padding: 50px; border-radius: 30px; box-shadow: 0 20px 50px rgba(0,0,0,0.05); border: 1px solid #e2e8f0; }
              .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px; }
              .logo-text { font-size: 24px; font-weight: 800; color: #0f172a; letter-spacing: -1px; }
              .brand-sub { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; }
              .invoice-meta { text-align: right; }
              .invoice-meta h1 { font-size: 40px; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
              .meta-row { font-size: 13px; font-weight: 600; color: #64748b; }
              .meta-val { color: #0f172a; font-weight: 800; }
              .billing-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 30px; margin-bottom: 40px; padding: 30px; background: #f8fafc; border-radius: 20px; border: 1px solid #f1f5f9; }
              .bill-section h4 { font-size: 9px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px; }
              .bill-name { font-size: 18px; font-weight: 800; color: #0f172a; margin-bottom: 2px; }
              .bill-detail { font-size: 13px; font-weight: 600; color: #64748b; }
              .items-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
              .items-table th { text-align: left; padding: 15px; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; border-bottom: 2px solid #f1f5f9; }
              .items-table td { padding: 20px 15px; border-bottom: 1px solid #f1f5f9; }
              .item-desc { font-size: 16px; font-weight: 800; color: #0f172a; }
              .item-sub { font-size: 11px; color: #94a3b8; margin-top: 2px; }
              .bottom-section { display: grid; grid-template-cols: 1.5fr 1fr; gap: 40px; }
              .terms-section { font-size: 11px; color: #94a3b8; line-height: 1.6; }
              .terms-section h4 { color: #64748b; text-transform: uppercase; margin-bottom: 8px; font-size: 10px; }
              .total-box { background: #0f172a; padding: 30px; border-radius: 20px; color: white; }
              .total-row { display: flex; justify-content: space-between; align-items: center; }
              .grand-value { font-size: 28px; font-weight: 800; color: #38bdf8; }
              .footer { margin-top: 50px; text-align: center; border-top: 1px solid #f1f5f9; padding-top: 30px; font-size: 12px; color: #94a3b8; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <div class="brand">
                  <span class="logo-text">QUEST TOURS.</span><br/>
                  <span class="brand-sub">Premium Global Escapes</span>
                </div>
                <div class="invoice-meta">
                  <h1>INVOICE</h1>
                  <p class="meta-row">No: <span class="meta-val">#${booking.invoice_no || booking.id}</span> &nbsp; Date: <span class="meta-val">${new Date().toLocaleDateString('en-GB')}</span></p>
                </div>
              </div>
              <div class="billing-grid">
                <div class="bill-section">
                  <h4>Billed To</h4>
                  <p class="bill-name">${user?.name || 'Valued Traveler'}</p>
                  <p class="bill-detail">${user?.email || 'explorer@quest.com'}</p>
                </div>
                <div class="bill-section">
                  <h4>Payment Method</h4>
                  <p class="bill-name">Paid via ${booking.payment_method || 'Credit Card'}</p>
                  <p class="bill-detail" style="color: #10b981;">● Confirmed & Protected</p>
                </div>
              </div>
              <table class="items-table">
                <thead>
                  <tr><th>Description</th><th style="text-align: center;">Travel Date</th><th style="text-align: right;">Amount</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><p class="item-desc">${booking.tour}</p><p class="item-sub">All-inclusive Luxury Package</p></td>
                    <td style="text-align: center; font-weight: 800;">${new Date(booking.date).toLocaleDateString('en-GB')}</td>
                    <td style="text-align: right; font-weight: 800; font-size: 18px;">${typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</td>
                  </tr>
                </tbody>
              </table>
              <div class="bottom-section">
                <div class="terms-section">
                  <h4>Terms & Conditions</h4>
                  <p>1. This invoice is non-refundable unless specified in the tour policy.</p>
                  <p>2. Please carry a digital copy of this invoice during your travel.</p>
                  <p>3. Travel insurance is included as per the premium explorer package.</p>
                  <p>4. For support, contact us at help@questtours.com.</p>
                </div>
                <div class="total-box">
                  <div class="total-row">
                    <span style="font-size: 12px; opacity: 0.7;">Grand Total</span>
                    <span class="grand-value">${typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</span>
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>Thank you for booking with Quest Tours. Adventure awaits!</p>
              </div>
            </div>
          </body>
        </html>
      `;
      const blob = new Blob([invoiceHTML], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Quest-Invoice-${booking.id}.html`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      setIsDownloading(false);
      toast.success(`Professional Invoice Generated!`);
    } catch (error) {
      console.error('Invoice generation failed:', error);
      setIsDownloading(false);
      toast.error('Failed to generate invoice. Please try again.');
    }
  };

  const isConfirmed = booking.status === 'Confirmed';

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 bg-white rounded-[2rem] ring-1 ring-slate-100 flex flex-col sm:flex-row h-full">
        <div className="sm:w-40 h-40 sm:h-auto relative overflow-hidden">
          <Image 
            src={booking.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"} 
            alt={booking.tour}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute top-3 left-3">
            <Badge className={`border-none shadow-xl backdrop-blur-md px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
              booking.status === 'Confirmed' ? 'bg-blue-600 text-white' : 
              booking.status === 'Completed' ? 'bg-emerald-500 text-white' : 
              'bg-slate-900 text-white'
            }`}>
              {booking.status}
            </Badge>
          </div>
        </div>
        
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex justify-between items-start gap-4">
              <div className="space-y-0.5">
                <h3 className="text-lg font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">{booking.tour}</h3>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400">
                  <Receipt size={10} /> ID: {booking.id}
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-black text-blue-600">{typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</p>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Paid</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                <CalendarIcon className="h-3.5 w-3.5 text-blue-500" />
                {new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </div>
              
              {isConfirmed && (
                <Badge variant="outline" className="bg-emerald-50 border-emerald-100 text-emerald-600 font-black text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                  Next Adventure
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-8">
            <div className="flex items-center gap-3">
              <Button 
                onClick={handleDownloadInvoice}
                disabled={isDownloading}
                className="h-10 px-6 bg-slate-900 text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 hover:scale-105 shadow-lg shadow-slate-200"
              >
                {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                Invoice
              </Button>
            </div>
            <Link 
              href={`/dashboard/customer/bookings/${booking.id}`}
              className="text-slate-900 hover:text-blue-600 font-black text-[10px] uppercase tracking-widest flex items-center gap-2 transition-all hover:translate-x-1"
            >
              Details <ChevronRight size={14} className="text-blue-600" />
            </Link>
          </div>
        </div>
    </Card>
  );
}

function EmptyBookings({ message }: { message: string }) {
  return (
    <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-slate-100">
      <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-blue-50/50">
        <Backpack className="h-10 w-10" />
      </div>
      <h3 className="text-2xl font-black text-slate-900 mb-2">{message}</h3>
      <p className="text-slate-400 font-medium mb-8">Adventure is out there. Don't let it wait.</p>
      <Link href="/dashboard/customer/explore">
        <Button className="h-12 px-8 bg-blue-600 text-white rounded-2xl font-black shadow-xl shadow-blue-200 hover:scale-105 transition-all">
          Start Exploring
        </Button>
      </Link>
    </div>
  );
}
