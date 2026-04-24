import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { FeaturedTours } from '@/components/featured-tours';
import { Destinations } from '@/components/destinations';
import { Features } from '@/components/features';
import { TravelCategories } from '@/components/travel-categories';
import { AgentSection } from '@/components/agent-section';
import { Testimonials } from '@/components/testimonials';
import { FeaturedPlans } from '@/components/featured-plans';
import { FeaturedPackages } from '@/components/featured-packages';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Destinations />
      <FeaturedPlans />
      <FeaturedTours />
      <FeaturedPackages />
      <Features />
      <TravelCategories />
      <AgentSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
