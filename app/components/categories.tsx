'use client';

import { Landmark, Compass, Waves, Mountain, Camera } from 'lucide-react';

const categories = [
  { id: 1, name: 'Heritage', icon: Landmark },
  { id: 2, name: 'Spiritual', icon: Compass },
  { id: 3, name: 'Beaches', icon: Waves },
  { id: 4, name: 'Mountains', icon: Mountain },
  { id: 5, name: 'Wildlife', icon: Camera },
];

import { toast } from 'sonner';

export function Categories() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Explore by Category
          </h2>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.id}
                onClick={() => toast.info(`Filtering tours for ${category.name}...`, {
                  description: "This feature will be available once we connect the backend!",
                })}
                className="group flex flex-col items-center justify-center p-6 sm:p-8 bg-white rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer border border-transparent hover:border-blue-100"
              >
                <Icon className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                <p className="text-center font-semibold text-gray-900 text-sm sm:text-base">
                  {category.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
