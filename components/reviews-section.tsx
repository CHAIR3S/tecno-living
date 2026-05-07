'use client';

import { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  comment: string;
}

const reviews: Review[] = [
  {
    id: '1',
    name: 'Sofia Martinez',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Estudiante de Ingenieria',
    rating: 5,
    comment: 'Encontre mi depa en 2 dias. El proceso fue super facil y el anfitrion era muy amable. 100% recomendado para foraneos.',
  },
  {
    id: '2',
    name: 'Carlos Hernandez',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    role: 'Estudiante de Arquitectura',
    rating: 5,
    comment: 'Me ahorre muchos problemas al buscar cuarto. Todo verificado y seguro, no tuve que preocuparme por estafas.',
  },
  {
    id: '3',
    name: 'Ana Garcia',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    role: 'Estudiante de Medicina',
    rating: 5,
    comment: 'Excelente plataforma. Mi habitacion esta a 5 minutos del campus y el precio es muy justo. La verificacion me dio confianza.',
  },
  {
    id: '4',
    name: 'Diego Ramirez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    role: 'Estudiante de Derecho',
    rating: 5,
    comment: 'Como foraneo, esto fue un salvavidas. En mi ciudad no conocia a nadie y aqui encontre un lugar seguro rapidamente.',
  },
  {
    id: '5',
    name: 'Valentina Lopez',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
    role: 'Estudiante de Diseno',
    rating: 5,
    comment: 'Mi anfitriona es increible, me trata como familia. Nunca pense encontrar algo tan bonito a ese precio. Gracias Tecno!',
  },
  {
    id: '6',
    name: 'Miguel Torres',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    role: 'Estudiante de Sistemas',
    rating: 5,
    comment: 'El soporte 24/7 es real. Tuve un problema a las 11pm y me respondieron en minutos. Muy profesionales.',
  },
  {
    id: '7',
    name: 'Isabella Moreno',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop',
    role: 'Estudiante de Negocios',
    rating: 5,
    comment: 'Ya recomende esta plataforma a todos mis amigos que vienen de otros estados. Es lo mejor que hay para estudiantes.',
  },
  {
    id: '8',
    name: 'Andres Ruiz',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop',
    role: 'Estudiante de Electronica',
    rating: 5,
    comment: 'Precio justo, ubicacion perfecta y todo legal. Que mas puedo pedir? Llevo 6 meses y todo perfecto.',
  },
];

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-shrink-0 w-80 bg-card rounded-xl p-6 border border-border shadow-sm mx-3">
      {/* Stars */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: review.rating }).map((_, i) => (
          <Star key={i} size={16} className="fill-primary text-primary" />
        ))}
      </div>
      
      {/* Comment */}
      <p className="text-foreground text-sm leading-relaxed mb-6 line-clamp-4">
        {'"'}{review.comment}{'"'}
      </p>
      
      {/* Author */}
      <div className="flex items-center gap-3">
        <img
          src={review.avatar}
          alt={review.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-medium text-sm text-foreground">{review.name}</p>
          <p className="text-xs text-muted-foreground">{review.role}</p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;
    const speed = 0.5;

    const scroll = () => {
      scrollPosition += speed;
      
      // Reset when we've scrolled through half the content (since we duplicate it)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(scroll);
    };

    animationId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationId);
  }, []);

  // Duplicate reviews for seamless loop
  const duplicatedReviews = [...reviews, ...reviews];

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Lo que dicen nuestros estudiantes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mas de 2,500 estudiantes ya encontraron su hogar ideal con nosotros
          </p>
        </div>
      </div>

      {/* Scrolling Reviews */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden py-4"
        style={{ scrollBehavior: 'auto' }}
      >
        {duplicatedReviews.map((review, index) => (
          <ReviewCard key={`${review.id}-${index}`} review={review} />
        ))}
      </div>
    </section>
  );
}
