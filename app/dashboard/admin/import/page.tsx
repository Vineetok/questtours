'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { useUser } from '@/hooks/use-user';
import { adminService } from '@/services/adminService';
import { CSVUploadButton } from '@/components/admin/csv-upload-button';
import { 
  UploadCloud, 
  AlertCircle, 
  Loader2, 
  Database, 
  Map as MapIcon, 
  Package as PackageIcon, 
  ListTodo,
  History,
  CheckCircle2,
  FileSpreadsheet,
  Clock,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/inputs/button';
import { Card, CardContent } from '@/components/ui/display/card';
import { Badge } from '@/components/ui/display/badge';


interface MasterItem {
  location: string;
  title: string;
  price: number;
  image: string;
  duration: string;
  theme: string;
  description: string;
}


export default function MasterImportPage() {
  const { user } = useUser();
  const [isProcessing, setIsProcessing] = useState(false);
  const [stats, setStats] = useState({ tours: 0, packages: 0, plans: 0 });
  const [isSuccess, setIsSuccess] = useState(false);
  const [importHistory, setImportHistory] = useState([
    { id: '1', date: '2024-04-24 14:30', filename: 'summer_collection.csv', status: 'Completed', items: 45 },
    { id: '2', date: '2024-04-23 09:15', filename: 'rajasthan_tours.csv', status: 'Completed', items: 12 },
    { id: '3', date: '2024-04-20 11:45', filename: 'international_plans.csv', status: 'Completed', items: 28 },
  ]);

  const handleMasterUpload = async (data:MasterItem[]) => {
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
        } catch  {
          toast.error('Failed to add tour:', tour.title);
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

      const newHistoryItem = {
        id: (importHistory.length + 1).toString(),
        date: new Date().toLocaleString(),
        filename: 'master_upload.csv',
        status: 'Completed',
        items: data.length
      };
      setImportHistory([newHistoryItem, ...importHistory]);

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
      role="admin" 
      userName={user?.name || 'Admin'}
    >
      <div className="max-w-5xl mx-auto space-y-10 py-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <UploadCloud className="text-blue-600" size={36} /> Master Data Hub
            </h1>
            <p className="text-slate-500 font-medium">
              The central engine for populating Tours, Packages, and Plans.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-blue-50 px-4 py-2 rounded-2xl border border-blue-100">
             <Database size={18} className="text-blue-600" />
             <span className="text-sm font-bold text-blue-900">System Sync Active</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Upload Area */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white p-10 rounded-[3rem] border-2 border-dashed border-slate-200 hover:border-blue-400 transition-all group flex flex-col items-center text-center space-y-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FileSpreadsheet size={120} />
              </div>

              <div className="h-24 w-24 bg-blue-50 rounded-[2rem] flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform shadow-inner">
                {isProcessing ? <Loader2 size={48} className="animate-spin" /> : <UploadCloud size={48} />}
              </div>
              
              <div className="space-y-3">
                <h2 className="text-2xl font-black text-slate-900">Unified Bulk Upload</h2>
                <p className="text-slate-500 max-w-sm mx-auto text-base leading-relaxed">
                  Drop your Master CSV here to sync everything. <br/>
                  <span className="text-blue-600 font-bold">Tours + Packages + Itineraries</span>
                </p>
              </div>

              <CSVUploadButton 
                onUpload={handleMasterUpload} 
                className="bg-blue-600 hover:bg-blue-700 text-white font-black px-16 h-16 rounded-2xl shadow-2xl shadow-blue-200 text-xl transition-all active:scale-95 group-hover:px-20"
                label="Start Global Import"
              />
            </div>

            {/* Results Stats */}
            {isSuccess && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in fade-in slide-in-from-bottom-4">
                <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-3xl flex items-center gap-4">
                  <div className="h-10 w-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-emerald-100">
                    <MapIcon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Tours</p>
                    <p className="text-xl font-black text-slate-900">{stats.tours}</p>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-100 p-5 rounded-3xl flex items-center gap-4">
                  <div className="h-10 w-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100">
                    <PackageIcon size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Packages</p>
                    <p className="text-xl font-black text-slate-900">{stats.packages}</p>
                  </div>
                </div>

                <div className="bg-indigo-50 border border-indigo-100 p-5 rounded-3xl flex items-center gap-4">
                  <div className="h-10 w-10 bg-indigo-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-indigo-100">
                    <ListTodo size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">Plans</p>
                    <p className="text-xl font-black text-slate-900">{stats.plans}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            <Card className="bg-slate-900 rounded-[2.5rem] border-none shadow-2xl overflow-hidden">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 text-amber-400 font-black text-sm uppercase tracking-widest mb-4">
                  <AlertCircle size={18} /> Documentation
                </div>
                <div className="space-y-4">
                  <p className="text-slate-300 text-sm leading-relaxed">
                    Our <span className="text-white font-bold underline underline-offset-4 decoration-blue-500">Master Engine</span> uses the &quot;Plans CSV&quot; format. 
                    It intelligently deduplicates locations and cross-references all data points.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button variant="outline" className="rounded-xl bg-transparent border-slate-700 text-white hover:bg-slate-800 text-xs gap-2">
                      <FileSpreadsheet size={14} /> Download Sample CSV
                    </Button>
                    <Button variant="link" className="text-blue-400 font-bold text-xs p-0 gap-1">
                      Read File Specs <ArrowRight size={14} />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* History Sidebar */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
               <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                 <History size={20} className="text-slate-400" />
                 Import History
               </h3>
               <Badge variant="outline" className="rounded-full border-slate-200">Recent</Badge>
            </div>

            <div className="space-y-4">
              {importHistory.map((item) => (
                <div key={item.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 size={16} />
                      <span className="text-xs font-bold uppercase tracking-wider">{item.status}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                      <Clock size={10} /> {item.date}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-800 truncate text-sm mb-1 group-hover:text-blue-600 transition-colors">
                    {item.filename}
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    {item.items} entities synced successfully
                  </p>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full rounded-2xl border border-dashed border-slate-200 h-12 text-slate-500 font-bold hover:bg-slate-50 text-sm">
                View Full History
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
