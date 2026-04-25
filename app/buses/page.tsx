'use client';

import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Bus, MapPin, Calendar, Search, ShieldCheck, Zap, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';

export default function BusesPage() {
  return (
    <main className="min-h-screen bg-[#F2F7FA]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1600&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-[#F2F7FA]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-7xl font-black text-white tracking-tight">
              Bus <span className="text-emerald-400 italic">Tickets</span>
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl font-medium max-w-2xl mx-auto">
              Choose from 2500+ Bus Operators. Best prices guaranteed with live tracking.
            </p>
          </div>
        </div>
      </section>

      {/* Search Widget */}
      <section className="relative z-20 -mt-32 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-emerald-900/10 border border-slate-100 p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-4 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">From City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
                <Input placeholder="Enter Source City" className="pl-12 h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg" />
              </div>
            </div>

            <div className="lg:col-span-4 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">To City</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
                <Input placeholder="Enter Destination City" className="pl-12 h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg" />
              </div>
            </div>

            <div className="lg:col-span-3 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Travel Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-600" size={20} />
                <Input type="date" className="pl-12 h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg" />
              </div>
            </div>

            <div className="lg:col-span-1 flex items-end">
              <Button className="w-full lg:w-16 h-16 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl shadow-xl shadow-emerald-600/20 flex items-center justify-center p-0">
                <Search size={24} />
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            {['AC', 'Non-AC', 'Sleeper', 'Seater', 'Luxury Volvo'].map((type) => (
              <button key={type} className="px-6 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all">
                {type}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-black text-slate-900">Popular Bus <span className="text-emerald-600 italic">Routes</span></h2>
          <Button variant="ghost" className="text-emerald-600 font-black uppercase tracking-widest text-xs">View All Routes</Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { from: 'Delhi', to: 'Manali', price: '₹899', rating: '4.8' },
            { from: 'Bangalore', to: 'Chennai', price: '₹450', rating: '4.6' },
            { from: 'Mumbai', to: 'Goa', price: '₹1200', rating: '4.9' },
            { from: 'Hyderabad', to: 'Bangalore', price: '₹650', rating: '4.7' },
          ].map((route) => (
            <div key={route.from + route.to} className="bg-white p-6 rounded-3xl border border-slate-100 hover:shadow-xl hover:shadow-emerald-900/5 transition-all group cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bus size={20} />
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 px-2 py-1 rounded-lg">
                  <Star size={12} className="fill-emerald-600 text-emerald-600" />
                  <span className="text-[10px] font-black text-emerald-600">{route.rating}</span>
                </div>
              </div>
              <h3 className="font-black text-slate-900 mb-1">{route.from} to {route.to}</h3>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-4">Starts from</p>
              <p className="text-2xl font-black text-emerald-600">{route.price}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Safety Section */}
      <section className="pb-24 max-w-7xl mx-auto px-4">
        <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 overflow-hidden relative">
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=800&q=80')] bg-cover bg-center opacity-20 hidden lg:block" />
          <div className="relative z-10 max-w-xl space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <span className="text-emerald-400 font-black text-xs uppercase tracking-[0.3em]">Safety Assured</span>
              <h2 className="text-4xl lg:text-6xl font-black text-white leading-tight">Travel Safer With <br /> <span className="text-emerald-400 italic">Primo Buses.</span></h2>
              <p className="text-slate-400 text-lg italic">The highest rated buses with verified drivers, sanitized coaches, and live GPS tracking for women safety.</p>
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="text-emerald-400" /> 24/7 Support
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Zap className="text-emerald-400" /> Live Tracking
              </div>
              <div className="flex items-center gap-2 text-white font-bold">
                <Heart className="text-emerald-400" /> Women Safety
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
