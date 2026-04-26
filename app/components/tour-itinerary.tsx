'use client';

import React from 'react';
import { Day } from '@/lib/types';
import { MapPin, Utensils, Hotel, CheckCircle2, ChevronDown } from 'lucide-react';

interface TourItineraryProps {
  itinerary: Day[];
}

export function TourItinerary({ itinerary }: TourItineraryProps) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Detailed Itinerary</h2>
        <span className="text-xs font-black text-blue-600 bg-blue-50 px-4 py-2 rounded-full uppercase tracking-widest border border-blue-100">
          {itinerary.length} Days Plan
        </span>
      </div>

      <div className="relative space-y-12 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:bg-slate-100">
        {itinerary.map((day, index) => (
          <div key={index} className="relative pl-12 group">
            {/* Day Bubble */}
            <div className="absolute left-0 top-0 h-10 w-10 bg-white rounded-xl border-2 border-slate-100 flex items-center justify-center text-slate-900 font-black shadow-sm group-hover:border-blue-500 group-hover:text-blue-600 transition-colors z-10">
              {day.day}
            </div>

            <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <h3 className="text-xl font-black text-slate-900">{day.title}</h3>
                <div className="flex flex-wrap gap-3">
                  {day.meals && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                      <Utensils size={12} />
                      {day.meals}
                    </div>
                  )}
                  {day.stay && (
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100">
                      <Hotel size={12} />
                      {day.stay}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <p className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-blue-500" />
                    Day Activities
                  </p>
                  <ul className="space-y-3">
                    {day.activities.map((activity, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-600 text-sm font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-slate-300 mt-2 shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {index === 0 && (
                  <div className="relative rounded-2xl overflow-hidden h-40 group/img">
                    <img 
                      src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&q=80" 
                      alt="Day highlight" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <span className="absolute bottom-3 left-4 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5">
                      <MapPin size={12} />
                      Arrive & Explore
                    </span>
                  </div>
                )}
              </div>
              
              <button className="mt-8 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                View More Details
                <ChevronDown size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
