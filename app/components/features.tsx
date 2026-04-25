'use client';

import { DollarSign, CheckCircle, Lock, Clock } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'We guarantee the lowest prices on all travel packages and tours worldwide.',
  },
  {
    id: 2,
    icon: CheckCircle,
    title: 'Verified Agents',
    description: 'All our agents are thoroughly vetted and verified for quality assurance.',
  },
  {
    id: 3,
    icon: Lock,
    title: 'Secure Payments',
    description: 'Your payments are 100% secure with industry-leading encryption technology.',
  },
  {
    id: 4,
    icon: Clock,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help you.',
  },
];

export function Features() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
            Our Excellence
          </span>
          <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">QuestTours?</span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Experience the difference with our premium travel services and dedicated support.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-8 bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 hover:border-blue-200 group hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
