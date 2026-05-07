'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

// Hook for counting animation
function useCountUp(target: number, duration: number = 2000) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !hasStarted) {
            setHasStarted(true);
          }
        },
        { threshold: 0.5 }
      );
      observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [hasStarted, target, duration]);

  return { count, ref };
}

// Typewriter hook
function useTypewriter(phrases: string[], typingSpeed: number = 100, deletingSpeed: number = 50, pauseTime: number = 2000) {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < currentPhrase.length) {
          setText(currentPhrase.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(text.slice(0, -1));
        } else {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return text;
}

export function HeroSection() {
  const router = useRouter();
  const typewriterText = useTypewriter(['Campus 1', 'Tu hogar ideal', 'Cerca de ti'], 120, 80, 1500);
  
  const { count: estudiantesSalvados, ref: estudiantesRef } = useCountUp(210, 2500);
  const { count: transaccionesSeguras, ref: transaccionesRef } = useCountUp(1847, 1800);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/habitaciones');
  };

  return (
    <section className="relative min-h-[90vh] bg-background pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Main Content */}
        <div className="text-center mb-20">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black text-foreground mb-8 leading-tight tracking-tight">
            Alojamiento<br />para Estudiantes
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed font-light">
            Encuentra habitaciones verificadas y seguras. 
            Hecho para y por estudiantes del Tecno.
          </p>
        </div>

        {/* Search Bar with Typewriter */}
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-24">
          <div className="flex gap-3 bg-card rounded-full shadow-lg p-1.5 border border-border">
            <div className="flex-1 flex items-center gap-3 px-6">
              <Search className="text-muted-foreground" size={20} />
              <div className="w-full py-3 text-lg text-foreground flex items-center">
                <span>{typewriterText}</span>
                <span className="ml-0.5 w-0.5 h-6 bg-primary animate-pulse"></span>
              </div>
            </div>
            <Button type="submit" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full px-8 h-12 font-semibold">
              Buscar
            </Button>
          </div>
        </form>

        {/* Features Grid - Apple style */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">100% Verificados</h3>
            <p className="text-muted-foreground leading-relaxed">Todos los anfitriones y estudiantes pasan verificacion rigurosa</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">Precios Justos</h3>
            <p className="text-muted-foreground leading-relaxed">Desde $350 MXN/noche. Sin comisiones ocultas</p>
          </div>

          <div className="text-center">
            <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg text-foreground mb-3">100% Seguro</h3>
            <p className="text-muted-foreground leading-relaxed">Pagos seguros y soporte 24/7 para tu tranquilidad</p>
          </div>
        </div>

        {/* Stats with Animated Counters */}
        <div className="grid md:grid-cols-4 gap-8 mt-28 pt-28 border-t border-border">
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Habitaciones</p>
          </div>
          <div className="text-center" ref={estudiantesRef}>
            <p className="text-4xl font-bold text-primary mb-2">{estudiantesSalvados}</p>
            <p className="text-muted-foreground">Estudiantes Foraneos Ayudados</p>
          </div>
          <div className="text-center" ref={transaccionesRef}>
            <p className="text-4xl font-bold text-primary mb-2">{transaccionesSeguras.toLocaleString()}</p>
            <p className="text-muted-foreground">Transacciones Seguras</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold text-primary mb-2">24/7</p>
            <p className="text-muted-foreground">Soporte</p>
          </div>
        </div>
      </div>
    </section>
  );
}
