'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Offset for fixed navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-white tracking-tight">
              Quest<span className="text-blue-500">Tours</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-blue-400 transition-colors text-sm font-medium">
              Home
            </Link>
            <a 
              href="#tours" 
              onClick={(e) => handleScroll(e, 'tours')}
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium cursor-pointer"
            >
              Tours
            </a>
            <a 
              href="#destinations" 
              onClick={(e) => handleScroll(e, 'destinations')}
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium cursor-pointer"
            >
              Destinations
            </a>
            <a 
              href="#categories" 
              onClick={(e) => handleScroll(e, 'categories')}
              className="text-white hover:text-blue-400 transition-colors text-sm font-medium cursor-pointer"
            >
              Categories
            </a>
            <Link href="/about" className="text-white hover:text-blue-400 transition-colors text-sm font-medium">
              About
            </Link>
            <Link href="/blog" className="text-white hover:text-blue-400 transition-colors text-sm font-medium">
              Blog
            </Link>
            <Link href="/contact" className="text-white hover:text-blue-400 transition-colors text-sm font-medium">
              Contact
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/signup?role=agent">
              <Button variant="ghost" className="text-white hover:text-blue-400 font-medium">
                Become an Agent
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="text-white hover:bg-white/10 font-medium">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-900/20">
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
          <div className="md:hidden bg-black/90 backdrop-blur-xl border-t border-white/10 py-6 px-4 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
            <Link
              href="/"
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a
              href="#tours"
              onClick={(e) => handleScroll(e, 'tours')}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Tours
            </a>
            <a
              href="#destinations"
              onClick={(e) => handleScroll(e, 'destinations')}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Destinations
            </a>
            <a
              href="#categories"
              onClick={(e) => handleScroll(e, 'categories')}
              className="block text-white text-lg hover:text-blue-400 transition-colors py-2 cursor-pointer"
            >
              Categories
            </a>
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

