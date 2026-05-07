'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Room } from '@/lib/types';
import { MapPin, Star, Check } from 'lucide-react';

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <Link href={`/habitaciones/${room.id}`}>
      <div className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/30 transition-all duration-300 cursor-pointer h-full flex flex-col hover:shadow-sm">
        {/* Image Container */}
        <div className="relative w-full h-56 overflow-hidden bg-muted">
          <img
            src={room.image}
            alt={room.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
          />
          {room.verified && (
            <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full flex items-center gap-1 text-xs font-semibold">
              <Check size={14} />
              Verificado
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Price */}
          <div className="mb-3 flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-foreground">${room.price}</span>
            <span className="text-sm text-muted-foreground">/noche</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-foreground mb-2 line-clamp-2 text-base">
            {room.title}
          </h3>

          {/* Location */}
          <div className="flex items-start gap-2 text-muted-foreground text-sm mb-4">
            <MapPin size={16} className="flex-shrink-0 mt-0.5" />
            <span className="line-clamp-1">{room.location}</span>
          </div>

          {/* Features - Simple text */}
          <div className="flex flex-wrap gap-2 mb-5 text-xs text-muted-foreground">
            {room.features.privateWc && <span>Baño privado</span>}
            {room.features.furnished && <span>•</span>}
            {room.features.furnished && <span>Amueblado</span>}
            {room.features.wifi && <span>•</span>}
            {room.features.wifi && <span>WiFi</span>}
          </div>

          {/* Host */}
          <div className="flex items-center gap-2 mt-auto pt-4 border-t border-border">
            <img
              src={room.host.avatar}
              alt={room.host.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="flex-grow min-w-0">
              <p className="font-medium text-xs text-foreground line-clamp-1">{room.host.name}</p>
            </div>
            {room.host.verified && (
              <Check size={14} className="text-primary flex-shrink-0" />
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
