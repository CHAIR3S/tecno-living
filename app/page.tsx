'use client';

import { Navbar } from '@/components/navbar';
import { HeroSection } from '@/components/hero-section';
import { RoomCard } from '@/components/room-card';
import { HowItWorks } from '@/components/how-it-works';
import { SecuritySection } from '@/components/security-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { FAQSection } from '@/components/faq-section';
import { Footer } from '@/components/footer';
import { ROOMS } from '@/lib/data';

export default function Home() {
  // Get featured rooms (first 6)
  const featuredRooms = ROOMS.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      {/* Featured Rooms Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              Habitaciones Destacadas
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubre algunas de nuestras mejores opciones verificadas y cerca del campus
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <a
              href="/habitaciones"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-xl font-semibold hover:bg-primary-foreground hover:text-primary transition-colors shadow-lg hover:shadow-xl"
            >
              Ver Todas las Habitaciones
            </a>
          </div>
        </div>
      </section>

      <HowItWorks />
      <SecuritySection />
      <TestimonialsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}
