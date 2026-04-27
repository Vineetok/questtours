'use client';

import React, { useState, useEffect } from 'react';
import { TourCard } from './tour-card';
import { adminService } from '@/services/adminService';
import { Package } from '@/lib/types';
import {  ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/inputs/button';
import { toast } from 'sonner';

export function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const data = await adminService.getPackages();
        setPackages(data || []);
      } catch  {
        toast.error('Failed to fetch packages');
      } finally {
        setIsLoading(false);
      }
    };
    fetchPackages();
  }, []);

  if (!isLoading && packages.length === 0) return null;

  return (
    <section id="packages" className="py-24 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="space-y-4">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.2em] bg-blue-50 px-4 py-1.5 rounded-full">
              Best Deals
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-[#003B5C] tracking-tight">
              Holiday Packages
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl">
              All-inclusive travel packages curated to provide you with a seamless and luxurious vacation experience.
            </p>
          </div>
          <Link href="/tours">
            <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-black gap-2 hover:bg-gray-50 transition-all">
              Explore All Packages <ChevronRight size={18} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {isLoading ? (
            [1, 2, 3, 4].map(i => (
              <div key={i} className="h-[400px] bg-white rounded-[2rem] animate-pulse"></div>
            ))
          ) : (
            packages.slice(0, 4).map((pkg) => (
              <TourCard
                key={pkg.id}
                image={pkg.image}
                location={pkg.location}
                title={pkg.title}
                price={pkg.price}
                originalPrice={pkg.originalPrice}
                discount={pkg.discount}
                duration={pkg.duration}
                rating={4.9} 
                reviews={120} 
                onClick={() => window.location.href = `/tours/${pkg.id}`}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
