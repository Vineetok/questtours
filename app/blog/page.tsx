'use client';

import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import Image from 'next/image';
import { useState } from 'react';
import { BlogModal } from '@/components/blog-modal';

const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Hidden Gems in Bali You Must Visit',
    excerpt: 'Discover secret beaches, mystical waterfalls, and serene temples off the beaten path in the Island of Gods.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80',
    date: 'April 15, 2026',
    category: 'Travel Guides',
  },
  {
    id: 2,
    title: 'How to Pack for a Swiss Alps Adventure',
    excerpt: 'Everything you need to know about layering, essential gear, and packing light for your high-altitude getaway.',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?w=800&q=80',
    date: 'April 12, 2026',
    category: 'Tips & Tricks',
  },
  {
    id: 3,
    title: 'A Culinary Journey Through Kyoto',
    excerpt: 'From street food stalls to Michelin-starred kaiseki, explore the vibrant and traditional food scene of Kyoto.',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80',
    date: 'April 08, 2026',
    category: 'Food & Culture',
  },
  {
    id: 4,
    title: 'The Best Time to Visit the Maldives',
    excerpt: 'Planning a tropical escape? Here is a breakdown of the weather, seasons, and when to book your overwater villa.',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80',
    date: 'April 02, 2026',
    category: 'Destinations',
  },
  {
    id: 5,
    title: 'Sustainable Travel: How to Be an Eco-Tourist',
    excerpt: 'Simple habits and choices that can minimize your carbon footprint and support local communities while traveling.',
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80',
    date: 'March 28, 2026',
    category: 'Eco Travel',
  },
  {
    id: 6,
    title: 'Navigating Venice Like a Local',
    excerpt: 'Avoid the tourist traps and discover the authentic charm of Venice\'s quiet canals and hidden squares.',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&q=80',
    date: 'March 22, 2026',
    category: 'City Guides',
  },
];

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openPost = (post: typeof blogPosts[0]) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#003B5C] mb-4">
            Travel Blog
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Inspiring stories, practical tips, and expert guides to help you plan your next unforgettable adventure.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12 lg:py-20 flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id} 
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col cursor-pointer group"
                onClick={() => openPost(post)}
              >
                <div className="relative h-56 overflow-hidden block">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg">
                    {post.category}
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-gray-400 mb-3">{post.date}</div>
                  <h2 className="text-xl font-bold text-[#003B5C] mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 mb-6 line-clamp-3 flex-1">
                    {post.excerpt}
                  </p>
                  <div className="text-[#003B5C] font-bold text-sm group-hover:text-blue-600 transition-colors inline-flex items-center gap-1">
                    Read Article →
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BlogModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        post={selectedPost} 
      />

      <Footer />
    </main>
  );
}

