'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '../../components/navbar';
import { Footer } from '../../components/footer';
import { MapPin, Maximize2, X, Filter, Camera } from 'lucide-react';
import Image from 'next/image';

const domesticGallery = [
  {
    category: "Kashmir, Vaishno Devi, Amritsar",
    id: "Kashmir",
    images: [
      { src: "/domestic_gallery/kashmir-1.jpg", alt: "Kashmir Group" },
      { src: "/domestic_gallery/kashmir-2.jpg", alt: "Vaishno Devi" },
      { src: "/domestic_gallery/kashmir-3.jpg", alt: "Amritsar Golden Temple" },
      { src: "/domestic_gallery/kashmir-4.jpg", alt: "Dal Lake Kashmir" },
      { src: "/domestic_gallery/kashmir-5.jpg", alt: "Gulmarg Snow" },
      { src: "/domestic_gallery/kashmir-special.jpg", alt: "Kashmir Special Tour" },
      { src: "/domestic_gallery/kashmir-2018-1.jpg", alt: "Kashmir 2018 - 1" },
      { src: "/domestic_gallery/kashmir-2018-2.jpg", alt: "Kashmir 2018 - 2" },
      { src: "/domestic_gallery/kashmir-2018-3.jpg", alt: "Kashmir 2018 - 3" },
      { src: "/domestic_gallery/kashmir-2018-4.jpg", alt: "Kashmir 2018 - 4" },
      { src: "/domestic_gallery/kashmir-2018-5.jpg", alt: "Kashmir 2018 - 5" },
      { src: "/domestic_gallery/kashmir-2018-6.jpg", alt: "Kashmir 2018 - 6" },
      { src: "/domestic_gallery/kashmir-2018-7.jpg", alt: "Kashmir 2018 - 7" }
    ]
  },
  {
    category: "Rajasthan Tour",
    id: "Rajasthan",
    images: [
      { src: "/domestic_gallery/rajasthan-1.jpg", alt: "Rajasthan Fort" },
      { src: "/domestic_gallery/rajasthan-2.jpg", alt: "Desert Safari" },
      { src: "/domestic_gallery/rajasthan-3.jpg", alt: "Cultural Folk Dance" },
      { src: "/domestic_gallery/rajasthan-4.jpg", alt: "Udaipur Lake" },
      { src: "/domestic_gallery/rajasthan-5.jpg", alt: "Group Photo Rajasthan" }
    ]
  },
  {
    category: "Leh Ladakh",
    id: "Ladakh",
    images: [
      { src: "/domestic_gallery/ladakh-1.jpg", alt: "Leh Ladakh Mountains" }
    ]
  },
  {
    category: "Andaman Islands",
    id: "Andaman",
    images: [
      { src: "/domestic_gallery/andaman-1.jpg", alt: "Andaman Beach" },
      { src: "/domestic_gallery/andaman-2.jpg", alt: "Havelock Island" }
    ]
  },
  {
    category: "Madhya Pradesh",
    id: "Madhya Pradesh",
    images: [
      { src: "/domestic_gallery/mp-1.jpg", alt: "MP Heritage" }
    ]
  },
  {
    category: "Shimla & Manali",
    id: "Shimla & Manali",
    images: [
      { src: "/domestic_gallery/shimla-1.jpg", alt: "Shimla Mall Road" },
      { src: "/domestic_gallery/shimla-2.jpg", alt: "Manali Mountains" }
    ]
  },
  {
    category: "Kashi Gaya Prayag",
    id: "Kashi",
    images: [
      { src: "/domestic_gallery/kashi-1.jpg", alt: "Prayag Sangam" }
    ]
  },
  {
    category: "Delhi & Agra",
    id: "Delhi",
    images: [
      { src: "/domestic_gallery/delhi-1.jpg", alt: "Delhi Agra" },
      { src: "/domestic_gallery/delhi-2.jpg", alt: "Agra Fort" }
    ]
  },
  {
    category: "Other Glimpses",
    id: "Other",
    images: [
      { src: "/domestic_gallery/glimpse-main.jpg", alt: "Bhandardhara" },
      { src: "/domestic_gallery/glimpse-1.jpg", alt: "Tour Glimpse 1" },
      { src: "/domestic_gallery/glimpse-2.jpg", alt: "Tour Glimpse 2" },
      { src: "/domestic_gallery/glimpse-3.jpg", alt: "Tour Glimpse 3" },
      { src: "/domestic_gallery/glimpse-4.jpg", alt: "Tour Glimpse 4" },
      { src: "/domestic_gallery/glimpse-5.jpg", alt: "Tour Glimpse 5" },
      { src: "/domestic_gallery/glimpse-6.jpg", alt: "Tour Glimpse 6" },
      { src: "/domestic_gallery/glimpse-7.jpg", alt: "Tour Glimpse 7" },
      { src: "/domestic_gallery/glimpse-8.jpg", alt: "Tour Glimpse 8" },
      { src: "/domestic_gallery/glimpse-9.jpg", alt: "Tour Glimpse 9" },
      { src: "/domestic_gallery/glimpse-10.jpg", alt: "Tour Glimpse 10" },
      { src: "/domestic_gallery/glimpse-11.jpg", alt: "Tour Glimpse 11" },
      { src: "/domestic_gallery/glimpse-12.jpg", alt: "Tour Glimpse 12" }
    ]
  }
];

function GalleryContent() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');

  const filteredGallery = categoryFilter
    ? domesticGallery.filter(section => section.id.toLowerCase().includes(categoryFilter.toLowerCase()))
    : domesticGallery;

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
            onClick={() => window.history.pushState({}, '', '/gallery/domestic')}
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
          <p className="text-slate-400">We couldn't find any photos for the category "{categoryFilter}".</p>
          <button
            onClick={() => window.history.pushState({}, '', '/gallery/domestic')}
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
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={selectedImage}
              alt="Fullscreen view"
              className="max-w-full max-h-full object-contain rounded-3xl shadow-[0_0_100px_rgba(0,0,0,0.5)] animate-in zoom-in-95 duration-500"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default function DomesticGallery() {
  return (
    <main className="min-h-screen bg-[#F8FAFC]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-white border-b border-slate-100 flex items-center justify-center">
        <div className="text-center px-4 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-sky-50 text-sky-600 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.3em] mb-6 border border-sky-100">
            <Camera size={14} /> Memories for life
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tight">
            Domestic <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-emerald-500">Gallery</span>
          </h1>
          <p className="text-slate-500 text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Every picture tells a story of adventure, culture, and pure joy. Explore our travelers&apos; most precious moments across India.
          </p>
        </div>
      </section>

      <Suspense fallback={<div className="py-32 text-center font-bold text-slate-400 animate-pulse">Loading amazing memories...</div>}>
        <GalleryContent />
      </Suspense>

      <Footer />
    </main>
  );
}
