'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { SearchSidebar } from '@/components/search-sidebar';
import { PlanCard } from '@/components/plan-card';
import { adminService } from '@/services/adminService';
import { Plan } from '@/lib/types';
import { MapPin, Loader2, Search } from 'lucide-react';
import { Button } from 'react-day-picker';
import { toast } from 'sonner';

function ToursContent() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: initialLocation,
    budget: 200000,
    duration: '',
    themes: [] as string[],
  });

  useEffect(() => {
    const fetchAllData = async () => {
      setIsLoading(true);
      try {
        const plansData = await adminService.getPlans();
        setPlans(plansData || []);
      } catch (error) {
        toast.error('Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAllData();
  }, [searchParams]);

  // Update search filter if URL changes
  useEffect(() => {
    const loc = searchParams.get('location');
    if (loc) setFilters(prev => ({ ...prev, search: loc }));
  }, [searchParams]);

  const handleFilterChange = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.location.toLowerCase().includes(filters.search.toLowerCase()) || 
                         plan.title.toLowerCase().includes(filters.search.toLowerCase());
    const matchesBudget = plan.price <= filters.budget;
    
    let matchesDuration = true;
    if (filters.duration === '1-3 Nights') {
      const n = parseInt(plan.duration.split('/')[1]) || 0;
      matchesDuration = n >= 1 && n <= 3;
    } else if (filters.duration === '4-6 Nights') {
      const n = parseInt(plan.duration.split('/')[1]) || 0;
      matchesDuration = n >= 4 && n <= 6;
    } else if (filters.duration === '7+ Nights') {
      const n = parseInt(plan.duration.split('/')[1]) || 0;
      matchesDuration = n >= 7;
    }

    const planTheme = plan.theme || 'Culture';
    const matchesTheme = filters.themes.length === 0 || filters.themes.includes(planTheme);

    return matchesSearch && matchesBudget && matchesDuration && matchesTheme;
  });

  const locations = Array.from(new Set(plans.map(p => p.location)));

  return (
    <main className="min-h-screen bg-[#F2F7FA]">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-24 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=400&fit=crop')] bg-cover bg-center opacity-40 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/80 to-[#F2F7FA]" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] bg-blue-500/10 px-6 py-2 rounded-full border border-blue-500/20 backdrop-blur-sm">
            Explore the World
          </span>
          <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tighter">
            Your Dream <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Journey</span> Starts Here
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-medium">
            Discover {plans.length} professional itineraries curated just for you.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 -mt-12 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <SearchSidebar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            locations={locations}
          />

          {/* Results Area */}
          <div className="flex-1 space-y-8">
            {/* Results Header */}
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h2 className="font-black text-slate-900 text-lg">
                    {filters.search ? `Plans in "${filters.search}"` : 'All Available Plans'}
                  </h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Showing {filteredPlans.length} results
                  </p>
                </div>
              </div>
            </div>

            {/* Plans List */}
            <div className="space-y-6">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100">
                  <Loader2 className="h-10 w-10 text-blue-600 animate-spin mb-4" />
                  <p className="font-black text-slate-400 uppercase tracking-widest text-sm">Fetching magic...</p>
                </div>
              ) : filteredPlans.length > 0 ? (
                filteredPlans.map(plan => (
                  <PlanCard key={plan.id} plan={plan} />
                ))
              ) : (
                <div className="bg-white p-20 rounded-3xl border border-slate-100 text-center space-y-4">
                  <div className="h-20 w-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto">
                    <Search size={32} className="text-slate-300" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900">No matching plans found</h3>
                  <p className="text-slate-500 max-w-sm mx-auto">
                    We couldn&apos;t find any plans matching your filters. Try adjusting your budget or searching for a different destination.
                  </p>
                  <Button 
                    variant="outline" 
                    aria-label="Clear All Filters"
                    onClick={() => setFilters({ search: '', budget: 200000, duration: '' })}
                    className="rounded-xl border-2 font-bold px-8 h-12"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function ToursPage() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    }>
      <ToursContent />
    </Suspense>
  );
}
