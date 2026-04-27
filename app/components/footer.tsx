'use client';

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <>
      {/* CTA Banner placed right above the footer */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-12 sm:py-16 relative overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-white blur-3xl"></div>
          <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full bg-[#003B5C] blur-3xl translate-x-1/2 -translate-y-1/2"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Plan Your Dream Trip Today
          </h2>

          <p className="text-blue-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-6 sm:mb-8 font-medium px-4">
            Get up to 30% off on selected packages. Book now and create memories that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
            <Link 
              href="#plans" 
              className="flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 bg-white text-[#003B5C] rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto justify-center group"
            >
              Explore Packages
              <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="/contact" 
              className="px-6 sm:px-8 py-3 sm:py-3.5 bg-[#003B5C] text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl w-full sm:w-auto text-center hover:bg-[#004a6e]"
            >
              Talk to Expert
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-8 sm:mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <Link href="/" className="block w-fit">
                <Image
                  src="/logo.png"
                  alt="QuestTours"
                  width={160}
                  height={48}
                  className="h-12 sm:h-14 lg:h-16 w-auto object-contain"
                  priority={false}
                />
              </Link>
              <p className="text-sm leading-relaxed text-gray-400">
                Discover the beauty of India with our curated travel experiences. We partner with local experts to bring you the most authentic adventures.
              </p>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <MapPin size={18} className="flex-shrink-0 mt-0.5 text-gray-400" />
                  <span className="text-gray-400 text-xs sm:text-sm">
                    Quest Tours 1st Floor, Lokmanya Multi-purpose Co-op Soc. Ltd., Near Kesari wada, Narayan Peth, Pune-411030
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={18} className="flex-shrink-0 text-gray-400" />
                  <a href="tel:+919019394696" className="hover:text-blue-400 transition-colors">
                    +91 - 90193 94696
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="flex-shrink-0 text-gray-400" />
                  <a href="mailto:enquiry@questtours.in" className="hover:text-blue-400 transition-colors">
                    enquiry@questtours.in
                  </a>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg">Company</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
                <li><Link href="/press" className="hover:text-blue-400 transition-colors">Press</Link></li>
              </ul>
            </div>

            {/* Tours */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg">Tours</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/tours?category=popular" className="hover:text-blue-400 transition-colors">Popular Destinations</Link></li>
                <li><Link href="/tours?category=adventure" className="hover:text-blue-400 transition-colors">Adventure Tours</Link></li>
                <li><Link href="/tours?category=luxury" className="hover:text-blue-400 transition-colors">Luxury Packages</Link></li>
                <li><Link href="/tours?category=group" className="hover:text-blue-400 transition-colors">Group Tours</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg">Support</h4>
              <ul className="space-y-2.5 text-sm">
                <li><Link href="/help" className="hover:text-blue-400 transition-colors">Help Center</Link></li>
                <li><Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 my-8 sm:my-12" />

          {/* Bottom Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} QuestTours. All rights reserved.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-5">
              <Link 
                href="https://facebook.com/questtours" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </Link>
              <Link 
                href="https://twitter.com/questtours" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </Link>
              <Link 
                href="https://instagram.com/questtours" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </Link>
              <Link 
                href="https://linkedin.com/company/questtours" 
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}