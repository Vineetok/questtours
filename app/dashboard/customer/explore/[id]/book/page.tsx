'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard-layout';
import { customerNavItems } from '@/lib/customer-nav-items';
import { useUser } from '@/hooks/use-user';
import { adminService } from '@/services/adminService';
import { Plan } from '@/lib/types';
import {
  ArrowLeft,
  Users,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  Map,
  Loader2,
  Calendar,
  ClipboardList,
  Lock,
  Zap,
  Utensils,
  Car,
  ShieldAlert,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/display/card';
import { Input } from '@/components/ui/inputs/input';
import { Label } from '@/components/ui/inputs/label';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

// Add-on Prices
const ADDON_PRICES = {
  MEALS: {
    standard: 0,
    premium: 2500,
    all_inclusive: 5000
  },
  TRANSPORT: {
    standard: 0,
    private: 3500,
    luxury: 7000
  },
  INSURANCE: {
    none: 0,
    basic: 1200,
    premium: 2500
  }
};

export default function DashboardBookingPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { user } = useUser();

  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [plan, setPlan] = useState<Plan | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('card');

  // Add-ons State
  const [addons, setAddons] = useState({
    meal: 'standard',
    transport: 'standard',
    insurance: 'none'
  });

  const [formData, setFormData] = useState({
    salutation: '', fullName: user?.name || '', dob: '', gender: '', nationality: '', email: user?.email || '', whatsapp: '',
    arrival: '', departure: '', passport: '', issuingCountry: '', passportExpiry: '', insurance: '',
    cardNumber: '', cardExpiry: '', cardCvc: '',
    accommodation: '', health: '', adults: 1, children: 0, infants: 0, password: 'password123'
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const data = await adminService.getPlanById(id);
        setPlan(data);
      } catch (err) {
        console.error('Failed to fetch plan:', err);
        const mockPlans: Record<string, any> = {
          '1': { id: 1, title: 'Manali Delight', price: 15000, location: 'Manali, India', image: '/tours/dest/manali.png', groupSize: 15 },
          '2': { id: 2, title: 'Goa Beach Vibe', price: 12000, location: 'Goa, India', image: '/tours/dest/goa.png', groupSize: 20 },
          '3': { id: 3, title: 'Kerala Backwaters', price: 18000, location: 'Kerala, India', image: '/tours/dest/kerala.png', groupSize: 12 },
          '4': { id: 4, title: 'Royal Rajasthan', price: 20000, location: 'Rajasthan, India', image: '/tours/dest/rajasthan.png', groupSize: 10 },
          '5': { id: 5, title: 'Bali Tropical Escape', price: 45000, location: 'Bali, Indonesia', image: '/tours/dest/bali.png', groupSize: 12 },
          '6': { id: 6, title: 'Dubai Luxury Tour', price: 55000, location: 'Dubai, UAE', image: '/tours/dest/dubai.png', groupSize: 10 },
          '7': { id: 7, title: 'Ladakh Adventure', price: 25000, location: 'Leh Ladakh, India', image: '/tours/dest/ladakh.png', groupSize: 8 },
          '8': { id: 8, title: 'Sikkim Mountains', price: 22000, location: 'Sikkim, India', image: '/tours/sikkim-dest.png', groupSize: 12 },
          '9': { id: 9, title: 'Andaman Island Hop', price: 35000, location: 'Andaman, India', image: '/tours/andaman.png', groupSize: 15 },
          '10': { id: 10, title: 'Agra Heritage', price: 8000, location: 'Agra, India', image: '/tours/agra-dest.png', groupSize: 40 },
          '11': { id: 11, title: 'Rishikesh Spirituality', price: 12000, location: 'Rishikesh, India', image: '/tours/dest/rishikesh.png', groupSize: 20 },
          '12': { id: 12, title: 'Udaipur Lakes', price: 16000, location: 'Udaipur, India', image: '/tours/dest/udaipur.png', groupSize: 15 },
          '13': { id: 13, title: 'Kyoto Traditions', price: 85000, location: 'Kyoto, Japan', image: '/tours/dest/kyoto.png', groupSize: 10 },
          '14': { id: 14, title: 'Paris Romance', price: 120000, location: 'Paris, France', image: '/tours/dest/paris.png', groupSize: 6 },
          '15': { id: 15, title: 'Santorini Sunset', price: 95000, location: 'Santorini, Greece', image: '/tours/dest/santorini.png', groupSize: 8 },
          '16': { id: 16, title: 'Maldives Overwater', price: 150000, location: 'Maldives', image: '/tours/dest/maldives.png', groupSize: 4 },
          '17': { id: 17, title: 'Gujarat Heritage', price: 20000, location: 'Gujarat, India', image: '/tours/dest/gujarat.png', groupSize: 25 }
        };
        if (mockPlans[id]) setPlan(mockPlans[id]);
      } finally {
        setIsLoading(false);
      }
    };
    if (id) fetchPlan();
  }, [id]);

  const calculateTotal = () => {
    if (!plan) return 0;
    const base = plan.price * passengers;
    const mealAddon = ADDON_PRICES.MEALS[addons.meal as keyof typeof ADDON_PRICES.MEALS] * passengers;
    const transportAddon = ADDON_PRICES.TRANSPORT[addons.transport as keyof typeof ADDON_PRICES.TRANSPORT];
    const insuranceAddon = ADDON_PRICES.INSURANCE[addons.insurance as keyof typeof ADDON_PRICES.INSURANCE] * passengers;
    return base + mealAddon + transportAddon + insuranceAddon;
  };

  const requiredFields = [
    'salutation', 'fullName', 'dob', 'gender', 'nationality', 'email', 'whatsapp',
    'arrival', 'passport', 'issuingCountry', 'passportExpiry',
    'cardNumber', 'cardExpiry', 'cardCvc'
  ] as const;

  const isFormValid = requiredFields.every(key => String(formData[key as keyof typeof formData]).trim() !== '');

  const handleBooking = async () => {
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const totalPrice = calculateTotal();
      const newBooking = {
        id: `BK-${Date.now().toString().slice(-6)}`,
        tour: plan?.title || 'Tour Package',
        status: 'Confirmed',
        date: new Date().toLocaleDateString('en-CA'),
        price: totalPrice,
        image: plan?.image || '/placeholder.png'
      };
      const existingBookings = JSON.parse(localStorage.getItem('quest_tours_bookings') || '[]');
      localStorage.setItem('quest_tours_bookings', JSON.stringify([newBooking, ...existingBookings]));
      setStep(3);
      toast.success('Booking confirmed!');
    } catch (err) {
      toast.error('Booking failed');
    } finally {
      setIsSubmitting(false);
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

  if (!plan) return null;

  if (step === 3) {
    return (
      <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
        <div className="flex flex-col items-center justify-center h-[70vh] max-w-lg mx-auto text-center space-y-8 animate-in zoom-in duration-500">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-400 blur-3xl opacity-20 animate-pulse" />
            <div className="relative w-32 h-32 bg-gradient-to-br from-emerald-400 to-teal-600 text-white rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-200">
              <CheckCircle2 className="h-16 w-16" />
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Booking Confirmed!</h2>
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Your dream trip to <strong>{plan.location}</strong> is successfully booked. We've sent all details and the itinerary to your registered email.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <Button
              onClick={() => router.push('/dashboard/customer/bookings')}
              className="h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black shadow-xl"
            >
              View My Bookings
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/dashboard/customer/explore')}
              className="h-14 border-2 border-slate-100 text-slate-600 rounded-2xl font-black hover:bg-slate-50"
            >
              Explore More
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="customer" userName={user?.name || "Traveler"} userEmail={user?.email || ""} navItems={customerNavItems}>
      <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <div className="flex items-center gap-5">
            <Button variant="ghost" onClick={() => router.back()} className="rounded-2xl h-14 w-14 p-0 bg-slate-50 hover:bg-slate-100 text-slate-600 transition-all">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Checkout</h1>
              <p className="text-sm text-slate-500 font-bold uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-blue-600 fill-blue-600" /> Secure Booking Process
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {[
              { step: 1, label: 'Details', icon: ClipboardList },
              { step: 2, label: 'Payment', icon: CreditCard },
              { step: 3, label: 'Finish', icon: CheckCircle2 }
            ].map((s, idx) => (
              <React.Fragment key={s.step}>
                <div className={`flex items-center gap-3 ${step >= s.step ? 'text-blue-600' : 'text-slate-300'}`}>
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center font-black transition-all ${step >= s.step ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50'}`}>
                    <s.icon size={18} />
                  </div>
                  <span className="hidden sm:block text-xs font-black uppercase tracking-widest">{s.label}</span>
                </div>
                {idx < 2 && <div className={`hidden sm:block w-8 h-0.5 rounded-full ${step > s.step ? 'bg-blue-600' : 'bg-slate-100'}`} />}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-10">

            {/* Section 1: Personal Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                <div className="h-10 w-1 bg-blue-600 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Personal Details</h2>
              </div>

              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden ring-slate-300 shadow-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Salutation</Label>
                      <select
                        value={formData.salutation}
                        onChange={e => setFormData({ ...formData, salutation: e.target.value })}
                        className="h-12 w-full rounded-xl bg-slate-50 border-1 border-transparent focus:border-blue-600 focus:bg-white transition-all outline-none px-5 text-slate-900 font-bold text-lg"
                      >
                        <option value="">Select...</option>
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                      </select>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Full Legal Name</Label>
                      <Input
                        value={formData.fullName}
                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="John Doe"
                        className="h-12 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white px-5 font-bold text-slate-900 text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Email Address</Label>
                      <Input
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        className="h-12 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white px-5 font-bold text-slate-900 text-lg"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">WhatsApp Number</Label>
                      <Input
                        value={formData.whatsapp}
                        onChange={e => setFormData({ ...formData, whatsapp: e.target.value })}
                        placeholder="+91 00000 00000"
                        className="h-12 rounded-xl bg-slate-50 border-2 border-transparent focus:border-blue-600 focus:bg-white px-5 font-bold text-slate-900 text-lg"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Date of Birth</Label>
                      <Input type="date" value={formData.dob} onChange={e => setFormData({ ...formData, dob: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Gender</Label>
                      <select value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })} className="h-12 w-full rounded-xl bg-slate-50 border-transparent px-5 font-bold outline-none text-lg">
                        <option value="">Select...</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Nationality</Label>
                      <Input value={formData.nationality} onChange={e => setFormData({ ...formData, nationality: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 2: Itinerary & Travelers */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                <div className="h-10 w-1 bg-emerald-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Itinerary & Service Specifics</h2>
              </div>

              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden ring-slate-300 shadow-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Preferred Start Date</Label>
                      <div className="relative">
                        <Input type="date" value={formData.arrival} onChange={e => setFormData({ ...formData, arrival: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-transparent pl-12 font-bold text-slate-900 text-lg" />
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Total Travelers</Label>
                      <div className="flex items-center gap-4 h-12 bg-slate-50 px-5 rounded-xl border-2 border-transparent">
                        <button onClick={() => setPassengers(Math.max(1, passengers - 1))} className="h-8 w-8 rounded-lg bg-white text-slate-900 shadow-sm flex items-center justify-center font-black hover:bg-slate-900 hover:text-white transition-all">-</button>
                        <span className="flex-1 text-center font-bold text-2xl">{passengers}</span>
                        <button onClick={() => setPassengers(passengers + 1)} className="h-8 w-8 rounded-lg bg-white text-slate-900 shadow-sm flex items-center justify-center font-black hover:bg-slate-900 hover:text-white transition-all">+</button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-bold text-slate-900">Accommodation & Special Requests</Label>
                    <textarea
                      value={formData.accommodation}
                      onChange={e => setFormData({ ...formData, accommodation: e.target.value })}
                      rows={3}
                      placeholder="E.g., King size bed, vegetarian meals..."
                      className="w-full rounded-xl bg-slate-50 border-2 border-transparent focus:border-emerald-500 focus:bg-white transition-all px-6 py-4 outline-none resize-none text-slate-900 font-bold text-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section: Add-ons & Premium Extras */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                <div className="h-10 w-1 bg-purple-600 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Add-ons & Premium Extras</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Meal Add-on */}
                <Card className={`border-2 transition-all cursor-pointer rounded-[2rem] overflow-hidden ${addons.meal !== 'standard' ? 'border-purple-600 bg-purple-50/30' : 'border-slate-100 bg-white'}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center">
                      <Utensils size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Meal Plan</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Select dining option</p>
                    </div>
                    <select 
                      value={addons.meal} 
                      onChange={(e) => setAddons({...addons, meal: e.target.value})}
                      className="w-full h-10 rounded-lg bg-white border border-slate-200 px-3 text-sm font-bold outline-none"
                    >
                      <option value="standard">Standard (Included)</option>
                      <option value="premium">Premium Dining (+₹2.5k)</option>
                      <option value="all_inclusive">All Inclusive (+₹5k)</option>
                    </select>
                  </CardContent>
                </Card>

                {/* Transport Add-on */}
                <Card className={`border-2 transition-all cursor-pointer rounded-[2rem] overflow-hidden ${addons.transport !== 'standard' ? 'border-purple-600 bg-purple-50/30' : 'border-slate-100 bg-white'}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
                      <Car size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Transport</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Upgrade your ride</p>
                    </div>
                    <select 
                      value={addons.transport} 
                      onChange={(e) => setAddons({...addons, transport: e.target.value})}
                      className="w-full h-10 rounded-lg bg-white border border-slate-200 px-3 text-sm font-bold outline-none"
                    >
                      <option value="standard">Group (Included)</option>
                      <option value="private">Private Car (+₹3.5k)</option>
                      <option value="luxury">Luxury SUV (+₹7k)</option>
                    </select>
                  </CardContent>
                </Card>

                {/* Insurance Add-on */}
                <Card className={`border-2 transition-all cursor-pointer rounded-[2rem] overflow-hidden ${addons.insurance !== 'none' ? 'border-purple-600 bg-purple-50/30' : 'border-slate-100 bg-white'}`}>
                  <CardContent className="p-6 space-y-4">
                    <div className="h-12 w-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <ShieldAlert size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">Insurance</h3>
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Travel protection</p>
                    </div>
                    <select 
                      value={addons.insurance} 
                      onChange={(e) => setAddons({...addons, insurance: e.target.value})}
                      className="w-full h-10 rounded-lg bg-white border border-slate-200 px-3 text-sm font-bold outline-none"
                    >
                      <option value="none">No Insurance</option>
                      <option value="basic">Basic Cover (+₹1.2k)</option>
                      <option value="premium">Full Premium (+₹2.5k)</option>
                    </select>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Section 3: Legal */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                <div className="h-10 w-1 bg-amber-500 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Legal & Safety Details</h2>
              </div>

              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden ring-slate-300 shadow-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Passport Number</Label>
                      <Input value={formData.passport} onChange={e => setFormData({ ...formData, passport: e.target.value })} placeholder="P0000000" className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Issuing Country</Label>
                      <Input value={formData.issuingCountry} onChange={e => setFormData({ ...formData, issuingCountry: e.target.value })} placeholder="Country Name" className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Passport Expiry</Label>
                      <Input type="date" value={formData.passportExpiry} onChange={e => setFormData({ ...formData, passportExpiry: e.target.value })} className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                    <div className="space-y-2 flex flex-col justify-end">
                      <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 flex items-center gap-2">
                         <Info size={16} className="text-amber-600" />
                         <span className="text-[10px] font-bold text-amber-700">Ensure passport is valid for at least 6 months.</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Section 4: Payment */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 px-4">
                <div className="h-10 w-1 bg-indigo-600 rounded-full" />
                <h2 className="text-2xl font-black text-slate-900 tracking-tight">Payment Method</h2>
              </div>

              <Card className="border-none shadow-sm bg-white rounded-[2.5rem] overflow-hidden ring-slate-300 shadow-sm">
                <CardContent className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setPaymentMethod('card')}
                      className={`relative group cursor-pointer transition-all ${paymentMethod === 'card' ? 'scale-105' : 'opacity-60'}`}
                    >
                      <div className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1 ${paymentMethod === 'card' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}>
                        <CreditCard className={paymentMethod === 'card' ? 'text-blue-600' : 'text-slate-400'} size={20} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Credit Card</span>
                      </div>
                    </div>
                    <div
                      onClick={() => setPaymentMethod('paypal')}
                      className={`relative group cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'scale-105' : 'opacity-60'}`}
                    >
                      <div className={`h-20 rounded-xl border-2 flex flex-col items-center justify-center gap-1 ${paymentMethod === 'paypal' ? 'border-blue-600 bg-blue-50/50' : 'border-slate-100 bg-slate-50'}`}>
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4" alt="PayPal" width={80} height={80} />
                        <span className="text-[10px] font-black uppercase tracking-widest">PayPal</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-bold text-slate-900">Card Number</Label>
                      <Input value={formData.cardNumber} onChange={e => setFormData({ ...formData, cardNumber: e.target.value })} placeholder="**** **** **** ****" className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">Expiry (MM/YY)</Label>
                        <Input value={formData.cardExpiry} onChange={e => setFormData({ ...formData, cardExpiry: e.target.value })} placeholder="12/28" className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm font-bold text-slate-900">CVC</Label>
                        <Input value={formData.cardCvc} onChange={e => setFormData({ ...formData, cardCvc: e.target.value })} placeholder="***" className="h-12 rounded-xl bg-slate-50 border-transparent px-5 font-bold text-slate-900 text-lg" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="pt-6">
              <Button 
                onClick={() => {
                  if (!isFormValid) {
                    toast.error("Please fill in all required fields to proceed.");
                    return;
                  }
                  handleBooking();
                }}
                className={`w-full h-14 rounded-xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-3 bg-slate-900 hover:bg-slate-800 text-white shadow-slate-200`}
              >
                {isSubmitting ? <Loader2 className="animate-spin h-6 w-6" /> : <>Confirm Booking <ChevronRight size={20} /></>}
              </Button>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-10 space-y-6">
              <Card className="border-none shadow-2xl bg-slate-900 text-white rounded-[2rem] overflow-hidden">
                <div className="h-40 relative">
                  <Image src={plan.image} alt={plan.title} fill className="object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-xl font-black tracking-tight">{plan.title}</h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Base Price ({passengers} traveler)</span>
                    <span className="font-bold">{formatCurrency(plan.price * passengers)}</span>
                  </div>
                  
                  {addons.meal !== 'standard' && (
                    <div className="flex justify-between items-center text-xs text-purple-400">
                      <span>Meal Upgrade</span>
                      <span className="font-bold">+ {formatCurrency(ADDON_PRICES.MEALS[addons.meal as keyof typeof ADDON_PRICES.MEALS] * passengers)}</span>
                    </div>
                  )}
                  {addons.transport !== 'standard' && (
                    <div className="flex justify-between items-center text-xs text-blue-400">
                      <span>Transport Upgrade</span>
                      <span className="font-bold">+ {formatCurrency(ADDON_PRICES.TRANSPORT[addons.transport as keyof typeof ADDON_PRICES.TRANSPORT])}</span>
                    </div>
                  )}
                  {addons.insurance !== 'none' && (
                    <div className="flex justify-between items-center text-xs text-emerald-400">
                      <span>Insurance Plan</span>
                      <span className="font-bold">+ {formatCurrency(ADDON_PRICES.INSURANCE[addons.insurance as keyof typeof ADDON_PRICES.INSURANCE] * passengers)}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-white/10 mt-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 text-center">Grand Total</p>
                    <p className="text-4xl font-black text-center text-blue-400">{formatCurrency(calculateTotal())}</p>
                  </div>

                  <div className="pt-6">
                    <Button 
                      onClick={() => {
                        if (!isFormValid) {
                          toast.error("Please fill in all required fields to proceed.");
                          return;
                        }
                        handleBooking();
                      }}
                      className={`w-full h-14 rounded-xl font-black transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/50 flex items-center justify-center gap-2`}
                    >
                      {isSubmitting ? <Loader2 className="animate-spin h-5 w-5" /> : <><ShieldCheck size={18} /> Confirm & Pay</>}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-blue-50 p-6 rounded-[2rem] border border-blue-100 flex items-start gap-4">
                 <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0">
                    <Star className="text-blue-600 fill-blue-600" size={20} />
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-900 text-sm">Safe & Secure</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Your payment is encrypted and processed via secure gateways.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
