'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, MessageSquare, Bookmark } from 'lucide-react';

interface BookingRequest {
  id: string;
  roomId: string;
  roomTitle: string;
  hostName: string;
  hostAvatar: string;
  roomImage: string;
  startDate: string;
  endDate: string;
  nights: number;
  pricePerNight: number;
  totalPrice: number;
  status: string;
  createdAt: string;
  lastMessage: string;
}

interface SavedRoom {
  id: string;
  roomId: string;
  title: string;
  hostName: string;
  hostAvatar: string;
  image: string;
  price: number;
  savedAt: string;
}

export default function BookingRequestsPage() {
  const [requests, setRequests] = useState<BookingRequest[]>([]);
  const [savedRooms, setSavedRooms] = useState<SavedRoom[]>([]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedRequests = JSON.parse(localStorage.getItem('bookingRequests') || '[]');
    const storedSaved = JSON.parse(localStorage.getItem('savedRooms') || '[]');

    setRequests(Array.isArray(storedRequests) ? storedRequests : []);
    setSavedRooms(Array.isArray(storedSaved) ? storedSaved : []);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-10">
          <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm text-primary font-semibold uppercase tracking-[0.3em]">Tus solicitudes</p>
              <h1 className="mt-3 text-4xl font-bold text-foreground">Solicitudes y guardados</h1>
              <p className="mt-3 text-base text-muted-foreground max-w-2xl">
                Aquí puedes revisar tus reservas pendientes y las habitaciones que guardaste para más tarde.
              </p>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Link href="/habitaciones">
                <Button variant="secondary" className="h-12">
                  Explorar habitaciones
                </Button>
              </Link>
              <Link href="/">
                <Button className="h-12">
                  Volver al inicio
                </Button>
              </Link>
            </div>
          </header>

          <section className="grid lg:grid-cols-[2fr_1fr] gap-8">
            <div className="space-y-6">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <MessageSquare size={24} className="text-primary" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Solicitudes pendientes</p>
                    <h2 className="text-2xl font-semibold text-foreground">Mensajes</h2>
                  </div>
                </div>

                {requests.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground">
                    No tienes solicitudes de reserva pendientes todavía.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {requests.map((request) => (
                      <article key={request.id} className="rounded-3xl border border-border bg-slate-50 p-5 shadow-sm">
                        <div className="flex items-start gap-4">
                          <img src={request.roomImage} alt={request.roomTitle} className="h-20 w-20 rounded-3xl object-cover" />
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <div>
                                <h3 className="text-lg font-semibold text-foreground">{request.roomTitle}</h3>
                                <p className="text-sm text-muted-foreground">Anfitrión: {request.hostName}</p>
                              </div>
                              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                                {request.status}
                              </span>
                            </div>
                            <div className="mt-4 rounded-3xl border border-border bg-white p-4 text-sm leading-6 text-muted-foreground">
                              <p className="font-medium text-foreground">{request.lastMessage}</p>
                              <p className="mt-3">
                                {request.startDate} → {request.endDate} · {request.nights} noche{request.nights !== 1 ? 's' : ''}
                              </p>
                              <p className="mt-1 text-sm text-foreground">
                                Total: <span className="font-semibold">${request.totalPrice}</span>
                              </p>
                            </div>
                            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                              <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1">
                                <Clock size={14} /> {new Date(request.createdAt).toLocaleDateString('es-ES')}
                              </span>
                              <Link href={`/habitaciones/${request.roomId}`} className="inline-flex items-center gap-2 text-primary hover:underline">
                                Ver habitación <ArrowRight size={14} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-border bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Bookmark size={24} className="text-primary" />
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Guardados</p>
                    <h2 className="text-2xl font-semibold text-foreground">Ver después</h2>
                  </div>
                </div>

                {savedRooms.length === 0 ? (
                  <div className="rounded-3xl border border-dashed border-border p-8 text-center text-muted-foreground">
                    No tienes habitaciones guardadas.
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedRooms.map((room) => (
                      <div key={room.id} className="flex items-center gap-4 rounded-3xl border border-border bg-slate-50 p-4">
                        <img src={room.image} alt={room.title} className="h-20 w-20 rounded-3xl object-cover" />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-semibold text-foreground">{room.title}</h3>
                          <p className="text-sm text-muted-foreground">Anfitrión: {room.hostName}</p>
                          <p className="mt-2 text-sm text-foreground font-semibold">${room.price} / noche</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
