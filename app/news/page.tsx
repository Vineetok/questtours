'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Newspaper, Calendar, Eye, X, NewspaperIcon, ExternalLink, BookOpen } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/navigation/tabs';
import { BlogModal } from '@/components/blog-modal';

const newsItems = [
  {
    id: 1,
    marathiTitle: "क्वेस्ट टूर्सच्या नूतन कार्यालयाचे उद्घाटन",
    title: "Inauguration of the New Quest Tours Office",
    date: "September 8, 2018",
    source: "Daily Tarun Bharat",
    excerpt: "Celebrating a new milestone with the opening of our premium office space to better serve our growing family of travelers.",
    image: "/news/1.jpg",
  },
  {
    id: 2,
    marathiTitle: "क्वेस्ट टूर्सला ग्लोबल रायझिंग स्टार पुरस्कार",
    title: "Quest Tours Receives Global Rising Star Award",
    date: "2018",
    source: "Global Travel Awards",
    excerpt: "Recognized as a rising leader in the tourism industry, committed to excellence and innovative travel experiences.",
    image: "/news/2.png",
  },
  {
    id: 3,
    marathiTitle: "‘आई रिटायर होतेय’ नाटकाला उदंड प्रतिसाद",
    title: "Immense Response to 'Aai Retire Hotey' Play",
    date: "June 17, 2018",
    source: "Cultural Review",
    excerpt: "A heartwarming cultural event supported by Quest Tours, bringing communities together through the power of theater.",
    image: "/news/3.png",
  },
  {
    id: 4,
    marathiTitle: "‘आई रिटायर होतेय...’ हृदयस्पर्शी नाट्य",
    title: "'Aai Retire Hotey...' A Soul-Stirring Performance",
    date: "June 19, 2018",
    source: "Press Review",
    excerpt: "Further coverage of the successful theatrical production, highlighting Quest Tours' commitment to cultural enrichment.",
    image: "/news/4.jpg",
  }
];

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in Bali You Must Visit',
    excerpt: 'Discover secret beaches, mystical waterfalls, and serene temples off the beaten path in the Island of Gods.',
    image: '/tours/news/bali.png',
    date: 'April 15, 2026',
    category: 'Travel Guides',
  },
  {
    id: 2,
    title: 'How to Pack for a Swiss Alps Adventure',
    excerpt: 'Everything you need to know about layering, essential gear, and packing light for your high-altitude getaway.',
    image: '/tours/news/swiss.png',
    date: 'April 12, 2026',
    category: 'Tips & Tricks',
  },
  {
    id: 3,
    title: 'A Culinary Journey Through Kyoto',
    excerpt: 'From street food stalls to Michelin-starred kaiseki, explore the vibrant and traditional food scene of Kyoto.',
    image: '/tours/news/kyoto.png',
    date: 'April 08, 2026',
    category: 'Food & Culture',
  },
  {
    id: 4,
    title: 'The Best Time to Visit the Maldives',
    excerpt: 'Planning a tropical escape? Here is a breakdown of the weather, seasons, and when to book your overwater villa.',
    image: '/tours/news/maldives.png',
    date: 'April 02, 2026',
    category: 'Destinations',
  },
  {
    id: 5,
    title: 'Sustainable Travel: How to Be an Eco-Tourist',
    excerpt: 'Simple habits and choices that can minimize your carbon footprint and support local communities while traveling.',
    image: '/tours/news/eco.png',
    date: 'March 28, 2026',
    category: 'Eco Travel',
  },
  {
    id: 6,
    title: 'Navigating Venice Like a Local',
    excerpt: 'Avoid the tourist traps and discover the authentic charm of Venice\'s quiet canals and hidden squares.',
    image: '/tours/news/venice.png',
    date: 'March 22, 2026',
    category: 'City Guides',
  },
];

export default function NewsPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  const openPost = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
    setIsBlogModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFC] flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 lg:pt-40 lg:pb-16 overflow-hidden bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6"
            >
              <NewspaperIcon size={14} className="text-blue-500" /> Press & Media
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight px-2"
            >
              Press & Travel <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Stories</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed"
            >
              Stay updated with Quest Tours' journey, achievements, and our contributions to the community and travel industry.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-8 bg-white border-b border-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <Tabs defaultValue="news" className="w-full">
            <div className="flex justify-center mb-8 sm:mb-12">
              <TabsList className="bg-slate-100/50 p-1 rounded-xl sm:rounded-2xl border border-slate-200 flex w-full max-w-md sm:w-auto">
                <TabsTrigger value="news" className="flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-lg sm:rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold transition-all gap-2 text-xs sm:text-sm">
                  <NewspaperIcon size={16} /> <span className="whitespace-nowrap">News & Media</span>
                </TabsTrigger>
                <TabsTrigger value="blogs" className="flex-1 sm:flex-none px-4 sm:px-8 py-3 rounded-lg sm:rounded-xl data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm font-bold transition-all gap-2 text-xs sm:text-sm">
                  <BookOpen size={16} /> <span className="whitespace-nowrap">Blogs</span>
                </TabsTrigger>
              </TabsList>
            </div>

            {/* News Content */}
            <TabsContent value="news">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 py-8">
                {newsItems.map((item, index) => (
                  <motion.article 
                    key={item.id} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="group relative flex flex-col bg-white rounded-[2.5rem] overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 border border-slate-100"
                  >
                    {/* Image Container */}
                    <div 
                      className="relative h-[400px] overflow-hidden cursor-pointer"
                      onClick={() => setSelectedImage(item.image)}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full text-[#003B5C] transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 shadow-xl">
                          <Eye size={24} />
                        </div>
                      </div>
                      
                      {/* Date Badge */}
                      <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2">
                        <Calendar size={14} className="text-blue-600" />
                        <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">{item.date}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 md:p-10 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="h-px w-8 bg-blue-600"></div>
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.2em]">{item.source}</span>
                      </div>
                      
                      <h3 className="text-sm font-bold text-slate-400 mb-2">"{item.marathiTitle}"</h3>
                      <h2 className="text-2xl font-black text-[#003B5C] mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                        {item.title}
                      </h2>
                      <p className="text-slate-500 mb-8 font-medium leading-relaxed">
                        {item.excerpt}
                      </p>
                      
                      <div className="mt-auto">
                        <button 
                          onClick={() => setSelectedImage(item.image)}
                          className="inline-flex items-center gap-2 text-[#003B5C] font-black text-sm uppercase tracking-widest group/btn"
                        >
                          View Full Clipping 
                          <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover/btn:bg-blue-600 group-hover/btn:text-white transition-all duration-300">
                            <ExternalLink size={14} />
                          </span>
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </TabsContent>

            {/* Blogs Content */}
            <TabsContent value="blogs">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8">
                {blogPosts.map((post, index) => (
                  <motion.article 
                    key={post.id} 
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col cursor-pointer group"
                    onClick={() => openPost(post)}
                  >
                    <div className="relative h-64 overflow-hidden block">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg">
                        {post.category}
                      </div>
                    </div>
                    <div className="p-8 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-slate-400 text-xs font-bold mb-4 uppercase tracking-widest">
                        <Calendar size={14} /> {post.date}
                      </div>
                      <h2 className="text-xl font-black text-[#003B5C] mb-4 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h2>
                      <p className="text-slate-500 mb-8 line-clamp-3 flex-1 font-medium leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="text-[#003B5C] font-black text-xs uppercase tracking-widest group-hover:text-blue-600 transition-colors inline-flex items-center gap-2">
                        Read Full Story <span className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300"><ExternalLink size={14} /></span>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Image Modal for News */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-[#001F33]/95 backdrop-blur-xl"
              onClick={() => setSelectedImage(null)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-full flex items-center justify-center pointer-events-none"
            >
              <div className="relative w-full h-full pointer-events-auto bg-white rounded-[2rem] overflow-hidden shadow-2xl flex flex-col">
                <div className="absolute top-6 right-6 z-10">
                  <button
                    onClick={() => setSelectedImage(null)}
                    className="p-3 bg-black/10 hover:bg-black/20 rounded-full transition-colors backdrop-blur-md"
                  >
                    <X className="w-6 h-6 text-black" />
                  </button>
                </div>
                <div className="relative flex-1 p-4 sm:p-8">
                  <div className="relative w-full h-full">
                    <Image
                      src={selectedImage}
                      alt="News Clipping"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <BlogModal 
        isOpen={isBlogModalOpen} 
        onClose={() => setIsBlogModalOpen(false)} 
        post={selectedPost} 
      />

      <Footer />
    </main>
  );
}
