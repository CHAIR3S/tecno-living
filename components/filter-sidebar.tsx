'use client';

import { FilterState } from '@/lib/types';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Filter } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
}

export function FilterSidebar({ filters, onFiltersChange }: FilterSidebarProps) {
  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleTypeChange = (value: string) => {
    onFiltersChange({
      ...filters,
      type: value as 'all' | 'private' | 'shared',
    });
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    onFiltersChange({
      ...filters,
      [field]: checked,
    });
  };

  const handleReset = () => {
    onFiltersChange({
      priceRange: [300, 800],
      type: 'all',
      privateWc: false,
      furnished: false,
      studentsOnly: false,
      verified: false,
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 h-fit sticky top-24">
      <div className="flex items-center gap-2 mb-8">
        <h3 className="font-semibold text-lg text-foreground">Filtros</h3>
      </div>

      {/* Price Range */}
      <div className="mb-10">
        <Label className="font-medium text-sm text-foreground block mb-4">Precio: ${filters.priceRange[0]} - ${filters.priceRange[1]}</Label>
        <Slider
          value={[filters.priceRange[0], filters.priceRange[1]]}
          onValueChange={handlePriceChange}
          min={300}
          max={800}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-3">
          <span>${filters.priceRange[0]}</span>
          <span>${filters.priceRange[1]}</span>
        </div>
      </div>

      {/* Room Type */}
      <div className="mb-8">
        <Label className="font-semibold text-foreground block mb-3">Tipo de Habitación</Label>
        <RadioGroup value={filters.type} onValueChange={handleTypeChange}>
          <div className="flex items-center gap-2 mb-2">
            <RadioGroupItem value="all" id="type-all" />
            <Label htmlFor="type-all" className="font-normal cursor-pointer">
              Todas
            </Label>
          </div>
          <div className="flex items-center gap-2 mb-2">
            <RadioGroupItem value="private" id="type-private" />
            <Label htmlFor="type-private" className="font-normal cursor-pointer">
              Privada
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <RadioGroupItem value="shared" id="type-shared" />
            <Label htmlFor="type-shared" className="font-normal cursor-pointer">
              Compartida
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Amenities */}
      <div className="mb-8">
        <Label className="font-semibold text-foreground block mb-3">Amenidades</Label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="private-wc"
              checked={filters.privateWc}
              onCheckedChange={(checked) => handleCheckboxChange('privateWc', checked as boolean)}
            />
            <Label htmlFor="private-wc" className="font-normal cursor-pointer">
              Baño Privado
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="furnished"
              checked={filters.furnished}
              onCheckedChange={(checked) => handleCheckboxChange('furnished', checked as boolean)}
            />
            <Label htmlFor="furnished" className="font-normal cursor-pointer">
              Amueblado
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="students-only"
              checked={filters.studentsOnly}
              onCheckedChange={(checked) => handleCheckboxChange('studentsOnly', checked as boolean)}
            />
            <Label htmlFor="students-only" className="font-normal cursor-pointer">
              Solo Estudiantes
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="verified"
              checked={filters.verified}
              onCheckedChange={(checked) => handleCheckboxChange('verified', checked as boolean)}
            />
            <Label htmlFor="verified" className="font-normal cursor-pointer">
              Solo Verificados
            </Label>
          </div>
        </div>
      </div>

      {/* Reset Button */}
      <Button onClick={handleReset} variant="outline" className="w-full">
        Limpiar Filtros
      </Button>
    </div>
  );
}
