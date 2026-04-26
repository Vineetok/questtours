'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TourGallery } from '@/components/tour-gallery';
import { TourItinerary } from '@/components/tour-itinerary';
import { TourSidebar } from '@/components/tour-sidebar';
import { adminService } from '@/services/adminService';
import { Plan } from '@/lib/types';
import { 
  MapPin, 
  Calendar, 
  Share2, 
  Heart, 
  Loader2,
  ChevronRight,
  Info,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { toast } from 'sonner';

export default function TourDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('itinerary');

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await adminService.getPlanById(id);
        setPlan(data);
      } catch (err) {
        console.error('Failed to fetch plan:', err);
        toast.error('Tour plan not found');
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPlan();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!plan) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">Plan not found</h1>
        <button onClick={() => window.history.back()} className="text-blue-600 font-bold hover:underline">Go Back</button>
      </div>
    );
  }

  const tabs = [
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'policies', label: 'Policies', icon: ShieldCheck },
    { id: 'summary', label: 'Summary', icon: FileText },
  ];

  return (
    <main className="min-h-screen bg-[#F2F7FA]">
      <Navbar />

      {/* Breadcrumbs & Header */}
      <div className="pt-32 pb-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">
            <a href="/" className="hover:text-blue-600 transition-colors">Home</a>
            <ChevronRight size={12} />
            <a href="/tours" className="hover:text-blue-600 transition-colors">Tours</a>
            <ChevronRight size={12} />
            <span className="text-slate-900">{plan.location}</span>
          </nav>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-lg uppercase tracking-widest">
                  Best Seller
                </span>
                <div className="flex items-center gap-1.5 text-blue-600 text-xs font-black uppercase tracking-widest">
                  <MapPin size={14} />
                  {plan.location}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {plan.title}
              </h1>
              <p className="text-lg text-slate-500 font-medium max-w-3xl">
                {plan.description}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button aria-label="Share" className="h-12 w-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-100 hover:bg-blue-50 transition-all">
                <Share2 size={20} />
              </button>
              <button aria-label="Add to Favorites" className="h-12 w-12 rounded-2xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-600 hover:border-rose-100 hover:bg-rose-50 transition-all">
                <Heart size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12">
          
          {/* Main Column */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Gallery Section */}
            <TourGallery images={[plan.image]} />

            {/* Sticky Tabs Navigation */}
            <div className="sticky top-24 z-30 bg-white/80 backdrop-blur-md rounded-[2rem] border border-slate-100 p-2 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                      activeTab === tab.id 
                      ? 'bg-slate-900 text-white shadow-xl' 
                      : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {activeTab === 'itinerary' && (
                <TourItinerary itinerary={plan.itinerary || []} />
              )}
              
              {activeTab === 'policies' && (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8">
                  <h2 className="text-3xl font-black text-slate-900">Policies & Terms</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px] flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-500" />
                        Cancellation Policy
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">
                        Free cancellation up to 7 days before departure. Cancellations made between 7 to 3 days will incur a 50% charge. No refunds for last-minute cancellations.
                      </p>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-black text-slate-900 uppercase tracking-widest text-[11px] flex items-center gap-2">
                        <Info size={16} className="text-blue-500" />
                        Inclusions
                      </h4>
                      <ul className="text-sm text-slate-500 space-y-2 font-medium">
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-slate-300" /> Professional Tour Guide</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-slate-300" /> Luxury 4-star Accommodation</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-slate-300" /> Daily Breakfast & Dinner</li>
                        <li className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-slate-300" /> All Local Transfers</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'summary' && (
                <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 text-center py-20">
                  <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <FileText size={40} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900">Plan Summary</h3>
                    <p className="text-slate-500 max-w-md mx-auto font-medium">
                      Detailed summary of your trip from {plan.location}. Includes everything from pre-trip preparation to day-by-day essentials.
                    </p>
                  </div>
                  <button className="text-blue-600 font-black uppercase tracking-[0.2em] text-[10px] bg-blue-50 px-8 py-4 rounded-2xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all">
                    Download PDF Summary
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="lg:col-span-4">
            <TourSidebar 
              id={plan.id}
              price={plan.price}
              duration={plan.duration}
              location={plan.location}
            />
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
