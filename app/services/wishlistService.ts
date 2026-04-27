import { Tour } from '@/lib/types';
import { wishlistTours } from '@/lib/mock-data';

const WISHLIST_KEY = 'quest_tours_wishlist';

export const wishlistService = {
  getWishlist: (): Tour[] => {
    if (typeof window === 'undefined') return wishlistTours;
    const saved = localStorage.getItem(WISHLIST_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse wishlist', e);
        return wishlistTours;
      }
    }
    // Initialize with mock data if nothing saved
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistTours));
    return wishlistTours;
  },

  addToWishlist: (tour: Tour): void => {
    if (typeof window === 'undefined') return;
    const wishlist = wishlistService.getWishlist();
    if (!wishlist.find(item => item.id === tour.id)) {
      const updated = [...wishlist, tour];
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
    }
  },

  removeFromWishlist: (id: string | number): void => {
    if (typeof window === 'undefined') return;
    const wishlist = wishlistService.getWishlist();
    const updated = wishlist.filter(item => item.id !== id);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(updated));
  },

  isInWishlist: (id: string | number): boolean => {
    if (typeof window === 'undefined') return false;
    const wishlist = wishlistService.getWishlist();
    return !!wishlist.find(item => item.id === id);
  }
};
