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
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Card, CardContent, CardHeader, CardTitle} from '@/components/ui/display/card';
import { Input } from '@/components/ui/inputs/input';
import { Label } from '@/components/ui/inputs/label';
import { toast } from 'sonner';
import Image from 'next/image';
import { useUser } from '@/hooks/use-user';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id;
  
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success

  const { user } = useUser();
  const [formData, setFormData] = useState({
    salutation: '', fullName: '', dob: '', gender: '', nationality: '', email: '', whatsapp: '',
    arrival: '', departure: '', passport: '', issuingCountry: '', passportExpiry: '', insurance: '',
    cardNumber: '', cardExpiry: '', cardCvc: '',
    accommodation: '', health: '', adults: 1, children: 0, infants: 0, password: ''
  });
  
  const requiredFields = [
    'salutation', 'fullName', 'dob', 'gender', 'nationality', 'email', 'whatsapp', 
    'arrival', 'departure', 'passport', 'issuingCountry', 'passportExpiry', 
    'insurance', 'cardNumber', 'cardExpiry', 'cardCvc', 'password'
  ] as const;
  
  const isFormValid = requiredFields.every(key => String(formData[key]).trim() !== '');

  const tour = (tours as unknown as Tour[]).find((t: Tour) => t.id.toString() === tourId);

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

      // Auto-login the user into their session
      if (data.token && data.user) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        window.dispatchEvent(new Event('storage'));
      }

      // Keep localStorage for instant UI feedback on the dashboard
      const newBooking = {
        id: `BK-${Math.floor(Math.random() * 1000) + 200}`,
        tour: tour.title || tour.name,
        status: 'Confirmed',
        date: new Date().toISOString().split('T')[0],
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
    } catch (err: any) {
      console.error('Booking Error:', err);
      toast.error('Booking Failed', { description: err.message || 'Could not connect to the server.' });
      setIsSubmitting(false);
    }
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center px-4 pt-32 pb-12">
          <Card className="max-w-md w-full border-none shadow-2xl rounded-[3rem] p-8 text-center bg-white ring-1 ring-slate-100">
            <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-bounce">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Booking Confirmed!</h2>
            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
              Your adventure to <strong>{tour.location}</strong> is officially on the calendar. We&apos;ve sent the confirmation and itinerary to your email.
            </p>
            <div className="space-y-4">
              <Button 
                onClick={() => {
                  if (user) {
                    router.push('/dashboard/customer/bookings');
                  } else {
                    router.push('/login');
                  }
                }}
                className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold"
              >
                View My Bookings
              </Button>
              <Button 
                variant="ghost"
                onClick={() => router.push('/')}
                className="w-full h-14 text-slate-500 hover:text-slate-900 font-bold"
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
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12 w-full">
        <div className="flex items-center gap-4 mb-10">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="rounded-xl h-12 w-12 p-0 bg-white shadow-sm ring-1 ring-slate-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-black text-slate-900">Complete Your Booking</h1>
            <p className="text-slate-500 font-medium">Verify your details and secure your spot.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Forms */}
          <div className="lg:col-span-8 space-y-8">
            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="h-10 w-10 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center">
                    <Users className="h-5 w-5" />
                  </div>
                  Personal & Identification Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Salutation *</Label>
                    <select value={formData.salutation} onChange={e => setFormData({...formData, salutation: e.target.value})} className="h-12 w-full rounded-xl bg-slate-50/50 border border-slate-100 px-4 focus:bg-white focus:border-sky-500 transition-all outline-none text-slate-900">
                      <option value="">Select...</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Legal Name *</Label>
                    <Input value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} placeholder="As it appears on your passport" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Date of Birth *</Label>
                    <Input value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} type="date" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Gender *</Label>
                    <select value={formData.gender} onChange={e => setFormData({...formData, gender: e.target.value})} className="h-12 w-full rounded-xl bg-slate-50/50 border border-slate-100 px-4 focus:bg-white focus:border-sky-500 transition-all outline-none text-slate-900">
                      <option value="">Select...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Nationality *</Label>
                    <Input value={formData.nationality} onChange={e => setFormData({...formData, nationality: e.target.value})} placeholder="Country of Residence" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address *</Label>
                    <Input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="you@example.com" type="email" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">WhatsApp Number *</Label>
                    <Input value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} placeholder="+1 234 567 8900" type="tel" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <Map className="h-5 w-5" />
                  </div>
                  Itinerary & Service Specifics
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">Total Group Size</p>
                    <p className="text-xs text-slate-500 font-medium font-mono">Max: {tour.groupSize}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-lg h-10 w-10 border-slate-200"
                      onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    > - </Button>
                    <span className="text-xl font-black w-8 text-center">{passengers}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="rounded-lg h-10 w-10 border-slate-200"
                      onClick={() => setPassengers(passengers + 1)}
                    > + </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expected Arrival Date *</Label>
                    <Input value={formData.arrival} onChange={e => setFormData({...formData, arrival: e.target.value})} type="date" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expected Departure Date *</Label>
                    <Input value={formData.departure} onChange={e => setFormData({...formData, departure: e.target.value})} type="date" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Adults *</Label>
                    <Input value={formData.adults} onChange={e => setFormData({...formData, adults: parseInt(e.target.value) || 0})} type="number" min={1} className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Children</Label>
                    <Input value={formData.children} onChange={e => setFormData({...formData, children: parseInt(e.target.value) || 0})} type="number" min={0} className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Infants</Label>
                    <Input value={formData.infants} onChange={e => setFormData({...formData, infants: parseInt(e.target.value) || 0})} type="number" min={0} className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Accommodation & Bed Preferences</Label>
                  <textarea value={formData.accommodation} onChange={e => setFormData({...formData, accommodation: e.target.value})} rows={2} placeholder="E.g., Queen bed, high floor, crib required" className="w-full rounded-xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-sky-500 transition-all px-4 py-3 outline-none resize-none text-slate-900" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="h-10 w-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  Legal & Safety Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Passport Number *</Label>
                    <Input value={formData.passport} onChange={e => setFormData({...formData, passport: e.target.value})} placeholder="Enter passport number" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Issuing Country *</Label>
                    <Input value={formData.issuingCountry} onChange={e => setFormData({...formData, issuingCountry: e.target.value})} placeholder="Country of issue" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Passport Expiry Date *</Label>
                    <Input value={formData.passportExpiry} onChange={e => setFormData({...formData, passportExpiry: e.target.value})} type="date" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Travel Insurance Policy *</Label>
                    <Input value={formData.insurance} onChange={e => setFormData({...formData, insurance: e.target.value})} placeholder="Provider & Policy Number" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Account Password (Create/Login) *</Label>
                  <Input autoComplete="new-password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} type="password" placeholder="Enter password to secure and access your booking" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all px-4" />
                  <p className="text-[11px] font-medium text-slate-400 pt-1 flex items-center justify-end">
                    Don't have an account? <a href="/signup" target="_blank" className="text-sky-600 font-bold ml-1 hover:underline">Sign Up</a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Health, Mobility & Dietary Restrictions</Label>
                  <textarea value={formData.health} onChange={e => setFormData({...formData, health: e.target.value})} rows={2} placeholder="Any allergies, mobility issues, or special diet needs?" className="w-full rounded-xl bg-slate-50/50 border border-slate-100 focus:bg-white focus:border-sky-500 transition-all px-4 py-3 outline-none resize-none text-slate-900" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-white rounded-[2rem] overflow-hidden ring-1 ring-slate-100">
              <CardHeader className="p-8 border-b border-slate-50">
                <CardTitle className="text-xl font-bold flex items-center gap-3">
                  <div className="h-10 w-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <CreditCard className="h-5 w-5" />
                  </div>
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 rounded-2xl border-2 border-sky-600 bg-sky-50/30 flex flex-col items-center justify-center gap-1">
                    <CreditCard className="h-6 w-6 text-sky-600" />
                    <span className="text-xs font-bold text-sky-900">Credit Card</span>
                  </Button>
                  <Button variant="outline" className="h-20 rounded-2xl border-slate-200 flex flex-col items-center justify-center gap-1 hover:border-slate-300">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" className="h-5" alt="PayPal" />
                    <span className="text-xs font-bold text-slate-500">PayPal</span>
                  </Button>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Card Number</Label>
                    <Input value={formData.cardNumber} onChange={e => setFormData({...formData, cardNumber: e.target.value})} placeholder="**** **** **** 4242" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expiry Date</Label>
                      <Input value={formData.cardExpiry} onChange={e => setFormData({...formData, cardExpiry: e.target.value})} placeholder="MM / YY" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">CVC</Label>
                      <Input value={formData.cardCvc} onChange={e => setFormData({...formData, cardCvc: e.target.value})} placeholder="***" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-6">
              <Card className="border-none shadow-xl bg-slate-900 text-white rounded-[2.5rem] overflow-hidden">
                <div className="h-40 relative">
                  <Image src={tour.image} alt={tour.title || tour.name} fill className="object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                  <div className="absolute bottom-4 left-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-1">{tour.location}</p>
                    <h3 className="text-xl font-bold">{tour.title || tour.name}</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Passengers</span>
                      <span className="font-black">{passengers} x {formatCurrency(tour.price)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Taxes & Fees</span>
                      <span className="font-black text-emerald-400">Included</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Price</p>
                        <p className="text-3xl font-black text-white">{formatCurrency(passengers * tour.price)}</p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-white/20" />
                    </div>
                  </div>

                  <Button 
                    disabled={isSubmitting || !isFormValid}
                    onClick={handleBooking}
                    className={`w-full h-14 ${!isFormValid ? 'bg-slate-300 cursor-not-allowed opacity-70' : 'bg-sky-600 hover:bg-sky-500 shadow-xl shadow-sky-900/50'} text-white rounded-2xl font-black text-lg transition-all`}
                  >
                    {isSubmitting ? 'Processing...' : !isFormValid ? 'Fill Required Details' : 'Confirm & Pay'}
                  </Button>
                  
                  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                    <ShieldCheck className="h-5 w-5 text-emerald-400" />
                    <p className="text-[11px] font-medium leading-tight text-slate-300">
                      Your payment is secured with 256-bit SSL encryption.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="p-6 rounded-2xl bg-sky-50 border border-sky-100 flex items-start gap-4">
                <Info className="h-5 w-5 text-sky-600 shrink-0 mt-0.5" />
                <p className="text-xs font-semibold text-sky-800 leading-relaxed">
                  By confirming this booking, you agree to our Terms of Service and Cancellation Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
