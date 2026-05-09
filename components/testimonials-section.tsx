'use client';

import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'María García',
    role: 'Ingeniería en Sistemas',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Encontré un lugar hermoso y seguro en una semana. El proceso fue súper fácil y los anfitriones son increíbles.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Carlos Morales',
    role: 'Administración de Empresas',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'La mejor decisión que tomé para mi primer semestre. La plataforma es confiable y todos están verificados.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Alejandra López',
    role: 'Medicina General',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    text: 'El soporte fue muy atento cuando necesité cambiar de habitación. Recomiendo Tecno a todos mis amigos.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Diego Ramírez',
    role: 'Arquitectura',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    text: 'Vivo lejos del campus y esta plataforma me salvó. Encontré una habitación compartida con gente genial.',
    rating: 5,
  },
  {
    id: 5,
    name: 'Sofia Mendez',
    role: 'Psicología Clínica',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    text: 'Los precios son justos y la ubicación es perfecta. Sin duda la mejor opción para estudiantes foráneos.',
    rating: 5,
  },
  {
    id: 6,
    name: 'Miguel Torres',
    role: 'Administración Industrial',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    text: 'Llevo dos años aquí y no me he querido cambiar. La comunidad de Tecno es lo mejor que tiene la plataforma.',
    rating: 5,
  },
  {
    id: 7,
    name: 'Valentina Castro',
    role: 'Comunicación Social',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    text: 'Me encanta la experiencia. Los pagos son fáciles y la plataforma es muy intuitiva. Recomendada al 100%.',
    rating: 5,
  },
  {
    id: 8,
    name: 'Roberto Sánchez',
    role: 'Ingeniería Industrial',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    text: 'Encontré una habitación en el primer mes de búsqueda. Tecno hace que todo sea muy fácil para los foráneos.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card border-t border-b border-border overflow-hidden">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Miles de estudiantes foráneos han encontrado su hogar ideal en Tecno
          </p>
        </div>
      </div>

      {/* Scrolling Testimonials - Infinite Loop */}
      <div className="relative overflow-hidden w-full">
        <style>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          
          .testimonials-scroll {
            display: flex;
            animation: scroll-left 40s linear infinite;
            gap: 1.5rem;
            will-change: transform;
          }
        `}</style>

        <div className="testimonials-scroll">
          {/* First set of testimonials */}
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={`first-${testimonial.id}`}
              className="shrink-0 w-80 bg-background rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </div>
          ))}

          {/* Duplicate set for seamless looping */}
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={`second-${testimonial.id}`}
              className="shrink-0 w-80 bg-background rounded-lg border border-border p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} size={16} className="fill-primary text-primary" />
                ))}
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed">{testimonial.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
