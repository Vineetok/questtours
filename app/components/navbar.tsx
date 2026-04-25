'use client';

import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isToursOpen, setIsToursOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isDomesticOpen, setIsDomesticOpen] = useState(false);
  const [isInternationalOpen, setIsInternationalOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-[#003B5C] shadow-lg' 
        : 'bg-black/40 backdrop-blur-md border-b border-white/10'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              Quest<span className="text-blue-500">Tours</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 lg:gap-12 ml-12">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors text-base font-medium">
              Home
            </Link>
            
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
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 ml-auto">
            <Link href="/signup?role=agent">
              <Button variant="ghost" className="text-white hover:text-blue-400 font-medium text-sm lg:text-base">
                Become an Agent
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 font-medium text-sm lg:text-base">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-900/20 text-sm lg:text-base px-6">
                Sign Up
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Categories
            </Link>
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
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link href="/signup?role=agent" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-blue-400 hover:bg-white/10 justify-center h-12">
                  Become an Agent
                </Button>
              </Link>
              <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                <Button variant="ghost" className="w-full text-white hover:bg-white/10 justify-center h-12">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

