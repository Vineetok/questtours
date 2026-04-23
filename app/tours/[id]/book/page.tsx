'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { tours } from '@/lib/mock-data';
import { 
  ArrowLeft,
  Users, 
  Calendar,
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Info,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/display/card';
import { Input } from '@/components/ui/inputs/input';
import { Label } from '@/components/ui/inputs/label';
import { toast } from 'sonner';

export default function BookingPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params.id;
  
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1); // 1: Details, 2: Payment, 3: Success

  const tour = tours.find(t => t.id === tourId);

  if (!tour) return null;

  const handleBooking = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(3);
      toast.success('Wait! Booking confirmed!', {
        description: `Pack your bags for ${tour.location}!`,
      });
    }, 2000);
  };

  if (step === 3) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4">
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
                onClick={() => router.push('/dashboard/customer/bookings')}
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
      
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
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
                  Traveler Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="space-y-0.5">
                    <p className="font-bold text-slate-900">Number of Travelers</p>
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
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Main Contact Name</Label>
                    <Input placeholder="John Traveler" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Email Address</Label>
                    <Input placeholder="john@example.com" type="email" className="h-12 rounded-xl bg-slate-50/50 border-slate-100 focus:bg-white transition-all" />
                  </div>
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
                    <Input placeholder="**** **** **** 4242" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">Expiry Date</Label>
                      <Input placeholder="MM / YY" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-xs font-black uppercase tracking-widest text-slate-400">CVC</Label>
                      <Input placeholder="***" className="h-12 rounded-xl bg-slate-50/50 border-slate-100" />
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
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900" />
                  <div className="absolute bottom-4 left-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-sky-400 mb-1">{tour.location}</p>
                    <h3 className="text-xl font-bold">{tour.title}</h3>
                  </div>
                </div>
                <CardContent className="p-8 space-y-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Passengers</span>
                      <span className="font-black">{passengers} x Rs. {tour.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-400 font-medium">Taxes & Fees</span>
                      <span className="font-black text-emerald-400">Included</span>
                    </div>
                    <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Total Price</p>
                        <p className="text-3xl font-black text-white">Rs. {(passengers * tour.price).toLocaleString()}</p>
                      </div>
                      <ChevronRight className="h-6 w-6 text-white/20" />
                    </div>
                  </div>

                  <Button 
                    disabled={isSubmitting}
                    onClick={handleBooking}
                    className="w-full h-14 bg-sky-600 hover:bg-sky-500 text-white rounded-2xl font-black text-lg transition-all shadow-xl shadow-sky-900/50"
                  >
                    {isSubmitting ? 'Processing...' : 'Confirm & Pay'}
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
