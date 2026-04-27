'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { MapPin, Maximize2, X, Filter, Camera } from 'lucide-react';
import Image from 'next/image';

const internationalGallery = [
  {
    category: "Europe & Scandinavia",
    id: "Europe",
    images: [
      { src: "/international_gallery/intl-1.jpg", alt: "European Landmark" },
      { src: "/international_gallery/intl-2.jpg", alt: "Swiss Alps" },
      { src: "/international_gallery/intl-3.jpg", alt: "Paris Eiffel Tower" },
      { src: "/international_gallery/intl-4.jpg", alt: "Scandinavia Fjords" },
      { src: "/international_gallery/intl-5.jpg", alt: "Venice Canals" },
      { src: "/international_gallery/intl-6.jpg", alt: "Rome Colosseum" }
    ]
  },
  {
    category: "South East Asia",
    id: "Asia",
    images: [
      { src: "/international_gallery/bali-1.jpg", alt: "Bali Temples" },
      { src: "/international_gallery/thailand-1.jpg", alt: "Thailand Special" },
      { src: "/international_gallery/tms-1.jpg", alt: "Singapore Cityscape" },
      { src: "/international_gallery/tms-2.jpg", alt: "Malaysia Petronas Towers" },
      { src: "/international_gallery/intl-7.jpg", alt: "Vietnam Bay" },
      { src: "/international_gallery/intl-8.jpg", alt: "Cambodia Angkor Wat" }
    ]
  },
  {
    category: "Dubai & Middle East",
    id: "Dubai",
    images: [
      { src: "/international_gallery/dubai-1.jpg", alt: "Dubai Burj Khalifa" },
      { src: "/international_gallery/intl-9.jpg", alt: "Desert Safari Dubai" },
      { src: "/international_gallery/intl-10.jpg", alt: "Dubai Marina" }
    ]
  },
  {
    category: "Island Getaways",
    id: "Islands",
    images: [
      { src: "/international_gallery/mauritius-1.jpg", alt: "Mauritius Beaches" },
      { src: "/international_gallery/srilanka-1.jpg", alt: "Sri Lanka Heritage" },
      { src: "/international_gallery/srilanka-2.jpg", alt: "Sri Lanka Nature" },
      { src: "/international_gallery/intl-11.jpg", alt: "Tropical Paradise" }
    ]
  },
  {
    category: "Exotic Destinations",
    id: "Exotic",
    images: [
      { src: "/international_gallery/bhutan-1.jpg", alt: "Bhutan Monasteries" },
      { src: "/international_gallery/hongkong-1.jpg", alt: "Hong Kong Skyline" },
      { src: "/international_gallery/intl-12.jpg", alt: "Japan Cherry Blossom" },
      { src: "/international_gallery/intl-13.jpg", alt: "Australia Great Barrier Reef" },
      { src: "/international_gallery/intl-14.jpg", alt: "New Zealand Landscapes" }
    ]
  },
  {
    category: "More Memories",
    id: "Other",
    images: [
      { src: "/international_gallery/intl-15.jpg", alt: "International Tour 1" },
      { src: "/international_gallery/intl-16.jpg", alt: "International Tour 2" },
      { src: "/international_gallery/intl-18.jpg", alt: "International Tour 3" },
      { src: "/international_gallery/intl-20.jpg", alt: "International Tour 4" },
      { src: "/international_gallery/intl-21.jpg", alt: "International Tour 5" },
      { src: "/international_gallery/intl-22.jpg", alt: "International Tour 6" },
      { src: "/international_gallery/intl-23.jpg", alt: "International Tour 7" },
      { src: "/international_gallery/intl-24.jpg", alt: "International Tour 8" }
    ]
  }
];

function GalleryContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredGallery = categoryFilter
    ? internationalGallery.filter(section => section.id.toLowerCase().includes(categoryFilter.toLowerCase()))
    : internationalGallery;

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      {/* Active Filter Indicator */}
      {categoryFilter && (
        <div className="mb-12 flex items-center gap-3 bg-white text-sky-600 px-6 py-4 rounded-3xl w-fit border border-sky-100 shadow-xl shadow-sky-900/5 animate-in fade-in slide-in-from-left-4 duration-500">
          <div className="bg-sky-600 p-2 rounded-xl">
            <Filter size={18} className="text-white" />
          </div>
          <span className="font-bold text-slate-800">Showing: <span className="text-sky-600 capitalize">{categoryFilter}</span></span>
          <button
            onClick={() => window.history.pushState({}, '', '/gallery/international')}
            className="ml-4 hover:text-red-500 transition-colors p-1"
            title="Clear Filter"
          >
            <X size={20} />
          </button>
        </div>
      )}

      {filteredGallery.length > 0 ? (
        filteredGallery.map((section, idx) => (
          <div key={idx} className="mb-24 last:mb-0">
            <div className="flex flex-col mb-10">
              <div className="flex items-center gap-3 mb-2">
                <Camera size={20} className="text-sky-500" />
                <span className="text-sky-600 font-black text-xs uppercase tracking-[0.2em]">{section.id} Collection</span>
              </div>
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{section.category}</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {section.images.map((img, imgIdx) => (
                <div
                  key={imgIdx}
                  className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]"
                  onClick={() => setSelectedImage(img.src)}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                    <p className="text-white font-bold text-xl mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.alt}</p>
                    <div className="flex items-center gap-2 text-sky-400 text-xs font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-700 delay-75">
                      <MapPin size={14} /> {section.id}
                    </div>
                  </div>
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-xl p-3 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100 border border-white/20">
                    <Maximize2 size={24} className="text-white" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
          <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <Camera size={40} className="text-slate-300" />
          </div>
          <p className="text-slate-500 text-2xl font-bold mb-2">No images found</p>
          <p className="text-slate-400">We couldn&apos;t find any photos for the category &quot;{categoryFilter}&quot;.</p>
          <button
            onClick={() => window.history.pushState({}, '', '/gallery/international')}
            className="mt-8 text-sky-600 font-bold hover:underline"
          >
            View All Collections
          </button>
        </div>
      )}

      {/* Image Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-500"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-sky-400 transition-all p-3 z-50 bg-white/5 rounded-2xl border border-white/10"
            aria-label="Close Fullscreen"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={selectedImage}
              alt="Fullscreen view"
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default function InternationalGallery() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-white border-b border-slate-100 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 border border-emerald-100">
            <Camera size={14} /> Global Adventures
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            International <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-sky-500">Gallery</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Witness the beauty of the world through the eyes of our travelers. From European wonders to exotic Asian escapes.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-32 text-center font-bold text-slate-400 animate-pulse">Loading global memories...</div>}>
        <GalleryContent />
      </Suspense>

      <Footer />
    </main>
  );
}
