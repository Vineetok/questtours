'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, MapPin, Plane } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setIsToursOpen(false);
  }, [pathname]);

  const internationalTours = [
    'Japan', 'Dubai', 'Singapore Thailand Malaysia', 'Europe', 'Egypt',
    'Australia Newzealand', 'Vietnam', 'Malaysia Hongkong',
    'Srilanka & Maldives', 'Bhutan', 'Nepal'
  ];

  const domesticTours = [
    'Andaman', 'Darjeeling Gangtok Pelling', 'Gujarat', 'Himachal Pradesh',
    'Karnataka', 'Kashmir', 'Kerala', 'Madhya Pradesh', 'Rajasthan',
    'Tamilnadu', 'Uttaranchal', 'North East', 'Pilgrims Tours',
    'Andhra Pradesh', 'West Bengal & Sikkim', 'Orrisa'
  ];

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/categories', label: 'Categories' },
    // { href: '/trains', label: 'Trains' },
    // { href: '/buses', label: 'Buses' },
    // { href: '/insurance', label: 'Insurance' },
    { href: '/about', label: 'About' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-black/30 border-b border-white/5'
        : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-[70px]">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Plane size={18} className="text-white -rotate-45" />
            </div>
            <span className="text-xl font-black text-white tracking-tight">
              Quest<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tours</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-10 flex-1">
            <Link
              href="/"
              className={`relative px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                isActive('/')
                  ? 'text-white bg-white/10'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              Home
            </Link>

            {/* Tours Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsToursOpen(true)}
              onMouseLeave={() => setIsToursOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                Tours
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isToursOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-300 ${
                isToursOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-3 pointer-events-none'
              }`}>
                <div className="bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl shadow-black/20 border border-slate-100 overflow-hidden min-w-[520px] flex p-8 gap-10">
                  {/* International Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-[0.25em] mb-5">
                      <div className="h-6 w-6 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Globe size={12} className="text-blue-600" />
                      </div>
                      International
                    </h3>
                    <div className="space-y-2.5">
                      {internationalTours.map((tour) => (
                        <Link
                          key={tour}
                          href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-600 hover:text-blue-600 text-sm font-semibold transition-colors leading-snug"
                          onClick={() => setIsToursOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-slate-100" />

                  {/* Domestic Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.25em] mb-5">
                      <div className="h-6 w-6 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <MapPin size={12} className="text-emerald-600" />
                      </div>
                      Domestic
                    </h3>
                    <div className="space-y-2.5">
                      {domesticTours.map((tour) => (
                        <Link
                          key={tour}
                          href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-600 hover:text-emerald-600 text-sm font-semibold transition-colors leading-snug"
                          onClick={() => setIsToursOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Rest of nav links */}
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-bold rounded-xl transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 ml-auto flex-shrink-0">
            <Link href="/signup?role=agent">
              <button className="px-4 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                Become an Agent
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2.5 text-sm font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 hover:scale-105">
                Sign Up
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden ml-auto text-white p-2 rounded-xl hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
        isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-slate-950/98 backdrop-blur-2xl border-t border-white/5 px-4 py-5 space-y-1 overflow-y-auto max-h-[80vh]">
          <Link
            href="/"
            className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
              isActive('/') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            Home
          </Link>

          {/* Mobile Tours Accordion */}
          <div>
            <button
              onClick={() => setIsToursOpen(!isToursOpen)}
              className="flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
            >
              Tours
              <ChevronDown size={16} className={`transition-transform duration-300 ${isToursOpen ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 overflow-hidden ${isToursOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
              <div className="px-4 py-3 ml-2 border-l border-white/10 space-y-4">
                <div>
                  <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-2">🌏 International</p>
                  <div className="space-y-2">
                    {internationalTours.map(tour => (
                      <Link
                        key={tour}
                        href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                        className="block text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                      >
                        {tour}
                      </Link>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest mb-2">📍 Domestic</p>
                  <div className="space-y-2">
                    {domesticTours.map(tour => (
                      <Link
                        key={tour}
                        href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                        className="block text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                      >
                        {tour}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile nav links */}
          {navLinks.slice(1).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                isActive(link.href) ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA Buttons */}
          <div className="pt-4 border-t border-white/5 space-y-2">
            <Link href="/signup?role=agent" className="block">
              <button className="w-full px-4 py-3 rounded-xl text-sm font-bold text-blue-400 hover:bg-white/5 border border-blue-500/30 hover:border-blue-400/50 transition-all">
                Become an Agent
              </button>
            </Link>
            <Link href="/login" className="block">
              <button className="w-full px-4 py-3 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-all">
                Login
              </button>
            </Link>
            <Link href="/signup" className="block">
              <button className="w-full px-4 py-3 rounded-xl text-sm font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
