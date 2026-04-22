'use client';

import Image from 'next/image';
import { Clock, Users, Star, Heart, MapPin } from 'lucide-react';

interface TourCardProps {
  image: string;
  location: string;
  title: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  rating: number;
  reviews: number;
  duration: string;
  maxPeople: number;
  tag?: string;
  onClick?: () => void;
}

export function TourCard({
  image,
  location,
  title,
  price,
  originalPrice,
  discount,
  rating,
  reviews,
  duration,
  maxPeople,
  tag,
  onClick,
}: TourCardProps) {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer flex flex-col h-full"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {tag && (
            <span className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/30 uppercase tracking-wider">
              {tag}
            </span>
          )}
        </div>

        {discount && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            {discount} OFF
          </div>
        )}

        {/* Location & Wishlist */}
        <div className="absolute bottom-4 left-4 flex items-center gap-1 text-white">
          <MapPin size={14} className="text-blue-400" />
          <span className="text-sm font-bold drop-shadow-md">{location}</span>
        </div>
        
        <button className="absolute bottom-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white hover:text-red-500 transition-all border border-white/20">
          <Heart size={16} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-black mb-4 line-clamp-2 leading-tight transition-colors">
          {title}
        </h3>

        <div className="flex items-center gap-4 text-gray-500 text-sm mb-6">
          <div className="flex items-center gap-1.5">
            <Clock size={16} className="text-blue-500" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={16} className="text-blue-500" />
            <span>Max {maxPeople}</span>
          </div>
        </div>

        {/* Footer: Rating & Price */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Star size={16} className="fill-blue-400 text-blue-400" />
            <span className="font-bold text-[#003B5C]">{rating}</span>
            <span className="text-gray-400 text-xs">({reviews})</span>
          </div>

          <div className="text-right">
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through mb-0.5">
                ₹{originalPrice.toLocaleString('en-IN')}
              </p>
            )}
            <p className="text-xl font-black text-[#003B5C]">
              <span className="text-sm font-bold text-gray-400 mr-1">From</span>
              ₹{price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
