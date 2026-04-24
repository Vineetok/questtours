'use client';

import Image from 'next/image';
import { useState } from 'react';
import { MapPin, ArrowRight, X } from 'lucide-react';
// import { AuthModal } from '@/components/auth-modal';
import { Button } from '@/components/ui/inputs/button';


const popularDestinations = [
  {
    id: 1,
    name: 'Manali',
    location: 'India',
    packages: 24,
    image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80',
    colSpan: 'lg:col-span-8',
  },
  {
    id: 2,
    name: 'Goa',
    location: 'India',
    packages: 32,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 3,
    name: 'Kerala',
    location: 'India',
    packages: 28,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&q=80',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 4,
    name: 'Rajasthan',
    location: 'India',
    packages: 20,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80',
    colSpan: 'lg:col-span-8',
    showExplore: true,
  },
];

const allExtraDestinations = [
  { id: 7, name: 'Leh Ladakh', location: 'India', packages: 12, image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=800&q=80' },
  { id: 8, name: 'Sikkim', location: 'India', packages: 18, image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=800&q=80' },
  { id: 9, name: 'Andaman', location: 'India', packages: 22, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&q=80' },
  { id: 10, name: 'Agra', location: 'India', packages: 10, image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&q=80' },
  { id: 11, name: 'Rishikesh', location: 'India', packages: 15, image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80' },
  { id: 12, name: 'Udaipur', location: 'India', packages: 20, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=800&q=80' },
  { id: 13, name: 'Kyoto', location: 'Japan', packages: 25, image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80' },
  { id: 14, name: 'Paris', location: 'France', packages: 30, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80' },
  { id: 15, name: 'Santorini', location: 'Greece', packages: 18, image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80' },
  { id: 16, name: 'Maldives', location: 'Indian Ocean', packages: 28, image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80' },
  { id: 5, name: 'Bali', location: 'Indonesia', packages: 18, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80' },
  { id: 6, name: 'Dubai', location: 'UAE', packages: 15, image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80' },
];

interface DestinationsProps {
  showAll?: boolean;
}

export function Destinations({ showAll = false }: DestinationsProps) {
  const [isAllOpen, setIsAllOpen] = useState(false);

  // const [isAuthOpen, setIsAuthOpen] = useState(false);

  // const handleViewPlan = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   setIsAuthOpen(true);
  // };

  return (
    <section id="destinations" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Top Destinations
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Popular</span> Destinations
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            From the snow-capped Himalayas to sun-kissed beaches, discover handpicked destinations that promise extraordinary experiences.
          </p>
        </div>

        {showAll ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {[...popularDestinations, ...allExtraDestinations].map((dest) => (
              <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all group border border-gray-100">
                <div className="relative h-56 overflow-hidden">
                  <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#003B5C] flex items-center gap-1">
                    <MapPin size={10} className="text-blue-500" /> {dest.location}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003B5C] mb-1">{dest.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{dest.packages} Tour Packages Available</p>
                  <Button 
                    className="w-full bg-white hover:bg-gray-100 text-black font-bold rounded-xl h-11 shadow-md transition-all border border-gray-200"
                    onClick={() => {}}
                  >
                    View Plan
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
              {popularDestinations.map((dest) => (
                  <div
                    key={dest.id}
                    className={`group relative overflow-hidden rounded-2xl h-[350px] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${dest.colSpan}`}
                    onClick={() => {}}
                  >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/90 via-transparent to-transparent opacity-80" />
                  
                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <div className="flex items-center gap-1 text-blue-400 mb-1">
                      <MapPin size={14} className="fill-blue-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">{dest.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {dest.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {dest.packages} Tour Packages
                    </p>
                  <div className="mt-4">
                    <Button 
                      className="bg-white hover:bg-gray-100 text-black border-none rounded-full px-8 font-bold shadow-lg transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View Plan
                    </Button>
                  </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Button */}
            <div className="mt-12 text-center">
              <button 
                onClick={() => setIsAllOpen(true)}
                className="inline-flex items-center px-8 py-3 bg-white border-2 border-gray-200 rounded-full text-[#003B5C] font-bold hover:bg-gray-50 transition-all gap-2 group cursor-pointer"
              >
                View All Destinations
                <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-1.5 rounded-full text-white transition-transform group-hover:translate-x-1 shadow-md">
                  <ArrowRight size={14} />
                </div>
              </button>
            </div>
          </>
        )}
      </div>

      {/* View All Destinations Modal */}
      {isAllOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsAllOpen(false)} />
          <div className="relative bg-gray-50 w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-10 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold text-[#003B5C]">All Destinations</h2>
                <p className="text-gray-500">Pick your next dream getaway</p>
              </div>
              <button 
                onClick={() => setIsAllOpen(false)}
                className="p-3 bg-white text-gray-500 hover:text-gray-800 rounded-full shadow-md transition-all"
              >
                <X size={24} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {allExtraDestinations.map((dest) => (
                <div key={dest.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-all group">
                  <div className="relative h-48 overflow-hidden">
                    <Image src={dest.image} alt={dest.name} fill className="object-cover transition-transform group-hover:scale-110" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-[#003B5C] flex items-center gap-1">
                      <MapPin size={10} className="text-blue-500" /> {dest.location}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#003B5C] mb-1">{dest.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{dest.packages} Tour Packages Available</p>
                    <Button 
                      className="w-full bg-white hover:bg-gray-100 text-black font-bold rounded-xl h-11 shadow-md transition-all border border-gray-200"
                      onClick={() => {}}
                    >
                      View Plan
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal */}
      {/* <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} /> */}
      {/* <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} /> */}
    </section>
  );
}
