'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Calendar as CalendarIcon, ChevronRight, Download } from 'lucide-react';
import { customerBookings } from '@/lib/mock-data';
import { Card } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/navigation/tabs';
import { customerNavItems } from '@/lib/customer-nav-items';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';
import Image from 'next/image';
import { Booking } from '@/lib/types';

export default function BookingsPage() {
  const { user } = useUser();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let isMounted = true;
    // Simulating data fetch
    const loadBookings = () => {
      if (isMounted) {
        // Read any newly created bookings from local storage
        const localBookingsStr = localStorage.getItem('quest_tours_bookings');
        const localBookings = localBookingsStr ? JSON.parse(localBookingsStr) : [];
        
        // Combine with static mock data
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
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-48 w-full bg-gray-100 animate-pulse rounded-xl"></div>
              ))
            ) : upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking as any} />
              ))
            ) : (
              <EmptyBookings message="No upcoming trips. Ready to explore?" />
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {loading ? (
              Array(3).fill(0).map((_, i) => (
                <div key={i} className="h-48 w-full bg-gray-100 animate-pulse rounded-xl"></div>
              ))
            ) : pastBookings.length > 0 ? (
              pastBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking as any} />
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

function BookingCard({ booking }: { booking: Booking & { image: string; tour: string; date: string; invoice_no?: string; payment_method?: string; price: string } }) {
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
        <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
          <Image 
            src={booking.image} 
            alt={booking.tour}
            fill
            className="object-cover"
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

