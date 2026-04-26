'use client';

import React from 'react';
import Image from 'next/image';
import {  MapPin, Star,  CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
interface PlanCardProps {
  plan: {
    id: string | number;
    title: string;
    description: string;
    price: number;
    image: string;
    duration: string;
    location: string;
    theme?: string;
    itinerary?: any[];
  };
  onClick?: () => void;
}

export function PlanCard({ plan, onClick }: PlanCardProps) {
  const nights = plan.duration.split('/')[1]?.trim() || plan.duration;

  return (
    <div 
      onClick={onClick}
      className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer flex flex-col md:flex-row h-full md:h-72"
    >
      {/* Image Section */}
      <div className="relative w-full md:w-80 h-60 md:h-full shrink-0 overflow-hidden">
        <Image 
          src={plan.image || "/tours/fallback/fallback-card.png"} 
          alt={plan.title} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/30 uppercase tracking-widest">
            {nights}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 md:p-8 flex flex-1 flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-blue-600">
            <MapPin size={14} />
            <span className="text-xs font-black uppercase tracking-widest">{plan.location}</span>
          </div>
          
          <div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
              {plan.title}
            </h3>
            <p className="text-slate-500 text-sm mt-2 line-clamp-2 italic">
              {plan.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {['Expert Guide', 'Luxury Stay', 'Meals Included'].map(item => (
              <div key={item} className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">
                <CheckCircle2 size={12} className="text-emerald-500" />
                {item}
              </div>
            ))}
            {plan.theme && (
              <div className="flex items-center gap-1.5 text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 uppercase tracking-widest">
                {plan.theme}
              </div>
            )}
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-amber-400 text-amber-400" />
              <span className="font-black text-slate-900 text-lg">4.9</span>
            </div>
            <span className="text-xs font-bold text-slate-400">500+ booked</span>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Starting from</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-black text-slate-900">{formatCurrency(plan.price)}</span>
              <span className="text-xs font-bold text-slate-400">/ person</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
