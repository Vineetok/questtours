'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { useUser } from '@/hooks/use-user';
import { Tour } from '@/lib/types';
import { adminService } from '@/services/adminService';
import { DataManagementTable } from '@/components/admin/data-management-table';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Textarea } from '@/components/ui/inputs/textarea';
import { Plus, Search, Map, Clock, Star } from 'lucide-react';
import { ConfirmDialog } from '@/components/ui/overlays/confirm-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/overlays/dialog';
import { toast } from 'sonner';
import Image from 'next/image';
import { formatCurrency } from '@/lib/utils';


export default function ToursManagementPage() {
  const { user } = useUser();
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<Partial<Tour> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
    isLoading: boolean;
  }>({
    isOpen: false,
    title: '',
    description: '',
    onConfirm: () => {},
    isLoading: false,
  });

  const fetchTours = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getTours();
      setTours(data || []);
     } catch  {
      toast.error('Failed to fetch tours');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const handleAddTour = () => {
    setEditingTour({
      title: '',
      location: '',
      price: 0,
      image: '',
      duration: '',
      rating: 5,
      description: '',
      tag: 'Adventure'
    });
    setIsDialogOpen(true);
  };

  const handleEditTour = (tour: Tour) => {
    setEditingTour({ ...tour });
    setIsDialogOpen(true);
  };

  const handleDeleteTour = (tour: Tour) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Tour',
      description: `Are you sure you want to delete "${tour.title || tour.name}"? This action cannot be undone.`,
      isLoading: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isLoading: true }));
        try {
          await adminService.deleteTour(tour.id);
          toast.success('Tour deleted successfully');
          fetchTours();
          setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        } catch {
          toast.error('Failed to delete tour');
        } finally {
          setConfirmConfig(prev => ({ ...prev, isLoading: false }));
        }
      }
    });
  };

  const handleBulkDelete = (ids: (string | number)[]) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Bulk Delete Tours',
      description: `Are you sure you want to delete ${ids.length} tours? This action cannot be undone.`,
      isLoading: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isLoading: true }));
        try {
          await Promise.all(ids.map(id => adminService.deleteTour(id)));
          toast.success(`${ids.length} tours deleted successfully`);
          fetchTours();
          setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        } catch {
          toast.error('Failed to delete some tours');
          fetchTours();
        } finally {
          setConfirmConfig(prev => ({ ...prev, isLoading: false }));
        }
      }
    });
  };

  const handleSaveTour = async () => {
    if (!editingTour?.title || !editingTour?.price) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingTour.id) {
        await adminService.updateTour(editingTour.id, editingTour);
        toast.success('Tour updated successfully');
      } else {
        await adminService.addTour(editingTour);
        toast.success('Tour added successfully');
      }
      setIsDialogOpen(false);
      fetchTours();
    } catch  {
      toast.error('Failed to save tour');
    }
  };


  const filteredTours = tours.filter(tour => 
    (tour.title || tour.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Tour',
      accessor: (tour: Tour) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-gray-100 shrink-0">
            <Image src={tour.image} alt={tour.title || tour.name || ''} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{tour.title || tour.name}</p>
            <div className="flex items-center gap-2 mt-0.5">
               <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
               <span className="text-xs font-bold">{tour.rating}</span>
               <span className="text-[10px] text-gray-400 font-medium">• {tour.tag}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: (tour: Tour) => (
        <span className="text-sm font-medium text-gray-600">{tour.location}</span>
      )
    },
    {
      header: 'Duration',
      accessor: (tour: Tour) => (
        <div className="flex items-center gap-1.5 text-gray-500">
           <Clock size={12} />
           <span className="text-xs font-medium">{tour.duration}</span>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: (tour: Tour) => (
        <span className="font-bold text-blue-600">{formatCurrency(tour.price)}</span>
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
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Manage Tours</h1>
            <p className="text-gray-500 mt-1">Add, edit or bulk upload individual tour activities.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleAddTour} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl shadow-lg shadow-blue-200 gap-2">
              <Plus className="h-4 w-4" /> Add Tour
            </Button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search tours..." 
            className="pl-10 h-11 bg-white border-gray-100 rounded-xl focus:ring-blue-600 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DataManagementTable
          data={filteredTours}
          columns={columns}
          onEdit={handleEditTour}
          onDelete={handleDeleteTour}
          onBulkDelete={handleBulkDelete}
          isLoading={isLoading}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl border-none shadow-2xl rounded-3xl p-0 overflow-hidden">
            <DialogHeader className="p-8 bg-white border-b border-gray-50">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <Map size={24} />
                 </div>
                 <div>
                    <DialogTitle className="text-2xl font-black">{editingTour?.id ? 'Edit Tour' : 'Create Tour'}</DialogTitle>
                    <DialogDescription>Enter tour details and upload a cover image.</DialogDescription>
                 </div>
               </div>
            </DialogHeader>

            <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Tour Title</label>
                  <Input 
                    value={editingTour?.title || ''} 
                    onChange={e => setEditingTour({...editingTour, title: e.target.value})}
                    placeholder="e.g. Desert Safari Adventure"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Category / Tag</label>
                  <Input 
                    value={editingTour?.tag || ''} 
                    onChange={e => setEditingTour({...editingTour, tag: e.target.value})}
                    placeholder="e.g. Adventure, Cultural"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Price (₹)</label>
                  <Input 
                    type="number"
                    value={editingTour?.price || 0} 
                    onChange={e => setEditingTour({...editingTour, price: Number(e.target.value)})}
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Duration</label>
                  <Input 
                    value={editingTour?.duration || ''} 
                    onChange={e => setEditingTour({...editingTour, duration: e.target.value})}
                    placeholder="e.g. 4 Hours"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Location</label>
                  <Input 
                    value={editingTour?.location || ''} 
                    onChange={e => setEditingTour({...editingTour, location: e.target.value})}
                    placeholder="e.g. Dubai"
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Rating (1-5)</label>
                  <Input 
                    type="number"
                    max={5}
                    min={1}
                    value={editingTour?.rating || 5} 
                    onChange={e => setEditingTour({...editingTour, rating: Number(e.target.value)})}
                    className="h-12 bg-gray-50/50 border-none rounded-xl"
                  />
                </div>
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Description</label>
                 <Textarea 
                    value={editingTour?.description || ''}
                    onChange={e => setEditingTour({...editingTour, description: e.target.value})}
                    className="min-h-[100px] bg-gray-50/50 border-none rounded-xl"
                 />
              </div>
              <div className="space-y-2">
                 <label className="text-xs font-black text-gray-700 uppercase tracking-widest">Cover Image</label>
                 <ImageUpload 
                   value={editingTour?.image || ''} 
                   onChange={url => setEditingTour({...editingTour, image: url})} 
                 />
              </div>
            </div>

            <DialogFooter className="p-8 bg-gray-50 border-t border-gray-100">
              <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSaveTour} className="bg-blue-600 hover:bg-blue-700 rounded-xl px-8 h-12 shadow-lg shadow-blue-200">Save Tour</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <ConfirmDialog 
          isOpen={confirmConfig.isOpen}
          onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
          onConfirm={confirmConfig.onConfirm}
          title={confirmConfig.title}
          description={confirmConfig.description}
          isLoading={confirmConfig.isLoading}
        />
      </div>
    </DashboardLayout>
  );
}
