"use client";
import { useState } from 'react';
import { TourCard } from './tour-card';
import { TourModal } from './tour-modal';

const toursData = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1477584262170-a5c799c7d751?w=800&h=600&fit=crop',
    location: 'Jaipur, Rajasthan',
    title: 'Royal Heritage Tour: Hawa Mahal & Beyond',
    price: 4999,
    rating: 4.8,
    reviews: 124,
    description: 'Immerse yourself in the royal grandeur of the Pink City. This curated tour takes you through the majestic Hawa Mahal, the sprawling City Palace, and the astronomical wonders of Jantar Mantar. Experience authentic Rajasthani hospitality and explore vibrant local bazaars.',
    highlights: ['Visit Hawa Mahal & Amber Fort', 'Traditional Rajasthani Thali Lunch', 'Guided City Palace Tour', 'Personal Shopping Assistant in Bazaars'],
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=800&h=600&fit=crop',
    location: 'Varanasi, Uttar Pradesh',
    title: 'Spiritual Ganges: Evening Aarti Experience',
    price: 3499,
    rating: 4.9,
    reviews: 215,
    description: 'Witness the mystical beauty of one of the world\'s oldest living cities. This spiritual journey includes a private boat ride on the sacred Ganges at sunset, followed by a VIP seat for the mesmerizing Ganga Aarti at Dashashwamedh Ghat.',
    highlights: ['VIP Seating for Ganga Aarti', 'Sunrise & Sunset Boat Rides', 'Guided Walk through Ancient Lanes', 'Silk Weaving Center Visit'],
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
    location: 'Alleppey, Kerala',
    title: 'Backwater Bliss: Luxury Houseboat Stay',
    price: 7999,
    rating: 4.9,
    reviews: 187,
    description: 'Drift away on a traditional Kettuvallam through the serene backwaters of Alleppey. Enjoy private onboard dining with local delicacies, witness the calm village life from your luxury deck, and sleep under the stars in a fully-equipped floating suite.',
    highlights: ['Private Luxury Houseboat', 'Authentic Karimeen (Fish) Meals', 'Coconut Grove Village Tour', 'Sunset Photography Sessions'],
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=800&h=600&fit=crop',
    location: 'North Goa',
    title: 'Sunset Serenity: Private Beach Retreat',
    price: 5999,
    rating: 4.7,
    reviews: 156,
    description: 'Escape the crowds and discover the hidden gems of North Goa. This retreat offers exclusive access to a private beach stretch, guided yoga sessions at dawn, and a candle-lit seafood dinner on the sand as the sun sets over the Arabian Sea.',
    highlights: ['Private Beach Access', 'Candle-lit Seafood Dinner', 'Dolphin Sighting Boat Trip', 'Luxury Beach Hut Stay'],
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1581791534721-e599df4417f7?w=800&h=600&fit=crop',
    location: 'Leh, Ladakh',
    title: 'High Altitude Adventure: Leh & Pangong Lake',
    price: 12999,
    rating: 4.9,
    reviews: 98,
    description: 'Experience the raw beauty of the Himalayas. Visit ancient monasteries, cross the world\'s highest motorable passes, and witness the changing colors of the magical Pangong Lake.',
    highlights: ['Pangong Lake Camping', 'Khardung La Pass Visit', 'Monastery Heritage Tour', 'Leh Market Exploration'],
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
    location: 'Rishikesh, Uttarakhand',
    title: 'Spiritual Wellness & Yoga Retreat',
    price: 4499,
    rating: 4.8,
    reviews: 142,
    description: 'Rejuvenate your soul in the Yoga Capital of the World. This retreat combines traditional yoga practices, meditation by the Ganges, and exciting river rafting adventures.',
    highlights: ['Daily Yoga & Meditation', 'Ganga Aarti Experience', 'White Water Rafting', 'Organic Ayurvedic Meals'],
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1593693397690-362ae9666ec2?w=800&h=600&fit=crop',
    location: 'Munnar, Kerala',
    title: 'Tea Garden Trails: Misty Hills of Munnar',
    price: 5499,
    rating: 4.7,
    reviews: 112,
    description: 'Walk through the lush green tea plantations of Munnar. Enjoy the cool mountain breeze, visit waterfalls, and learn about the tea-making process from local experts.',
    highlights: ['Tea Plantation Walk', 'Eravikulam National Park', 'Waterfall Excursion', 'Tea Tasting Session'],
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1564507592333-c60657eea023?w=800&h=600&fit=crop',
    location: 'Agra, Uttar Pradesh',
    title: 'Taj Mahal Sunrise: Eternal Love Tour',
    price: 2999,
    rating: 4.9,
    reviews: 310,
    description: 'Witness the Taj Mahal in its most beautiful form at sunrise. This guided tour covers the history of the Mughal Empire and includes visits to Agra Fort and Mehtab Bagh.',
    highlights: ['Sunrise Taj Mahal View', 'Agra Fort Guided Tour', 'Mehtab Bagh Garden Visit', 'Local Marble Inlay Workshop'],
  },
];

export function FeaturedTours() {
  const [selectedTour, setSelectedTour] = useState<typeof toursData[0] | null>(null);

  return (
    <section id="tours" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
            Featured Tours
          </h2>
          <p className="text-lg text-gray-600 text-balance">
            Explore our hand-picked collection of the world&apos;s most amazing destinations
          </p>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {toursData.map((tour) => (
            <TourCard
              key={tour.id}
              image={tour.image}
              location={tour.location}
              title={tour.title}
              price={tour.price}
              rating={tour.rating}
              reviews={tour.reviews}
              onClick={() => setSelectedTour(tour)}
            />
          ))}
        </div>
      </div>

      <TourModal
        isOpen={!!selectedTour}
        onClose={() => setSelectedTour(null)}
        tour={selectedTour}
      />
    </section>
  );
}
