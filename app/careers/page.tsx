'use client';

import { Navbar } from '../components/navbar';
import { Footer } from '../components/footer';
import { Briefcase, Heart, Rocket, Users, CheckCircle, Mail, MapPin, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function CareersPage() {
  const perks = [
    {
      icon: <Heart className="text-pink-500" />,
      title: "Passion Driven",
      desc: "We are passionate about travel and making every journey a life-changing experience."
    },
    {
      icon: <Rocket className="text-blue-500" />,
      title: "Fast-Paced",
      desc: "Thrive in an innovative environment where ideas turn into reality at lightning speed."
    },
    {
      icon: <Users className="text-emerald-500" />,
      title: "Humble Team",
      desc: "Work with rock stars who are both ambitious and down-to-earth."
    },
    {
      icon: <Star className="text-orange-500" />,
      title: "Career Growth",
      desc: "Excellent opportunities for candidates with 2+ years of relevant experience."
    }
  ];

  const jobs = [
    {
      title: "Travel Consultant",
      type: "Full Time",
      location: "Belgaum / Pune",
      experience: "2+ Years"
    },
    {
      title: "Tour Manager",
      type: "Full Time / Seasonal",
      location: "On-Field (Pan India)",
      experience: "3+ Years"
    },
    {
      title: "Marketing Specialist",
      type: "Full Time",
      location: "Hybrid",
      experience: "2+ Years"
    }
  ];

  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-50 overflow-hidden pt-40">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
                <Briefcase size={16} /> Careers at Quest
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight tracking-tight">
                Join Our <span className="text-blue-600">Adventure</span>
              </h1>
              <p className="text-slate-600 text-xl font-medium leading-relaxed max-w-xl">
                We're hiring amazing people. Come join us and help travelers discover the world in a whole new light.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="#openings">
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-blue-900/20">
                    View Openings
                  </button>
                </Link>
                <div className="flex items-center gap-3 px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-slate-500 font-bold text-sm">Actively Hiring</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl"></div>
              <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white">
                <Image 
                  src="/about/careers.jpg"
                  alt="Join Quest Tours"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Perks Section */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">Why Quest Tours?</h2>
            <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto">
              We are passionate, innovative, and fun. We exude our core company values in everything we do.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {perk.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{perk.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Openings & CTA Combined Section */}
      <section id="openings" className="py-24 px-4 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Left: Openings (6 columns) */}
            <div className="lg:col-span-6 space-y-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4 text-center lg:text-left">Current Openings</h2>
                <p className="text-slate-600 font-medium text-lg text-center lg:text-left">Find your next challenge in the world of travel.</p>
              </div>
              
              <div className="space-y-6">
                {jobs.map((job, i) => (
                  <div key={i} className="group bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl transition-all cursor-pointer">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-slate-500 text-sm font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-2"><Clock size={16} className="text-blue-600" /> {job.type}</span>
                        <span className="flex items-center gap-2"><MapPin size={16} className="text-emerald-600" /> {job.location}</span>
                        <span className="flex items-center gap-2"><Briefcase size={16} className="text-orange-500" /> {job.experience}</span>
                      </div>
                    </div>
                    <Link href="/contact">
                      <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-black text-xs uppercase tracking-widest transition-all shadow-lg shadow-blue-900/20">
                        Apply Now
                      </button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: CTA (5 columns) */}
            <div className="lg:col-span-5 h-full">
              <div className="bg-blue-50/80 border border-blue-100 rounded-[3rem] p-8 md:p-12 text-center relative overflow-hidden h-full flex flex-col justify-center">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                <div className="relative z-10 space-y-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto">
                    <Mail size={32} className="text-blue-600" />
                  </div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tight">Ready to join our team?</h2>
                  <p className="text-slate-500 font-medium leading-relaxed">
                    If you are humble, ambitious, and thrive in a fast-paced environment, we'd love to get to know you.
                  </p>
                  <div className="pt-4">
                    <p className="text-blue-600 text-xs font-black uppercase tracking-[0.2em] mb-4">Send your updated profile to</p>
                    <a href="mailto:hr@questtours.in" className="text-xl md:text-2xl font-black text-slate-900 hover:text-blue-600 transition-colors block break-all">
                      hr@questtours.in
                    </a>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-bold bg-slate-100 w-fit mx-auto px-4 py-2 rounded-full mt-4">
                    <CheckCircle size={14} className="text-emerald-500" /> 2+ Years Experience Required
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
