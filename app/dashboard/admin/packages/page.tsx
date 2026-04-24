'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { useUser } from '@/hooks/use-user';
import { Package } from '@/lib/types';
import { adminService } from '@/services/adminService';
import { DataManagementTable } from '@/components/admin/data-management-table';
import { CSVUploadButton } from '@/components/admin/csv-upload-button';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Plus, Search, Package as PackageIcon, Clock, MapPin, Percent } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/overlays/dialog";
import { toast } from 'sonner';
import Image from 'next/image';

export default function PackagesManagementPage() {
  const { user } = useUser();
  const [packages, setPackages] = useState<Package[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPkg, setEditingPkg] = useState<Partial<Package> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchPackages = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPackages();
      setPackages(data || []);
    } catch (error) {
      toast.error('Failed to fetch packages');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleAddPackage = () => {
    setEditingPkg({
      title: '',
      location: '',
      price: 0,
      originalPrice: 0,
      discount: '',
      image: '',
      duration: '',
      description: ''
    });
    setIsDialogOpen(true);
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPkg({ ...pkg });
    setIsDialogOpen(true);
  };

  const handleDeletePackage = async (pkg: Package) => {
    if (confirm(`Are you sure you want to delete "${pkg.title}"?`)) {
      try {
        await adminService.deletePackage(pkg.id);
        toast.success('Package deleted successfully');
        fetchPackages();
      } catch (error) {
        toast.error('Failed to delete package');
      }
    }
  };

  const handleSavePackage = async () => {
    if (!editingPkg?.title || !editingPkg?.price) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingPkg.id) {
        await adminService.updatePackage(editingPkg.id, editingPkg);
        toast.success('Package updated successfully');
      } else {
        await adminService.addPackage(editingPkg);
        toast.success('Package added successfully');
      }
      setIsDialogOpen(false);
      fetchPackages();
    } catch (error) {
      toast.error('Failed to save package');
    }
  };

  const handleBulkUpload = async (data: any[]) => {
    try {
      for (const item of data) {
        await adminService.addPackage(item);
      }
      fetchPackages();
    } catch (error) {
      toast.error('Error during bulk upload');
    }
  };

  const filteredPackages = packages.filter(pkg => 
    pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pkg.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Package',
      accessor: (pkg: Package) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-gray-100 shrink-0">
            <Image src={pkg.image} alt={pkg.title} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{pkg.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
               <Clock className="h-3 w-3 text-gray-400" />
               <span className="text-xs text-gray-500 font-medium">{pkg.duration}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: (pkg: Package) => (
        <div className="flex items-center gap-1.5 text-gray-600">
           <MapPin size={12} className="text-blue-500" />
           <span className="text-sm font-medium">{pkg.location}</span>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: (pkg: Package) => (
        <div className="flex flex-col">
          <span className="font-bold text-blue-600">₹{pkg.price.toLocaleString('en-IN')}</span>
          {pkg.originalPrice && (
            <span className="text-[10px] text-gray-400 line-through">₹{pkg.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      )
    },
    {
      header: 'Discount',
      accessor: (pkg: Package) => (
        pkg.discount ? (
          <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-bold border border-green-100">
            <Percent size={10} /> {pkg.discount}
          </div>
        ) : <span className="text-gray-300">-</span>
      )
    }
  ];

  return (
    <DashboardLayout
      role="admin"
      userName={user?.name || "Admin"}
      userEmail={user?.email || "admin@example.com"}
      navItems={adminNavItems}
    >
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Manage Packages</h1>
            <p className="text-gray-500 mt-1">Bundle tours into attractive holiday packages.</p>
          </div>
          <div className="flex items-center gap-3">
            <CSVUploadButton onUpload={handleBulkUpload} label="Bulk Upload Packages" />
            <Button onClick={handleAddPackage} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl shadow-lg shadow-blue-200 gap-2">
              <Plus className="h-4 w-4" /> Add Package
            </Button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search packages..." 
            className="pl-10 h-11 bg-white border-gray-100 rounded-xl shadow-sm focus:ring-blue-600"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DataManagementTable
          data={filteredPackages}
          columns={columns}
          onEdit={handleEditPackage}
          onDelete={handleDeletePackage}
          isLoading={isLoading}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
            <DialogHeader className="p-8 bg-white border-b border-gray-50">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <PackageIcon size={24} />
                 </div>
                 <div>
                    <DialogTitle className="text-2xl font-black">{editingPkg?.id ? 'Edit Package' : 'Create Package'}</DialogTitle>
                    <DialogDescription>Bundle your tours and offer discounts.</DialogDescription>
                 </div>
               </div>
            </DialogHeader>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Package Title</label>
                  <Input 
                    value={editingPkg?.title || ''} 
                    onChange={e => setEditingPkg({...editingPkg, title: e.target.value})}
                    placeholder="e.g. Royal Rajasthan 7-Day Tour"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Current Price (₹)</label>
                  <Input 
                    type="number"
                    value={editingPkg?.price || 0} 
                    onChange={e => setEditingPkg({...editingPkg, price: Number(e.target.value)})}
                    className="h-12 bg-gray-50/50 border-none rounded-xl font-bold text-blue-600"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Original Price (₹)</label>
                  <Input 
                    type="number"
                    value={editingPkg?.originalPrice || 0} 
                    onChange={e => setEditingPkg({...editingPkg, originalPrice: Number(e.target.value)})}
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Discount Text</label>
                  <Input 
                    value={editingPkg?.discount || ''} 
                    onChange={e => setEditingPkg({...editingPkg, discount: e.target.value})}
                    placeholder="e.g. 25% OFF"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Duration</label>
                  <Input 
                    value={editingPkg?.duration || ''} 
                    onChange={e => setEditingPkg({...editingPkg, duration: e.target.value})}
                    placeholder="e.g. 7 Days / 6 Nights"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="col-span-2 space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Location</label>
                  <Input 
                    value={editingPkg?.location || ''} 
                    onChange={e => setEditingPkg({...editingPkg, location: e.target.value})}
                    placeholder="e.g. Rajasthan, India"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Cover Image</label>
                 <ImageUpload 
                   value={editingPkg?.image || ''} 
                   onChange={url => setEditingPkg({...editingPkg, image: url})} 
                 />
              </div>
            </div>

            <DialogFooter className="p-8 bg-gray-50 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSavePackage} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-12 shadow-lg shadow-blue-200 font-bold">Save Package</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
