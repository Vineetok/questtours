'use client';

import { useState } from 'react';
import { TourCard } from './tour-card';
import { TourModal } from './tour-modal';
import { ArrowRight, ChevronDown } from 'lucide-react';

import { toursData } from '@/lib/data';

export function FeaturedTours() {
  const [selectedTour, setSelectedTour] = useState<typeof toursData[0] | null>(null);
  const [showAll, setShowAll] = useState(false);

  const displayedTours = showAll ? toursData : toursData.slice(0, 4);

  return (
    <section id="tours" className="py-12 sm:py-16 lg:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-3">
          <span className="text-blue-600 font-bold text-xs uppercase tracking-widest">
            Featured Packages
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#003B5C]">
            Handpicked Tour Packages
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Our most popular tours carefully crafted to deliver the perfect balance of adventure, comfort, and value.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {displayedTours.map((tour) => (
            <TourCard
              key={tour.id}
              {...tour}
              onClick={() => setSelectedTour(tour)}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          {!showAll ? (
            <button 
              onClick={() => setShowAll(true)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-xl group"
            >
              View All Packages
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button 
              onClick={() => setShowAll(false)}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-[#003B5C] text-[#003B5C] font-bold rounded-full transition-all hover:bg-gray-50 group"
            >
              Show Less
              <ChevronDown size={18} className="transition-transform group-hover:rotate-180" />
            </button>
          )}
        </div>
      </div>

      <TourModal
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </section>
  );
}
