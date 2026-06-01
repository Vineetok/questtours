'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { Star, Trash2, ArrowRight, Plane, Search, SearchX, Heart, Map } from 'lucide-react';
import { wishlistService } from '@/services/wishlistService';
import { Card, CardHeader, CardDescription, CardFooter } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import { Input } from '@/components/ui/inputs/input';
import { TourModal } from '@/components/tour-modal';
import { toast } from 'sonner';
import { Tour } from '@/lib/types';
import { useUser } from '@/hooks/use-user';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BookingChecklistModal } from '@/components/booking-checklist-modal';
import { formatCurrency } from '@/lib/utils';

export default function WishlistPage() {
  const { user } = useUser();
  const router = useRouter();
  const [items, setItems] = useState<Tour[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [checklistTourId, setChecklistTourId] = useState<string | null>(null);

  React.useEffect(() => {
    const loadWishlist = () => {
      const data = wishlistService.getWishlist();
      setItems(data);
    };
    loadWishlist();
  }, []);

  const handleRemove = (id: string | number, name: string) => {
    wishlistService.removeFromWishlist(id);
    setItems(wishlistService.getWishlist());
    toast.success(`${name} removed from your wishlist.`);
  };

  const handleDetailsClick = (id: string | number) => {
    router.push(`/dashboard/customer/explore/${id}`);
  };

  const handleBookNowClick = (id: string | number) => {
    setChecklistTourId(String(id));
  };

  const filteredItems = items.filter(item => 
    item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout 
      role="customer" 
      userName={user?.name || "Customer User"} 
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-8 pb-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Your Wishlist</h1>
            <p className="text-gray-500 font-medium">Keep track of the destinations you&apos;re dreaming about.</p>
          </div>
          
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-colors group-focus-within:text-blue-600" />
            <Input 
              placeholder="Search wishlist..." 
              className="pl-10 h-11 bg-white border-gray-200 focus:ring-blue-600 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 hover:text-gray-600"
              >
                <SearchX className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredItems.map((tour) => (
              <Card key={tour.id} className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-500 bg-white ring-1 ring-gray-100 flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden cursor-pointer" onClick={() => handleDetailsClick(tour.id)}>
                  <Image 
                    src={tour.image} 
                    alt={tour.name ?? 'Tour image'} 
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0" onClick={(e) => e.stopPropagation()}>
                    <Button 
                      variant="destructive" 
                      size="icon" 
                      className="h-9 w-9 rounded-xl bg-white text-red-500 hover:bg-red-500 hover:text-white border-none shadow-lg"
                      onClick={() => handleRemove(String(tour.id), tour.name ?? 'this tour')}
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/95 text-gray-900 border-none shadow-sm backdrop-blur-md px-3 py-1.5 flex items-center gap-1.5 font-bold rounded-lg">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {tour.rating || '4.8'}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="pb-4 pt-6 flex-1 cursor-pointer" onClick={() => handleDetailsClick(tour.id)}>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate pr-2">{tour.name}</h3>
                      <p className="text-xl font-black text-blue-600 shrink-0">{formatCurrency(tour.price)}</p>
                    </div>
                    <CardDescription className="flex items-center gap-1.5 text-gray-500 font-medium">
                      <Map className="h-3.5 w-3.5" /> {tour.location}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="px-6 pb-6 pt-2 flex gap-3 mt-auto">
                  <div className="flex-1">
                    <Button 
                      onClick={() => handleBookNowClick(tour.id)}
                      className="w-full bg-slate-900 hover:bg-blue-600 text-white rounded-xl h-11 font-bold transition-all group/btn"
                    >
                      Book Now <Plane className="ml-2 h-4 w-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                  <Button 
                    variant="outline" 
                    onClick={() => handleDetailsClick(tour.id)}
                    className="h-11 px-5 rounded-xl border-gray-200 hover:border-blue-600 hover:text-blue-600 font-bold transition-all"
                  >
                    Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white rounded-[2.5rem] border-2 border-dashed border-gray-100 ring-1 ring-gray-50">
            <div className="w-20 h-20 bg-gray-50 text-gray-400 rounded-3xl flex items-center justify-center mx-auto mb-6 transform rotate-3">
              {searchQuery ? <SearchX className="h-10 w-10" /> : <Heart className="h-10 w-10" />}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {searchQuery ? "No matching tours found" : "Your wishlist is empty"}
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
              {searchQuery 
                ? `We couldn't find any saved tours matching "${searchQuery}".`
                : "Save your favorite packages here to keep track of them and book when you're ready."}
            </p>
            <Button 
              className="bg-blue-600 hover:bg-blue-700 h-12 px-10 rounded-xl font-bold shadow-lg shadow-blue-200"
              onClick={() => searchQuery ? setSearchQuery('') : router.push('/dashboard/customer/explore')}
            >
              {searchQuery ? "Clear Search" : "Explore Destinations"}
            </Button>
          </div>
        )}

        {/* Recommendation Section */}
        {items.length > 0 && !searchQuery && (
          <div className="mt-4 p-10 rounded-[2.5rem] bg-indigo-900 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <Star className="h-6 w-6 text-amber-400 fill-amber-400" /> Based on your interests
              </h3>
              <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div className="max-w-xl">
                  <p className="text-indigo-100 text-lg leading-relaxed font-medium opacity-90">
                    We noticed you like adventure tours in India! Check out our new <strong>Ladakh Adventure</strong> which is trending this summer with 15% early bird discount.
                  </p>
                </div>
                <Button 
                  onClick={() => router.push('/dashboard/customer/explore/7')}
                  className="bg-white text-indigo-900 hover:bg-indigo-50 px-8 h-12 rounded-xl font-bold transition-all group/rec shadow-xl"
                >
                  Check it out <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/rec:translate-x-1" />
                </Button>
              </div>
            </div>
            <div className="absolute top-0 right-0 h-full w-1/3 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-1000">
               <Plane className="h-64 w-64 rotate-[30deg] translate-y-8" />
            </div>
          </div>
        )}
      </div>

      <TourModal
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour ? { ...selectedTour, title: selectedTour.name ?? '', reviews: 124 } : null}
      />

      <BookingChecklistModal
        isOpen={!!checklistTourId}
        onClose={() => setChecklistTourId(null)}
        onProceed={() => {
          if (checklistTourId) {
            const id = checklistTourId;
            setChecklistTourId(null);
            router.push(`/dashboard/customer/explore/${id}/book`);
          }
        }}
      />
    </DashboardLayout>
  );
}
