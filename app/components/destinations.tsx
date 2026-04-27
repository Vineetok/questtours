'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MapPin, ArrowRight, X, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/inputs/button';
import { wishlistService } from '@/services/wishlistService';
import { toast } from 'sonner';
import { Tour } from '@/lib/types';

const popularDestinations = [
  {
    id: 1,
    name: 'Manali',
    location: 'India',
    packages: 24,
    image: '/tours/dest/manali.png',
    colSpan: 'lg:col-span-8',
  },
  {
    id: 2,
    name: 'Goa',
    location: 'India',
    packages: 32,
    image: '/tours/dest/goa.png',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 3,
    name: 'Kerala',
    location: 'India',
    packages: 28,
    image: '/tours/dest/kerala.png',
    colSpan: 'lg:col-span-4',
  },
  {
    id: 4,
    name: 'Rajasthan',
    location: 'India',
    packages: 20,
    image: '/tours/dest/rajasthan.png',
    colSpan: 'lg:col-span-8',
    showExplore: true,
  },
];

const allExtraDestinations = [
  { id: 7, name: 'Leh Ladakh', location: 'India', packages: 12, image: '/tours/dest/ladakh.png' },
  { id: 8, name: 'Sikkim', location: 'India', packages: 18, image: '/tours/sikkim-dest.png' },
  { id: 9, name: 'Andaman', location: 'India', packages: 22, image: '/tours/andaman.png' },
  { id: 10, name: 'Agra', location: 'India', packages: 10, image: '/tours/agra-dest.png' },
  { id: 11, name: 'Rishikesh', location: 'India', packages: 15, image: '/tours/dest/rishikesh.png' },
  { id: 12, name: 'Udaipur', location: 'India', packages: 20, image: '/tours/dest/udaipur.png' },
  { id: 13, name: 'Kyoto', location: 'Japan', packages: 25, image: '/tours/dest/kyoto.png' },
  { id: 14, name: 'Paris', location: 'France', packages: 30, image: '/tours/dest/paris.png' },
  { id: 15, name: 'Santorini', location: 'Greece', packages: 18, image: '/tours/dest/santorini.png' },
  { id: 16, name: 'Maldives', location: 'Indian Ocean', packages: 28, image: '/tours/dest/maldives.png' },
  { id: 17, name: 'Gujarat', location: 'India', packages: 15, image: '/tours/dest/gujarat.png' },
  { id: 5, name: 'Bali', location: 'Indonesia', packages: 18, image: '/tours/dest/bali.png' },
  { id: 6, name: 'Dubai', location: 'UAE', packages: 15, image: '/tours/dest/dubai.png' },
];

interface DestinationsProps {
  showAll?: boolean;
  linkPrefix?: string;
}

export function Destinations({ showAll = false, linkPrefix = '/tours' }: DestinationsProps) {
  const router = useRouter();
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [wishlistIds, setWishlistIds] = useState<(string | number)[]>([]);

  // Sync wishlist state on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const wishlist = wishlistService.getWishlist();
      setWishlistIds(wishlist.map(item => item.id));
    }
  }, []);

  const destToTour = (dest: any): Tour => ({
    id: `dest-${dest.id}`,
    name: dest.name,
    location: dest.location,
    image: dest.image,
    price: 15000,
    rating: 4.8,
    reviews: 120,
    duration: '5 Days / 4 Nights',
    highlights: ['Expert Guide', 'Luxury Stay', 'Meals Included']
  });

  const toggleWishlist = (e: React.MouseEvent, dest: any) => {
    e.stopPropagation();
    const tour = destToTour(dest);
    if (wishlistService.isInWishlist(tour.id)) {
      wishlistService.removeFromWishlist(tour.id);
      setWishlistIds(prev => prev.filter(id => id !== tour.id));
      toast.error(`${dest.name} removed from wishlist`);
    } else {
      wishlistService.addToWishlist(tour);
      setWishlistIds(prev => [...prev, tour.id]);
      toast.success(`${dest.name} added to wishlist`);
    }
  };

  return (
    <section id="destinations" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Top Destinations
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Popular</span> Destinations
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
                  <button 
                    onClick={(e) => toggleWishlist(e, dest)}
                    className="absolute top-4 right-4 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-md hover:scale-110 transition-transform"
                  >
                    <Heart size={16} className={wishlistIds.includes(`dest-${dest.id}`) ? "fill-rose-500" : ""} />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#003B5C] mb-1">{dest.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{dest.packages} Tour Packages Available</p>
                  <Button
                    className="w-full bg-white hover:bg-gray-100 text-black font-bold rounded-xl h-11 shadow-md transition-all border border-gray-200"
                    onClick={() => router.push(`${linkPrefix}/${dest.id}`)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-6">
              {popularDestinations.map((dest) => (
                <div
                  key={dest.id}
                  className={`group relative overflow-hidden rounded-2xl h-[350px] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500 ${dest.colSpan}`}
                  onClick={() => { }}
                >
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003B5C]/90 via-transparent to-transparent opacity-80" />
                  
                  <button 
                    onClick={(e) => toggleWishlist(e, dest)}
                    className="absolute top-6 right-6 h-10 w-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 hover:bg-white/40 transition-colors z-10"
                  >
                    <Heart size={20} className={wishlistIds.includes(`dest-${dest.id}`) ? "fill-rose-500" : ""} />
                  </button>

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
                        onClick={(e) => {
                          e.stopPropagation();
                          router.push(`${linkPrefix}/${dest.id}`);
                        }}
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
                    <button 
                      onClick={(e) => toggleWishlist(e, dest)}
                      className="absolute top-4 right-4 h-8 w-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-md hover:scale-110 transition-transform"
                    >
                      <Heart size={16} className={wishlistIds.includes(`dest-${dest.id}`) ? "fill-rose-500" : ""} />
                    </button>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-[#003B5C] mb-1">{dest.name}</h3>
                    <p className="text-gray-500 text-sm mb-4">{dest.packages} Tour Packages Available</p>
                    <Button
                      className="w-full bg-white hover:bg-gray-100 text-black font-bold rounded-xl h-11 shadow-md transition-all border border-gray-200"
                      onClick={() => router.push(`${linkPrefix}/${dest.id}`)}
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

      {/* Auth Modal placeholder - handled by individual page auth */}
    </section>
  );
}


