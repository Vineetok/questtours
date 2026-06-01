'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  Users, 
  CreditCard, 
  ShieldCheck, 
  Clock, 
  CheckCircle2,
  Download,
  Phone,
  Mail,
  Plane,
  Hotel,
  Activity,
  Receipt,
  FileText,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import { Card, CardContent } from '@/components/ui/display/card';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';
import { customerBookings } from '@/lib/mock-data';
import { toast } from 'sonner';

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useUser();
  const [booking, setBooking] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchBooking = () => {
      const localBookingsStr = localStorage.getItem('quest_tours_bookings');
      const localBookings = localBookingsStr ? JSON.parse(localBookingsStr) : [];
      const found = [...localBookings, ...customerBookings].find(b => b.id === id);
      setBooking(found);
      setLoading(false);
    };
    fetchBooking();
  }, [id]);

  const handleDownloadInvoice = () => {
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
              body { font-family: 'Plus Jakarta Sans', sans-serif; background: #f1f5f9; padding: 40px; color: #1e293b; }
              .invoice-container { background: white; max-width: 850px; margin: 0 auto; padding: 60px; border-radius: 40px; box-shadow: 0 40px 100px -20px rgba(0,0,0,0.1); position: relative; overflow: hidden; }
              .invoice-container::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 10px; background: linear-gradient(to right, #2563eb, #7c3aed); }
              .header { display: flex; justify-content: space-between; align-items: start; margin-bottom: 60px; }
              .brand { display: flex; flex-direction: column; gap: 8px; }
              .logo-text { font-size: 28px; font-weight: 800; color: #0f172a; letter-spacing: -1.5px; }
              .brand-sub { font-size: 10px; font-weight: 800; color: #64748b; text-transform: uppercase; letter-spacing: 2px; }
              .invoice-meta { text-align: right; }
              .invoice-meta h1 { font-size: 48px; font-weight: 800; color: #0f172a; margin-bottom: 8px; line-height: 1; }
              .meta-row { display: flex; justify-content: flex-end; gap: 20px; font-size: 14px; font-weight: 600; color: #64748b; }
              .meta-val { color: #0f172a; font-weight: 800; }
              .billing-grid { display: grid; grid-template-cols: 1fr 1fr; gap: 60px; margin-bottom: 60px; padding: 40px; background: #f8fafc; border-radius: 30px; }
              .bill-section h4 { font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; }
              .bill-name { font-size: 20px; font-weight: 800; color: #0f172a; margin-bottom: 5px; }
              .bill-detail { font-size: 14px; font-weight: 600; color: #64748b; line-height: 1.5; }
              .items-table { width: 100%; border-collapse: separate; border-spacing: 0; margin-bottom: 60px; }
              .items-table th { text-align: left; padding: 20px; font-size: 10px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 2px; border-bottom: 2px solid #f1f5f9; }
              .items-table td { padding: 30px 20px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
              .item-desc { font-size: 18px; font-weight: 800; color: #0f172a; }
              .item-sub { font-size: 12px; font-weight: 600; color: #94a3b8; margin-top: 5px; }
              .item-val { font-size: 18px; font-weight: 800; color: #0f172a; }
              .summary-section { display: flex; justify-content: flex-end; }
              .total-card { width: 320px; background: #0f172a; padding: 40px; border-radius: 30px; color: white; transform: rotate(-2deg); box-shadow: 0 20px 40px rgba(15,23,42,0.3); }
              .total-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
              .total-row.grand { margin-top: 20px; padding-top: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
              .label { font-size: 12px; font-weight: 600; opacity: 0.6; }
              .value { font-size: 14px; font-weight: 800; }
              .grand-label { font-size: 14px; font-weight: 800; }
              .grand-value { font-size: 32px; font-weight: 800; color: #38bdf8; }
              .footer { margin-top: 80px; text-align: center; border-top: 2px solid #f1f5f9; padding-top: 40px; }
              .footer-msg { font-size: 14px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
              .footer-contact { font-size: 12px; font-weight: 600; color: #94a3b8; }
            </style>
          </head>
          <body>
            <div class="invoice-container">
              <div class="header">
                <div class="brand">
                  <span class="logo-text">QUEST TOURS.</span>
                  <span class="brand-sub">Premium Global Escapes</span>
                </div>
                <div class="invoice-meta">
                  <h1>INVOICE</h1>
                  <div class="meta-row">
                    <span>Invoice No: <span class="meta-val">#${booking.invoice_no || booking.id}</span></span>
                    <span>Date: <span class="meta-val">${new Date().toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' })}</span></span>
                  </div>
                </div>
              </div>
              <div class="billing-grid">
                <div class="bill-section">
                  <h4>Billed To</h4>
                  <p class="bill-name">${user?.name || 'Valued Traveler'}</p>
                  <p class="bill-detail">${user?.email || 'explorer@quest.com'}</p>
                </div>
                <div class="bill-section">
                  <h4>Payment Status</h4>
                  <p class="bill-name">Paid via ${booking.payment_method || 'Credit Card'}</p>
                  <p class="bill-detail" style="color: #10b981; font-weight: 800;">● Confirmed & Protected</p>
                </div>
              </div>
              <table class="items-table">
                <thead><tr><th>Trip Description</th><th>Date</th><th style="text-align: right;">Total</th></tr></thead>
                <tbody>
                  <tr>
                    <td><p class="item-desc">${booking.tour}</p><p class="item-sub">All-inclusive Luxury Package</p></td>
                    <td class="item-val" style="font-size: 14px;">${new Date(booking.date).toLocaleDateString()}</td>
                    <td class="item-val" style="text-align: right;">${typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</td>
                  </tr>
                </tbody>
              </table>
              <div class="summary-section">
                <div class="total-card">
                  <div class="total-row grand"><span class="grand-label">Grand Total</span><span class="grand-value">${typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</span></div>
                </div>
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
      console.error(error);
      setIsDownloading(false);
      toast.error('Failed to generate invoice. Please try again.');
    }
  };

  const handleViewItinerary = () => {
    toast.info("Itinerary is being prepared. You will receive it via email shortly!");
  };

  if (loading) {
    return (
      <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (!booking) {
    return (
      <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold">Booking not found</h2>
          <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()} className="group flex items-center gap-2 font-black text-slate-500 hover:text-slate-900 transition-all">
            <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" /> Back to Bookings
          </Button>
          <Badge className={`px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest ${
            booking.status === 'Confirmed' ? 'bg-blue-600 text-white' : 
            booking.status === 'Completed' ? 'bg-emerald-500 text-white' : 
            'bg-slate-900 text-white'
          }`}>
            {booking.status}
          </Badge>
        </div>

        <Card className="border-none shadow-2xl bg-white rounded-[3rem] overflow-hidden ring-1 ring-slate-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="h-80 md:h-auto relative">
              <Image src={booking.image || "/placeholder.png"} alt={booking.tour} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <p className="text-[10px] font-black uppercase tracking-widest opacity-80 mb-2">Package Name</p>
                <h1 className="text-3xl font-black tracking-tight">{booking.tour}</h1>
              </div>
            </div>
            <CardContent className="p-10 flex flex-col justify-between space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Booking Date</p>
                  <p className="text-lg font-black text-slate-900">{new Date(booking.date).toLocaleDateString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Amount Paid</p>
                  <p className="text-2xl font-black text-blue-600">{typeof booking.price === 'string' ? booking.price : formatCurrency(booking.price)}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Travelers</p>
                  <p className="text-lg font-black text-slate-900 flex items-center gap-2"><Users size={18} /> {booking.passengers || 1} Adult(s)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Booking ID</p>
                  <p className="text-lg font-black text-slate-900">#{booking.id}</p>
                </div>
              </div>

              <div className="pt-8 border-t border-slate-100 flex items-center gap-4">
                 <Button onClick={handleViewItinerary} className="flex-1 h-14 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black shadow-xl shadow-blue-200 gap-2">
                   <Plane size={18} /> View Itinerary
                 </Button>
                 <Button onClick={handleDownloadInvoice} disabled={isDownloading} variant="outline" className="h-14 w-14 rounded-2xl border-slate-100 text-slate-600 hover:bg-slate-50 transition-all flex items-center justify-center p-0">
                   {isDownloading ? <Loader2 className="animate-spin" size={20} /> : <Download size={20} />}
                 </Button>
              </div>
            </CardContent>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-none shadow-sm ring-1 ring-slate-100 bg-white rounded-[2.5rem] p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <FileText className="text-blue-600" /> Traveler Information
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Primary Traveler</p>
                    <p className="font-bold text-slate-900">{user?.name || 'Valued Explorer'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Contact Email</p>
                    <p className="font-bold text-slate-900 flex items-center gap-2"><Mail size={14} className="text-slate-400" /> {user?.email}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Phone Number</p>
                    <p className="font-bold text-slate-900 flex items-center gap-2"><Phone size={14} className="text-slate-400" /> +91 98765 43210</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="border-none shadow-sm ring-1 ring-slate-100 bg-white rounded-[2.5rem] p-8">
              <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-3">
                <Activity className="text-emerald-500" /> Included Services
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon: Hotel, label: '4-Star Accommodation', sub: 'Premium Stay Included' },
                  { icon: Plane, label: 'Round-trip Flights', sub: 'Economy Standard' },
                  { icon: MapPin, label: 'Local Sightseeing', sub: 'Guided Tour Included' },
                  { icon: ShieldCheck, label: 'Travel Insurance', sub: 'Comprehensive Coverage' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="h-10 w-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-blue-600">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-black text-slate-900">{item.label}</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-8">
             <Card className="border-none shadow-sm ring-1 ring-slate-100 bg-white rounded-[2.5rem] p-8 text-center space-y-6">
                <div className="h-16 w-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto">
                  <ShieldCheck size={32} />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900">Secure Booking</h4>
                  <p className="text-sm text-slate-500 font-medium">Your trip is protected by Quest Guarantee.</p>
                </div>
                <Button className="w-full h-12 bg-slate-900 text-white rounded-xl font-black">
                  Support
                </Button>
             </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
