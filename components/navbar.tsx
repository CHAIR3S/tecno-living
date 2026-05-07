'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, UserPlus } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:inline">Tecno</span>
          </Link>

          {/* Center Nav - Desktop only */}
          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Inicio
            </Link>
            <Link href="/habitaciones" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Explorar
            </Link>
            <Link href="/#como-funciona" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Cómo funciona
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex">
              <Search size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex">
              <HelpCircle size={20} className="text-foreground" />
            </button>
            <Link href="/registro">
              <Button className="bg-primary text-primary-foreground hover:bg-apple-blue-dark h-9 px-4 sm:px-5 rounded-full text-sm font-medium">
                <UserPlus size={16} className="mr-2" />
                <span>Registrarse</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
