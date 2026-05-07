'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/navbar';
import { Gallery } from '@/components/gallery';
import { Footer } from '@/components/footer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { ROOMS } from '@/lib/data';
import { MapPin, Check, AlertCircle, Share2, Heart, ChevronLeft } from 'lucide-react';

export default function RoomDetailPage() {
  const params = useParams();
  const roomId = params.id as string;
  const room = ROOMS.find((r) => r.id === roomId);
  const [isLoading, setIsLoading] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);

  if (!room) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-foreground mb-4">Habitación no encontrada</h1>
            <Link href="/habitaciones">
              <Button className="bg-primary text-primary-foreground">
                Volver a Habitaciones
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleReserve = () => {
    setIsLoading(true);
    setTimeout(() => {
      setShowContactModal(true);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingSpinner />}
      
      <Navbar />

      {/* Breadcrumb */}
      <section className="border-b border-border py-4 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/habitaciones" className="hover:text-primary flex items-center gap-1">
            <ChevronLeft size={16} />
            Atrás
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium">{room.title}</span>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images & Details */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery */}
              <Gallery images={room.images} title={room.title} />

              {/* Title & Status */}
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                      {room.title}
                    </h1>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={18} />
                      <span>{room.location}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Share2 size={20} />
                    </Button>
                    <Button variant="outline" size="icon">
                      <Heart size={20} />
                    </Button>
                  </div>
                </div>

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  {room.badges.map((badge, idx) => (
                    <span key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-4">Sobre esta habitación</h2>
                <p className="text-muted-foreground leading-relaxed mb-6">{room.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-foreground mb-3">Tipo de Habitación</h3>
                    <p className="text-muted-foreground">
                      {room.type === 'private' ? 'Privada' : 'Compartida'}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-3">Distancia al Campus</h3>
                    <p className="text-muted-foreground">{Math.round(room.distance / 100) / 10} km</p>
                  </div>
                </div>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Amenidades</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Baño Privado', value: room.features.privateWc },
                    { name: 'Amueblado', value: room.features.furnished },
                    { name: 'WiFi', value: room.features.wifi },
                    { name: 'Cocina', value: room.features.kitchen },
                    { name: 'Lavadora', value: room.features.washer },
                    { name: 'Aire Acondicionado', value: room.features.airCondition },
                  ].map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      {feature.value ? (
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="text-primary" size={16} />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full bg-muted" />
                      )}
                      <span className={feature.value ? 'text-foreground' : 'text-muted-foreground'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Host Info */}
              <div className="bg-white rounded-2xl border border-border p-8">
                <h2 className="text-2xl font-bold text-foreground mb-6">Anfitrión</h2>
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={room.host.avatar}
                    alt={room.host.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-bold text-foreground">{room.host.name}</h3>
                      {room.host.verified && (
                        <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs font-semibold">
                          <Check size={12} />
                          Verificado
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm">{room.host.bio}</p>
                  </div>
                </div>
                <Button className="w-full bg-secondary text-secondary-foreground hover:opacity-90">
                  Ver Perfil del Anfitrión
                </Button>
              </div>
            </div>

            {/* Right Column - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-white rounded-2xl border border-border p-8 shadow-lg space-y-6">
                {/* Price */}
                <div className="border-b border-border pb-6">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-4xl font-bold text-primary">${room.price}</span>
                    <span className="text-muted-foreground">/noche</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Comisión incluida (5%)</p>
                </div>

                {/* Info Box */}
                {room.studentsOnly && (
                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="text-primary flex-shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Solo para Estudiantes</p>
                      <p className="text-xs text-muted-foreground">Requiere carnet del Tecno válido</p>
                    </div>
                  </div>
                )}

                {/* CTA Buttons */}
                <Button
                  onClick={handleReserve}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
                >
                  Contactar y Reservar
                </Button>
                <Button variant="outline" className="w-full h-12">
                  Guardar para Después
                </Button>

                {/* Safety Info */}
                <div className="border-t border-border pt-6 space-y-3 text-sm">
                  <div className="flex gap-3">
                    <Check className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-muted-foreground">Pago seguro garantizado</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-muted-foreground">Anfitrión verificado</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="text-primary flex-shrink-0 mt-0.5" size={18} />
                    <span className="text-muted-foreground">Soporte 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal de Contacto Simulado */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-4 text-center animate-in">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-foreground mb-2">¡Solicitud Enviada!</h2>
            <p className="text-muted-foreground mb-6">
              Tu solicitud ha sido enviada a {room.host.name}. Te contactaremos pronto.
            </p>
            <Button
              onClick={() => setShowContactModal(false)}
              className="w-full bg-primary text-primary-foreground"
            >
              Cerrar
            </Button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
