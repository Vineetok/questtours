'use client';

import { DollarSign, CheckCircle, Lock, Clock } from 'lucide-react';

const features = [
  {
    id: 1,
    icon: DollarSign,
    title: 'Best Price Guarantee',
    description: 'We guarantee the lowest prices on all travel packages and tours worldwide.',
  },
  {
    id: 2,
    icon: CheckCircle,
    title: 'Verified Agents',
    description: 'All our agents are thoroughly vetted and verified for quality assurance.',
  },
  {
    id: 3,
    icon: Lock,
    title: 'Secure Payments',
    description: 'Your payments are 100% secure with industry-leading encryption technology.',
  },
  {
    id: 4,
    icon: Clock,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to help you.',
  },
];

export function Features() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="text-lg text-gray-600 text-balance">
            Experience the difference with our premium travel services
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="p-6 sm:p-8 bg-gradient-to-br from-gray-50 to-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-blue-200"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
