'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const videoTestimonials = [
  { id: 1, type: 'youtube', url: 'https://www.youtube.com/embed/TAp1XZ6Ym74?si=E-AVysAuFdK0P53U', title: 'Quest Tours Customer' },
  { id: 2, type: 'youtube', url: 'https://www.youtube.com/embed/g3DPzguCT2c?si=bpIson3MwFzfc6CF', title: 'Quest Tours Customer' },
  { id: 3, type: 'youtube', url: 'https://www.youtube.com/embed/oNhWnS1sfvk?si=rSietf96CPAizlL1', title: 'Quest Tours Customer' },
  { id: 4, type: 'youtube', url: 'https://www.youtube.com/embed/Wlo19TodJ_c?si=Y2l2-k_Q_uY8mbFv', title: 'Quest Tours Event' },
  { id: 5, type: 'youtube', url: 'https://www.youtube.com/embed/VOY6rnU2_TU?si=bTn7kClN5kadO6mR', title: 'Quest Tours Event' },
  { id: 6, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Andaman%20Tour%20testimonial.mp4', title: 'Andaman Tour' },
  { id: 7, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Andaman%20tour%20Video%20Testimonial%20-2.mp4', title: 'Andaman Tour' },
  { id: 8, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Gujrat%20Testimonial.mp4', title: 'Gujrat Tour' },
  { id: 9, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Gujrat%20Tour%20testimonial.mp4', title: 'Gujrat Tour' },
  { id: 10, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Rajasthan%20Tour%20testimonial.mp4', title: 'Rajasthan Tour' },
  { id: 11, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Quest%20Rajasthan%20Tour%20testimonial%20-1.mp4', title: 'Rajasthan Tour' },
  { id: 12, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/Kirloskar%20dealers%20Video%20testimonial.mp4', title: 'Kirloskar Tour' },
  { id: 13, type: 'mp4', url: 'https://www.questtours.in/assets/img/testimonials/VID-20181129-WA0002.mp4', title: 'Kashmir Tour' },
];

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      
      {/* Padding to account for the fixed navbar */}
      <div className="pt-24 lg:pt-32 bg-white flex-grow">
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Video Testimonials Header */}
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em]">
                Traveler Stories
              </span>
              <h2 className="text-4xl lg:text-6xl font-black text-slate-900 leading-tight">
                Customer <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Video</span> Testimonials
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Real experiences from thousands of happy travelers who explored the world with us.
              </p>
            </div>

            {/* Video Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {videoTestimonials.map((video) => (
                <div key={video.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                  <div className="aspect-video bg-gray-100 relative">
                    {video.type === 'youtube' ? (
                      <iframe
                        className="w-full h-full absolute inset-0"
                        src={video.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    ) : (
                      <video 
                        className="w-full h-full absolute inset-0 object-cover" 
                        controls 
                        preload="metadata"
                      >
                        <source src={video.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  {video.title && (
                    <div className="p-4 border-t border-gray-100">
                      <h4 className="font-semibold text-gray-900 text-center">{video.title}</h4>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
}
