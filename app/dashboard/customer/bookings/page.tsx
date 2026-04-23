'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  LayoutDashboard, 
  Map, 
  Heart, 
  History, 
  Calendar as CalendarIcon,
  ChevronRight,
  ExternalLink,
  Download,
  User as UserIcon
} from 'lucide-react';
import { customerBookings } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
];

export default function BookingsPage() {
  const upcomingBookings = customerBookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending');
  const pastBookings = customerBookings.filter(b => b.status === 'Completed' || b.status === 'Cancelled');

  return (
    <DashboardLayout 
      role="customer" 
      userName="John Traveler" 
      userEmail="john@example.com"
      navItems={customerNavItems}
    >
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Bookings</h1>
            <p className="text-gray-500">Manage your upcoming and past travel experiences.</p>
          </div>
          <Link href="/destinations">
            <Button className="bg-blue-600 hover:bg-blue-700">
              Book a New Trip
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
            <TabsTrigger value="past">Travel History</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <EmptyBookings message="No upcoming trips. Ready to explore?" />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))
            ) : (
              <EmptyBookings message="Your travel history is empty." />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function BookingCard({ booking }: { booking: any }) {
  const [isDownloading, setIsDownloading] = React.useState(false);

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
        Amount: ${booking.price}
        Status: ${booking.status}
        
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
    <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow bg-white">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-64 h-48 md:h-auto relative">
          <img 
            src={booking.image} 
            alt={booking.tour}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 left-4">
            <Badge className={booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-none'}>
              {booking.status}
            </Badge>
          </div>
        </div>
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-bold text-gray-900">{booking.tour}</h3>
              <p className="text-lg font-bold text-blue-600">{booking.price}</p>
            </div>
            <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1.5">
                <CalendarIcon className="h-4 w-4" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium">Booking ID:</span>
                <span>{booking.id}</span>
              </div>
            </div>
            <div className="flex gap-2">
              {booking.status === 'Confirmed' && (
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Upcoming</Badge>
              )}
              {booking.status === 'Completed' && (
                <Badge variant="outline" className="text-[10px] uppercase tracking-wider">Memorable Trip</Badge>
              )}
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3 mt-6">
            <Link href={`/dashboard/customer/bookings/${booking.id}`} className="flex-1">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white gap-2">
                View Details <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleDownloadInvoice}
              disabled={isDownloading}
            >
              {isDownloading ? (
                <>Generating...</>
              ) : (
                <>
                  <Download className="h-4 w-4" /> Invoice
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function EmptyBookings({ message }: { message: string }) {
  return (
    <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-gray-100">
      <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <CalendarIcon className="h-8 w-8" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{message}</h3>
      <Link href="/destinations">
        <Button variant="link" className="text-blue-600">
          Find your next destination
        </Button>
      </Link>
    </div>
  );
}
