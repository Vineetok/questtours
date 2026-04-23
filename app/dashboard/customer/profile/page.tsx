'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard-layout';
import { 
  LayoutDashboard, 
  Map, 
  Heart, 
  History, 
  Calendar as CalendarIcon,
  User as UserIcon,
  Mail,
  Phone,
  MapPin,
  Camera,
  Lock,
  Bell,
  Globe,
  Save,
  ShieldCheck
} from 'lucide-react';
import { userProfile } from '@/lib/mock-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

const customerNavItems = [
  { title: 'Dashboard', url: '/dashboard/customer', icon: LayoutDashboard },
  { title: 'My Bookings', url: '/dashboard/customer/bookings', icon: CalendarIcon },
  { title: 'Wishlist', url: '/dashboard/customer/wishlist', icon: Heart },
  { title: 'Payments', url: '/dashboard/customer/payments', icon: History },
  { title: 'Profile', url: '/dashboard/customer/profile', icon: UserIcon },
  { title: 'Explore', url: '/destinations', icon: Map },
];

export default function ProfilePage() {
  const [profile, setProfile] = useState(userProfile);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success('Profile updated successfully!');
    }, 1500);
  };

  return (
    <DashboardLayout 
      role="customer" 
      userName={profile.name} 
      userEmail={profile.email}
      navItems={customerNavItems}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Profile Settings</h1>
          <p className="text-gray-500 text-sm sm:text-base">Manage your personal information and account security.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Focused Profile Card */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-none shadow-sm bg-white overflow-hidden ring-1 ring-gray-100">
              <CardContent className="p-0">
                <div className="h-24 bg-slate-50 border-b border-gray-100"></div>
                <div className="px-6 pb-8 flex flex-col items-center">
                  <div className="relative -mt-12 mb-4">
                    <Avatar className="h-24 w-24 border-4 border-white shadow-md rounded-2xl">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.name}`} />
                      <AvatarFallback className="rounded-2xl">{profile.name[0]}</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      variant="secondary"
                      className="absolute -bottom-1 -right-1 rounded-xl h-8 w-8 shadow-sm border border-white"
                    >
                      <Camera className="h-4 w-4 text-gray-600" />
                    </Button>
                  </div>
                  
                  <div className="text-center space-y-1 mb-8">
                    <h2 className="text-xl font-bold text-gray-900">{profile.name}</h2>
                    <p className="text-sm text-gray-500">{profile.email}</p>
                    <Badge variant="secondary" className="mt-2 bg-blue-50 text-blue-700 border-blue-100 rounded-lg">
                      <ShieldCheck className="h-3 w-3 mr-1" /> Verified Explorer
                    </Badge>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-3">
                    <div className="p-3 bg-gray-50 rounded-2xl text-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Since</p>
                      <p className="text-sm font-bold text-gray-900">Jan 2024</p>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-2xl text-center">
                      <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-1">Trips</p>
                      <p className="text-sm font-bold text-gray-900">12</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100/50">
               <p className="text-xs text-indigo-700 leading-relaxed text-center font-medium">
                 Your profile is 85% complete. Add a profile bio to reach 100%.
               </p>
            </div>
          </div>

          {/* Right Column: Tabbed Settings */}
          <div className="lg:col-span-8">
            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="bg-transparent border-b border-gray-100 w-full justify-start rounded-none h-auto p-0 mb-6 space-x-8">
                <TabsTrigger 
                  value="personal" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-bold text-sm"
                >
                  Personal Details
                </TabsTrigger>
                <TabsTrigger 
                  value="notifications" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-bold text-sm"
                >
                  Notifications
                </TabsTrigger>
                <TabsTrigger 
                  value="security" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-0 pb-3 font-bold text-sm"
                >
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="animate-in fade-in slide-in-from-right-2 duration-300">
                <Card className="border-none shadow-sm bg-white ring-1 ring-gray-100">
                  <CardContent className="p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">Full Name</Label>
                        <Input id="name" value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">Email Address</Label>
                        <Input id="email" type="email" value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-gray-500">Phone Number</Label>
                        <Input id="phone" value={profile.phone} onChange={e => setProfile({...profile, phone: e.target.value})} className="h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="currency" className="text-xs font-bold uppercase tracking-wider text-gray-500">Preferred Currency</Label>
                        <Select defaultValue={profile.preferences.currency}>
                          <SelectTrigger className="h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="USD">USD (Rs.)</SelectItem>
                            <SelectItem value="EUR">EUR (€)</SelectItem>
                            <SelectItem value="GBP">GBP (£)</SelectItem>
                            <SelectItem value="INR">INR (Rs.)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address" className="text-xs font-bold uppercase tracking-wider text-gray-500">Residential Address</Label>
                      <Input id="address" value={profile.address} onChange={e => setProfile({...profile, address: e.target.value})} className="h-11 bg-gray-50/50 border-gray-100 focus:bg-white transition-all" />
                    </div>
                  </CardContent>
                  <CardFooter className="px-8 py-6 bg-slate-50/50 border-t border-gray-100 flex justify-end">
                    <Button onClick={handleSave} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 h-11 px-10 rounded-xl font-bold transition-all shadow-lg shadow-blue-200">
                      {isLoading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="animate-in fade-in slide-in-from-right-2 duration-300">
                <Card className="border-none shadow-sm bg-white ring-1 ring-gray-100">
                  <CardContent className="p-8 space-y-8">
                    <div className="flex items-center justify-between group">
                      <div className="space-y-1">
                        <Label className="text-base font-bold text-gray-900">Trip Updates</Label>
                        <p className="text-sm text-gray-500 max-w-md">Receive alerts about flight changes, hotel check-ins, and reminders via email and SMS.</p>
                      </div>
                      <Switch checked={profile.preferences.notifications} className="data-[state=checked]:bg-blue-600" />
                    </div>
                    <div className="flex items-center justify-between group">
                      <div className="space-y-1">
                        <Label className="text-base font-bold text-gray-900">Deals & Offers</Label>
                        <p className="text-sm text-gray-500 max-w-md">Be the first to know about seasonal sales, last-minute discounts, and loyalty reward news.</p>
                      </div>
                      <Switch checked={profile.preferences.newsletter} className="data-[state=checked]:bg-blue-600" />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="security" className="animate-in fade-in slide-in-from-right-2 duration-300">
                <Card className="border-none shadow-sm bg-white ring-1 ring-gray-100">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-lg font-bold">Password & Security</CardTitle>
                    <CardDescription>Maintain a secure account by updating your credentials regularly.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4 space-y-6">
                    <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="font-bold text-gray-900">Change Password</p>
                        <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                      </div>
                      <Button variant="outline" className="border-gray-200 hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all font-bold rounded-xl h-10 px-6">
                        Update Password
                      </Button>
                    </div>
                    
                    <div className="p-6 rounded-2xl border border-red-50 bg-red-50/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <p className="font-bold text-red-900">Deactivate Account</p>
                        <p className="text-xs text-red-600 opacity-70">This will hide your profile from all future bookings.</p>
                      </div>
                      <Button variant="ghost" className="text-red-600 hover:bg-red-100 hover:text-red-700 font-bold rounded-xl h-10 px-6">
                        Deactivate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
