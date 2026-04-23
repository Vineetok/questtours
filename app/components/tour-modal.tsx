"use client";

import Image from 'next/image';
import {
  ArrowRight,
  Check,
  Clock,
  Globe2,
  MapPin,
  ShieldCheck,
  Star,
  Users,
  X,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/overlays/dialog';
import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface TourModalProps {
  isOpen: boolean;
  onClose: () => void;
  tour: {
    image: string;
    location: string;
    title: string;
    price: number;
    rating: number;
    reviews: number;
    description?: string;
    highlights?: string[];
    duration?: string;
    groupSize?: string;
  } | null;
}

export function TourModal({ isOpen, onClose, tour }: TourModalProps) {
  if (!tour) return null;

  const highlights = tour.highlights || [
    'Expert local guide',
    'All entrance fees included',
    'Luxury transportation',
    'Authentic local lunch',
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "max-w-[100vw] sm:max-w-[95vw] lg:max-w-[1200px]",
          "h-[100dvh] sm:h-[90vh] p-0 overflow-hidden border-none bg-white",
          "rounded-none sm:rounded-[32px] shadow-2xl"
        )}
      >
        {/* Fixed Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-black/20 text-white backdrop-blur-md transition-all hover:bg-black/40 hover:scale-110 active:scale-95 sm:right-6 sm:top-6"
        >
          <X size={20} />
        </button>

        <div className="flex h-full flex-col lg:flex-row">
          {/* LEFT COLUMN: Visual Hero (Sticky on Desktop) */}
          <div className="relative h-[40vh] w-full shrink-0 lg:h-full lg:w-[45%]">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              priority
              className="object-cover"
            />
            {/* Sophisticated Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent hidden lg:block" />

            {/* Top Badges */}
            <div className="absolute left-6 top-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/20">
                <Sparkles size={12} className="text-amber-300" />
                Top Rated
              </div>
            </div>

            {/* Bottom Hero Content */}
            <div className="absolute bottom-0 left-0 w-full p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sky-300 mb-2">
                <MapPin size={16} />
                <span className="text-sm font-semibold tracking-wide uppercase">{tour.location}</span>
              </div>
              <DialogTitle className="text-3xl font-bold text-white sm:text-4xl lg:text-5xl leading-[1.1]">
                {tour.title}
              </DialogTitle>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-amber-400 px-2 py-0.5 text-xs font-bold text-black">
                  <Star size={12} className="fill-current" />
                  {tour.rating.toFixed(1)}
                </div>
                <span className="text-sm font-medium text-white/80">
                  {tour.reviews} traveler reviews
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Information (Scrollable) */}
          <div className="flex flex-1 flex-col overflow-hidden bg-slate-50">
            <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-10">

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { icon: Clock, label: 'Duration', val: tour.duration || '8 Hours' },
                  { icon: Users, label: 'Group Size', val: tour.groupSize || 'Max 10' },
                  { icon: Globe2, label: 'Language', val: 'English' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 text-center shadow-sm border border-slate-100">
                    <stat.icon size={20} className="mb-2 text-sky-600" />
                    <span className="text-[10px] font-bold uppercase tracking-tighter text-slate-400">{stat.label}</span>
                    <span className="text-sm font-bold text-slate-900">{stat.val}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="mb-10">
                <h3 className="mb-4 text-xl font-bold text-slate-900">The Experience</h3>
                <DialogDescription className="text-base leading-relaxed text-slate-600 italic border-l-4 border-sky-500 pl-4 py-1">
                  {tour.description || "Embark on a journey that blends hidden gems with iconic landmarks. Our curated approach ensures you skip the crowds and find the soul of the city."}
                </DialogDescription>
              </div>

              {/* Highlights Grid */}
              <div className="mb-10">
                <h3 className="mb-4 text-xl font-bold text-slate-900">What&apos;s Included</h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl bg-emerald-50/50 p-3 border border-emerald-100">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                        <Check size={14} strokeWidth={3} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Section */}
              <div className="rounded-2xl bg-sky-100 p-6 text-slate-900 shadow-sm border border-sky-200">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-white p-3 shadow-sm text-sky-600">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-sky-900">Peace of Mind Guarantee</h4>
                    <p className="text-sm text-sky-700/80 mt-1">
                      Free cancellation up to 24 hours before the tour starts. Instant confirmation upon booking.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BOTTOM CTA BAR */}
            <div className="sticky bottom-0 border-t border-slate-200 bg-white p-6 sm:px-10">
              <div className="flex items-center justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Price</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">
                      ₹{tour.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm font-medium text-slate-500">/ person</span>
                  </div>
                </div>

                <Link href="/signup" className="flex-1 sm:flex-none">
                  <Button className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-8 text-base font-bold text-white transition-all hover:shadow-lg hover:shadow-sky-200 active:scale-[0.98] sm:min-w-[200px]">
                    Reserve Now
                    <ArrowRight size={18} className="ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

