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
import { InsuranceSection } from '@/components/insurance-section';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="relative bg-[#F8FAFC]">
      <Navbar />
      <Hero />
      <Destinations />
      <FeaturedPlans />
      <FeaturedTours />
      <FeaturedPackages />
      <InsuranceSection />
      <Features />
      <TravelCategories />
      <AgentSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
