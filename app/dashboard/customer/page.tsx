'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { Star, Calendar as CalendarIcon, Heart, ShieldCheck } from 'lucide-react';
import { customerStats, customerBookings, wishlistTours } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { customerNavItems } from '@/lib/customer-nav-items';
import { Badge } from '@/components/ui/display/badge';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';
import { Booking, Tour } from '@/lib/types';

export default function CustomerDashboard() {
  const { user } = useUser();
  const bookings = customerBookings as Booking[];
  const wishlist = wishlistTours as Tour[];

  return (
    <DashboardLayout
      role="customer"
      userName={user?.name || "Customer User"}
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Travel Dashboard</h1>
            <p className="text-gray-500">Welcome back, {user?.name?.split(' ')[0] || 'Traveler'}! You have one upcoming trip to Alpine Escape.</p>
          </div>
          <Link href="/destinations">
            <Button className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-lg shadow-lg shadow-blue-200">
              Explore New Adventures
            </Button>
          </Link>
        </div>

        {/* Info Banner */}
        <div className="bg-white border border-blue-100 rounded-2xl p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
            <CalendarIcon className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 leading-tight">Upcoming Trip in 24 Days</p>
            <p className="text-xs text-gray-500">Alpine Escape • May 15, 2024</p>
          </div>
          <Link href="/dashboard/customer/bookings/BK-001">
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 font-bold">
              Manage Trip
            </Button>
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {customerStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm bg-white overflow-hidden group">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">{stat.value}</div>
                {stat.change && (
                  <p className="text-xs text-green-600 flex items-center mt-2 font-medium">
                    <Star className="h-3 w-3 mr-1 fill-green-600" />
                    {stat.change} this month
                  </p>
                )}
                {!stat.change && <p className="text-xs text-gray-400 mt-2">Lifetime summary</p>}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Bookings Widget */}
          <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>Track your current and past travel.</CardDescription>
              </div>
              <Link href="/dashboard/customer/bookings">
                <Button variant="outline" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="group relative flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                  <div className="relative h-20 w-24 overflow-hidden rounded-lg">
                    <Image
                      src={booking.image || "https://images.unsplash.com/photo-1506905925346-21bda4d32df4"}
                      alt={booking.tour}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className={`text-[10px] h-4 ${booking.status === 'Confirmed' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : ''}`}>
                        {booking.status}
                      </Badge>
                      <span className="text-xs text-gray-400 font-mono">{booking.id}</span>
                    </div>
                    <h4 className="font-bold text-gray-900 truncate">{booking.tour}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <CalendarIcon className="h-3 w-3 opacity-60" /> {booking.date}
                    </p>
                  </div>                  
                  <div className="text-right">
                    <p className="font-bold text-blue-600 mb-1">₹{(booking.price || 0).toLocaleString('en-IN')}</p>
                    <Link href={`/dashboard/customer/bookings/${booking.id}`}>
                      <Button variant="link" size="sm" className="h-7 p-0 text-blue-600 font-bold hover:no-underline">
                        Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Side Widgets */}
          <div className="space-y-6">
            {/* Wishlist Sidebar */}
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2 text-indigo-900">
                  <Heart className="h-4 w-4 text-red-500 fill-red-500" /> Wishlist Highlights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {wishlist.slice(0, 3).map((tour) => (
                  <div key={tour.id} className="flex items-center gap-3">
                    <div className="h-14 w-14 rounded-xl overflow-hidden shrink-0 relative">
                      <Image
                        src={tour.image}
                        alt={tour.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-gray-900 truncate">{tour.name}</h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-semibold">{tour.rating}</span>
                        <span className="text-xs text-blue-600 font-bold ml-auto">₹{tour.price.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Link href="/dashboard/customer/wishlist">
                  <Button className="w-full mt-2 h-10 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 hover:text-indigo-800 border-none font-bold">
                    Go to Wishlist
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Profile CTA */}
            <Card className="border-none shadow-2xl bg-slate-950 text-white rounded-[2.5rem] overflow-hidden relative group cursor-pointer transition-all hover:ring-2 hover:ring-blue-500/50">
              <CardContent className="p-10 relative z-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black tracking-tight leading-tight">Verify your Profile</h3>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-[200px]">
                      Complete your account verification to unlock higher rewards and exclusive tours.
                    </p>
                  </div>
                  <Link href="/dashboard/customer/profile">
                    <Button className="bg-white text-slate-950 hover:bg-gray-100 h-12 px-8 rounded-full font-black text-sm shadow-xl transition-all hover:-translate-y-1 active:translate-y-0">
                      Complete Setup
                    </Button>
                  </Link>
                </div>
              </CardContent>

              {/* Decorative Elements */}
              <div className="absolute -right-6 -bottom-6 w-32 h-32 text-white/5 rotate-12 transition-transform group-hover:scale-110 duration-700">
                <ShieldCheck className="w-full h-full" />
              </div>
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            </Card>
          </div>
        </div>


      </div>
    </DashboardLayout>
  );
}

