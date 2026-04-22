'use client';

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 sm:mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              Quest<span className="text-blue-500">Tours</span>
            </h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Discover the beauty of India with our curated travel experiences. We partner with local experts to bring you the most authentic adventures.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Quest Tours ,GTS No. 1663,Shop No1,Bhavani Chambers,Ramkhind Galli Belgaum-590001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>0831-2407073</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>enquiries@questtours.in</span>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Press</a></li>
            </ul>
          </div>

          {/* Tours */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Tours</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Popular Destinations</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Adventure Tours</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Luxury Packages</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Group Tours</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-bold text-white">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8 sm:my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4">
          <p className="text-sm text-gray-400">
            © 2026 QuestTours. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Instagram size={20} />
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
