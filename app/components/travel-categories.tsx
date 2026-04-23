'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toursData } from '@/lib/data';
import { TourCard } from './tour-card';
import { TourModal } from './tour-modal';

const categories = [
  {
    id: 1,
    name: 'Honeymoon',
    slug: 'honeymoon',
    count: 45,
    icon: '💕',
  },
  {
    id: 2,
    name: 'Adventure',
    slug: 'adventure',
    count: 38,
    icon: '⛰️',
  },
  {
    id: 3,
    name: 'Family',
    slug: 'family',
    count: 52,
    icon: '👨‍👩‍👧‍👦',
  },
  {
    id: 4,
    name: 'Beach',
    slug: 'beach',
    count: 30,
    icon: '🏖️',
  },
  {
    id: 5,
    name: 'Pilgrimage',
    slug: 'pilgrimage',
    count: 25,
    icon: '🛕',
  },
  {
    id: 6,
    name: 'Cultural',
    slug: 'cultural',
    count: 35,
    icon: '🏛️',
  },
  {
    id: 7,
    name: 'Wildlife',
    slug: 'wildlife',
    count: 18,
    icon: '🐅',
  },
  {
    id: 8,
    name: 'International',
    slug: 'international',
    count: 42,
    icon: '✈️',
  },
];

export function TravelCategories() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTour, setSelectedTour] = useState<typeof toursData[0] | null>(null);

  const getFilteredTours = (categorySlug: string) => {
    return toursData.filter((tour) => {
      const tag = tour.tag.toLowerCase();
      const loc = tour.location.toLowerCase();
      
      switch (categorySlug) {
        case 'honeymoon': return tag === 'honeymoon' || tag === 'romantic';
        case 'adventure': return tag === 'adventure';
        case 'family': return tag === 'family';
        case 'beach': return ['goa', 'maldives', 'bali'].includes(loc);
        case 'pilgrimage': return tag === 'spiritual' || tag === 'heritage';
        case 'cultural': return tag === 'cultural' || tag === 'royal' || tag === 'heritage';
        case 'wildlife': return tag === 'nature';
        case 'international': return !['manali', 'goa', 'kerala', 'rajasthan', 'ladakh', 'agra', 'rishikesh', 'sikkim', 'udaipur', 'hampi'].includes(loc);
        default: return false;
      }
    });
  };

  const filteredTours = activeCategory ? getFilteredTours(activeCategory) : [];
  const activeCategoryData = categories.find(c => c.slug === activeCategory);

  return (
    <section id="categories" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-[#003B5C] mb-4">
            Find Your Perfect Trip Style
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed">
            Whether you&apos;re seeking adventure, romance, or family fun — we have the <br className="hidden md:block" />
            perfect tour category for every traveler.
          </p>
          
          {/* Decorative left-aligned line matching screenshot */}
          <div className="w-full max-w-4xl mt-6 relative">
             <div className="absolute left-0 w-16 h-[2px] bg-gradient-to-r from-[#003B5C] to-cyan-600"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <button
                onClick={() => setActiveCategory(cat.slug)}
                className="w-full h-full flex flex-col items-center p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 bg-white transition-all duration-300 focus:outline-none"
              >
                {/* Icon (Emoji) */}
                <div className="text-5xl mb-4 transform hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </div>

                {/* Name */}
                <h3 className="text-base font-bold text-[#003B5C] mb-1">
                  {cat.name}
                </h3>

                {/* Count */}
                <p className="text-xs text-gray-400 font-medium">
                  {cat.count} Packages
                </p>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Category Popup Modal */}
      <AnimatePresence>
        {activeCategory && activeCategoryData && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setActiveCategory(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-6xl max-h-[90vh] bg-gray-50 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 sm:p-8 bg-white border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{activeCategoryData.icon}</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-[#003B5C]">
                      {activeCategoryData.name} Packages
                    </h3>
                    <p className="text-gray-500 mt-1">
                      Found {filteredTours.length} packages perfectly suited for you
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors focus:outline-none"
                >
                  <X className="w-6 h-6 text-gray-500" />
                </button>
              </div>

              {/* Modal Body / Grid */}
              <div className="p-6 sm:p-8 overflow-y-auto custom-scrollbar flex-1">
                {filteredTours.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTours.map((tour) => (
                      <TourCard
                        key={tour.id}
                        {...tour}
                        onClick={() => setSelectedTour(tour)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center">
                    <p className="text-gray-500 text-lg">No packages currently available for this category.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detailed Tour Modal */}
      <TourModal
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </section>
  );
}
