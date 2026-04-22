'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Users, MapPin, Search } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/hero-bg.png)',
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />

      {/* Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8 animate-fade-in">
          {/* Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white text-balance leading-tight tracking-tight">
              Experience the <span className="text-blue-400 italic">Magic</span> of India
            </h1>
            <p className="text-lg sm:text-2xl text-gray-200 text-balance font-medium">
              Discover curated heritage tours, spiritual retreats, and tropical escapes
            </p>
          </div>

          {/* Search Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4">
              {/* Destination */}
              <div className="relative">
                <label className="text-white text-sm font-medium block mb-2">
                  <MapPin className="inline mr-2" size={16} />
                  Destination
                </label>
                <Input
                  placeholder="Where to?"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                />
              </div>

              {/* Date */}
              <div className="relative">
                <label className="text-white text-sm font-medium block mb-2">
                  <Calendar className="inline mr-2" size={16} />
                  Date
                </label>
                <Input
                  type="date"
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>

              {/* Travelers */}
              <div className="relative">
                <label className="text-white text-sm font-medium block mb-2">
                  <Users className="inline mr-2" size={16} />
                  Travelers
                </label>
                <Input
                  type="number"
                  min="1"
                  defaultValue="2"
                  className="bg-white/20 border-white/30 text-white"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white h-11 rounded-lg font-semibold flex items-center justify-center gap-2">
                  <Search size={18} />
                  <span className="hidden sm:inline">Search</span>
                </Button>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white text-lg px-8 py-6 rounded-xl">
            Explore Tours
          </Button>
        </div>
      </div>
    </section>
  );
}
