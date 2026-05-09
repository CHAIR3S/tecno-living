'use client';

import { useEffect, useMemo, useState } from 'react';
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
  const [isLiked, setIsLiked] = useState(false);
  const [showLikeAnimation, setShowLikeAnimation] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const [showBookingPanel, setShowBookingPanel] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [saveSuccess, setSaveSuccess] = useState(false);

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

  // Load liked status from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && room) {
      const likedRooms = JSON.parse(localStorage.getItem('likedRooms') || '[]');
      setIsLiked(likedRooms.includes(room.id));
    }
  }, [room]);

  const today = useMemo(() => {
    const date = new Date();
    return date.toISOString().slice(0, 10);
  }, []);

  const nights = useMemo(() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  }, [startDate, endDate]);

  const totalPrice = useMemo(() => nights * room.price, [nights, room.price]);
  const isValidBooking = Boolean(startDate && endDate && nights > 0);

  const handleOpenBooking = () => {
    setShowBookingPanel(true);
  };

  const handleSaveForLater = () => {
    if (typeof window === 'undefined' || !room) return;
    const savedRooms = JSON.parse(localStorage.getItem('savedRooms') || '[]');
    const exists = savedRooms.some((item: any) => item.roomId === room.id);
    if (!exists) {
      savedRooms.unshift({
        id: `saved-${room.id}`,
        roomId: room.id,
        title: room.title,
        hostName: room.host.name,
        hostAvatar: room.host.avatar,
        image: room.image,
        price: room.price,
        savedAt: new Date().toISOString(),
      });
      localStorage.setItem('savedRooms', JSON.stringify(savedRooms));
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2000);
    }
  };

  const handleBookNow = () => {
    if (typeof window === 'undefined' || !room || !isValidBooking) return;

    const bookingRequests = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    bookingRequests.unshift({
      id: `req-${room.id}-${Date.now()}`,
      roomId: room.id,
      roomTitle: room.title,
      hostName: room.host.name,
      hostAvatar: room.host.avatar,
      roomImage: room.image,
      startDate,
      endDate,
      nights,
      pricePerNight: room.price,
      totalPrice,
      status: 'pendiente',
      createdAt: new Date().toISOString(),
      lastMessage: 'Tu solicitud de reserva ha sido enviada al anfitrión.',
    });
    localStorage.setItem('bookingRequests', JSON.stringify(bookingRequests));
    setShowContactModal(true);
    setShowBookingPanel(false);
    setStartDate('');
    setEndDate('');
  };

  const handleLike = () => {
    if (typeof window === 'undefined' || !room) return;

    const likedRooms = JSON.parse(localStorage.getItem('likedRooms') || '[]');
    const newLiked = !isLiked;

    if (newLiked) {
      if (!likedRooms.includes(room.id)) {
        likedRooms.push(room.id);
      }
      setShowLikeAnimation(true);
      setTimeout(() => setShowLikeAnimation(false), 600);
    } else {
      const index = likedRooms.indexOf(room.id);
      if (index > -1) {
        likedRooms.splice(index, 1);
      }
    }

    localStorage.setItem('likedRooms', JSON.stringify(likedRooms));
    setIsLiked(newLiked);
  };

  const handleShare = async () => {
    if (typeof window === 'undefined' || !room) return;

    const shareUrl = `https://tecno-living.vercel.app/habitaciones/${room.id}`;
    const shareText = `Mira esta habitación en Tecno Living: ${room.title}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Tecno Living - ' + room.title,
          text: shareText,
          url: shareUrl,
        });
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        // User cancelled share or unsupported
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2000);
      } catch (err) {
        alert('Comparte este enlace: ' + shareUrl);
      }
    }
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
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleShare}
                      className="relative"
                    >
                      <Share2 size={20} />
                      {shareSuccess && (
                        <span className="absolute -top-1 -right-1 text-[10px] bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center">✓</span>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleLike}
                      className={`relative ${isLiked ? 'bg-red-50 border-red-200' : ''}`}
                    >
                      <Heart
                        size={20}
                        className={isLiked ? 'fill-red-500 text-red-500' : ''}
                      />
                      {showLikeAnimation && (
                        <span className="absolute inset-0 flex items-center justify-center heart-animation">
                          <Heart size={20} className="fill-red-500 text-red-500" />
                        </span>
                      )}
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
                  <div className="grow">
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
                    <AlertCircle className="text-primary shrink-0 mt-0.5" size={20} />
                    <div>
                      <p className="font-semibold text-foreground text-sm">Solo para Estudiantes</p>
                      <p className="text-xs text-muted-foreground">Requiere carnet del Tecno válido</p>
                    </div>
                  </div>
                )}

                {/* Booking Panel */}
                {showBookingPanel ? (
                  <div className="bg-slate-50 rounded-3xl border border-border p-6 space-y-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Selecciona tus fechas</h3>
                        <p className="text-sm text-muted-foreground">Verás el precio según la duración.</p>
                      </div>
                      <Button variant="ghost" size="sm" onClick={() => setShowBookingPanel(false)}>
                        Cancelar
                      </Button>
                    </div>
                    <div className="grid gap-4">
                      <label className="text-sm text-foreground">
                        Fecha de entrada
                        <input
                          type="date"
                          value={startDate}
                          min={today}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-border px-4 py-3 bg-white text-sm text-foreground outline-none focus:border-primary"
                        />
                      </label>
                      <label className="text-sm text-foreground">
                        Fecha de salida
                        <input
                          type="date"
                          value={endDate}
                          min={startDate || today}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="mt-2 w-full rounded-2xl border border-border px-4 py-3 bg-white text-sm text-foreground outline-none focus:border-primary"
                        />
                      </label>
                    </div>
                    <div className="rounded-3xl border border-border bg-white p-4 text-sm text-muted-foreground">
                      <div className="flex items-center justify-between mb-2">
                        <span>Precio por noche</span>
                        <span className="font-semibold text-foreground">${room.price}</span>
                      </div>
                      {isValidBooking ? (
                        <>
                          <div className="flex items-center justify-between mb-1">
                            <span>Días seleccionados</span>
                            <span className="text-foreground font-semibold">{nights} noche{nights !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center justify-between border-t border-border pt-3 text-foreground font-semibold">
                            <span>Total estimado</span>
                            <span>${totalPrice}</span>
                          </div>
                        </>
                      ) : (
                        <p className="text-muted-foreground">Selecciona fechas de entrada y salida válidas para calcular el precio.</p>
                      )}
                    </div>
                    <Button
                      onClick={handleBookNow}
                      disabled={!isValidBooking}
                      className="w-full h-12 font-semibold"
                    >
                      Reservar ahora
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={handleOpenBooking}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12 text-base font-semibold"
                  >
                    Contactar y Reservar
                  </Button>
                )}
                <Button
                  variant="outline"
                  className="w-full h-12"
                  onClick={handleSaveForLater}
                >
                  Guardar para Después
                </Button>
                {saveSuccess && (
                  <p className="text-sm text-green-600">Guardado para después. Consulta tus solicitudes pendientes.</p>
                )}

                {/* Safety Info */}
                <div className="border-t border-border pt-6 space-y-3 text-sm">
                  <div className="flex gap-3">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span className="text-muted-foreground">Pago seguro garantizado</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
                    <span className="text-muted-foreground">Anfitrión verificado</span>
                  </div>
                  <div className="flex gap-3">
                    <Check className="text-primary shrink-0 mt-0.5" size={18} />
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
