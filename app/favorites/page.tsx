'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect, useMemo, useState } from 'react';
import { useFavorites } from '@/hooks/use-favorites';
import { cars } from '@/lib/data';
import CarsSection from '@/components/CarsSection';
import { useTranslation } from '@/lib/translations';

export default function FavoritesPage() {
  const [currentLang, setCurrentLang] = useState('az');
  const t = useTranslation(currentLang);
  const { favoriteIds } = useFavorites();

  useEffect(() => {
    const savedLang = localStorage.getItem('ramservis_language');
    if (savedLang && ['az', 'en', 'ru', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

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

  const favoriteCars = useMemo(() => cars.filter(c => favoriteIds.includes(c.id)), [favoriteIds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <Header currentLang={currentLang} handleLanguageChange={handleLanguageChange} t={t} />
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Seçilənlər
          </h1>
          <CarsSection
            cars={favoriteCars}
            t={t}
            currentLang={currentLang}
            getLocalizedCarClass={getLocalizedCarClass}
            getLocalizedFuelType={getLocalizedFuelType}
            getLocalizedTransmission={getLocalizedTransmission}
          />
          {favoriteCars.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 mt-8">Seçilmiş avtomobil yoxdur.</p>
          )}
        </div>
      </div>
      <Footer t={t} />
    </div>
  );
}


