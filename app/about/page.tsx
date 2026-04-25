'use client';

import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Target, Users, Award, Shield, Heart, Globe, Quote, Camera, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 flex items-center justify-center bg-slate-50 pt-32">
        <div className="relative z-10 text-center px-4 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.4em] mb-6">
            <Sparkles size={16} /> Since 2012
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            Our <span className="text-blue-600">Story</span>
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            A journey of a thousand miles begins with a single step. For us, that step was a quest for perfection in every traveler's story.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-blue-500"></div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">The Philosophy</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                &quot;Quest&quot; means a <span className="text-blue-600">search for happiness.</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  In our busy lives, every soul is searching for something. We all are in quest of happiness and contentment. Some find bliss in the arms of loved ones, and some find it in snow-clad mountains bathed with the beauty of nature.
                </p>
                <p>
                  Whatever may be our channels of happiness, we all are seeking to quench our thirst. Life is a long journey, and everyone is searching for the ultimate happiness.
                </p>
              </div>
              <div className="flex items-center gap-6 pt-4">
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-slate-900">217+</span>
                  <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Branches</span>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-4xl font-black text-slate-900">50k+</span>
                  <span className="text-slate-500 font-bold text-sm uppercase tracking-wider">Happy Souls</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-emerald-500 rounded-[4rem] rotate-3 opacity-10"></div>
            <div className="relative h-full w-full rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white">
              <Image 
                src="/about/chairman.jpg"
                alt="Philosophy Image"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 max-w-xs hidden md:block">
              <Quote className="text-blue-500 mb-4" size={32} />
              <p className="text-slate-800 font-bold leading-relaxed mb-4">
                "Travel is not just seeing places. It's about soaking the inherent beauty of the place and its people."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100"></div>
                <div>
                  <p className="text-sm font-black text-slate-900">Quest Philosophy</p>
                  <p className="text-xs font-medium text-slate-500">Our Core Value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 bg-blue-50/50 border-y border-blue-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-black text-xs uppercase tracking-[0.4em] mb-2 block">Meet Our Visionaries</span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">The <span className="text-blue-600">Leadership</span> Team</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Kiran Thakur */}
            <div className="group relative">
              <div className="relative bg-white border border-blue-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden flex-shrink-0 border-2 border-slate-50">
                  <Image 
                    src="/about/chairman.jpg"
                    alt="Kiran Thakur"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Kiran Thakur</h3>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Founder Chairman</p>
                  </div>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    Group Chief & Editorial Advisor of Daily Tarun Bharat. Visionary behind Quest Tours.
                  </p>
                </div>
              </div>
            </div>

            {/* Prasad Patkar */}
            <div className="group relative">
              <div className="relative bg-white border border-blue-100 rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-2xl overflow-hidden flex-shrink-0 border-2 border-slate-50">
                  <Image 
                    src="/about/director.jpg"
                    alt="Prasad Patkar"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Prasad P. Patkar</h3>
                    <p className="text-blue-600 font-bold uppercase tracking-widest text-xs">Director</p>
                  </div>
                  <p className="text-slate-500 font-medium text-sm leading-relaxed">
                    Spearheading Quest Tours with focus on customer service and value.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History & Reach Section */}
      <section className="py-16 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="bg-blue-600 p-4 rounded-2xl w-fit mb-4 text-white group-hover:rotate-12 transition-transform">
                    <Globe size={28} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Wide Reach</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Operating from 217 branches across Maharashtra, Gujarat, Karnataka, Goa, and Delhi.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="bg-emerald-600 p-4 rounded-2xl w-fit mb-4 text-white group-hover:rotate-12 transition-transform">
                    <Shield size={28} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Transparency</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">We believe in complete transparency and no compromises in delivering the best travel experiences.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="bg-orange-500 p-4 rounded-2xl w-fit mb-4 text-white group-hover:rotate-12 transition-transform">
                    <Users size={28} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Expert Team</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Our staff of Tour Managers and polite support officials are our fine reputation&apos;s backbone.</p>
                </div>
                <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group">
                  <div className="bg-purple-600 p-4 rounded-2xl w-fit mb-4 text-white group-hover:rotate-12 transition-transform">
                    <Heart size={28} />
                  </div>
                  <h4 className="text-lg font-black text-slate-900 mb-2">Passion</h4>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed">Every heart wishes to explore new places and experience joy. We make it possible.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-8">
              <div className="inline-flex items-center gap-3">
                <div className="h-px w-12 bg-blue-500"></div>
                <span className="text-blue-600 font-black text-xs uppercase tracking-[0.3em]">Our Roots</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
                From Lokmanya to <span className="text-blue-600">Quest Tours</span>
              </h2>
              <div className="space-y-6 text-slate-600 text-lg leading-relaxed font-medium">
                <p>
                  Lokmanya Society was born from a concern for unemployed youth, growing into a multipurpose multi-state co-operative with 217 branches. 
                </p>
                <p>
                  Quest Tours takes that legacy forward into the exciting arena of travel and tourism. Since our inception, we have carved a niche owing to extensive research and understanding unmet expectations.
                </p>
                <p>
                  From air-bus-train travel to accommodation, from food to sightseeing, everything is well taken care of by our courteous and experienced staff.
                </p>
              </div>
              <Link href="/#tours">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20">
                  Explore Our Tours
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
