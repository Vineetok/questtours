'use client';

import Image from 'next/image';
import Link from 'next/link';

export const destinations = [
  {
    id: 1,
    name: 'Rajasthan',
    tours: 12,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop',
  },
  {
    id: 2,
    name: 'Kerala',
    tours: 8,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=600&h=400&fit=crop',
  },
  {
    id: 3,
    name: 'Goa',
    tours: 15,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
  },
  {
    id: 4,
    name: 'Ladakh',
    tours: 6,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=600&h=400&fit=crop',
  },
  {
    id: 5,
    name: 'Himachal',
    tours: 10,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
  },
  {
    id: 6,
    name: 'Tamil Nadu',
    tours: 9,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&h=400&fit=crop',
  },
  {
    id: 7,
    name: 'Uttarakhand',
    tours: 14,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&h=400&fit=crop',
  },
  {
    id: 8,
    name: 'Sikkim',
    tours: 7,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=600&h=400&fit=crop',
  },
  {
    id: 9,
    name: 'Andaman',
    tours: 11,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=600&h=400&fit=crop',
  },
  {
    id: 10,
    name: 'Meghalaya',
    tours: 5,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=600&h=400&fit=crop',
  },
  {
    id: 11,
    name: 'Karnataka',
    tours: 13,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=600&h=400&fit=crop',
  },
  {
    id: 12,
    name: 'Maharashtra',
    tours: 16,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=600&h=400&fit=crop',
  },
];

interface DestinationsProps {
  showAll?: boolean;
}

export function Destinations({ showAll = false }: DestinationsProps) {
  const displayedDestinations = showAll ? destinations : destinations.slice(0, 4);

  return (
    <section id="destinations" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="space-y-4 text-center md:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
              Popular Destinations
            </h2>
            <p className="text-lg text-gray-600">
              Discover the most visited states and cities across India
            </p>
          </div>
          {!showAll && (
            <Link 
              href="/destinations" 
              className="inline-flex items-center text-blue-600 font-bold hover:text-blue-700 transition-colors group"
            >
              View All Destinations
              <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {displayedDestinations.map((dest) => (
            <div
              key={dest.id}
              className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer shadow-lg hover:shadow-xl transition-all duration-500"
            >
              <Image
                src={dest.image}
                alt={dest.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-[-4px] transition-transform duration-500">
                  {dest.name}
                </h3>
                <p className="text-blue-400 font-medium text-xs translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {dest.tours} Active Tours
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
