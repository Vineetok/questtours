'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  LayoutDashboard, 
  Map, 
  Heart, 
  History, 
  Calendar as CalendarIcon,
  ChevronLeft,
  Download,
  Users as UsersIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Printer,
  User as UserIcon
} from 'lucide-react';
import { customerBookings } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
];

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params.id as string;
  const booking = customerBookings.find(b => b.id === bookingId);

  const [isRescheduling, setIsRescheduling] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!booking) {
    return (
      <DashboardLayout role="customer" userName="Rutuja Shitole" userEmail="rutuja@example.com" navItems={customerNavItems}>
        <div className="flex flex-col items-center justify-center py-20">
          <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold">Booking Not Found</h2>
          <Link href="/dashboard/customer/bookings" className="mt-4">
            <Button variant="outline">Back to My Bookings</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const handleCancel = () => {
    toast.success('Your cancellation request has been received. Our team will contact you.');
    // In a real app, update status in DB
  };

  const handleReschedule = () => {
    setIsRescheduling(true);
    setTimeout(() => {
      setIsRescheduling(false);
      toast.success('Redirecting to rescheduling calendar...');
    }, 1500);
  };

  const handleDownloadInvoice = () => {
    setIsDownloading(true);
    setTimeout(() => {
      // Create a simple blob to simulate a PDF download
      const invoiceContent = `
        QUEST TOURS INVOICE
        -------------------
        Invoice No: ${booking.invoice_no}
        Booking ID: ${booking.id}
        Tour: ${booking.tour}
        Date: ${booking.date}
        Amount Paid: ${booking.price}
        Status: ${booking.status}
        
        Travelers: ${booking.passengers?.join(', ')}
        
        Thank you for choosing QuestTours!
      `;
      const blob = new Blob([invoiceContent], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Invoice-${booking.invoice_no}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setIsDownloading(false);
      toast.success(`Invoice ${booking.invoice_no} downloaded successfully!`);
    }, 1500);
  };

  return (
    <DashboardLayout 
      role="customer" 
      userName="Rutuja Shitole" 
      userEmail="rutuja@example.com"
      navItems={customerNavItems}
    >
      <div className="space-y-6">
        <Link href="/dashboard/customer/bookings" className="flex items-center text-sm text-gray-500 hover:text-blue-600 transition-colors gap-1 group">
          <ChevronLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to My Bookings
        </Link>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Details */}
          <div className="flex-1 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <div className="h-64 relative">
                <img 
                  src={booking.image} 
                  alt={booking.tour}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                  <div className="text-white">
                    <Badge className="mb-2 bg-blue-600 border-none">{booking.status}</Badge>
                    <h1 className="text-3xl font-bold">{booking.tour}</h1>
                  </div>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Booking ID</p>
                    <p className="font-semibold">{booking.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Date</p>
                    <div className="flex items-center gap-1.5 font-semibold">
                      <CalendarIcon className="h-4 w-4 text-blue-600" />
                      {booking.date}
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Amount Paid</p>
                    <p className="font-bold text-blue-600 text-lg">{booking.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Invoice</p>
                    <p className="font-semibold text-gray-700">{booking.invoice_no}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" /> Tour Itinerary
                </CardTitle>
                <CardDescription>Day-by-day plan for your adventure.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                  {booking.itinerary?.map((item: any, idx: number) => (
                    <div key={idx} className="relative pl-8">
                      <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-50 border-2 border-blue-600 flex items-center justify-center z-10">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <h4 className="font-bold text-gray-900">Day {item.day}: {item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info */}
          <div className="lg:w-80 space-y-6">
            {/* Passengers */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <UsersIcon className="h-4 w-4" /> Passengers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {booking.passengers?.map((p: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-semibold">
                      {p[0]}
                    </div>
                    <span className="text-sm font-medium">{p}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <CreditCard className="h-4 w-4" /> Payment Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Method</span>
                  <span className="font-medium">{booking.payment_method}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Status</span>
                  <span className="text-green-600 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" /> Paid
                  </span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-blue-600">{booking.price}</span>
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700 h-10 gap-2"
                onClick={handleDownloadInvoice}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>Generating...</>
                ) : (
                  <>
                    <Download className="h-4 w-4" /> Download Invoice
                  </>
                )}
              </Button>
              <Button variant="outline" className="w-full h-10 gap-2">
                <Printer className="h-4 w-4" /> Print Itinerary
              </Button>
              
              <div className="grid grid-cols-2 gap-3 mt-4">
                <Button 
                  variant="secondary" 
                  className="bg-gray-100 hover:bg-gray-200"
                  onClick={handleReschedule}
                  disabled={isRescheduling}
                >
                  {isRescheduling ? 'Wait...' : 'Reschedule'}
                </Button>
                
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200">
                      Cancel
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Cancelling your booking for "{booking.tour}" may incur cancellation fees. This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Go Back</AlertDialogCancel>
                      <AlertDialogAction onClick={handleCancel} className="bg-red-600 hover:bg-red-700">
                        Confirm Cancellation
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700 leading-relaxed font-medium">
                <AlertCircle className="h-3 w-3 inline mr-1 mb-0.5" />
                Need help? Contact our 24/7 support at support@questtours.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
