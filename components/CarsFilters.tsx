'use client';

import { useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Car } from '@/lib/data';
import { Search, RotateCcw } from 'lucide-react';

export type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'year-asc';

interface CarsFiltersProps {
  cars: Car[];
  search: string;
  onSearchChange: (v: string) => void;
  priceRange: [number, number];
  onPriceRangeChange: (v: [number, number]) => void;
  year: number | undefined;
  onYearChange: (v: number | undefined) => void;
  carClass: string | undefined;
  onCarClassChange: (v: string | undefined) => void;
  sort: SortOption;
  onSortChange: (v: SortOption) => void;
  onReset: () => void;
}

export default function CarsFilters({
  cars,
  search,
  onSearchChange,
  priceRange,
  onPriceRangeChange,
  year,
  onYearChange,
  carClass,
  onCarClassChange,
  sort,
  onSortChange,
  onReset,
}: CarsFiltersProps) {
  const { minPrice, maxPrice, minYear, maxYear, classes } = useMemo(() => {
    const prices = cars.map((c) => c.dailyPrice);
    const years = cars.map((c) => c.year);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const minYear = Math.min(...years);
    const maxYear = Math.max(...years);
    const classes = Array.from(new Set(cars.map((c) => c.class)));
    return { minPrice, maxPrice, minYear, maxYear, classes };
  }, [cars]);

  return (
            <div className="rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/80 dark:bg-brand-dark/70 backdrop-blur p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200">Filtrlər</h3>
        <Button variant="ghost" size="sm" onClick={onReset} className="text-gray-600 dark:text-gray-300 hover:text-brand-gold">
          <RotateCcw className="h-4 w-4 mr-2" />Sıfırla
        </Button>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="search" className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Axtarış</Label>
          <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              id="search"
              placeholder="Marka və ya model"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <Label className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Günlük qiymət</Label>
            <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">${priceRange[0]} - ${priceRange[1]}</span>
          </div>
          <div className="px-1 mt-3">
            <Slider
              min={minPrice}
              max={maxPrice}
              step={5}
              value={[priceRange[0], priceRange[1]]}
              onValueChange={(v) => onPriceRangeChange([v[0], v[1]] as [number, number])}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">İl (min)</Label>
            <Select onValueChange={(v) => onYearChange(v === '__all__' ? undefined : Number(v))} value={year ? String(year) : '__all__'}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Hamısı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Hamısı</SelectItem>
                {Array.from({ length: maxYear - minYear + 1 }, (_, i) => maxYear - i).map((y) => (
                  <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Sinif</Label>
            <Select onValueChange={(v) => onCarClassChange(v === '__all__' ? undefined : v)} value={carClass || '__all__'}>
              <SelectTrigger className="mt-2">
                <SelectValue placeholder="Hamısı" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all__">Hamısı</SelectItem>
                {classes.map((cls) => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Sıralama</Label>
          <Select onValueChange={(v) => onSortChange(v as SortOption)} value={sort}>
            <SelectTrigger className="mt-2">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price-asc">Ən ucuz</SelectItem>
              <SelectItem value="price-desc">Ən bahalı</SelectItem>
              <SelectItem value="year-desc">Ən yeni</SelectItem>
              <SelectItem value="year-asc">Ən köhnə</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}


