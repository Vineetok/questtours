'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { toursData as tours } from '@/lib/data';
import { Tour } from '@/lib/types';
import {
  ArrowLeft,
  Users,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Info,
  Map,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/display/card';
import { Input } from '@/components/ui/inputs/input';
import { Label } from '@/components/ui/inputs/label';
import { toast } from 'sonner';
import { useUser } from '@/hooks/use-user';
import { formatCurrency } from '@/lib/utils';
import { adminService } from '@/services/adminService';
import { Loader2 } from 'lucide-react';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id as string;
  
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [tour, setTour] = useState<any>(null);
  const [isLoadingTour, setIsLoadingTour] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user } = useUser();
  const [formData, setFormData] = useState({
    salutation: '', fullName: '', dob: '', gender: '', nationality: '', email: '', whatsapp: '',
    arrival: '', departure: '', passport: '', issuingCountry: '', passportExpiry: '', insurance: '',
    cardNumber: '', cardExpiry: '', cardCvc: '',
    accommodation: '', health: '', adults: 1, children: 0, infants: 0, password: ''
  });

  React.useEffect(() => {
    const fetchTour = async () => {
      const staticTour = (tours as unknown as Tour[]).find((t: Tour) => t.id.toString() === tourId);
      if (staticTour) {
        setTour(staticTour);
        setIsLoadingTour(false);
      } else {
        try {
          const apiPlan = await adminService.getPlanById(tourId);
          setTour(apiPlan);
        } catch {
          toast.error('Tour not found');
        } finally {
          setIsLoadingTour(false);
        }
      }
    };
    if (tourId) fetchTour();
  }, [tourId]);
  
  const requiredFields = [
    'salutation', 'fullName', 'dob', 'gender', 'nationality', 'email', 'whatsapp',
    'arrival', 'departure', 'passport', 'issuingCountry', 'passportExpiry',
    'insurance', 'cardNumber', 'cardExpiry', 'cardCvc', 'password'
  ] as const;

  const isFormValid = requiredFields.every(key => String(formData[key]).trim() !== '');

  if (isLoadingTour) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!tour) return null;

  const handleBooking = async () => {
    setIsSubmitting(true);

    try {
      const payload = {
        formData,
        tourDetails: {
          id: tour.id,
          title: tour.title || tour.name,
          image: tour.image,
          price: tour.price,
          passengers: passengers,
          totalPrice: passengers * tour.price
        }
      };

      const res = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Failed to create booking');

      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('storage'));
      }

      const newBooking = {
        id: data.bookingReference || `BK-${Date.now()}`,
        tour: tour.title || tour.name,
        status: 'Confirmed',
        date: new Date().toLocaleDateString('en-CA'),
        price: passengers * tour.price,
        image: tour.image
      };

      const existingBookings = JSON.parse(localStorage.getItem('quest_tours_bookings') || '[]');
      localStorage.setItem('quest_tours_bookings', JSON.stringify([newBooking, ...existingBookings]));

      setIsSubmitting(false);
      setStep(3);
      toast.success('Booking confirmed!', {
        description: `Pack your bags for ${tour.location}!`,
      });
    } catch (err: unknown) {
      console.error('Booking Error:', err);
      toast.error('Booking Failed');
      setIsSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-24 md:pt-32 pb-12">
          <Card className="max-w-md w-full border-none shadow-2xl rounded-2xl md:rounded-[3rem] p-6 md:p-8 text-center bg-white ring-1 ring-slate-100">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-emerald-100 text-emerald-600 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 animate-bounce">
              <CheckCircle2 className="h-10 w-10 md:h-12 md:w-12" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-4">Booking Confirmed!</h2>
            <p className="text-slate-500 font-medium mb-6 md:mb-8 leading-relaxed text-sm md:text-base">
              Your adventure to <strong>{tour.location}</strong> is officially on the calendar. We&apos;ve sent the confirmation and itinerary to your email.
            </p>
            <div className="space-y-3 md:space-y-4">
              <Button 
                onClick={() => {
                  if (user) {
                    router.push('/dashboard/customer/bookings');
                  } else {
                    router.push('/login');
                  }
                }}
                className="w-full h-12 md:h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-xl md:rounded-2xl font-bold text-sm md:text-base"
              >
                View My Bookings
              </Button>
              <Button
                variant="ghost"
                onClick={() => router.push('/')}
                className="w-full h-12 md:h-14 text-slate-500 hover:text-slate-900 font-bold text-sm md:text-base"
              >
                Back to Home
              </Button>
            </div>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-12 w-full">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6 md:mb-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="rounded-xl h-10 w-10 md:h-12 md:w-12 p-0 bg-white shadow-sm ring-1 ring-slate-100"
          >
            <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900">Complete Your Booking</h1>
            <p className="text-sm md:text-base text-slate-500 font-medium">Verify your details and secure your spot.</p>
          </div>
        </div>

        {/* Mobile Sticky Order Summary Button */}
        <div className="lg:hidden fixed bottom-4 left-4 right-4 z-50">
          <Button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full bg-slate-900 text-white rounded-2xl shadow-lg h-14"
          >
            {mobileMenuOpen ? (
              <>
                <X className="h-5 w-5 mr-2" />
                Close Order Summary
              </>
            ) : (
              <>
                <Menu className="h-5 w-5 mr-2" />
                View Order Summary - {formatCurrency(passengers * tour.price)}
              </>
            )}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            {/* Personal Details Section */}
            <Card className="border-none shadow-sm bg-white rounded-2xl md:rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-5 md:p-8 border-b border-slate-50">
                <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-sky-50 text-sky-600 rounded-lg md:rounded-xl flex items-center justify-center">
                    <Users className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  Personal & Identification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Salutation *</Label>
                    <select 
                      value={formData.salutation} 
                      onChange={e => setFormData({...formData, salutation: e.target.value})} 
                      aria-label="Salutation" 
                      className="h-10 md:h-12 w-full rounded-lg md:rounded-xl bg-slate-50/50 border border-slate-100 px-3 md:px-4 focus:bg-white focus:border-sky-500 transition-all outline-none text-slate-900 text-sm md:text-base"
                    >
                      <option value="">Select...</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Legal Name</Label>
                    <Input 
                      value={formData.fullName} 
                      onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      placeholder="As it appears on your passport" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Date of Birth</Label>
                    <Input 
                      value={formData.dob} 
                      onChange={e => setFormData({...formData, dob: e.target.value})} 
                      type="date" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Gender</Label>
                    <select 
                      value={formData.gender} 
                      onChange={e => setFormData({...formData, gender: e.target.value})} 
                      aria-label="Gender" 
                      className="h-10 md:h-12 w-full rounded-lg md:rounded-xl bg-slate-50/50 border border-slate-100 px-3 md:px-4 focus:bg-white focus:border-sky-500 transition-all outline-none text-slate-900 text-sm md:text-base"
                    >
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Nationality</Label>
                    <Input 
                      value={formData.nationality} 
                      onChange={e => setFormData({...formData, nationality: e.target.value})} 
                      placeholder="Country of Residence" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                    <Input 
                      value={formData.email} 
                      onChange={e => setFormData({...formData, email: e.target.value})} 
                      placeholder="you@example.com" 
                      type="email" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">WhatsApp Number</Label>
                    <Input 
                      value={formData.whatsapp} 
                      onChange={e => setFormData({...formData, whatsapp: e.target.value})} 
                      placeholder="+1 234 567 8900" 
                      type="tel" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Itinerary Section */}
            <Card className="border-none shadow-sm bg-white rounded-2xl md:rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-5 md:p-8 border-b border-slate-50">
                <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-emerald-50 text-emerald-600 rounded-lg md:rounded-xl flex items-center justify-center">
                    <Map className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  Itinerary & Service Specifics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-slate-50 rounded-xl md:rounded-2xl border border-slate-100 gap-4 sm:gap-0">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900 text-sm md:text-base">Total Group Size</p>
                    <p className="text-xs text-slate-500 font-medium font-mono">Max: {tour.groupSize}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-lg h-8 w-8 md:h-10 md:w-10 border-slate-200"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    > - </Button>
                    <span className="text-lg md:text-xl font-black w-8 text-center">{passengers}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-lg h-8 w-8 md:h-10 md:w-10 border-slate-200"
                      onClick={() => setPassengers(passengers + 1)}
                    > + </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expected Arrival Date</Label>
                    <Input 
                      value={formData.arrival} 
                      onChange={e => setFormData({...formData, arrival: e.target.value})} 
                      type="date" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expected Departure Date</Label>
                    <Input 
                      value={formData.departure} 
                      onChange={e => setFormData({...formData, departure: e.target.value})} 
                      type="date" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Adults</Label>
                    <Input 
                      value={formData.adults} 
                      onChange={e => setFormData({...formData, adults: parseInt(e.target.value) || 0})} 
                      type="number" 
                      min={1} 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Children</Label>
                    <Input 
                      value={formData.children} 
                      onChange={e => setFormData({...formData, children: parseInt(e.target.value) || 0})} 
                      type="number" 
                      min={0} 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Infants</Label>
                    <Input 
                      value={formData.infants} 
                      onChange={e => setFormData({...formData, infants: parseInt(e.target.value) || 0})} 
                      type="number" 
                      min={0} 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Accommodation & Bed Preferences</Label>
                  <textarea 
                    value={formData.accommodation} 
                    onChange={e => setFormData({...formData, accommodation: e.target.value})} 
                    rows={2} 
                    placeholder="E.g., Queen bed, high floor, crib required" 
                    className="w-full rounded-lg md:rounded-xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-sky-500 transition-all px-3 md:px-4 py-2 md:py-3 outline-none resize-none text-slate-900 text-sm md:text-base" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Legal Details Section */}
            <Card className="border-none shadow-sm bg-white rounded-2xl md:rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-5 md:p-8 border-b border-slate-50">
                <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-amber-50 text-amber-600 rounded-lg md:rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  Legal & Safety Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Passport Number</Label>
                    <Input 
                      value={formData.passport} 
                      onChange={e => setFormData({...formData, passport: e.target.value})} 
                      placeholder="Enter passport number" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Issuing Country</Label>
                    <Input 
                      value={formData.issuingCountry} 
                      onChange={e => setFormData({...formData, issuingCountry: e.target.value})} 
                      placeholder="Country of issue" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Passport Expiry Date</Label>
                    <Input 
                      value={formData.passportExpiry} 
                      onChange={e => setFormData({...formData, passportExpiry: e.target.value})} 
                      type="date" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Travel Insurance Policy</Label>
                    <Input 
                      value={formData.insurance} 
                      onChange={e => setFormData({...formData, insurance: e.target.value})} 
                      placeholder="Provider & Policy Number" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Account Password (Create/Login)</Label>
                  <Input 
                    autoComplete="new-password" 
                    value={formData.password} 
                    onChange={e => setFormData({...formData, password: e.target.value})} 
                    type="password" 
                    placeholder="Enter password to secure and access your booking" 
                    className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-3 md:px-4 text-sm md:text-base" 
                  />
                  <p className="text-[10px] md:text-[11px] font-medium text-slate-400 pt-1 flex items-center justify-end">
                    Don&apos;t have an account? <a href="/signup" target="_blank" className="text-sky-600 font-bold ml-1 hover:underline">Sign Up</a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Health, Mobility & Dietary Restrictions</Label>
                  <textarea 
                    value={formData.health} 
                    onChange={e => setFormData({...formData, health: e.target.value})} 
                    rows={2} 
                    placeholder="Any allergies, mobility issues, or special diet needs?" 
                    className="w-full rounded-lg md:rounded-xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-sky-500 transition-all px-3 md:px-4 py-2 md:py-3 outline-none resize-none text-slate-900 text-sm md:text-base" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Section */}
            <Card className="border-none shadow-sm bg-white rounded-2xl md:rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-5 md:p-8 border-b border-slate-50">
                <CardTitle className="text-lg md:text-xl font-bold flex items-center gap-3">
                  <div className="h-8 w-8 md:h-10 md:w-10 bg-indigo-50 text-indigo-600 rounded-lg md:rounded-xl flex items-center justify-center">
                    <CreditCard className="h-4 w-4 md:h-5 md:w-5" />
                  </div>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <Button variant="outline" className="h-16 md:h-20 rounded-xl md:rounded-2xl border-2 border-sky-600 bg-sky-50/30 flex flex-col items-center justify-center gap-1">
                    <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-sky-600" />
                    <span className="text-xs font-bold text-sky-900">Credit Card</span>
                  </Button>
                  <Button variant="outline" className="h-16 md:h-20 rounded-xl md:rounded-2xl border-slate-200 flex flex-col items-center justify-center gap-1 hover:border-slate-300">
                    <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-4 md:h-5" alt="PayPal"
                   width={100} height={100} />
                    <span className="text-xs font-bold text-slate-500">PayPal</span>
                  </Button>
                </div>

                <div className="space-y-3 md:space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Card Number</Label>
                    <Input 
                      value={formData.cardNumber} 
                      onChange={e => setFormData({...formData, cardNumber: e.target.value})} 
                      placeholder="**** **** **** 4242" 
                      className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 text-sm md:text-base" 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3 md:gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expiry Date</Label>
                      <Input 
                        value={formData.cardExpiry} 
                        onChange={e => setFormData({...formData, cardExpiry: e.target.value})} 
                        placeholder="MM / YY" 
                        className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 text-sm md:text-base" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">CVC</Label>
                      <Input 
                        value={formData.cardCvc} 
                        onChange={e => setFormData({...formData, cardCvc: e.target.value})} 
                        placeholder="***" 
                        className="h-10 md:h-12 rounded-lg md:rounded-xl bg-slate-50/50 border-slate-100 text-sm md:text-base" 
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary - Desktop */}
          <div className="hidden lg:block lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-2xl md:rounded-[2.5rem] overflow-hidden">
                <div className="h-32 md:h-40 relative">
                  <Image src={tour.image} alt={tour.title || tour.name || 'Tour image'} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                  <div className="absolute bottom-3 md:bottom-4 left-4 md:left-6">
                    <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-sky-400 mb-1">{tour.location}</p>
                    <h3 className="text-base md:text-xl font-bold line-clamp-2">{tour.title || tour.name}</h3>
                  </div>
                </div>
                <CardContent className="p-5 md:p-8 space-y-4 md:space-y-6">
                  <div className="space-y-3 md:space-y-4">
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-400 font-medium">Passengers</span>
                      <span className="font-black text-sm md:text-base">{passengers} x {formatCurrency(tour.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs md:text-sm">
                      <span className="text-slate-400 font-medium">Taxes & Fees</span>
                      <span className="font-black text-emerald-400 text-xs md:text-sm">Included</span>
                    </div>
                    <div className="pt-3 md:pt-4 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-500">Total Price</p>
                        <p className="text-2xl md:text-3xl font-black text-white">{formatCurrency(passengers * tour.price)}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-white/20" />
                    </div>
                  </div>

                  <Button 
                    disabled={isSubmitting || !isFormValid}
                    onClick={handleBooking}
                    className={`w-full h-12 md:h-14 ${!isFormValid ? 'bg-slate-300 cursor-not-allowed opacity-70' : 'bg-sky-600 hover:bg-sky-500 shadow-xl shadow-sky-900/50'} text-white rounded-xl md:rounded-2xl font-black text-base md:text-lg transition-all`}
                  >
                    {isSubmitting ? 'Processing...' : !isFormValid ? 'Fill Required Details' : 'Confirm & Pay'}
                  </Button>
                  
                  <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/10">
                    <ShieldCheck className="h-4 w-4 md:h-5 md:w-5 text-emerald-400" />
                    <p className="text-[9px] md:text-[11px] font-medium leading-tight text-slate-300">
                      Your payment is secured with 256-bit SSL encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 md:p-6 rounded-xl md:rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-3 md:gap-4">
                <Info className="h-4 w-4 md:h-5 md:w-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-[10px] md:text-xs font-semibold text-sky-800 leading-relaxed">
                  By confirming this booking, you agree to our Terms of Service and Cancellation Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Order Summary Modal/Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}>
          <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] overflow-y-auto animate-slide-up" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-slate-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-lg">Order Summary</h3>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)} className="rounded-full">
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="p-5 space-y-5">
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-2xl overflow-hidden">
                <div className="h-32 relative">
                  <Image src={tour.image} alt={tour.title || tour.name || 'Tour image'} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                  <div className="absolute bottom-3 left-4">
                    <p className="text-[8px] font-black uppercase tracking-widest text-sky-400 mb-1">{tour.location}</p>
                    <h3 className="text-sm font-bold line-clamp-2">{tour.title || tour.name}</h3>
                  </div>
                </div>
                <CardContent className="p-5 space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Passengers</span>
                      <span className="font-black">{passengers} x {formatCurrency(tour.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Taxes & Fees</span>
                      <span className="font-black text-emerald-400 text-xs">Included</span>
                    </div>
                    <div className="pt-3 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Price</p>
                        <p className="text-2xl font-black text-white">{formatCurrency(passengers * tour.price)}</p>
                      </div>
                      <ChevronRight className="h-5 w-5 text-white/20" />
                    </div>
                  </div>

                  <Button
                    disabled={isSubmitting || !isFormValid}
                    onClick={() => {
                      handleBooking();
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full h-12 ${!isFormValid ? 'bg-slate-300 cursor-not-allowed opacity-70' : 'bg-sky-600 hover:bg-sky-500'} text-white rounded-xl font-black text-base transition-all`}
                  >
                    {isSubmitting ? 'Processing...' : !isFormValid ? 'Fill Required Details' : 'Confirm & Pay'}
                  </Button>
                  
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <p className="text-[10px] font-medium leading-tight text-slate-300">
                      Your payment is secured with 256-bit SSL encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-4 rounded-xl bg-sky-50 border border-sky-100 flex items-start gap-3">
                <Info className="h-4 w-4 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-[10px] font-semibold text-sky-800 leading-relaxed">
                  By confirming this booking, you agree to our Terms of Service and Cancellation Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}