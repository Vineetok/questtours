'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { TravelCategories } from '@/components/travel-categories';

export default function CategoriesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&h=400&fit=crop')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 to-slate-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6">
            Travel by Style
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Whether you're looking for a romantic getaway or a thrilling adventure, find the perfect category for your next trip.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <TravelCategories />
      </div>

      <Footer />
    </main>
  );
}
