'use client';

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
    name: 'Aditya Sharma',
    location: 'Mumbai, India',
    review: 'The Rajasthan heritage tour was mind-blowing! Everything from the stay in the Haveli to the desert safari was perfectly managed. Truly an unforgettable experience.',
    rating: 5,
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    name: 'Priya Patel',
    location: 'Ahmedabad, India',
    review: 'Varanasi at night is spiritual and serene. QuestTours made sure we had the best view for the Ganga Aarti. Highly recommend their local guides!',
    rating: 5,
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    name: 'Rahul Varma',
    location: 'Delhi, India',
    review: 'Our Kerala houseboat stay was the highlight of our honeymoon. The food on board was authentic and delicious. Hassle-free booking through the app!',
    rating: 5,
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop',
    name: 'Ananya Iyer',
    location: 'Chennai, India',
    review: 'Goa was fun, but the private beach retreat suggested by QuestTours was exactly the peace we needed. Professional service throughout.',
    rating: 4,
  },
];

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/overlays/dialog';

export function Testimonials() {
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Traveler Stories
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Travelers</span> Say
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Real experiences from thousands of happy travelers who explored the world with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onClick={() => setSelectedTestimonial(testimonial)}
              className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 cursor-pointer hover:border-blue-100 group"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < testimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed line-clamp-4 group-hover:text-gray-900 transition-colors">
                &quot;{testimonial.review}&quot;
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div
                  className="w-12 h-12 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${testimonial.avatar})` }}
                />
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 text-sm">
                    {testimonial.name}
                  </p>
                  <p className="text-gray-500 text-xs">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Modal */}
      <Dialog open={!!selectedTestimonial} onOpenChange={() => setSelectedTestimonial(null)}>
        <DialogContent className="max-w-md bg-white rounded-3xl border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-gray-900">Traveler Review</DialogTitle>
          </DialogHeader>
          {selectedTestimonial && (
            <div className="space-y-6 pt-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${i < selectedTestimonial.rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                      }`}
                  />
                ))}
              </div>
              <p className="text-lg text-gray-700 leading-relaxed italic">
                &quot;{selectedTestimonial.review}&quot;
              </p>
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                <div
                  className="w-14 h-14 rounded-full bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${selectedTestimonial.avatar})` }}
                />
                <div>
                  <p className="text-lg font-bold text-gray-900">{selectedTestimonial.name}</p>
                  <p className="text-gray-500 font-medium">{selectedTestimonial.location}</p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

