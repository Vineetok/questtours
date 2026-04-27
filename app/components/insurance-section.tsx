'use client';

import React from 'react';
import { ShieldCheck,  CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Image from 'next/image';
import Link from 'next/link';

export function InsuranceSection() {
  return (
    <section id="insurance" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="bg-gradient-to-br from-blue-50 via-white to-indigo-100 rounded-[3rem] overflow-hidden relative p-8 lg:p-16">
            {/* Background Decorative Elements */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-[url('/tours/insurance-bg.png')] bg-cover bg-center opacity-20 hidden lg:block" />
<div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/40 to-transparent" />          
          <div className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Content */}
            <div className="flex-1 space-y-8 text-center lg:text-left">
              <div className="space-y-4">
                <span className="text-blue-400 font-black text-xs uppercase tracking-[0.3em]">Peace of Mind</span>
<h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
                    Don&apos;t Let The <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Unexpected</span> <br />
                  Stop Your Journey.
                </h2>
                <p className="text-slate-600 text-lg max-w-xl mx-auto lg:mx-0">
                  QuestTours Travel Insurance ensures that you are protected against every uncertainty, from medical emergencies to trip delays.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
                <Link href="/insurance">
                  <Button className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 h-14 rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30">
                    Explore Insurance Plans
                  </Button>
                </Link>
<div className="flex items-center gap-3 text-slate-700 font-bold">
                    <ShieldCheck className="text-blue-400" />
                  IRDA Approved Partner
                </div>
              </div>
            </div>

            {/* Right: Visual Card */}
            <div className="flex-1 relative hidden lg:block">
              <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700">
                <Image
                  src="/tours/insurance-card.png" 
                  alt="Travel Insurance" 
                  width={600}
                  height={400}
                  style={{ width: '100%', height: '400px' }}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
              
              {/* Floating Testimonial */}
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-[2rem] shadow-2xl border border-slate-100 max-w-[240px]">
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-8 w-8 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="font-black text-slate-900 text-xs uppercase tracking-widest">Verified Claim</div>
                </div>
                <p className="text-[10px] text-slate-500 italic leading-relaxed">
                  &ldquo;They covered our medical bills in Switzerland instantly. Truly a lifesaver!&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

