'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Destinations } from '@/components/destinations';

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/tours/destinations-bg.png')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Explore All Destinations
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            From the snow-capped peaks of the North to the serene backwaters of the South, discover the diverse beauty of India.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <Destinations showAll={true} />
      </div>

      {/* Stats Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Destinations', value: '50+' },
              { label: 'Local Guides', value: '200+' },
              { label: 'Happy Travelers', value: '10k+' },
              { label: 'Safety Rating', value: '4.9/5' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
