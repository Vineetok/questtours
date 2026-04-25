'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, MapPin, Plane } from 'lucide-react';
import { Menu, X, ChevronDown, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const pathname = usePathname();
  const [isToursOpen, setIsToursOpen] = useState(false);
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

  // Prevent hydration mismatch by not rendering until mounted on client
  if (!mounted) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10 h-16 sm:h-20" />
    );
  }

  const internationalTours = [
    'Japan', 'Dubai', 'Singapore Thailand Malaysia', 'Europe', 'Egypt', 
    'Australia Newzealand', 'Veitnaam', 'Malaysia Hongkong', 
    'Srilanka & Maldives', 'Bhutan', 'Nepal'
  ];

  const domesticTours = [
    'Andaman', 'Darjeeling Gangtok Pelling', 'Gujarat', 'Himachal Pradesh', 
    'Karnataka', 'Kashmir', 'Kerala', 'Madhya Pradesh', 'Rajasthan', 
    'Tamilnadu', 'Uttaranchal', 'North East', 'Pilgrims Tours', 
    'Andhra Pradesh', 'West Bengal & Sikkim', 'Orrisa'
  ];

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
            
            {/* Tours with Mega Menu */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsToursOpen(true)}
              onMouseLeave={() => setIsToursOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors text-base font-medium h-full">
                Tours <ChevronDown size={16} className={`transition-transform duration-200 ${isToursOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega Menu Dropdown */}
              <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ${
                isToursOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
              }`}>
                <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden min-w-[500px] flex p-8 gap-12">
                  {/* International Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2 text-sky-600 font-black text-xs uppercase tracking-widest mb-6">
                      <Globe size={14} /> International Tours
                    </h3>
                    <div className="grid gap-3">
                      {internationalTours.map((tour) => (
                        <Link 
                          key={tour} 
                          href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                          className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-semibold"
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Domestic Column */}
                  <div className="flex-1">
                    <h3 className="flex items-center gap-2 text-emerald-600 font-black text-xs uppercase tracking-widest mb-6">
                      <MapPin size={14} /> Domestic Tours
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {domesticTours.map((tour) => (
                        <Link 
                          key={tour} 
                          href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                          className="text-slate-600 hover:text-emerald-600 transition-colors text-sm font-semibold"
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Link 
              href="/destinations" 
              className="text-white hover:text-blue-400 transition-colors text-base font-medium cursor-pointer"
            >
              Destinations
            </Link>

            {/* Gallery Dropdown */}
            <div 
              className="relative group h-full flex items-center"
              onMouseEnter={() => setIsGalleryOpen(true)}
              onMouseLeave={() => {
                setIsGalleryOpen(false);
                setIsDomesticOpen(false);
              }}
            >
              <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors text-base font-medium h-full">
                Gallery <ChevronDown size={16} className={`transition-transform duration-200 ${isGalleryOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                isGalleryOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
              }`}>
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 min-w-[240px] p-4 flex flex-col gap-2">
                  {galleryOptions.map((option) => (
                    <div key={option.name} className="relative group/sub">
                      {option.hasSubmenu ? (
                        <div 
                          className="flex items-center justify-between text-slate-600 hover:text-sky-600 transition-colors text-sm font-semibold p-2 hover:bg-slate-50 rounded-lg cursor-pointer"
                          onMouseEnter={() => {
                            // Reset other menus
                            setIsDomesticOpen(false);
                            setIsInternationalOpen(false);
                            option.setState?.(true);
                          }}
                        >
                          {option.name} <ChevronDown size={14} className="-rotate-90" />
                          
                          {/* Nested Sub-menu */}
                          <div className={`absolute top-0 left-full pl-4 w-[220px] transition-all duration-200 ${
                            option.state ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-2 invisible'
                          }`}>
                            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 flex flex-col gap-2">
                              {option.categories?.map((cat) => (
                                <Link 
                                  key={cat.name} 
                                  href={cat.href}
                                  className="text-slate-600 hover:text-sky-600 transition-colors text-xs font-bold p-2 hover:bg-slate-50 rounded-lg"
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
                          className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-semibold p-2 hover:bg-slate-50 rounded-lg block"
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

            <Link 
              href="/categories" 
              className="text-white hover:text-blue-400 transition-colors text-base font-medium cursor-pointer"
            >
              Categories
            </Link>
            {/* About Dropdown */}
            <div 
              className="relative h-full"
              onMouseEnter={() => setIsAboutOpen(true)}
              onMouseLeave={() => setIsAboutOpen(false)}
            >
              <button className="flex items-center gap-1 text-white hover:text-blue-400 transition-colors text-base font-medium h-full">
                About <ChevronDown size={16} className={`transition-transform duration-200 ${isAboutOpen ? 'rotate-180' : ''}`} />
              </button>

              <div className={`absolute top-full left-0 pt-2 transition-all duration-300 ${
                isAboutOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-4 invisible'
              }`}>
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 min-w-[200px] p-4 flex flex-col gap-2">
                  {aboutOptions.map((option) => (
                    <Link 
                      key={option.name} 
                      href={option.href}
                      className="text-slate-600 hover:text-sky-600 transition-colors text-sm font-semibold p-2 hover:bg-slate-50 rounded-lg block"
                      onClick={() => setIsAboutOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors text-base font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2 ml-auto flex-shrink-0">
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-auto">
            <Link href="/signup?role=agent">
              <button className="px-4 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
              <Button variant="ghost" className="text-white hover:text-blue-400 font-medium text-sm lg:text-base">
                Become an Agent
              </button>
            </Link>
            <Link href="/login">
              <button className="px-4 py-2 text-sm font-bold text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-200">
              <Button variant="ghost" className="text-white hover:bg-white/10 font-medium text-sm lg:text-base">
                Login
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-5 py-2.5 text-sm font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-200 hover:scale-105">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-900/20 text-sm lg:text-base px-6">
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
        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 py-6 px-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300 max-h-[80vh] overflow-y-auto">
            <Link
              href="/"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Tours with Sub-menu */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsToursOpen(!isToursOpen)}
                className="flex items-center justify-between w-full text-white text-lg hover:text-blue-400 transition-colors py-2"
              >
                Tours <ChevronDown size={18} className={isToursOpen ? 'rotate-180' : ''} />
              </button>
              
              {isToursOpen && (
                <div className="pl-4 space-y-4 py-2 border-l border-white/10 ml-2">
                  <div>
                    <h4 className="text-sky-400 text-xs font-black uppercase tracking-widest mb-3">International</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {internationalTours.map(tour => (
                        <Link 
                          key={tour} 
                          href={`/tours?type=international&location=${encodeURIComponent(tour)}`}
                          className="text-slate-300 text-sm hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-3">Domestic</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {domesticTours.map(tour => (
                        <Link 
                          key={tour} 
                          href={`/tours?type=domestic&location=${encodeURIComponent(tour)}`}
                          className="text-slate-300 text-sm hover:text-white"
                          onClick={() => setIsOpen(false)}
                        >
                          {tour}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/destinations"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Destinations
            </Link>

            {/* Mobile Gallery with Sub-menu */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsGalleryOpen(!isGalleryOpen)}
                className="flex items-center justify-between w-full text-white text-lg hover:text-blue-400 transition-colors py-2"
              >
                Gallery <ChevronDown size={18} className={isGalleryOpen ? 'rotate-180' : ''} />
              </button>
              
              {isGalleryOpen && (
                <div className="pl-4 space-y-4 py-2 border-l border-white/10 ml-2 flex flex-col">
                  {galleryOptions.map((option) => (
                    <div key={option.name} className="space-y-2">
                      {option.hasSubmenu ? (
                        <>
                          <button 
                            onClick={() => option.setState?.(!option.state)}
                            className="flex items-center justify-between w-full text-slate-300 text-sm hover:text-white py-1"
                          >
                            {option.name} <ChevronDown size={14} className={option.state ? 'rotate-180' : ''} />
                          </button>
                          {option.state && (
                            <div className="pl-4 space-y-2 border-l border-white/5 ml-2 flex flex-col">
                              {option.categories?.map((cat) => (
                                <Link 
                                  key={cat.name} 
                                  href={cat.href}
                                  className="text-slate-400 text-xs hover:text-white py-1 font-bold"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link 
                          href={option.href}
                          className="text-slate-300 text-sm hover:text-white py-1"
                          onClick={() => setIsOpen(false)}
                        >
                          {option.name}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

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
            {/* Mobile About with Sub-menu */}
            <div className="space-y-2">
              <button 
                onClick={() => setIsAboutOpen(!isAboutOpen)}
                className="flex items-center justify-between w-full text-white text-lg hover:text-blue-400 transition-colors py-2"
              >
                About <ChevronDown size={18} className={isAboutOpen ? 'rotate-180' : ''} />
              </button>
              
              {isAboutOpen && (
                <div className="pl-4 space-y-4 py-2 border-l border-white/10 ml-2 flex flex-col">
                  {aboutOptions.map((option) => (
                    <Link 
                      key={option.name} 
                      href={option.href}
                      className="text-slate-300 text-sm hover:text-white py-1"
                      onClick={() => setIsOpen(false)}
                    >
                      {option.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/contact"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

