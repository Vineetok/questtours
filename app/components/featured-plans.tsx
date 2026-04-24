'use client';

import React, { useState, useEffect } from 'react';
import { Plan } from '@/lib/types';
import { adminService } from '@/services/adminService';
import { Clock, MapPin, ChevronRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Image from 'next/image';
import Link from 'next/link';

export function FeaturedPlans() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const data = await adminService.getPlans();
        setPlans(data.slice(0, 3) || []);
      } catch (error) {
        console.error('Failed to fetch plans');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (plans.length === 0 && !isLoading) return null;

  return (
    <section id="plans" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] bg-blue-50 px-4 py-1.5 rounded-full">
              Exclusive Itineraries
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Curated <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Travel Plans</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl leading-relaxed">
              Professional day-by-day itineraries designed to give you the ultimate travel experience without the stress of planning.
            </p>
          </div>
          <Link href="/login">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black gap-2 hover:bg-gray-50 transition-all">
              View All Plans <ChevronRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="h-[450px] bg-gray-50 rounded-[2.5rem] animate-pulse"></div>
            ))
          ) : (
            plans.map((plan) => (
              <div key={plan.id} className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={plan.image}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-2 text-white/80 text-xs font-bold mb-1 uppercase tracking-widest">
                      <MapPin size={12} className="text-blue-400" />
                      {plan.location}
                    </div>
                    <h3 className="text-xl font-black text-white">{plan.title}</h3>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg">
                       <Clock size={14} className="text-blue-600" /> {plan.duration}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-black text-gray-500 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-lg">
                       <Calendar size={14} className="text-purple-600" /> {plan.itinerary.length} Days
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-8">
                    {plan.description}
                  </p>
                  <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-0.5">Starting From</span>
                      <span className="text-2xl font-black text-[#003B5C]">₹{plan.price.toLocaleString('en-IN')}</span>
                    </div>
                    <Link href="/login">
                       <Button className="bg-blue-600 hover:bg-blue-700 h-12 w-12 rounded-2xl flex items-center justify-center p-0 shadow-lg shadow-blue-200">
                         <ChevronRight size={20} className="text-white" />
                       </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
