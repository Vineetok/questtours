'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import {
  LayoutDashboard,
  Map,
  Heart,
  History,
  Star,
  Calendar as CalendarIcon,
  ArrowRight
} from 'lucide-react';
import { customerStats, customerBookings, wishlistTours } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const customerNavItems = [
  { title: 'My Trips', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'Explore', url: '/destinations', icon: Map },
  { title: 'Wishlist', url: '#', icon: Heart },
  { title: 'History', url: '#', icon: History },
];

export default function CustomerDashboard() {
  return (
    <DashboardLayout
      role="customer"
      userName="John Traveler"
      userEmail="john@example.com"
      navItems={customerNavItems}
    >
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Travel Dashboard</h1>
            <p className="text-gray-500">You have one upcoming trip to Alpine Escape in 24 days!</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Book a New Adventure
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {customerStats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm bg-white">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-500">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                  <p className="text-xs text-green-600 flex items-center mt-1">
                    <Star className="h-3 w-3 mr-1 fill-green-600" />
                    {stat.change} this month
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Upcoming Trips */}
          <Card className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Upcoming & Recent Trips</CardTitle>
              <CardDescription>Track your current and past travel experiences.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {customerBookings.map((booking) => (
                <div key={booking.id} className="group relative flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100">
                  <div className="relative h-20 w-24 overflow-hidden rounded-lg">
                    <img
                      src={booking.image}
                      alt={booking.tour}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant={booking.status === 'Confirmed' ? 'default' : 'secondary'} className="text-[10px] h-4">
                        {booking.status}
                      </Badge>
                      <span className="text-xs text-gray-400">{booking.id}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 truncate">{booking.tour}</h4>
                    <p className="text-sm text-gray-500 flex items-center gap-1">
                      <CalendarIcon className="h-3 w-3" /> {booking.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-blue-600">{booking.price}</p>
                    <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2">
                View Full Travel History
              </Button>
            </CardContent>
          </Card>

          {/* Wishlist Favorites */}
          <Card className="border-none shadow-sm">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Your Wishlist</CardTitle>
              <CardDescription>Destinations you're dreaming of visiting next.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {wishlistTours.map((tour) => (
                  <div key={tour.id} className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-lg overflow-hidden shrink-0">
                      <img src={tour.image} alt={tour.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate">{tour.name}</h4>
                      <p className="text-sm text-gray-500">{tour.location}</p>
                      <div className="flex items-center gap-1 mt-0.5">
                        <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                        <span className="text-xs font-medium">{tour.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{tour.price}</p>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0 rounded-full hover:bg-blue-50 hover:text-blue-600">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white">
                Explore More Destinations
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Rewards / Offers Card */}
        <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-2">Summer Sale: Save up to 40%</h3>
            <p className="text-blue-100 mb-6 max-w-md">Book your summer getaway now and earn double reward points on all beach destinations.</p>
            <Button className="bg-white text-blue-600 hover:bg-blue-50 border-none">
              Claim Offer
            </Button>
          </div>
          <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 flex items-center justify-center">
            <Map className="h-48 w-48" />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
