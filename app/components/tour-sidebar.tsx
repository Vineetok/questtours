// components/tour-sidebar.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {  Users, MapPin, Clock,  ShieldCheck, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Card, CardContent } from '@/components/ui/display/card';
import { formatCurrency } from '@/lib/utils';

interface TourSidebarProps {
  id: string;
  price: number;
  duration: string;
  location: string;
  isMobile?: boolean;
  onClose?: () => void;
}

export function TourSidebar({ id, price, duration, location, isMobile = false, onClose }: TourSidebarProps) {
  const router = useRouter();
  const [passengers, setPassengers] = useState(1);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleBooking = () => {
    setIsNavigating(true);
    setTimeout(() => {
      router.push(`/tours/${id}/book?passengers=${passengers}`);
      if (onClose) onClose();
    }, 300);
  };

  const totalPrice = passengers * price;

  return (
    <div className={!isMobile ? "sticky top-24" : ""}>
      <Card className="border-none shadow-xl bg-slate-900 text-white rounded-2xl md:rounded-3xl overflow-hidden">
        <CardContent className={`${isMobile ? 'p-5' : 'p-6 md:p-8'} space-y-5 md:space-y-6`}>
          {/* Price Section */}
          <div className="text-center pb-4 md:pb-6 border-b border-white/10">
            <p className="text-xs md:text-sm text-slate-400 font-medium line-through">
              {formatCurrency(price * 1.2)}
            </p>
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl md:text-4xl font-black text-white">
                {formatCurrency(price)}
              </span>
              <span className="text-slate-400 text-sm md:text-base">per person</span>
            </div>
            <span className="inline-block mt-2 bg-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-black px-2 md:px-3 py-1 rounded-full">
              Save 20%
            </span>
          </div>

          {/* Tour Details */}
          <div className="space-y-3 md:space-y-4">
            <div className="flex items-center gap-3 text-slate-300">
              <Clock size={16} className="md:size-5 text-slate-500" />
              <div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">Duration</p>
                <p className="font-bold text-sm md:text-base">{duration}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-slate-300">
              <MapPin size={16} className="md:size-5 text-slate-500" />
              <div>
                <p className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500">Location</p>
                <p className="font-bold text-sm md:text-base">{location}</p>
              </div>
            </div>
          </div>

          {/* Passengers Selector */}
          <div className="space-y-3 pt-2 border-t border-white/10">
            <label className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Users size={14} className="md:size-16" />
              Number of Travelers
            </label>
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-2 border border-white/10">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 md:h-10 md:w-10 rounded-lg text-white hover:bg-white/10"
                onClick={() => setPassengers(Math.max(1, passengers - 1))}
              >
                -
              </Button>
              <span className="text-xl md:text-2xl font-black text-white">{passengers}</span>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 md:h-10 md:w-10 rounded-lg text-white hover:bg-white/10"
                onClick={() => setPassengers(passengers + 1)}
              >
                +
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="pt-2">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Total Price</p>
                <p className="text-2xl md:text-3xl font-black text-white">{formatCurrency(totalPrice)}</p>
              </div>
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white/20" />
            </div>

            <Button 
              onClick={handleBooking}
              disabled={isNavigating}
              className="w-full bg-sky-600 hover:bg-sky-500 text-white rounded-xl md:rounded-2xl font-bold h-12 md:h-14 text-sm md:text-base transition-all shadow-lg shadow-sky-900/50"
            >
              {isNavigating ? 'Processing...' : 'Book Now'}
            </Button>
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
            <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-emerald-400 flex-shrink-0" />
            <p className="text-[9px] md:text-[10px] font-medium leading-tight text-slate-300">
              Secure booking. Free cancellation up to 7 days.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}