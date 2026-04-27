'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { customerStats as initialStats, customerBookings, wishlistTours } from '@/lib/mock-data';
import { wishlistService } from '@/services/wishlistService';
import { Tour, Booking } from '@/lib/types';
import { 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Map as MapIcon,
  ShieldCheck,
  Star,
  Heart,
  Plane,
  Award,
  Wallet,
  Clock,
  Compass,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import Image from 'next/image';
import Link from 'next/link';

export default function CustomerDashboard() {
  const { user } = useUser();
  const [wishlistItems, setWishlistItems] = React.useState<Tour[]>([]);
  const [stats, setStats] = React.useState(initialStats);
  const [recentBookings, setRecentBookings] = React.useState<Booking[]>([]);

  React.useEffect(() => {
    // Load Wishlist
    const items = wishlistService.getWishlist();
    setWishlistItems(items);
    
    // Load Bookings from LocalStorage + Mock
    const localBookingsStr = localStorage.getItem('quest_tours_bookings');
    const localBookings = localBookingsStr ? JSON.parse(localBookingsStr) : [];
    const allBookings = [...localBookings, ...customerBookings] as Booking[];
    
    // Sort by date (newest first)
    const sortedBookings = allBookings.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setRecentBookings(sortedBookings.slice(0, 3));
    
    // Update Stats dynamically
    setStats([
      { label: 'Past Trips', value: String(allBookings.length), change: '', trend: 'none' },
      { label: 'Wishlist', value: String(items.length), change: '', trend: 'none' },
      { label: 'Reward Points', value: '1,250', change: '+150', trend: 'up' },
      { label: 'Travel Credits', value: '₹120', change: '', trend: 'none' }
    ]);
  }, []);

  const getStatIcon = (label: string) => {
    switch(label) {
      case 'Past Trips': return <Plane size={18} className="text-blue-600" />;
      case 'Wishlist': return <Heart size={18} className="text-rose-600" />;
      case 'Reward Points': return <Award size={18} className="text-amber-600" />;
      case 'Travel Credits': return <Wallet size={18} className="text-emerald-600" />;
      default: return <MapIcon size={18} className="text-indigo-600" />;
    }
  };

  const getStatColor = (label: string) => {
    switch(label) {
      case 'Past Trips': return 'bg-blue-50/50 border-blue-100/50';
      case 'Wishlist': return 'bg-rose-50/50 border-rose-100/50';
      case 'Reward Points': return 'bg-amber-50/50 border-amber-100/50';
      case 'Travel Credits': return 'bg-emerald-50/50 border-emerald-100/50';
      default: return 'bg-indigo-50/50 border-indigo-100/50';
    }
  };

  return (
    <DashboardLayout
      role="customer"
      userName={user?.name || "Traveler"}
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-6 animate-in fade-in duration-700 pb-10">
        
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 shadow-sm">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-blue-50/50 to-transparent"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}
              </h1>
              <p className="text-gray-500 text-sm leading-relaxed max-w-lg">
                Your next adventure is calling. Explore our latest premium tour packages and exclusive member deals.
              </p>
            </div>
            <div className="shrink-0">
              <Link href="/dashboard/customer/explore">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-sm text-sm px-6 h-10 transition-colors">
                  Book New Tour <ArrowRight className="ml-2" size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow rounded-2xl bg-white overflow-hidden">
              <CardContent className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${getStatColor(stat.label)}`}>
                    {getStatIcon(stat.label)}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                  <p className="text-xs font-medium text-gray-500 mt-1">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column: Recent Bookings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Bookings
              </h2>
              <Link href="/dashboard/customer/bookings">
                <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 text-sm font-medium h-8 px-3 rounded-lg">
                  View All
                </Button>
              </Link>
            </div>
            
            <div className="space-y-3">
              {recentBookings.length > 0 ? (
                recentBookings.map((booking) => (
                  <Card key={booking.id} className="border border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden hover:border-gray-200 transition-colors">
                    <CardContent className="p-0 flex flex-col sm:flex-row">
                      <div className="relative w-full sm:w-40 h-32 sm:h-auto shrink-0">
                        <Image src={booking.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"} alt={booking.tour} fill className="object-cover" />
                      </div>
                      <div className="p-5 flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                            <Clock size={12} className="text-blue-600" /> {new Date(booking.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </div>
                          <Badge className={`border-none px-2 py-0.5 text-[10px] font-semibold ${
                            booking.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-700' : 
                            booking.status === 'Completed' ? 'bg-blue-50 text-blue-700' : 
                            'bg-amber-50 text-amber-700'
                          }`}>
                            {booking.status}
                          </Badge>
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-0.5">{booking.tour}</h3>
                        <p className="text-xs text-gray-500 mb-3">ID: {booking.id}</p>
                        
                        <div className="flex items-center justify-between mt-auto">
                          <span className="font-semibold text-gray-900 text-sm">{typeof booking.price === 'string' ? booking.price : `Rs. ${booking.price}`}</span>
                          <Link href={`/dashboard/customer/bookings/${booking.id}`}>
                            <Button variant="outline" size="sm" className="h-7 text-xs rounded-lg border-gray-200 text-gray-600 hover:bg-gray-50">
                              Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="py-12 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <p className="text-sm text-gray-400 font-medium">No recent bookings found.</p>
                  <Link href="/dashboard/customer/explore" className="inline-block mt-3">
                    <Button variant="link" className="text-blue-600 text-xs p-0">Start Exploring</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Wishlist Preview & Verification */}
          <div className="space-y-6">
            {/* Wishlist Preview */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Saved Tours
                </h2>
                <Link href="/dashboard/customer/wishlist">
                  <Button variant="ghost" className="text-blue-600 hover:bg-blue-50 text-sm font-medium h-8 px-3 rounded-lg">
                    See All
                  </Button>
                </Link>
              </div>

              <div className="grid gap-3">
                {wishlistItems.length > 0 ? (
                  wishlistItems.slice(0, 2).map((tour) => (
                    <Link key={tour.id} href={`/dashboard/customer/explore/${tour.id}`}>
                      <Card className="border border-gray-100 shadow-sm rounded-2xl bg-white overflow-hidden hover:border-gray-200 transition-colors group cursor-pointer p-3 flex gap-3 items-center">
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden">
                          <Image src={tour.image} alt={tour.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 mb-0.5">{tour.name}</h3>
                          <div className="flex items-center gap-1 text-gray-500 text-xs">
                            <MapPin size={10} /> {tour.location}
                          </div>
                        </div>
                        <div className="shrink-0 p-2">
                          <Heart size={16} className="text-rose-500 fill-rose-500" />
                        </div>
                      </Card>
                    </Link>
                  ))
                ) : (
                  <div className="py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                    <p className="text-xs text-gray-400">No items in wishlist</p>
                  </div>
                )}
              </div>
            </div>

            {/* Profile CTA Section */}
            <Card className="border border-blue-100 shadow-sm bg-blue-50/50 rounded-2xl overflow-hidden relative">
              <CardContent className="p-6 relative z-10">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white text-blue-700 rounded-md text-[10px] font-semibold border border-blue-100 shadow-sm">
                    <ShieldCheck size={12} /> Basic Account
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-gray-900">Unlock Premium</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Complete verification to access VIP itineraries and exclusive discounts.
                    </p>
                  </div>
                  <Link href="/dashboard/customer/profile" className="block pt-2">
                    <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 h-9 rounded-lg text-sm font-medium shadow-sm transition-colors">
                      Verify Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
