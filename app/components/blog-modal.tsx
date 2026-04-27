'use client';

import Image from 'next/image';
import { Calendar, User, Clock, Share2, ArrowRight } from 'lucide-react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/overlays/dialog';

interface BlogModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: {
    id: number;
    title: string;
    excerpt: string;
    image: string;
    date: string;
    category: string;
    content?: string;
  } | null;
}

export function BlogModal({ isOpen, onClose, post }: BlogModalProps) {
  if (!post) return null;

  const handlePlanClick = () => {
    onClose();
    // Smooth scroll to plans section
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleShare = () => {
    // Share functionality here
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] sm:max-w-[95vw] lg:max-w-[900px] h-[100dvh] sm:h-[90vh] p-0 overflow-hidden border-none bg-white rounded-none sm:rounded-[32px] shadow-2xl">
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Header Image */}
          <div className="relative h-[30vh] sm:h-[40vh] w-full shrink-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
              <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mb-4">
                {post.category}
              </span>
              <DialogTitle className="text-2xl sm:text-4xl font-bold text-white leading-tight">
                {post.title}
              </DialogTitle>
            </div>
          </div>

          {/* Article Content */}
          <div className="px-6 py-8 sm:px-10">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-100 mb-8">
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={16} className="text-blue-600" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <User size={16} className="text-blue-600" />
                <span>By Quest Tours Expert</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Clock size={16} className="text-blue-600" />
                <span>5 min read</span>
              </div>
            </div>

            <DialogDescription asChild>
              <div className="text-lg text-gray-600 leading-relaxed space-y-6">
                <p className="font-medium text-gray-900 text-xl border-l-4 border-blue-600 pl-4 py-1">
                  &quot;{post.excerpt}&quot;
                </p>
                
                <div className="space-y-4">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                  </p>
                  <h3 className="text-2xl font-bold text-[#003B5C] pt-4">Why This Destination Matters</h3>
                  <p>
                    Exploring the hidden corners of our world brings a perspective that no guidebook can offer. Whether it&apos;s the mystical waterfalls of Bali or the quiet canals of Venice, every journey is a chance to reconnect with the beauty of nature and human culture.
                  </p>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </div>
            </DialogDescription>

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-6 pb-10">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share this Story:</span>
                <button 
                  onClick={handleShare}
                  aria-label="share"
                  className="p-2 bg-gray-100 text-gray-500 hover:bg-blue-600 hover:text-white rounded-full transition-all"
                >
                  <Share2 size={16} />
                </button>
              </div>
              
              <button 
                onClick={handlePlanClick}
                className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all group"
              >
                Plan This Adventure
                <ArrowRight size={18} className="transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}