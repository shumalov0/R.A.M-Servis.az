'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { cars } from '@/lib/data';
import { useTranslation } from '@/lib/translations';
import CarsSection from '@/components/CarsSection';
import CarsFilters, { SortOption } from '@/components/CarsFilters';
import { useDebouncedValue } from '@/hooks/use-debounced-value';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function CarsPage() {
  const [currentLang, setCurrentLang] = useState('az');
  const t = useTranslation(currentLang);
  const params = useSearchParams();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search, 300);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 9999]);
  const [year, setYear] = useState<number | undefined>(undefined);
  const [carClass, setCarClass] = useState<string | undefined>(undefined);
  const [sort, setSort] = useState<SortOption>('price-asc');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedLang = localStorage.getItem('ramservis_language');
    if (savedLang && ['az', 'en', 'ru', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
    
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // if navigated with class from categories, preset class filter
    const cls = params?.get('class');
    if (cls) setCarClass(cls);
  }, [params]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('ramservis_language', lang);
  };

  const getLocalizedCarClass = (carClass: string) => {
    const classMap: Record<string, Record<string, string>> = {
      'Ekonom': { az: 'Ekonom', en: 'Economy', ru: 'Эконом' },
      'Biznes': { az: 'Biznes', en: 'Business', ru: 'Бизнес' },
      'Premium': { az: 'Premium', en: 'Premium', ru: 'Премиум' },
      'Lüks': { az: 'Lüks', en: 'Luxury', ru: 'Люкс' },
      'Komfort': { az: 'Komfort', en: 'Comfort', ru: 'Комфорт' },
      'SUV': { az: 'SUV', en: 'SUV', ru: 'Внедорожник' },
    };
    return classMap[carClass]?.[currentLang] || carClass;
  };

  const getLocalizedFuelType = (fuelType: string) => {
    const fuelMap: Record<string, Record<string, string>> = {
      'Benzin': { az: 'Benzin', en: 'Gasoline', ru: 'Бензин' },
      'Dizel': { az: 'Dizel', en: 'Diesel', ru: 'Дизель' },
      'Hybrid': { az: 'Hibrid', en: 'Hybrid', ru: 'Гибрид' },
    };
    return fuelMap[fuelType]?.[currentLang] || fuelType;
  };

  const getLocalizedTransmission = (transmission: string) => {
    const transmissionMap: Record<string, Record<string, string>> = {
      'Avtomat': { az: 'Avtomat', en: 'Automatic', ru: 'Автомат' },
      'Mexanika': { az: 'Mexanika', en: 'Manual', ru: 'Механика' },
    };
    return transmissionMap[transmission]?.[currentLang] || transmission;
  };

  // derive min/max defaults once
  const minPriceDefault = Math.min(...cars.map(c => c.dailyPrice));
  const maxPriceDefault = Math.max(...cars.map(c => c.dailyPrice));
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (!initialized) {
      setPriceRange([minPriceDefault, maxPriceDefault]);
      setInitialized(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialized]);

  const filtered = cars
    .filter((c) => {
      const matchesSearch = debouncedSearch
        ? `${c.brand} ${c.model}`.toLowerCase().includes(debouncedSearch.toLowerCase())
        : true;
      const matchesPrice = c.dailyPrice >= priceRange[0] && c.dailyPrice <= priceRange[1];
      const matchesYear = year ? c.year >= year : true;
      const matchesClass = carClass ? c.class === carClass : true;
      return matchesSearch && matchesPrice && matchesYear && matchesClass;
    })
    .sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.dailyPrice - b.dailyPrice;
        case 'price-desc':
          return b.dailyPrice - a.dailyPrice;
        case 'year-desc':
          return b.year - a.year;
        case 'year-asc':
          return a.year - b.year;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70  transition-colors duration-300">
      <Header currentLang={currentLang} handleLanguageChange={handleLanguageChange} t={t} />
      
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[60vh]">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
<div className="py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-7xl mx-auto">

    {/* Filters üst hissədə */}
    <div className="mb-8 max-w-5xl mx-auto">
      <CarsFilters
        cars={cars}
        search={search}
        onSearchChange={setSearch}
        priceRange={priceRange}
        onPriceRangeChange={setPriceRange}
        year={year}
        onYearChange={setYear}
        carClass={carClass}
        onCarClassChange={setCarClass}
        sort={sort}
        onSortChange={setSort}
        onReset={() => {
          setSearch('');
          setPriceRange([minPriceDefault, maxPriceDefault]);
          setYear(undefined);
          setCarClass(undefined);
          setSort('price-asc');
        }}
      />
    </div>

    {/* Maşınların listi */}
    <CarsSection 
      cars={filtered} 
      t={t} 
      currentLang={currentLang} 
      getLocalizedCarClass={getLocalizedCarClass} 
      getLocalizedFuelType={getLocalizedFuelType} 
      getLocalizedTransmission={getLocalizedTransmission} 
    />
  </div>
</div>
      )}
      
      <Footer t={t} />
    </div>
  );
}