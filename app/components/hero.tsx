'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Calendar, Users, MapPin, Search, Plane, Hotel, TrainFront, Bus, Car, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

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
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-slate-900" />

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
                transition={{ duration: 1.0, delay: 0.3 }}
                className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tight"
              >
                {heroSlides[currentSlide].title}<br />
                <span className={heroSlides[currentSlide].highlightColor || 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic'}>
                  {heroSlides[currentSlide].highlight}
                </span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className="text-xl sm:text-2xl text-slate-300 max-w-3xl mx-auto font-medium leading-relaxed"
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
                className={`flex flex-col items-center gap-2 p-3 min-w-[80px] sm:min-w-[100px] rounded-2xl transition-all duration-300 group ${
                  service.id === 'tours' 
                    ? 'bg-blue-600/20 text-white border border-blue-400/30' 
                    : 'text-slate-400 hover:text-white hover:bg-white/10 border border-transparent'
                }`}
              >
                <div className={`p-2.5 rounded-xl transition-transform group-hover:scale-110 ${service.id === 'tours' ? 'bg-blue-500 shadow-lg shadow-blue-500/50' : 'bg-white/10'}`}>
                  <service.icon size={22} />
                </div>
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest">{service.label}</span>
              </Link>
            ))}
          </div>

          {/* Search Bar - Modern Glassmorphic Widget */}
          <div className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] p-6 lg:p-10 border border-white/20 shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-700 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
              {/* Destination */}
              <div className="md:col-span-4 text-left space-y-2">
                <label className="text-white/70 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <MapPin size={12} className="text-blue-400" />
                  From City / Destination
                </label>
                <div className="relative">
                  <Input
                    placeholder="Search destinations..."
                    value={searchData.destination}
                    onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
                    className="h-16 bg-white/10 border-white/10 text-white placeholder:text-white/30 focus:ring-blue-500 focus:bg-white/20 rounded-2xl font-bold text-lg px-6"
                  />
                </div>
              </div>

              {/* Date */}
              <div className="md:col-span-3 text-left space-y-2">
                <label className="text-white/70 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Calendar size={12} className="text-blue-400" />
                  Travel Date
                </label>
                <Input
                  type="date"
                  value={searchData.date}
                  onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
                  className="h-16 bg-white/10 border-white/10 text-white focus:ring-blue-500 focus:bg-white/20 rounded-2xl font-bold text-lg px-6"
                />
              </div>

              {/* Travelers */}
              <div className="md:col-span-3 text-left space-y-2">
                <label className="text-white/70 text-[10px] font-black uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Users size={12} className="text-blue-400" />
                  Travelers
                </label>
                <Input
                  type="number"
                  min="1"
                  value={searchData.travelers}
                  onChange={(e) => setSearchData({ ...searchData, travelers: e.target.value })}
                  className="h-16 bg-white/10 border-white/10 text-white focus:ring-blue-500 focus:bg-white/20 rounded-2xl font-bold text-lg px-6"
                />
              </div>

              {/* Search Button */}
              <div className="md:col-span-2">
                <Button 
                  onClick={handleScrollToTours}
                  disabled={isSearchDisabled}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white h-16 rounded-2xl font-black flex items-center justify-center gap-2 shadow-xl shadow-blue-600/30 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Search size={22} />
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


