'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TrainFront, MapPin, Calendar, Search, ArrowRightLeft, CreditCard, ShieldCheck, Clock } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';

export default function TrainsPage() {
  const [activeTab, setActiveTab] = useState('book'); // book, pnr, status

  return (
    <main className="min-h-screen bg-[#F2F7FA]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-48 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1600&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-[#F2F7FA]" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl lg:text-7xl font-black text-white tracking-tight">
              Train <span className="text-blue-400 italic">Booking</span>
            </h1>
            <p className="text-gray-300 text-lg lg:text-xl font-medium max-w-2xl mx-auto">
              IRCTC Authorized Partner. Fast, Secure, and Guaranteed Bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Search Widget */}
      <section className="relative z-20 -mt-32 max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-slate-100 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-slate-50">
            {[
              { id: 'book', label: 'Book Tickets', icon: TrainFront },
              { id: 'pnr', label: 'Check PNR Status', icon: Search },
              { id: 'status', label: 'Live Train Status', icon: Clock },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 py-6 font-black text-sm uppercase tracking-widest transition-all ${
                  activeTab === tab.id 
                    ? 'text-blue-600 bg-white border-b-4 border-blue-600' 
                    : 'text-slate-400 bg-slate-50/50 hover:bg-slate-50'
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
              <div className="lg:col-span-4 space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">From City</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                  <Input placeholder="Enter Source City" className="pl-12 h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg" />
                </div>
              </div>

              <div className="lg:col-span-1 flex justify-center pb-4">
                <button className="h-10 w-10 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center hover:rotate-180 transition-transform duration-500 shadow-sm border border-blue-100">
                  <ArrowRightLeft size={18} />
                </button>
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
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" size={20} />
                  <Input type="date" className="pl-12 h-16 bg-slate-50 border-none rounded-2xl font-bold text-lg" />
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              {['All Classes', 'Sleeper (SL)', 'Third AC (3A)', 'Second AC (2A)', 'First AC (1A)'].map((cls) => (
                <button key={cls} className="px-6 py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all">
                  {cls}
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-16 h-16 rounded-2xl font-black text-xl shadow-xl shadow-blue-600/20 tracking-wide">
                SEARCH TRAINS
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
            <div className="h-14 w-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Instant Refunds</h3>
              <p className="text-slate-500 text-sm italic">Get your money back instantly on cancellations.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
            <div className="h-14 w-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <CreditCard size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Zero Commission</h3>
              <p className="text-slate-500 text-sm italic">Book IRCTC tickets with zero service fees.</p>
            </div>
          </div>
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-start gap-6">
            <div className="h-14 w-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
              <TrainFront size={32} />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 mb-2">Waitlist Prediction</h3>
              <p className="text-slate-500 text-sm italic">Know your confirmation chances before booking.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
