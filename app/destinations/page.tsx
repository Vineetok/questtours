'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Destinations } from '@/components/destinations';

export default function DestinationsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />


      {/* Main Content */}
      <div className="bg-white pt-24">
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
