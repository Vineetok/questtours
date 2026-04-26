'use client';

import React, { useState, useEffect } from 'react';
import { MessageCircle, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function WhatsAppPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Initial delay before showing the floating button
    const initialTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Show notification bubble periodically
    const showInterval = setInterval(() => {
      setShowNotification(true);
      // Hide notification after 10 seconds
      setTimeout(() => setShowNotification(false), 10000);
    }, 45000); // Appear every 45 seconds

    return () => {
      clearTimeout(initialTimer);
      clearInterval(showInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
            className="bg-white rounded-2xl shadow-2xl p-4 mb-2 max-w-[280px] border border-emerald-100 pointer-events-auto relative group overflow-hidden"
          >
            {/* Emerald Gradient Border Top */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
            
            <button 
              onClick={() => setShowNotification(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <X size={14} />
            </button>
            
            <div className="flex items-start gap-3 mt-1">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="flex-1 pr-4">
                <p className="text-[13px] font-bold text-slate-800 leading-tight">Need help planning?</p>
                <p className="text-[12px] text-slate-500 mt-1 leading-snug">Chat with our travel experts for exclusive tour deals!</p>
              </div>
            </div>
            
            <a 
              href="https://wa.me/919019394696" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-2"
            >
              <MessageCircle size={14} />
              Chat on WhatsApp
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href="https://wa.me/919019394696"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-500/30 cursor-pointer pointer-events-auto relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <MessageCircle size={30} className="relative z-10" />
        
        {/* Pulsing effect */}
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-20" />
      </motion.a>
    </div>
  );
}
