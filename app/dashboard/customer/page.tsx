'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { Plan } from '@/lib/types';
import { adminService } from '@/services/adminService'; // Reusing service for demo
import { 
  Clock, 
  MapPin, 
  Calendar, 
  ChevronRight, 
  Map as MapIcon,
  ShieldCheck,
  Star
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/display/card';
import { Button } from '@/components/ui/inputs/button';
import { Badge } from '@/components/ui/display/badge';
import Image from 'next/image';
import { 
  Dialog,
  DialogContent,
} from '@/components/ui/overlays/dialog';

export default function CustomerDashboard() {
  const { user } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, we would fetch plans assigned to this specific customer
    fetchMyPlans();
  }, []);

  const fetchMyPlans = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPlans();
      setPlans(data || []);
    } catch (error) {
      console.error('Failed to fetch itineraries');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DashboardLayout
      role="customer"
      userName={user?.name || "Traveler"}
      userEmail={user?.email || "customer@example.com"}
      navItems={customerNavItems}
    >
      <div className="space-y-10 animate-in fade-in duration-700">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900">My Travel Itineraries</h1>
            <p className="text-gray-500 mt-2 text-lg">Your upcoming journeys and planned adventures.</p>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-2xl flex items-center gap-3 border border-blue-100 shadow-sm shadow-blue-900/5">
             <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white">
                <Calendar size={20} />
             </div>
             <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Next Trip In</p>
                <p className="text-sm font-bold text-gray-900">12 Days to Himachal</p>
             </div>
          </div>
        </div>

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 bg-gray-100 rounded-3xl animate-pulse"></div>
            ))}
          </div>
        ) : plans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-gray-100">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6">
               <MapIcon size={40} />
            </div>
            <h3 className="text-2xl font-black text-gray-900">No active plans found</h3>
            <p className="text-gray-500 mt-2 text-center max-w-sm">
              You haven&apos;t booked any itineraries yet. Contact our agents to start planning your next dream vacation!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <Card key={plan.id} className="group border-none shadow-xl shadow-blue-900/5 rounded-[2.5rem] overflow-hidden hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-500 hover:-translate-y-2 bg-white flex flex-col h-full cursor-pointer" onClick={() => setSelectedPlan(plan)}>
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={plan.image || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-white/90 backdrop-blur-md text-blue-600 border-none px-4 py-1.5 rounded-full font-black text-xs shadow-lg">
                      {plan.duration}
                    </Badge>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6">
                     <div className="flex items-center gap-2 text-white/90 text-sm font-bold mb-1">
                        <MapPin size={14} className="text-blue-400" />
                        {plan.location}
                     </div>
                     <h3 className="text-xl font-black text-white leading-tight">{plan.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8 flex-1 flex flex-col justify-between">
                  <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed mb-6">
                    {plan.description}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                    <div className="flex items-center gap-2">
                       <div className="flex -space-x-2">
                          {[1,2,3].map(i => (
                            <div key={i} className="w-7 h-7 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                               <Image src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + plan.id}`} alt="User" fill />
                            </div>
                          ))}
                       </div>
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">+12 Going</span>
                    </div>
                    <Button variant="ghost" className="text-blue-600 font-black gap-2 hover:bg-blue-50 rounded-full px-4 group/btn">
                      View Itinerary <ChevronRight size={16} className="transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Profile CTA Section */}
        <Card className="border-none shadow-2xl bg-slate-950 text-white rounded-[3rem] overflow-hidden relative group mt-12">
          <CardContent className="p-12 md:p-16 relative z-10">
            <div className="max-w-xl space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 text-blue-400 rounded-full text-xs font-black tracking-widest uppercase border border-blue-500/30">
                <ShieldCheck size={14} /> Account Status: Premium
              </div>
              <div className="space-y-4">
                <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">Unlock Exclusive Private Tours</h3>
                <p className="text-lg text-slate-400 font-medium leading-relaxed">
                  Complete your identity verification to access hidden gems and VIP travel itineraries curated just for you.
                </p>
              </div>
              <Button className="bg-white text-slate-950 hover:bg-gray-100 h-14 px-10 rounded-full font-black text-base shadow-xl transition-all hover:-translate-y-1 active:translate-y-0 group">
                Verify My Profile <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </CardContent>

          {/* Decorative Elements */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-600/10 to-transparent hidden lg:block"></div>
          <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
             <MapIcon size={300} strokeWidth={1} />
          </div>
        </Card>

        {/* Selected Plan Details Modal */}
        <Dialog open={!!selectedPlan} onOpenChange={() => setSelectedPlan(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl rounded-[2.5rem]">
            {selectedPlan && (
              <>
                <div className="relative h-80 shrink-0">
                  <Image src={selectedPlan.image} alt={selectedPlan.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="absolute top-6 right-6 p-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors"
                  >
                    <ChevronRight size={24} className="rotate-180" />
                  </button>
                  <div className="absolute bottom-8 left-8 right-8">
                     <div className="flex items-center gap-3 mb-3">
                        <Badge className="bg-blue-600 text-white border-none px-4 py-1 rounded-full font-black text-xs">
                          {selectedPlan.duration}
                        </Badge>
                        <div className="flex items-center gap-1 text-white text-sm font-bold">
                           <Star className="text-yellow-400 fill-yellow-400" size={14} />
                           4.9 (24 Reviews)
                        </div>
                     </div>
                     <h2 className="text-3xl md:text-4xl font-black text-white">{selectedPlan.title}</h2>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar bg-white">
                  <div className="space-y-4">
                     <h3 className="text-2xl font-black text-gray-900">About this journey</h3>
                     <p className="text-gray-500 leading-relaxed text-lg">{selectedPlan.description}</p>
                  </div>

                  <div className="space-y-8">
                    <h3 className="text-2xl font-black text-gray-900">Your Daily Itinerary</h3>
                    <div className="space-y-10 relative before:absolute before:left-6 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
                      {selectedPlan.itinerary.map((day, idx) => (
                        <div key={idx} className="relative pl-16 group">
                          <div className="absolute left-0 top-0 w-12 h-12 bg-white border-2 border-blue-600 rounded-2xl flex items-center justify-center text-blue-600 font-black text-sm z-10 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                             {day.day}
                          </div>
                          <div className="space-y-3">
                             <h4 className="text-xl font-black text-gray-900">{day.title}</h4>
                             <div className="bg-gray-50/50 p-6 rounded-3xl border border-gray-100 group-hover:border-blue-100 group-hover:bg-blue-50/30 transition-all duration-300">
                                <p className="text-gray-600 leading-relaxed font-medium">{day.activities[0]}</p>
                                <div className="flex flex-wrap gap-4 mt-4">
                                   {day.meals && (
                                     <div className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500 shadow-sm border border-gray-50">
                                        🍽️ {day.meals}
                                     </div>
                                   )}
                                   {day.stay && (
                                     <div className="bg-white px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500 shadow-sm border border-gray-50">
                                        🏨 {day.stay}
                                     </div>
                                   )}
                                </div>
                             </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-8 md:p-10 bg-gray-50 border-t border-gray-100 flex items-center justify-between shrink-0">
                  <div>
                     <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Trip Value</p>
                     <p className="text-3xl font-black text-blue-600">₹{selectedPlan.price.toLocaleString('en-IN')}</p>
                  </div>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 h-14 px-10 rounded-full font-black text-base shadow-xl">
                    Download PDF Itinerary
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
