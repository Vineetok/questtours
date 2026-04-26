'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Calendar, Users, MapPin, Search, Plane, Hotel, TrainFront, Bus, Car, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const heroSlides = [
  {
    image: '/tours/hero-beach.png',
    title: 'Discover Your Next',
    highlight: 'Adventure',
    subtitle: 'Explore breathtaking destinations with curated tour packages designed for unforgettable experiences.',
  },
  {
    image: '/tours/hero-mountain.png',
    title: 'Create Memories That',
    highlight: 'Last Forever',
    highlightColor: 'text-cyan-400',
    subtitle: 'From mountain peaks to ocean shores, find your perfect getaway with QuestTours.',
  },
  {
    image: '/tours/hero-adventure.png',
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

  const services = [
    { id: 'tours', label: 'Holidays', icon: MapPin, href: '/#tours', active: true },
    { id: 'trains', label: 'Trains', icon: TrainFront, href: '/trains', active: false },
    { id: 'buses', label: 'Buses', icon: Bus, href: '/buses', active: false },
    { id: 'insurance', label: 'Insurance', icon: ShieldCheck, href: '/insurance', active: false },
  ];

  return (
    <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-700" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        <div className="space-y-12">
          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="space-y-6"
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight"
              >
                {heroSlides[currentSlide].title}<br />
                <span className={heroSlides[currentSlide].highlightColor || 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400'}>
                  {heroSlides[currentSlide].highlight}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed"
              >
                {heroSlides[currentSlide].subtitle}
              </motion.p>
            </motion.div>
          </AnimatePresence>

          {/* Service Switcher */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 animate-in fade-in slide-in-from-top-8 duration-1000 delay-500">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className={`flex flex-col items-center gap-1 p-2 min-w-[60px] sm:min-w-[75px] rounded-2xl transition-all duration-300 group ${
                  service.id === 'tours' 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' 
                    : 'bg-white/60 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white/80 shadow-lg shadow-black/5 border border-white/40'
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-transform group-hover:scale-110 ${service.id === 'tours' ? 'bg-white/20' : 'bg-slate-100 text-slate-500 group-hover:text-blue-600'}`}>
                  <service.icon size={16} />
                </div>
                <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest">{service.label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar - Modern White Widget */}
          <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2rem] p-4 lg:p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
              {/* Destination */}
              <div className="md:col-span-4 text-left space-y-2">
                <label className="text-black text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin size={12} className="text-blue-600" />
                  From City / Destination
                </label>
                <div className="relative">
                  <Input
                    placeholder="Search destinations..."
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="h-10 bg-white/40 border-white/40 text-slate-900 placeholder:text-slate-600 focus:ring-blue-500 focus:bg-white/80 focus:border-blue-500 rounded-lg font-bold text-sm px-3 transition-all"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 text-left space-y-2">
                <label className="text-black text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Calendar size={12} className="text-blue-600" />
                  Travel Date
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="h-10 bg-white/40 border-white/40 text-slate-900 focus:ring-blue-500 focus:bg-white/80 focus:border-blue-500 rounded-lg font-bold text-sm px-3 transition-all"
                />
              </div>

              {/* Travelers */}
              <div className="md:col-span-3 text-left space-y-2">
                <label className="text-black text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Users size={12} className="text-blue-600" />
                  Travelers
                </label>
                <Input
                  type="number"
                  min="1"
                  value={searchData.travelers}
                  onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                  className="h-10 bg-white/40 border-white/40 text-slate-900 focus:ring-blue-500 focus:bg-white/80 focus:border-blue-500 rounded-lg font-bold text-sm px-3 transition-all"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button 
                  onClick={handleScrollToTours}
                  disabled={isSearchDisabled}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-10 rounded-lg font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Search size={20} />
                  <span className="uppercase tracking-widest text-xs">Search</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


