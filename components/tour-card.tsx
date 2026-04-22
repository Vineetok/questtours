'use client';

import Image from 'next/image';
import { ArrowUpRight, Clock, MapPin, Star } from 'lucide-react';

interface TourCardProps {
  image: string;
  location: string;
  title: string;
  price: number;
  rating: number;
  reviews: number;
  duration?: string;
  onClick?: () => void;
}

export function TourCard({
  image,
  location,
  title,
  price,
  rating,
  reviews,
  duration = '3 Days',
  onClick,
}: TourCardProps) {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden rounded-[30px] border border-slate-200/80 bg-white shadow-[0_18px_50px_-28px_rgba(15,23,42,0.45)] transition-all duration-500 hover:-translate-y-1 hover:border-slate-300 hover:shadow-[0_24px_60px_-24px_rgba(15,23,42,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 md:flex-row"
    >
      <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:w-[42%] md:shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 42vw"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_42%)]" />

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center rounded-full bg-sky-600/95 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white shadow-lg shadow-sky-900/20 backdrop-blur-md">
            Featured
          </span>
        </div>

        <div className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-xl">
          <Star size={13} className="fill-amber-400 text-amber-400" />
          <span>{rating.toFixed(1)}</span>
        </div>

        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <div className="rounded-2xl border border-white/15 bg-white/95 px-3.5 py-2 text-slate-950 shadow-[0_12px_24px_-16px_rgba(15,23,42,0.75)] backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500">
              Starting from
            </p>
            <p className="text-lg font-black leading-none">
              {"\u20B9"}
              {price.toLocaleString('en-IN')}
            </p>
          </div>

          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-slate-950/55 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
            <Clock size={12} />
            {duration}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 lg:p-7">
        <div className="flex items-start justify-between gap-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500">
            <MapPin size={14} className="text-sky-500" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700">
            {reviews} reviews
          </div>
        </div>

        <h3 className="mt-3 line-clamp-2 text-2xl font-black leading-tight tracking-tight text-slate-950 transition-colors duration-300 group-hover:text-sky-700">
          {title}
        </h3>

        <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
          Curated travel with smooth planning, local insight, and a polished booking experience.
          Everything feels lighter when the route, pace, and logistics are handled well.
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Duration
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{duration}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Rating
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">{rating.toFixed(1)} / 5</p>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
              Verified travelers
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-700">
              Trusted by 1000+ guests
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white shadow-[0_16px_30px_-18px_rgba(15,23,42,0.9)] transition-all duration-300 hover:bg-sky-600 hover:shadow-[0_20px_34px_-20px_rgba(2,132,199,0.9)] active:scale-[0.98]"
          >
            <span>Book now</span>
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
