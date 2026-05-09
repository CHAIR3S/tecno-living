'use client';

import { useEffect, useState, useRef } from 'react';
import { Shield, CreditCard, FileText, UserCheck, Star, Headphones } from 'lucide-react';

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

export function SecuritySection() {
  const { count: estudiantesAyudados, ref: estudiantesRef } = useCountUp(210, 2500);
  const { count: transaccionesSeguras, ref: transaccionesRef } = useCountUp(1847, 1800);

  const features = [
    {
      icon: Shield,
      title: 'Identidad Verificada',
      description: 'Todos los usuarios pasan verificacion rigurosa de identidad antes de usar la plataforma.',
    },
    {
      icon: CreditCard,
      title: 'Pagos Seguros',
      description: 'Utilizamos encriptacion SSL y procesadores de pago certificados para proteger tus datos.',
    },
    {
      icon: FileText,
      title: 'Contratos Claros',
      description: 'Establece terminos claros con el anfitrion. Todos los acuerdos quedan documentados.',
    },
    {
      icon: UserCheck,
      title: 'Proteccion al Usuario',
      description: 'Contamos con seguros y medidas para proteger tanto estudiantes como anfitriones.',
    },
    {
      icon: Star,
      title: 'Sistema de Calificacion',
      description: 'Resenas verificadas de usuarios reales que te ayudan a elegir bien.',
    },
    {
      icon: Headphones,
      title: 'Soporte 24/7',
      description: 'Nuestro equipo esta disponible siempre para resolver problemas o inquietudes.',
    },
  ];

  return (
    <section id="seguridad" className="py-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Tu Seguridad es Nuestra Prioridad
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Implementamos multiples capas de seguridad para protegerte en cada paso
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, idx) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={idx}
                className="bg-card rounded-xl p-8 border border-border hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-5">
                  <IconComponent size={24} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>

        {/* Trust Badges with Animated Counters */}
        <div className="mt-20 grid md:grid-cols-2 gap-6 bg-muted/50 rounded-xl p-10 border border-border">
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-1">500+</p>
            <p className="text-sm text-muted-foreground">Habitaciones Disponibles</p>
          </div>
          {/* <div className="text-center" ref={estudiantesRef}>
            <p className="text-3xl font-bold text-primary mb-1">{estudiantesAyudados}</p>
            <p className="text-sm text-muted-foreground">Estudiantes Foraneos Ayudados</p>
          </div>
          <div className="text-center" ref={transaccionesRef}>
            <p className="text-3xl font-bold text-primary mb-1">{transaccionesSeguras.toLocaleString()}</p>
            <p className="text-sm text-muted-foreground">Transacciones Seguras</p>
          </div> */}
          <div className="text-center">
            <p className="text-3xl font-bold text-primary mb-1">4.9/5</p>
            <p className="text-sm text-muted-foreground">Rating Promedio</p>
          </div>
        </div>
      </div>
    </section>
  );
}
