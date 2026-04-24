'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
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
          <div className="hidden md:flex items-center gap-4 lg:gap-8 ml-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors md:text-sm lg:text-base font-medium">
              Home
            </Link>
            <Link 
              href="/tours" 
              className="text-white hover:text-blue-400 transition-colors text-base font-medium cursor-pointer"
            >
              Tours
            </Link>
            <Link 
              href="/destinations" 
              className="text-white hover:text-blue-400 transition-colors text-base font-medium cursor-pointer"
            >
              Destinations
            </Link>
            <Link 
              href="/categories" 
              className="text-white hover:text-blue-400 transition-colors text-base font-medium cursor-pointer"
            >
              Categories
            </Link>
            <Link href="/about" className="text-white hover:text-blue-400 transition-colors md:text-sm lg:text-base font-medium">
              About
            </Link>
            <Link href="/blog" className="text-white hover:text-blue-400 transition-colors md:text-sm lg:text-base font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors md:text-sm lg:text-base font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3 lg:gap-6 flex-shrink-0 ml-auto">
            <Link href="/login">
              <Button className="bg-blue-600/20 hover:bg-blue-600/40 text-white border border-blue-400/30 font-medium md:text-sm lg:text-base backdrop-blur-sm">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-900/20 md:text-sm lg:text-base">
                Sign Up
              </Button>
            </Link>
            <Link href="/signup?role=agent">
              <Button className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium shadow-lg shadow-indigo-900/20 md:text-sm lg:text-base">
                Become a Partner
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
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 py-6 px-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tours"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Tours
            </Link>
            <Link
              href="/destinations"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Destinations
            </Link>
            <Link
              href="/categories"
              onClick={() => setIsOpen(false)}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Categories
            </Link>
            <Link
              href="/about"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <Link href="/login" className="w-full" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-blue-600/20 hover:bg-blue-600/40 text-white border border-blue-400/30 justify-center h-12">
                  Login
                </Button>
              </Link>
              <Link href="/signup" className="w-full" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white h-12">
                  Sign Up
                </Button>
              </Link>
              <Link href="/signup?role=agent" className="w-full" onClick={() => setIsOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white h-12">
                  Become a Partner
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}