'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import {
  ShieldCheck, HeartPulse, Luggage, Clock, CheckCircle2, ArrowRight,
  Star, Phone, MessageCircle, ChevronDown, ChevronUp, Globe, Users, Zap
} from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Image from 'next/image';
import Link from 'next/link';

const benefits = [
  {
    icon: HeartPulse,
    title: 'Medical Emergencies',
    desc: 'Up to ₹50 Lakhs coverage for unexpected medical expenses, hospitalization, and medical evacuation abroad.',
    color: 'bg-rose-50 text-rose-600',
    highlight: '₹50L cover',
  },
  {
    icon: Luggage,
    title: 'Loss of Baggage',
    desc: 'Get compensated for lost, stolen or damaged luggage and personal belongings during your trip.',
    color: 'bg-blue-50 text-blue-600',
    highlight: '₹1L cover',
  },
  {
    icon: Clock,
    title: 'Trip Cancellation',
    desc: 'Protection against last-minute flight cancellations, delays, and trip curtailments due to unforeseen events.',
    color: 'bg-amber-50 text-amber-600',
    highlight: '₹5L cover',
  },
  {
    icon: ShieldCheck,
    title: 'COVID-19 Protection',
    desc: 'Special coverage for COVID-19 related medical expenses, hospitalization, and mandatory quarantine costs.',
    color: 'bg-indigo-50 text-indigo-600',
    highlight: '₹10L cover',
  },
  {
    icon: Globe,
    title: 'Worldwide Assistance',
    desc: '24/7 multilingual emergency helpline that connects you to local hospitals and support across 150+ countries.',
    color: 'bg-emerald-50 text-emerald-600',
    highlight: '150+ countries',
  },
  {
    icon: Users,
    title: 'Family Floater Plans',
    desc: 'One policy that covers your entire family — spouse, children, and parents — at significantly reduced premiums.',
    color: 'bg-purple-50 text-purple-600',
    highlight: 'Whole family',
  },
];

const plans = [
  {
    name: 'Silver Shield',
    price: '₹499',
    duration: 'per trip',
    color: 'from-slate-700 to-slate-900',
    accentColor: 'text-slate-300',
    badge: null,
    features: [
      'Medical cover up to ₹10 Lakhs',
      'Trip cancellation ₹50,000',
      'Baggage loss ₹25,000',
      'Emergency evacuation',
      '24/7 helpline',
    ],
  },
  {
    name: 'Gold Shield',
    price: '₹899',
    duration: 'per trip',
    color: 'from-blue-600 to-indigo-700',
    accentColor: 'text-blue-200',
    badge: 'Most Popular',
    features: [
      'Medical cover up to ₹30 Lakhs',
      'Trip cancellation ₹2 Lakhs',
      'Baggage loss ₹75,000',
      'Emergency evacuation',
      'COVID-19 coverage',
      'Adventure sports cover',
      '24/7 priority helpline',
    ],
  },
  {
    name: 'Platinum Shield',
    price: '₹1,499',
    duration: 'per trip',
    color: 'from-amber-600 to-orange-700',
    accentColor: 'text-amber-200',
    badge: 'Premium',
    features: [
      'Medical cover up to ₹50 Lakhs',
      'Trip cancellation ₹5 Lakhs',
      'Baggage loss ₹1 Lakh',
      'Emergency evacuation',
      'COVID-19 coverage',
      'Adventure sports cover',
      'Pre-existing conditions',
      'Home burglary cover',
      'Concierge services',
    ],
  },
];

const faqs = [
  {
    q: 'When should I buy travel insurance?',
    a: 'Ideally, purchase travel insurance as soon as you book your trip. Buying early ensures you\'re covered for pre-departure cancellations and get the full benefit of the policy duration.',
  },
  {
    q: 'Are pre-existing medical conditions covered?',
    a: 'Pre-existing conditions are covered under our Platinum Shield plan with proper medical documentation. Silver and Gold plans cover acute onset emergencies of pre-existing conditions.',
  },
  {
    q: 'How do I file a claim?',
    a: 'Claims can be filed online through our portal, by calling our 24/7 helpline, or via email. Keep all receipts, medical reports, and police reports (for theft) handy for faster processing.',
  },
  {
    q: 'Does the insurance cover adventure sports?',
    a: 'Gold and Platinum Shield plans include coverage for non-professional adventure sports like trekking, skiing, scuba diving, and more. Extreme motorsports are excluded.',
  },
  {
    q: 'What is the claims settlement rate?',
    a: 'QuestTours Insurance has a 98.2% claims settlement rate. Most claims are settled within 7 working days after submission of all required documents.',
  },
];

const testimonials = [
  {
    name: 'Sarah Jenkins',
    location: 'Switzerland Tour',
    avatar: 'SJ',
    rating: 5,
    text: 'We had a medical emergency in Switzerland and QuestTours Insurance covered everything — hospital bills, evacuation, and even hotel stay. Truly a lifesaver!',
  },
  {
    name: 'Rohan Mehta',
    location: 'Europe Backpacker',
    avatar: 'RM',
    rating: 5,
    text: 'My luggage was lost in Frankfurt. Filed a claim online at midnight, got confirmation by morning, and received compensation within 5 days. Incredible service!',
  },
  {
    name: 'Priya Nair',
    location: 'Bali Family Trip',
    avatar: 'PN',
    rating: 5,
    text: 'Our flight was cancelled due to a cyclone. The trip cancellation cover refunded us fully. QuestTours Insurance gave us peace of mind throughout.',
  },
];

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 last:border-none">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-6 text-left group"
      >
        <span className="font-black text-slate-900 group-hover:text-blue-600 transition-colors pr-4">{faq.q}</span>
        {open
          ? <ChevronUp size={20} className="text-blue-600 shrink-0" />
          : <ChevronDown size={20} className="text-slate-400 group-hover:text-blue-600 shrink-0 transition-colors" />
        }
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-40 pb-6' : 'max-h-0'}`}>
        <p className="text-slate-500 leading-relaxed">{faq.a}</p>
      </div>
    </div>
  );
}

export default function InsurancePage() {
  return (
    <main className="min-h-screen bg-[#F2F7FA]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-52 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-[#F2F7FA]" />

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 h-72 w-72 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 h-48 w-48 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center space-y-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5">
            <ShieldCheck size={14} className="text-blue-400" />
            <span className="text-white/90 text-xs font-bold tracking-widest uppercase">IRDA Approved Partner</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tight leading-none">
            Travel With<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Complete</span>{' '}
            Peace of Mind
          </h1>
          <p className="text-slate-300 text-lg lg:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Comprehensive travel insurance covering medical emergencies, trip cancellations, baggage loss, and more — starting at just ₹499.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white px-10 h-14 rounded-2xl font-black text-lg shadow-2xl shadow-blue-600/30 hover:shadow-blue-500/40 hover:scale-105 transition-all">
              Get a Free Quote
            </Button>
            <button className="flex items-center gap-2 text-white/80 hover:text-white font-bold transition-colors">
              <Phone size={18} />
              Talk to an Expert
            </button>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center justify-center gap-8 pt-8">
            {[
              { value: '98.2%', label: 'Claims Settled' },
              { value: '5 Lakhs+', label: 'Travelers Insured' },
              { value: '150+', label: 'Countries Covered' },
              { value: '24/7', label: 'Emergency Support' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-slate-400 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section className="relative z-20 -mt-24 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-[2.5rem] bg-gradient-to-br ${plan.color} p-8 text-white shadow-2xl overflow-hidden group hover:-translate-y-2 transition-transform duration-300`}
            >
              {/* Decorative blob */}
              <div className="absolute -top-10 -right-10 h-40 w-40 bg-white/10 rounded-full blur-2xl" />

              {plan.badge && (
                <div className="absolute top-6 right-6 bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                  {plan.badge}
                </div>
              )}

              <h3 className={`text-sm font-black uppercase tracking-[0.2em] ${plan.accentColor} mb-3`}>{plan.name}</h3>
              <div className="flex items-end gap-1 mb-1">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className={`text-sm font-bold ${plan.accentColor} mb-1.5`}>/{plan.duration}</span>
              </div>
              <p className={`text-xs ${plan.accentColor} uppercase tracking-widest font-bold mb-8`}>Per person</p>

              <div className="space-y-3 mb-8">
                {plan.features.map(f => (
                  <div key={f} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-white/70" />
                    <span className="text-sm font-semibold text-white/90 leading-snug">{f}</span>
                  </div>
                ))}
              </div>

              <button className="w-full py-3.5 bg-white/20 hover:bg-white/30 backdrop-blur rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105">
                Buy {plan.name}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-32 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Coverage Details</span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            Everything You Need,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Covered</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            From medical emergencies to missing flights — our comprehensive policies ensure you&apos;re never left stranded.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/5 transition-all group hover:-translate-y-1 duration-300"
            >
              <div className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-6 ${benefit.color} group-hover:scale-110 transition-transform`}>
                <benefit.icon size={26} />
              </div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-black text-slate-900">{benefit.title}</h4>
                <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">{benefit.highlight}</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Hero Visual + CTA */}
      <section className="py-8 max-w-7xl mx-auto px-4">
        <div className="rounded-[3rem] overflow-hidden bg-slate-900 relative min-h-[500px] flex items-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488085061387-422e29b40080?w=1600&q=80')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />

          <div className="relative z-10 p-12 lg:p-20 max-w-2xl space-y-8">
            <div className="space-y-4">
              <span className="text-blue-400 font-black text-[10px] uppercase tracking-[0.3em]">Claim Support 24/7</span>
              <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight">
                Need Help? We&apos;re<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Always Here.</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed">
                Our dedicated insurance team is available around the clock to assist with claims, documentation, and emergency support wherever you are.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button className="bg-white text-slate-900 hover:bg-slate-100 px-8 h-13 rounded-2xl font-black">
                <Phone size={18} className="mr-2" />
                1800-QUEST-INS
              </Button>
              <Button variant="ghost" className="border border-white/20 text-white hover:bg-white/10 px-8 h-13 rounded-2xl font-black">
                <MessageCircle size={18} className="mr-2" />
                Live Chat
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-2">
              {['Instant Claim Filing', 'Track Claim Status', 'Document Upload'].map(feat => (
                <div key={feat} className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                  <Zap size={14} className="text-blue-400" />
                  {feat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Traveler Stories</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
            Real People.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Real Claims.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-white p-8 rounded-[2rem] border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all">
              <div className="flex items-center gap-1 mb-6">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-slate-600 leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-black">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-black text-slate-900 text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs font-bold">{t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 pb-24 max-w-4xl mx-auto px-4">
        <div className="text-center space-y-4 mb-12">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">Common Questions</span>
          <h2 className="text-4xl lg:text-5xl font-black text-slate-900">
            Frequently Asked{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">Questions</span>
          </h2>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-slate-100 px-8 shadow-xl shadow-slate-100">
          {faqs.map(faq => (
            <FAQItem key={faq.q} faq={faq} />
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-slate-500 mb-4">Still have questions?</p>
          <Link href="/contact">
            <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 h-13 rounded-2xl font-black">
              Contact Our Insurance Team <ArrowRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
