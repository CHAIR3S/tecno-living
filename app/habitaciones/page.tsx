'use client';

import { useState, useMemo } from 'react';
import { Navbar } from '@/components/navbar';
import { FilterSidebar } from '@/components/filter-sidebar';
import { RoomCard } from '@/components/room-card';
import { Footer } from '@/components/footer';
import { LoadingSpinner } from '@/components/loading-spinner';
import { Button } from '@/components/ui/button';
import { ROOMS } from '@/lib/data';
import { FilterState } from '@/lib/types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ROOMS_PER_PAGE = 9;

export default function HabitacionesPage() {
  const [filters, setFilters] = useState<FilterState>({
    priceRange: [300, 800],
    type: 'all',
    privateWc: false,
    furnished: false,
    studentsOnly: false,
    verified: false,
    instanceType: 'all',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  // Filter rooms based on criteria
  const filteredRooms = useMemo(() => {
    return ROOMS.filter((room) => {
      // Price filter
      if (room.price < filters.priceRange[0] || room.price > filters.priceRange[1]) {
        return false;
      }

      // Type filter
      if (filters.type !== 'all' && room.type !== filters.type) {
        return false;
      }

      // Private WC filter
      if (filters.privateWc && !room.features.privateWc) {
        return false;
      }

      // Furnished filter
      if (filters.furnished && !room.features.furnished) {
        return false;
      }

      // Students only filter
      if (filters.studentsOnly && !room.studentsOnly) {
        return false;
      }

      // Verified filter
      if (filters.verified && !room.verified) {
        return false;
      }

      // Instance type filter
      if (filters.instanceType !== 'all' && room.instanceType !== filters.instanceType) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Pagination
  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const paginatedRooms = filteredRooms.slice(
    (currentPage - 1) * ROOMS_PER_PAGE,
    currentPage * ROOMS_PER_PAGE
  );

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  // Handle pagination with loading
  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  return (
    <div className="min-h-screen bg-background">
      {isLoading && <LoadingSpinner />}
      
      <Navbar />

      {/* Header */}
      <section className="bg-linear-to-r from-primary/10 to-accent/10 border-b border-border py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-2">
            Habitaciones Disponibles
          </h1>
          <p className="text-muted-foreground">
            {filteredRooms.length} habitación{filteredRooms.length !== 1 ? 's' : ''} encontrada{filteredRooms.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FilterSidebar filters={filters} onFiltersChange={handleFiltersChange} />
            </div>

            {/* Rooms Grid */}
            <div className="lg:col-span-3">
              {filteredRooms.length === 0 ? (
                <div className="bg-white rounded-2xl border border-border p-12 text-center">
                  <div className="text-6xl mb-4">🏠</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">No se encontraron habitaciones</h3>
                  <p className="text-muted-foreground mb-6">
                    Intenta ajustar los filtros para ver más opciones
                  </p>
                  <Button
                    onClick={() => handleFiltersChange({
                      priceRange: [15, 50],
                      type: 'all',
                      privateWc: false,
                      furnished: false,
                      studentsOnly: false,
                      verified: false,
                    })}
                    className="bg-primary text-primary-foreground"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              ) : (
                <>
                  {/* Grid */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {paginatedRooms.map((room) => (
                      <RoomCard key={room.id} room={room} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        variant="outline"
                        className="gap-2"
                      >
                        <ChevronLeft size={18} />
                        Anterior
                      </Button>

                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            variant={currentPage === page ? 'default' : 'outline'}
                            className={currentPage === page ? 'bg-primary text-primary-foreground' : ''}
                            size="sm"
                          >
                            {page}
                          </Button>
                        ))}
                      </div>

                      <Button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        className="gap-2"
                      >
                        Siguiente
                        <ChevronRight size={18} />
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
