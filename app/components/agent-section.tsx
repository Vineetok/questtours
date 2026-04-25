'use client';

import { Button } from '@/components/ui/inputs/button';
import Link from 'next/link';

export function AgentSection() {
  return (
    <section id="agent" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
                Partner With Us
              </span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
                Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Travel Agent</span>
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed">
                Turn your passion for travel into a profitable business. Earn commissions by listing and promoting your tours on our platform.
              </p>
            </div>

            <div className="space-y-4">
              {['Flexible schedule', 'Unlimited earning potential', 'Marketing support', 'Admin dashboard'].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{item}</span>
                </div>
              ))}
            </div>

            <Link href="/signup?role=agent">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-xl w-full sm:w-auto">
                Join as Agent
              </Button>
            </Link>
          </div>

          {/* Right Image */}
          <div className="relative h-80 sm:h-96 lg:h-full lg:min-h-96 rounded-2xl overflow-hidden shadow-xl">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: 'url(/agent-bg.png)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

