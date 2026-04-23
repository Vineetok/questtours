'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Calendar, Users, MapPin, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1600&q=80',
    title: 'Discover Your Next',
    highlight: 'Adventure',
    subtitle: 'Explore breathtaking destinations with curated tour packages designed for unforgettable experiences.',
  },
  {
    image: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80',
    title: 'Create Memories That',
    highlight: 'Last Forever',
    highlightColor: 'text-cyan-400',
    subtitle: 'From mountain peaks to ocean shores, find your perfect getaway with QuestTours.',
  },
  {
    image: 'https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=1600&q=80',
    title: 'Travel Beyond',
    highlight: 'Boundaries',
    highlightColor: 'text-indigo-400',
    subtitle: 'International tours, domestic escapes, and adventure trips - all at unbeatable prices.',
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    travelers: '2'
  });

  const isSearchDisabled = !searchData.destination || !searchData.date || !searchData.travelers;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 9000);
    return () => clearInterval(timer);
  }, []);

  const handleScrollToTours = () => {
    const toursSection = document.getElementById('tours');
    if (toursSection) {
      toursSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroSlides[currentSlide].image})`,
          }}
        />
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="space-y-4"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.3 }}
                className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-balance leading-tight tracking-tight"
              >
                {heroSlides[currentSlide].title}{' '}
                <span className={heroSlides[currentSlide].highlightColor || 'text-blue-400 italic'}>
                  {heroSlides[currentSlide].highlight}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="text-lg sm:text-2xl text-gray-200 text-balance font-medium"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Search Bar */}
          <div className="bg-white/60 rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {/* Destination */}
              <div className="relative text-left">
                <label className="text-gray-700 text-sm font-bold block mb-2">
                  <MapPin className="inline mr-2 text-blue-600" size={16} />
                  Destination
                </label>
                <Input
                  placeholder="Where to?"
                  value={searchData.destination}
                  onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                  className=" bg-gray-50 border-gray-200 text-gray-900 placeholder:text-gray-400 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                />
              </div>

              {/* Date */}
              <div className="relative text-left">
                <label className="text-gray-700 text-sm font-bold block mb-2">
                  <Calendar className="inline mr-2 text-blue-600" size={16} />
                  Date
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                />
              </div>

              {/* Travelers */}
              <div className="relative text-left">
                <label className="text-gray-700 text-sm font-bold block mb-2">
                  <Users className="inline mr-2 text-blue-600" size={16} />
                  Travelers
                </label>
                <Input
                  type="number"
                  min="1"
                  value={searchData.travelers}
                  onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                  className="bg-gray-50 border-gray-200 text-gray-900 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button 
                  onClick={handleScrollToTours}
                  disabled={isSearchDisabled}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-11 rounded-lg font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button 
            onClick={handleScrollToTours}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6 rounded-xl cursor-pointer"
          >
            Explore Tours
          </Button>
        </div>
      </div>
    </section>
  );
}

