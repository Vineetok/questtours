'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, MapPin, Plane } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/inputs/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const pathname = usePathname();
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
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
  ];

  const isActive = (href: string) => pathname === href;

  // Prevent hydration mismatch by not rendering until mounted on client
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 h-16 sm:h-20" />
    );
  }

  const domesticGalleryCategories = [
    { name: 'All Photos', href: '/gallery/domestic' },
    { name: 'Kashmir', href: '/gallery/domestic?category=Kashmir' },
    { name: 'Rajasthan', href: '/gallery/domestic?category=Rajasthan' },
    { name: 'Leh Ladakh', href: '/gallery/domestic?category=Ladakh' },
    { name: 'Andaman', href: '/gallery/domestic?category=Andaman' },
    { name: 'Madhya Pradesh', href: '/gallery/domestic?category=Madhya%20Pradesh' },
    { name: 'Shimla & Manali', href: '/gallery/domestic?category=Shimla%20%26%20Manali' },
    { name: 'Kashi Gaya Prayag', href: '/gallery/domestic?category=Kashi' },
    { name: 'Delhi & Agra', href: '/gallery/domestic?category=Delhi' }
  ];

  const internationalGalleryCategories = [
    { name: 'All Photos', href: '/gallery/international' },
    { name: 'Europe & Scandinavia', href: '/gallery/international?category=Europe' },
    { name: 'South East Asia', href: '/gallery/international?category=Asia' },
    { name: 'Dubai & Middle East', href: '/gallery/international?category=Dubai' },
    { name: 'Island Getaways', href: '/gallery/international?category=Islands' },
    { name: 'Exotic Destinations', href: '/gallery/international?category=Exotic' }
  ];

  const galleryOptions = [
    { name: 'Domestic Gallery', href: '/gallery/domestic', hasSubmenu: true, categories: domesticGalleryCategories, state: isDomesticOpen, setState: setIsDomesticOpen },
    { name: 'International Gallery', href: '/gallery/international', hasSubmenu: true, categories: internationalGalleryCategories, state: isInternationalOpen, setState: setIsInternationalOpen },
  ];

  const aboutOptions = [
    { name: 'About Us', href: '/about' },
    { name: 'Careers', href: '/careers' },
    { name: 'Latest News', href: '/news' },
    { name: 'Testimonials', href: '/testimonials' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled
        ? 'bg-slate-950/95 backdrop-blur-2xl shadow-2xl shadow-black/30 border-b border-white/5'
        : 'bg-gradient-to-b from-black/50 to-transparent backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 flex-shrink-0 group hover:opacity-80 transition-opacity duration-200"
          >
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow">
              <Plane size={20} className="text-white -rotate-45" />
            </div>
            <span className="text-lg font-black text-white tracking-tight leading-none">
              Quest<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Tours</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                  isActive(link.href)
                    ? 'text-white bg-white/10'
                    : 'text-white/75 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Tours Mega Menu */}
            <div
              className="relative"
              onMouseEnter={() => setIsToursOpen(true)}
              onMouseLeave={() => setIsToursOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                Tours
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isToursOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Mega Menu */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${
                isToursOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'
              }`}>
                <div className="bg-white/98 backdrop-blur-2xl rounded-2xl shadow-2xl shadow-black/20 border border-slate-100 overflow-hidden min-w-[560px] flex p-10 gap-12">
                  {/* International Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2.5 text-blue-600 font-black text-[11px] uppercase tracking-[0.3em] mb-6 pb-3 border-b border-blue-100">
                      <div className="h-6 w-6 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Globe size={13} className="text-blue-600" />
                      </div>
                      International
                    </h3>
                    <div className="space-y-3">
                      {internationalTours.map((tour) => (
                        <Link
                          key={tour}
                          href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-700 hover:text-blue-600 text-sm font-semibold transition-colors duration-150 leading-relaxed"
                          onClick={() => setIsToursOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="w-px bg-slate-200" />

                  {/* Domestic Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2.5 text-emerald-600 font-black text-[11px] uppercase tracking-[0.3em] mb-6 pb-3 border-b border-emerald-100">
                      <div className="h-6 w-6 bg-emerald-50 rounded-lg flex items-center justify-center">
                        <MapPin size={13} className="text-emerald-600" />
                      </div>
                      Domestic
                    </h3>
                    <div className="space-y-3">
                      {domesticTours.map((tour) => (
                        <Link
                          key={tour}
                          href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-700 hover:text-emerald-600 text-sm font-semibold transition-colors duration-150 leading-relaxed"
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

            {/* Gallery Dropdown */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={() => setIsGalleryOpen(true)}
              onMouseLeave={() => {
                setIsGalleryOpen(false);
                setIsDomesticOpen(false);
                setIsInternationalOpen(false);
              }}
            >
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                Gallery 
                <ChevronDown size={14} className={`transition-transform duration-200 ${isGalleryOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 pt-3 transition-all duration-300 ${
                isGalleryOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'
              }`}>
                <div className="bg-white rounded-xl shadow-2xl border border-slate-100 min-w-[260px] p-2 flex flex-col gap-0.5">
                  {galleryOptions.map((option) => (
                    <div key={option.name} className="relative group/sub">
                      {option.hasSubmenu ? (
                        <div 
                          className="flex items-center justify-between text-slate-700 hover:text-sky-600 transition-colors text-sm font-semibold px-3 py-2.5 hover:bg-slate-50 rounded-lg cursor-pointer"
                          onMouseEnter={() => {
                            setIsDomesticOpen(false);
                            setIsInternationalOpen(false);
                            option.setState?.(true);
                          }}
                        >
                          {option.name} <ChevronDown size={14} className="-rotate-90" />
                          
                          {/* Nested Sub-menu */}
                          <div className={`absolute top-0 left-full pl-2 w-[240px] transition-all duration-200 ${
                            option.state ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'
                          }`}>
                            <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2 flex flex-col gap-0.5">
                              {option.categories?.map((cat) => (
                                <Link 
                                  key={cat.name} 
                                  href={cat.href}
                                  className="text-slate-700 hover:text-sky-600 transition-colors text-sm font-semibold px-3 py-2 hover:bg-slate-50 rounded-lg"
                                  onClick={() => {
                                    setIsGalleryOpen(false);
                                    option.setState?.(false);
                                  }}
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Link 
                          href={option.href}
                          className="text-slate-700 hover:text-sky-600 transition-colors text-sm font-semibold px-3 py-2.5 hover:bg-slate-50 rounded-lg block"
                          onMouseEnter={() => {
                            setIsDomesticOpen(false);
                            setIsInternationalOpen(false);
                          }}
                        >
                          {option.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* About Dropdown */}
            <div 
              className="relative h-full"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-bold text-white/75 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200">
                About 
                <ChevronDown size={14} className={`transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 pt-3 transition-all duration-300 ${
                isAboutOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-2 invisible'
              }`}>
                <div className="bg-white rounded-xl shadow-2xl border border-slate-100 min-w-[220px] p-2 flex flex-col gap-0.5">
                  {aboutOptions.map((option) => (
                    <Link 
                      key={option.name} 
                      href={option.href}
                      className="text-slate-700 hover:text-sky-600 transition-colors text-sm font-semibold px-3 py-2.5 hover:bg-slate-50 rounded-lg block"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Link */}
            <Link
              href="/contact"
              className={`relative px-4 py-2.5 text-sm font-bold rounded-lg transition-all duration-200 ${
                isActive('/contact')
                  ? 'text-white bg-white/10'
                  : 'text-white/75 hover:text-white hover:bg-white/10'
              }`}
            >
              Contact
            </Link>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href="/signup?role=agent">
              <Button variant="ghost" className="text-white/75 hover:text-white hover:bg-white/10 font-semibold text-sm px-4 py-2">
                Become an Agent
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white/75 hover:text-white hover:bg-white/10 font-semibold text-sm px-4 py-2">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-semibold shadow-lg shadow-blue-900/30 text-sm px-6 py-2 rounded-lg">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[85vh] opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-slate-950/98 backdrop-blur-2xl border-t border-white/5 px-4 py-6 space-y-1.5 overflow-y-auto max-h-[80vh]">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                  isActive(link.href) ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Tours Accordion */}
            <div className="space-y-2 pt-3">
              <button
                onClick={() => setIsToursOpen(!isToursOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Tours
                <ChevronDown size={16} className={`transition-transform duration-300 ${isToursOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`transition-all duration-300 overflow-hidden ${isToursOpen ? 'max-h-[600px]' : 'max-h-0'}`}>
                <div className="px-4 py-4 ml-2 border-l border-white/10 space-y-5">
                  <div>
                    <p className="text-blue-400 text-[11px] font-black uppercase tracking-widest mb-3">🌏 International</p>
                    <div className="space-y-2">
                      {internationalTours.map(tour => (
                        <Link
                          key={tour}
                          href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-emerald-400 text-[11px] font-black uppercase tracking-widest mb-3">📍 Domestic</p>
                    <div className="space-y-2">
                      {domesticTours.map(tour => (
                        <Link
                          key={tour}
                          href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                          className="block text-slate-400 hover:text-white text-sm font-semibold transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Gallery Accordion */}
            <div className="space-y-2 pt-3">
              <button
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                Gallery
                <ChevronDown size={16} className={`transition-transform duration-300 ${isGalleryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isGalleryOpen && (
                <div className="ml-4 pl-3 border-l border-white/10 space-y-1">
                  {galleryOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      className="block px-3 py-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About with Sub-menu */}
            <div className="space-y-2">
              <button
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              >
                About <ChevronDown size={16} className={`transition-transform duration-300 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAboutOpen && (
                <div className="ml-4 pl-3 border-l border-white/10 space-y-1">
                  {aboutOptions.map((option) => (
                    <Link
                      key={option.name}
                      href={option.href}
                      className="block px-3 py-2.5 text-sm font-semibold text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5"
                      onClick={() => setIsOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Contact Link */}
            <Link
              href="/contact"
              className={`block px-4 py-3 rounded-lg text-sm font-semibold transition-colors ${
                isActive('/contact') ? 'text-white bg-white/10' : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              Contact
            </Link>

            {/* Mobile CTA Buttons */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              <Link href="/signup?role=agent" className="block">
                <button className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-blue-400 hover:bg-white/5 border border-blue-500/30 hover:border-blue-400/50 transition-all">
                  Become an Agent
                </button>
              </Link>
              <Link href="/login" className="block">
                <button className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-all">
                  Login
                </button>
              </Link>
              <Link href="/signup" className="block">
                <button className="w-full px-4 py-3 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/20 transition-all">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
    </nav>
  )
  }