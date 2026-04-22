import { Navbar } from '@/components/navbar';
import { Hero } from '@/components/hero';
import { FeaturedTours } from '@/components/featured-tours';
import { Destinations } from '@/components/destinations';
import { Features } from '@/components/features';
import { AgentSection } from '@/components/agent-section';
import { Testimonials } from '@/components/testimonials';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedTours />
      <Destinations />
      <Features />
      <AgentSection />
      <Testimonials />
      <Footer />
    </main>
  );
}
