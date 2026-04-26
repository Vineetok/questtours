'use client';

import React from 'react';
import Image from 'next/image';
import { ImageIcon, Maximize2 } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
}

export function TourGallery({ images }: TourGalleryProps) {
  // Use some defaults if images are missing
  const displayImages = images.length >= 5 ? images : [
    images[0],
    "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800&q=80",
    "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=800&q=80",
    "https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80"
  ];

  return (
    <section className="relative h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden group">
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-2 h-full">
        {/* Main Image */}
        <div className="md:col-span-2 md:row-span-2 relative overflow-hidden cursor-pointer">
          <Image 
            src={displayImages[0]} 
            alt="Tour main" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>

        {/* Smaller Images */}
        <div className="hidden md:block relative overflow-hidden cursor-pointer">
          <Image 
            src={displayImages[1]} 
            alt="Tour 2" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="hidden md:block relative overflow-hidden cursor-pointer">
          <Image 
            src={displayImages[2]} 
            alt="Tour 3" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="hidden md:block relative overflow-hidden cursor-pointer">
          <Image 
            src={displayImages[3]} 
            alt="Tour 4" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
        </div>
        <div className="hidden md:block relative overflow-hidden cursor-pointer">
          <Image 
            src={displayImages[4]} 
            alt="Tour 5" 
            fill 
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          {/* Overlay for "View Gallery" */}
          <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Maximize2 size={24} className="mb-2" />
            <span className="text-xs font-black uppercase tracking-widest">View All Photos</span>
          </div>
        </div>
      </div>

      {/* Floating Gallery Button */}
      <button className="absolute bottom-6 right-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/50 shadow-2xl flex items-center gap-3 transition-all hover:bg-white hover:scale-105">
        <ImageIcon size={18} className="text-blue-600" />
        <span className="text-xs font-black text-slate-900 uppercase tracking-widest">View Gallery</span>
      </button>
    </section>
  );
}
