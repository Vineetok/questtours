'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { FeaturedTours } from '@/components/featured-tours';
import { Trophy, ShieldCheck, Headset } from 'lucide-react';

export default function ToursPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=400&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Our Tour Packages
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover carefully crafted journeys that offer the perfect blend of adventure, culture, and relaxation.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <FeaturedTours showAll={true} />
      </div>

      {/* Benefits Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#003B5C]">Why Choose QuestTours?</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">Experience the gold standard of travel with our commitment to quality, safety, and value.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { 
                title: 'Best Price Guarantee', 
                desc: 'Find a better price? We\'ll match it plus give you an extra 5% discount.',
                icon: Trophy 
              },
              { 
                title: 'Verified Agents', 
                desc: 'Every tour is operated by licensed and highly-rated local professionals.',
                icon: ShieldCheck 
              },
              { 
                title: '24/7 Support', 
                desc: 'Our travel experts are always available to help you during your journey.',
                icon: Headset 
              },
            ].map((benefit, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/10 transition-all duration-300 border border-gray-100 group">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="text-blue-600" size={28} />
                </div>
                <h3 className="text-xl font-bold text-[#003B5C] mb-3">{benefit.title}</h3>
                <p className="text-gray-500 leading-relaxed">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
