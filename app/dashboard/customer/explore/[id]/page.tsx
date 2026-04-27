'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { adminService } from '@/services/adminService';
import { Plan } from '@/lib/types';
import { 
  MapPin, 
  Calendar, 
  Clock,
  Heart, 
  Loader2,
  ChevronLeft,
  Info,
  ShieldCheck,
  FileText,
  Star,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';
import { Button } from '@/components/ui/inputs/button';
import { formatCurrency } from '@/lib/utils';
import { wishlistService } from '@/services/wishlistService';
import { BookingChecklistModal } from '@/components/booking-checklist-modal';

export default function InternalTourDetailsPage() {
  const params = useParams();
  const id = params.id as string;
  const router = useRouter();
  const { user } = useUser();
  
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await adminService.getPlanById(id);
        setPlan(data);
        setIsWishlisted(wishlistService.isInWishlist(id));
      } catch (err) {
        console.error('Failed to fetch plan:', err);
        const mockPlans: Record<string, Plan> = {
          '1': { id: 1, title: 'Manali Delight', description: 'Experience the magic of snow-capped mountains and lush valleys.', price: 15000, location: 'Manali, India', image: '/tours/dest/manali.png', duration: '5 Days / 4 Nights', itinerary: [{ day: 1, title: 'Arrival', description: 'Arrive in Manali and check into your hotel.' }, { day: 2, title: 'Solang Valley', description: 'Visit Solang Valley for adventure sports.' }] },
          '2': { id: 2, title: 'Goa Beach Vibe', description: 'Sun, sand, and serenity in the heart of India.', price: 12000, location: 'Goa, India', image: '/tours/dest/goa.png', duration: '4 Days / 3 Nights', itinerary: [{ day: 1, title: 'North Goa', description: 'Explore the famous beaches of North Goa.' }] },
          '3': { id: 3, title: 'Kerala Backwaters', description: 'A peaceful journey through the God\'s own country.', price: 18000, location: 'Kerala, India', image: '/tours/dest/kerala.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Alleppey', description: 'Houseboat stay in backwaters.' }] },
          '4': { id: 4, title: 'Royal Rajasthan', description: 'Discover the land of kings and magnificent forts.', price: 20000, location: 'Rajasthan, India', image: '/tours/dest/rajasthan.png', duration: '7 Days / 6 Nights', itinerary: [{ day: 1, title: 'Jaipur', description: 'Visit the Pink City and Amber Fort.' }] },
          '5': { id: 5, title: 'Bali Tropical Escape', description: 'Experience the paradise island of Bali with its unique culture and stunning beaches.', price: 45000, location: 'Bali, Indonesia', image: '/tours/dest/bali.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Arrival in Denpasar', description: 'Transfer to your beachfront resort.' }] },
          '6': { id: 6, title: 'Dubai Luxury Tour', description: 'The ultimate city of the future with luxury shopping and desert adventures.', price: 55000, location: 'Dubai, UAE', image: '/tours/dest/dubai.png', duration: '5 Days / 4 Nights', itinerary: [{ day: 1, title: 'Burj Khalifa', description: 'Visit the world\'s tallest building.' }] },
          '7': { id: 7, title: 'Ladakh Adventure', description: 'A journey through the high-altitude desert and stunning monasteries.', price: 25000, location: 'Leh Ladakh, India', image: '/tours/dest/ladakh.png', duration: '8 Days / 7 Nights', itinerary: [{ day: 1, title: 'Acclimatization', description: 'Rest and adapt to high altitude in Leh.' }] },
          '8': { id: 8, title: 'Sikkim Mountains', description: 'Discover the hidden gems of the North East Himalayas.', price: 22000, location: 'Sikkim, India', image: '/tours/sikkim-dest.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Gangtok', description: 'Explore the capital of Sikkim.' }] },
          '9': { id: 9, title: 'Andaman Island Hop', description: 'Pristine beaches and turquoise waters in the Bay of Bengal.', price: 35000, location: 'Andaman, India', image: '/tours/andaman.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Port Blair', description: 'Cellular Jail visit and Light & Sound show.' }] },
          '10': { id: 10, title: 'Agra Heritage', description: 'Witness the eternal symbol of love and other Mughal wonders.', price: 8000, location: 'Agra, India', image: '/tours/agra-dest.png', duration: '2 Days / 1 Night', itinerary: [{ day: 1, title: 'Taj Mahal', description: 'Sunrise visit to the Taj Mahal.' }] },
          '11': { id: 11, title: 'Rishikesh Spirituality', description: 'Yoga capital of the world and river rafting adventures.', price: 12000, location: 'Rishikesh, India', image: '/tours/dest/rishikesh.png', duration: '4 Days / 3 Nights', itinerary: [{ day: 1, title: 'Ganga Aarti', description: 'Attend the evening ceremony at Triveni Ghat.' }] },
          '12': { id: 12, title: 'Udaipur Lakes', description: 'The Venice of the East with its romantic palaces and serene lakes.', price: 16000, location: 'Udaipur, India', image: '/tours/dest/udaipur.png', duration: '4 Days / 3 Nights', itinerary: [{ day: 1, title: 'City Palace', description: 'Explore the magnificent City Palace complex.' }] },
          '13': { id: 13, title: 'Kyoto Traditions', description: 'Step back in time in the ancient capital of Japan.', price: 85000, location: 'Kyoto, Japan', image: '/tours/dest/kyoto.png', duration: '5 Days / 4 Nights', itinerary: [{ day: 1, title: 'Arashiyama Bamboo Grove', description: 'Walk through the famous bamboo forest.' }] },
          '14': { id: 14, title: 'Paris Romance', description: 'The city of lights, fashion, and culinary excellence.', price: 120000, location: 'Paris, France', image: '/tours/dest/paris.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Eiffel Tower', description: 'Dinner with a view of the city.' }] },
          '15': { id: 15, title: 'Santorini Sunset', description: 'Iconic blue-domed churches and breathtaking caldera views.', price: 95000, location: 'Santorini, Greece', image: '/tours/dest/santorini.png', duration: '5 Days / 4 Nights', itinerary: [{ day: 1, title: 'Oia Sunset', description: 'Witness the world-famous sunset.' }] },
          '16': { id: 16, title: 'Maldives Overwater', description: 'Pure luxury in private villas over crystal clear lagoons.', price: 150000, location: 'Maldives', image: '/tours/dest/maldives.png', duration: '5 Days / 4 Nights', itinerary: [{ day: 1, title: 'Seaplane Transfer', description: 'Stunning aerial views of the atolls.' }] },
          '17': { id: 17, title: 'Gujarat Heritage', description: 'From the Rann of Kutch to the Asiatic Lions of Gir.', price: 20000, location: 'Gujarat, India', image: '/tours/dest/gujarat.png', duration: '6 Days / 5 Nights', itinerary: [{ day: 1, title: 'Ahmedabad', description: 'Visit the Sabarmati Ashram.' }] }
        };

        if (mockPlans[id]) {
          setPlan(mockPlans[id]);
          setIsWishlisted(wishlistService.isInWishlist(id));
        } else {
          toast.error('Tour plan not found');
        }
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPlan();
  }, [id]);

  const toggleWishlist = () => {
    if (!plan) return;
    if (isWishlisted) {
      wishlistService.removeFromWishlist(plan.id);
      setIsWishlisted(false);
      toast.error('Removed from wishlist');
    } else {
      wishlistService.addToWishlist({
        id: plan.id,
        name: plan.title,
        location: plan.location,
        price: plan.price,
        image: plan.image,
        rating: 4.8,
        reviews: 120,
        duration: plan.duration
      });
      setIsWishlisted(true);
      toast.success('Added to wishlist');
    }
  };

  if (isLoading) {
    return (
      <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
        <div className="flex items-center justify-center h-[60vh]">
          <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!plan) {
    return (
      <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
        <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
          <h1 className="text-2xl font-bold text-gray-900">Plan not found</h1>
          <Button onClick={() => router.back()} variant="outline">Go Back</Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout 
      role="customer" 
      userName={user?.name || "Traveler"} 
      userEmail={user?.email || ""}
      navItems={customerNavItems}
    >
      <div className="space-y-6 animate-in fade-in duration-700">
        <button 
          onClick={() => router.back()} 
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors mb-2"
        >
          <ChevronLeft size={16} /> Back to Explore
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <Image src={plan.image} alt={plan.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10">
                <div className="flex items-center gap-2 text-blue-400 mb-3">
                  <MapPin size={16} className="fill-blue-400" />
                  <span className="text-xs font-black uppercase tracking-[0.2em]">{plan.location}</span>
                </div>
                <h1 className="text-4xl font-black text-white mb-2">{plan.title}</h1>
                <p className="text-white/80 max-w-2xl text-sm leading-relaxed">{plan.description}</p>
              </div>
              <button 
                onClick={toggleWishlist}
                className="absolute top-8 right-8 h-12 w-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all"
              >
                <Heart size={20} className={isWishlisted ? "fill-rose-500 text-rose-500" : "text-white"} />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: 'Duration', value: plan.duration, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Rating', value: '4.8 (120)', icon: Star, color: 'text-amber-500', bg: 'bg-amber-50' },
                { label: 'Guide', value: 'Certified', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                { label: 'Group Size', value: '12-15', icon: Calendar, color: 'text-purple-600', bg: 'bg-purple-50' },
              ].map((item, idx) => (
                <div key={idx} className="p-4 rounded-3xl bg-white border border-gray-100 shadow-sm flex flex-col items-center text-center">
                  <div className={`h-10 w-10 ${item.bg} ${item.color} rounded-xl flex items-center justify-center mb-3`}>
                    <item.icon size={20} />
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{item.label}</span>
                  <span className="text-xs font-bold text-gray-900">{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-10 shadow-sm">
              <h2 className="text-2xl font-black text-gray-900 mb-8 flex items-center gap-3">
                <div className="h-8 w-1.5 bg-blue-600 rounded-full" />
                Itinerary Highlights
              </h2>
              <div className="space-y-10 relative before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-[2px] before:bg-gray-50">
                {plan.itinerary?.map((item: any, idx: number) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-9 h-9 rounded-xl bg-white border border-gray-100 shadow-sm flex items-center justify-center z-10">
                      <span className="text-xs font-black text-blue-600">{item.day}</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
              <div className="mb-6">
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">Starting From</span>
                <h3 className="text-3xl font-black text-gray-900">{formatCurrency(plan.price)} <span className="text-sm font-bold text-gray-400 tracking-normal">/ person</span></h3>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <ShieldCheck size={18} className="text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Availability</span>
                    <span className="text-xs font-bold text-gray-900">Instant Confirmation</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 border border-gray-100">
                  <Info size={18} className="text-blue-600" />
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Cancellation</span>
                    <span className="text-xs font-bold text-gray-900">Free up to 72h</span>
                  </div>
                </div>
              </div>

              <Button 
                onClick={() => setIsChecklistOpen(true)}
                className="w-full h-14 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-xl shadow-blue-200 transition-all mb-4"
              >
                Confirm & Proceed to Booking
              </Button>
              <Button variant="outline" className="w-full h-14 border-gray-200 text-gray-600 font-bold rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <FileText size={18} /> Download Brochure
              </Button>
            </div>

            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <h4 className="text-lg font-bold mb-2 relative z-10">Need Customization?</h4>
              <p className="text-white/60 text-sm mb-6 leading-relaxed relative z-10">Talk to our travel experts to tailor this plan to your preferences.</p>
              <button 
                className="w-full bg-white text-slate-900 hover:bg-gray-100 rounded-2xl font-bold h-12 transition-colors flex items-center justify-center border-none cursor-pointer"
              >
                Chat with Agent
              </button>
            </div>
          </div>
        </div>
      </div>

      <BookingChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
        onProceed={() => {
          setIsChecklistOpen(false);
          router.push(`/dashboard/customer/explore/${id}/book`);
        }}
      />
    </DashboardLayout>
  );
}
