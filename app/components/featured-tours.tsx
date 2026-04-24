'use client';

import React, { useState, useEffect } from 'react';
import { TourCard } from './tour-card';
import { TourModal } from './tour-modal';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { adminService } from '@/services/adminService';
import { Tour } from '@/lib/types';
import { toast } from 'sonner';

interface FeaturedToursProps {
  showAll?: boolean;
}

export function FeaturedTours({ showAll: initialShowAll = false }: FeaturedToursProps) {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTour, setSelectedTour] = useState<any | null>(null);
  const [showAll, setShowAll] = useState(initialShowAll);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await adminService.getTours();
        setTours(data || []);
      } catch {
        toast.error('Failed to fetch tours');
      } finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  const displayedTours = showAll ? tours : tours.slice(0, 4);

  if (!isLoading && tours.length === 0) return null;

  return (
    <section id="tours" className="py-12 sm:py-16 lg:py-20 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Curated Experiences
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            Handpicked Tour <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Packages</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Our most popular tours carefully crafted to deliver the perfect balance of adventure, comfort, and value.
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-[400px] bg-gray-100 rounded-[2rem] animate-pulse"></div>
            ))
          ) : (
            displayedTours.map((tour) => (
              <TourCard
                key={tour.id}
                image={tour.image}
                location={tour.location}
                title={tour.title || tour.name || ''}
                price={tour.price}
                originalPrice={tour.originalPrice}
                discount={tour.discount}
                rating={tour.rating}
                reviews={tour.reviews || 0}
                duration={tour.duration || ''}
                maxPeople={tour.groupSize}
                tag={tour.tag}
                onClick={() => setSelectedTour(tour)}
              />
            ))
          )}
        </div>

        {/* View All Button */}
        {!initialShowAll && (
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
        )}
      </div>

      <TourModal
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </section>
  );
}
