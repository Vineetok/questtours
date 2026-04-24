'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { useUser } from '@/hooks/use-user';
import { adminService } from '@/services/adminService';
import { CSVUploadButton } from '@/components/admin/csv-upload-button';
import { UploadCloud,  AlertCircle, Loader2, Database, Map as MapIcon, Package as PackageIcon, ListTodo } from 'lucide-react';
import { toast } from 'sonner';

export default function MasterImportPage() {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ tours: 0, packages: 0, plans: 0 });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleMasterUpload = async (data: any[]) => {
    setIsProcessing(true);
    setStats({ tours: 0, packages: 0, plans: 0 });
    setIsSuccess(false);

    try {
      // Fetch existing data for duplicate checking
      const [existingTours, existingPackages, existingPlans] = await Promise.all([
        adminService.getTours(),
        adminService.getPackages(),
        adminService.getPlans()
      ]);

      const existingTourLocs = new Set(existingTours.map(t => t.location));
      const existingPkgTitles = new Set(existingPackages.map(p => p.title));
      const existingPlanTitles = new Set(existingPlans.map(p => p.title));

      // 1. Collect unique locations for Tours from CSV
      const uniqueLocations = new Map();
      data.forEach(item => {
        // Skip header rows if they accidentally passed through
        if (!item.location || item.location.toLowerCase() === 'location') return;
        if (!item.title || item.title.toLowerCase() === 'title') return;

        // Skip if tour for this location already exists in DB
        if (existingTourLocs.has(item.location)) return;

        if (!uniqueLocations.has(item.location)) {
          uniqueLocations.set(item.location, {
            title: item.location,
            location: item.location,
            price: item.price,
            image: item.image,
            duration: item.duration,
            rating: 5,
            description: `Explore the beautiful ${item.location}`,
            tag: 'Featured'
          });
        }
      });

      // 2. Upload Tours
      let tourCount = 0;
      for (const tour of Array.from(uniqueLocations.values())) {
        try {
          await adminService.addTour(tour);
          tourCount++;
        } catch (e) {
          console.error('Failed to add tour:', tour.title);
        }
      }

      // 3. Upload Plans & Packages
      let planCount = 0;
      let pkgCount = 0;
      for (const item of data) {
        // Skip header rows
        if (!item.location || item.location.toLowerCase() === 'location') continue;
        if (!item.title || item.title.toLowerCase() === 'title') continue;

        // Skip if plan or package already exists in DB
        if (existingPlanTitles.has(item.title) || existingPkgTitles.has(item.title)) continue;

        try {
          // Add to Plans
          await adminService.addPlan({
            ...item,
            theme: item.theme || 'Culture'
          });
          planCount++;

          // Add to Packages (Mirroring)
          await adminService.addPackage({
            title: item.title,
            description: item.description,
            price: item.price,
            originalPrice: item.price + 5000,
            discount: item.theme || 'Special Offer',
            location: item.location,
            image: item.image,
            duration: item.duration
          });
          pkgCount++;
        } catch {
          toast.error('Failed to add plan/package:', item.title);
        }
      }

      setStats({ tours: tourCount, packages: pkgCount, plans: planCount });
      setIsSuccess(true);
      toast.success('Master Sync Complete!');
    } catch (error) {
      toast.error('Master Import failed');
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout 
      navItems={adminNavItems} 
      userRole="admin" 
      userName={user?.name || 'Admin'}
    >
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
            <UploadCloud className="text-blue-600" size={32} /> Master Data Import
          </h1>
          <p className="text-slate-500 font-medium italic">
            Upload one CSV to instantly populate Tours, Packages, and Plans across your entire platform.
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all group flex flex-col items-center text-center space-y-6 shadow-sm">
          <div className="h-20 w-20 bg-blue-50 rounded-3xl flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
            {isProcessing ? <Loader2 size={40} className="animate-spin" /> : <Database size={40} />}
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">Ready to Sync?</h2>
            <p className="text-slate-500 max-w-sm text-sm">
              Use the Master CSV format. The system will automatically create destinations and packages for you.
            </p>
          </div>

          <CSVUploadButton 
            onUpload={handleMasterUpload} 
            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-12 h-14 rounded-2xl shadow-xl shadow-blue-200 text-lg transition-all active:scale-95"
          />
        </div>

        {/* Results Stats */}
        {isSuccess && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4">
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="h-12 w-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center">
                <MapIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Tours Created</p>
                <p className="text-2xl font-black text-slate-900">{stats.tours}</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="h-12 w-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center">
                <PackageIcon size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Packages Added</p>
                <p className="text-2xl font-black text-slate-900">{stats.packages}</p>
              </div>
            </div>

            <div className="bg-indigo-50 border border-indigo-100 p-6 rounded-3xl flex items-center gap-4">
              <div className="h-12 w-12 bg-indigo-500 text-white rounded-2xl flex items-center justify-center">
                <ListTodo size={24} />
              </div>
              <div>
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Plans Imported</p>
                <p className="text-2xl font-black text-slate-900">{stats.plans}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Box */}
        <div className="bg-slate-900 p-8 rounded-[2rem] text-white space-y-4">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
            <AlertCircle size={16} /> Important Note
          </div>
          <p className="text-slate-300 text-sm leading-relaxed italic">
            This tool uses the &quot;Plans CSV&quot; format. It identifies unique &quot;Locations&quot; to create high-level Tours, and mirrors every entry into both the Packages and Plans tables to ensure your site is fully cross-referenced.
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
}
