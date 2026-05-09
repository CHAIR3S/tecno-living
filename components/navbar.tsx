'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, HelpCircle, UserPlus, LogOut, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
      setCurrentUser(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setShowDropdown(false);
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">T</span>
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:inline">Tecno</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Inicio
            </Link>
            <Link href="/habitaciones" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Explorar
            </Link>
            <Link href="/solicitudes" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Solicitudes
            </Link>
            <Link href="/#como-funciona" className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 transition-colors">
              Cómo funciona
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex">
              <Search size={20} className="text-foreground" />
            </button>
            <button className="p-2 hover:bg-secondary rounded-full transition-colors hidden sm:flex">
              <HelpCircle size={20} className="text-foreground" />
            </button>
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 p-2 hover:bg-secondary rounded-full transition-colors"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium text-foreground hidden sm:inline">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl border border-border shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">{currentUser.name}</p>
                      <p className="text-xs text-muted-foreground">{currentUser.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/registro">
                <Button className="bg-primary text-primary-foreground hover:bg-apple-blue-dark h-9 px-4 sm:px-5 rounded-full text-sm font-medium">
                  <UserPlus size={16} className="mr-2" />
                  <span>Registrarse</span>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
