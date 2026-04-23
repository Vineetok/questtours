import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 bg-gradient-to-r from-blue-600 to-cyan-600 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80"
            alt="Travel background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Our Journey
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            We believe that travel is not just about seeing new places, but about experiencing new ways of life.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 lg:py-24 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-6">
              <span className="text-blue-500 font-bold text-sm uppercase tracking-widest">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#003B5C]">
                Crafting Unforgettable Experiences Since 2010
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                QuestTours started with a simple idea: to make authentic, premium travel experiences accessible to everyone. We meticulously curate every package, partnering with local experts to ensure you don&apos;t just visit a destination—you truly experience it.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Whether you&apos;re looking for a romantic honeymoon escape, a thrilling adventure, or a relaxing family getaway, our dedicated team is here to handle every detail so you can focus on making memories.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-gray-200">
                <div>
                  <h4 className="text-4xl font-black text-[#003B5C]">15K+</h4>
                  <p className="text-gray-500 font-medium">Happy Travelers</p>
                </div>
                <div>
                  <h4 className="text-4xl font-black text-[#003B5C]">50+</h4>
                  <p className="text-gray-500 font-medium">Global Destinations</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
