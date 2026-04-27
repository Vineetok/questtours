'use client';

import React, { useState, useEffect} from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { adminNavItems } from '@/lib/admin-nav-items';
import { useUser } from '@/hooks/use-user';
import { Plan } from '@/lib/types';
import { adminService } from '@/services/adminService';
import { DataManagementTable } from '@/components/admin/data-management-table';
import { ImageUpload } from '@/components/shared/image-upload';
import { Button } from '@/components/ui/inputs/button';
import { Input } from '@/components/ui/inputs/input';
import { Textarea } from '@/components/ui/inputs/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/inputs/select';
import { 
  GripVertical,
  Clock,
  MapPin,
  Plus,
  Calendar,
  Search,
  LayoutList,
  ChevronRight,
  X
} from 'lucide-react';
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

interface Day {
  day: number;
  title: string;
  activities: string[];
  meals: string;
  stay: string;
}

export default function PlansManagementPage() {
  const { user } = useUser();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Partial<Plan> | null>(null);
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

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const data = await adminService.getPlans();
      setPlans(data || []);
    } catch  {
      toast.error('Failed to fetch plans');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPlans();
  }, []);

  const handleAddPlan = () => {
    setEditingPlan({
      title: '',
      description: '',
      price: 0,
      image: '',
      duration: '',
      location: '',
      theme: 'Culture',
      itinerary: []
    });
    setIsDialogOpen(true);
  };

  const handleEditPlan = (plan: Plan) => {
    setEditingPlan({ ...plan });
    setIsDialogOpen(true);
  };

  const handleDeletePlan = (plan: Plan) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Delete Travel Plan',
      description: `Are you sure you want to delete "${plan.title}"? This will permanently remove the itinerary.`,
      isLoading: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isLoading: true }));
        try {
          await adminService.deletePlan(plan.id);
          toast.success('Plan deleted successfully');
          fetchPlans();
          setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        } catch {
          toast.error('Failed to delete plan');
        } finally {
          setConfirmConfig(prev => ({ ...prev, isLoading: false }));
        }
      }
    });
  };

  const handleBulkDelete = (ids: (string | number)[]) => {
    setConfirmConfig({
      isOpen: true,
      title: 'Bulk Delete Plans',
      description: `Are you sure you want to delete ${ids.length} plans? This action cannot be undone.`,
      isLoading: false,
      onConfirm: async () => {
        setConfirmConfig(prev => ({ ...prev, isLoading: true }));
        try {
          await Promise.all(ids.map(id => adminService.deletePlan(id)));
          toast.success(`${ids.length} plans deleted successfully`);
          fetchPlans();
          setConfirmConfig(prev => ({ ...prev, isOpen: false }));
        } catch {
          toast.error('Failed to delete some plans');
          fetchPlans();
        } finally {
          setConfirmConfig(prev => ({ ...prev, isLoading: false }));
        }
      }
    });
  };

  const handleSavePlan = async () => {
    if (!editingPlan?.title || !editingPlan?.price) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      if (editingPlan.id) {
        await adminService.updatePlan(editingPlan.id, editingPlan);
        toast.success('Plan updated successfully');
      } else {
        await adminService.addPlan(editingPlan);
        toast.success('Plan added successfully');
      }
      setIsDialogOpen(false);
      fetchPlans();
    } catch  {
      toast.error('Failed to save plan');
    }
  };


  const addItineraryDay = () => {
    if (!editingPlan) return;
    const newDay: Day = {
      day: (editingPlan.itinerary?.length || 0) + 1,
      title: '',
      activities: [''],
      meals: '',
      stay: ''
    };
    setEditingPlan({
      ...editingPlan,
      itinerary: [...(editingPlan.itinerary || []), newDay]
    });
  };

  const updateDay = (index: number, field: keyof Day, value: Day[keyof Day]) => {
    if (!editingPlan?.itinerary) return;
    const updatedItinerary = [...editingPlan.itinerary];
    updatedItinerary[index] = { ...updatedItinerary[index], [field]: value };
    setEditingPlan({ ...editingPlan, itinerary: updatedItinerary });
  };

  const filteredPlans = plans.filter(plan => 
    plan.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    plan.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns = [
    {
      header: 'Plan Info',
      accessor: (plan: Plan) => (
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-16 rounded-lg overflow-hidden border border-gray-100 shrink-0">
            <Image src={plan.image || "/tours/fallback/fallback-admin.png"} alt={plan.title} fill className="object-cover" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-gray-900 truncate">{plan.title}</p>
            <div className="flex items-center gap-2 mt-0.5">
               <Clock className="h-3 w-3 text-gray-400" />
               <span className="text-xs text-gray-500">{plan.duration}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      header: 'Location',
      accessor: (plan: Plan) => (
        <div className="flex items-center gap-1.5 text-gray-600">
          <MapPin className="h-3.5 w-3.5 text-blue-500" />
          <span className="text-sm font-medium">{plan.location}</span>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: (plan: Plan) => (
        <span className="font-bold text-blue-600">{formatCurrency(plan.price)}</span>
      )
    },
    {
      header: 'Days',
      accessor: (plan: Plan) => (
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 text-purple-500" />
          <span className="text-sm font-bold text-gray-700">{plan.itinerary?.length || 0} Days</span>
        </div>
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
            <h1 className="text-3xl font-black tracking-tight text-gray-900">Manage Travel Plans</h1>
            <p className="text-gray-500 mt-1">Create and manage detailed itineraries for your customers.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button onClick={handleAddPlan} className="bg-blue-600 hover:bg-blue-700 h-11 px-6 rounded-xl shadow-lg shadow-blue-200 gap-2">
              <Plus className="h-4 w-4" /> Add New Plan
            </Button>
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search plans by title or location..." 
            className="pl-10 h-11 bg-white border-gray-100 rounded-xl focus:ring-blue-600 focus:border-blue-600 shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <DataManagementTable
          data={filteredPlans}
          columns={columns}
          onEdit={handleEditPlan}
          onDelete={handleDeletePlan}
          onBulkDelete={handleBulkDelete}
          isLoading={isLoading}
        />

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 border-none shadow-2xl rounded-3xl">
            <DialogHeader className="p-8 bg-white border-b border-gray-50 shrink-0">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                    <LayoutList size={24} />
                 </div>
                 <div>
                    <DialogTitle className="text-2xl font-black text-gray-900">
                      {editingPlan?.id ? 'Edit Travel Plan' : 'Create New Plan'}
                    </DialogTitle>
                    <DialogDescription className="text-gray-500">
                      Fill in the details below to create a comprehensive itinerary.
                    </DialogDescription>
                 </div>
              </div>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar space-y-8 bg-gray-50/30">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Plan Title</label>
                    <Input 
                      value={editingPlan?.title || ''} 
                      onChange={e => setEditingPlan({...editingPlan, title: e.target.value})}
                      placeholder="e.g. Magical Switzerland 10-Day Grand Tour"
                      className="h-12 bg-white border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Price (₹)</label>
                      <Input 
                        type="number"
                        value={editingPlan?.price || 0} 
                        onChange={e => setEditingPlan({...editingPlan, price: Number(e.target.value)})}
                        className="h-12 bg-white border-gray-200 rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Duration</label>
                      <Input 
                        value={editingPlan?.duration || ''} 
                        onChange={e => setEditingPlan({...editingPlan, duration: e.target.value})}
                        placeholder="e.g. 10 Days / 9 Nights"
                        className="h-12 bg-white border-gray-200 rounded-xl"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Location</label>
                    <Input 
                      value={editingPlan?.location || ''} 
                      onChange={e => setEditingPlan({...editingPlan, location: e.target.value})}
                      placeholder="e.g. Zurich, Lucerne, Interlaken"
                      className="h-12 bg-white border-gray-200 rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Theme</label>
                    <Select value={editingPlan?.theme ?? ''} onValueChange={value => setEditingPlan({...editingPlan, theme: value})}>
                      <SelectTrigger className="h-12 w-full bg-white border-gray-200 rounded-xl">
                        <SelectValue placeholder="Select a theme" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Honeymoon">Honeymoon</SelectItem>
                        <SelectItem value="Culture">Culture</SelectItem>
                        <SelectItem value="Adventure">Adventure</SelectItem>
                        <SelectItem value="Offbeat">Offbeat</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-black text-gray-700 uppercase tracking-wider">Cover Image</label>
                   <ImageUpload 
                     value={editingPlan?.image || ''} 
                     onChange={url => setEditingPlan({...editingPlan, image: url})} 
                   />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-gray-700 uppercase tracking-wider">General Description</label>
                <Textarea 
                  value={editingPlan?.description || ''} 
                  onChange={e => setEditingPlan({...editingPlan, description: e.target.value})}
                  className="min-h-[120px] bg-white border-gray-200 rounded-xl p-4"
                  placeholder="Overview of the entire trip..."
                />
              </div>

              {/* Itinerary Section */}
              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <h3 className="text-xl font-black text-gray-900 flex items-center gap-2">
                    <ChevronRight className="text-blue-600" />
                    Day-by-Day Itinerary
                  </h3>
                  <Button variant="outline" size="sm" onClick={addItineraryDay} className="rounded-full gap-2 border-2">
                    <Plus size={14} /> Add Day
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {editingPlan?.itinerary?.map((day, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative group">
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-100 rounded-l-2xl group-hover:bg-blue-600 transition-colors"></div>
                      <div className="flex items-start gap-4">
                        <div className="bg-gray-50 p-2 rounded-lg cursor-grab active:cursor-grabbing shrink-0">
                           <GripVertical size={16} className="text-gray-400" />
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-600 text-white font-black px-3 py-1 rounded-lg text-sm">
                              DAY {day.day}
                            </div>
                            <Input 
                              value={day.title}
                              onChange={e => updateDay(idx, 'title', e.target.value)}
                              placeholder="Title of the day..."
                              className="font-bold border-none bg-transparent p-0 h-auto focus-visible:ring-0 text-lg"
                            />
                          </div>
                          <Textarea 
                            placeholder="Activities and details for this day..."
                            value={day.activities[0]}
                            onChange={e => updateDay(idx, 'activities', [e.target.value])}
                            className="bg-gray-50/50 border-none rounded-xl focus-visible:ring-1 focus-visible:ring-blue-100 min-h-[80px]"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <Input 
                              placeholder="Meals (e.g. Breakfast, Lunch)"
                              value={day.meals}
                              onChange={e => updateDay(idx, 'meals', e.target.value)}
                              className="bg-gray-50/50 border-none rounded-lg text-sm"
                            />
                            <Input 
                              placeholder="Stay (e.g. Hotel Central)"
                              value={day.stay}
                              onChange={e => updateDay(idx, 'stay', e.target.value)}
                              className="bg-gray-50/50 border-none rounded-lg text-sm"
                            />
                          </div>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-gray-400 hover:text-red-500 h-8 w-8 rounded-full"
                          onClick={() => {
                            const newItinerary = editingPlan.itinerary?.filter((_, i) => i !== idx);
                            setEditingPlan({...editingPlan, itinerary: newItinerary});
                          }}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {(!editingPlan?.itinerary || editingPlan.itinerary.length === 0) && (
                    <div className="text-center py-12 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-400 font-medium">No days added to the itinerary yet.</p>
                      <Button variant="link" onClick={addItineraryDay} className="text-blue-600 font-bold mt-2">
                        Click here to start building your plan
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="p-8 bg-white border-t border-gray-50 shrink-0">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="rounded-xl h-12 px-8">Cancel</Button>
              <Button onClick={handleSavePlan} className="bg-blue-600 hover:bg-blue-700 rounded-xl h-12 px-10 shadow-lg shadow-blue-200">Save Itinerary</Button>
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
