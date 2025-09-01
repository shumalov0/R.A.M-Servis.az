'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Car as CarIcon, Users, Fuel, Settings, Calendar, MapPin, Phone, MessageCircle, 
  CreditCard, ArrowLeft, CheckCircle, AlertCircle, Star, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Car } from '@/lib/data';
import { useTranslation } from '@/lib/translations';
import CarDetailClient from '@/components/CarDetailClient';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ThemeToggle from '@/components/ThemeToggle';
import MobileMenu from '@/components/MobileMenu';
import OnlineBookingForm from '@/components/OnlineBookingForm';
import { useFavorites } from '@/hooks/use-favorites';
import { Heart } from 'lucide-react';
import Header from './Header';

interface CarDetailPageContentProps {
  car: Car;
  initialLang: string;
}

export default function CarDetailPageContent({ car, initialLang }: CarDetailPageContentProps) {
  const [currentLang, setCurrentLang] = useState(initialLang);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const t = useTranslation(currentLang);
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedLang = localStorage.getItem('ramservis_language');
    if (savedLang && ['az', 'en', 'ru', 'ar'].includes(savedLang)) {
      setCurrentLang(savedLang);
    }
  }, []);

  useEffect(() => {
    if (showBookingForm && bookingRef.current) {
      bookingRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus first input after scroll
      setTimeout(() => {
        const first = bookingRef.current?.querySelector('#firstName') as HTMLInputElement | null;
        first?.focus({ preventScroll: true });
      }, 500);
    }
  }, [showBookingForm]);

  const handleLanguageChange = (lang: string) => {
    setCurrentLang(lang);
    localStorage.setItem('ramservis_language', lang);
  };

  const getLocalizedCarClass = (carClass: string) => {
    const classMap: Record<string, Record<string, string>> = {
      'Ekonom': { az: 'Ekonom', en: 'Economy', ru: 'Эконом', ar: 'اقتصادي' },
      'Biznes': { az: 'Biznes', en: 'Business', ru: 'Бизнес', ar: 'أعمال' },
      'Premium': { az: 'Premium', en: 'Premium', ru: 'Премиум', ar: 'بريميوم' },
      'Lüks': { az: 'Lüks', en: 'Luxury', ru: 'Люкс', ar: 'فاخر' },
      'Komfort': { az: 'Komfort', en: 'Comfort', ru: 'Комфорт', ar: 'مريح' },
      'SUV': { az: 'SUV', en: 'SUV', ru: 'Внедорожник', ar: 'دفع رباعي' },
    };
    return classMap[carClass]?.[currentLang] || carClass;
  };

  const getLocalizedFuelType = (fuelType: string) => {
    const fuelMap: Record<string, Record<string, string>> = {
      'Benzin': { az: 'Benzin', en: 'Gasoline', ru: 'Бензин', ar: 'بنزين' },
      'Dizel': { az: 'Dizel', en: 'Diesel', ru: 'Дизель', ar: 'ديزل' },
      'Hybrid': { az: 'Hibrid', en: 'Hybrid', ru: 'Гибрид', ar: 'هجين' },
    };
    return fuelMap[fuelType]?.[currentLang] || fuelType;
  };

  const getLocalizedTransmission = (transmission: string) => {
    const transmissionMap: Record<string, Record<string, string>> = {
      'Avtomat': { az: 'Avtomat', en: 'Automatic', ru: 'Автомат', ar: 'أوتوماتيك' },
      'Mexanika': { az: 'Mexanika', en: 'Manual', ru: 'Механика', ar: 'يدوي' },
    };
    return transmissionMap[transmission]?.[currentLang] || transmission;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br   from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70  duration-300">
      <Header
        currentLang={currentLang}
        handleLanguageChange={handleLanguageChange}
        t={t}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Car Image and Gallery */}
          <div className="space-y-6">
            <Gallery images={car.images && car.images.length > 0 ? car.images : [car.image]} brand={car.brand} model={car.model} />
            
            {/* Features */}
            <Card className="bg-white/80 dark:bg-brand-dark/70  backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span>{t.features}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {car.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Car Details and Booking */}
          <div className="space-y-8">
            {/* Car Info */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                {car.brand} {car.model}
              </h1>
              <p className="text-2xl font-semibold text-[#f5b754] dark:text-[#f5b754] mb-6">
                ${car.dailyPrice}{t.perDay} başlayaraq
              </p>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{t.year}</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tutum</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{car.seats} {t.person}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Fuel className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Yanacaq</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{getLocalizedFuelType(car.fuelType)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Settings className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Transmissiya</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{getLocalizedTransmission(car.transmission)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <Card className="bg-white/80 dark:bg-brand-dark/70  backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t.priceInfo}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t.dailyPrice}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${car.dailyPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t.weeklyPrice}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${car.weeklyPrice}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 dark:text-gray-300">{t.monthlyPrice}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${car.monthlyPrice}</span>
                </div>
                <Separator className="bg-gray-200 dark:bg-brand-dark/70 " />
                <div className="flex justify-between items-center text-red-600 dark:text-red-400">
                  <span>{t.deposit}:</span>
                  <span className="font-semibold">${car.deposit}</span>
                </div>
              </CardContent>
            </Card>

            {/* Rules */}
            <Card className="bg-white/80 dark:bg-brand-dark/70  backdrop-blur-sm border border-gray-200/20 dark:border-gray-700/20">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-white">
                  <AlertCircle className="h-5 w-5 text-[#f5b754]" />
                  <span>{t.rentalRules}</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{t.minimumAge}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{car.rules.minimumAge} yaş</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{t.drivingExperience}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{car.rules.drivingExperience} il</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{t.passportRequired}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{car.rules.passportRequired ? t.yes : t.no}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700 dark:text-gray-300">{t.licenseRequired}:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{car.rules.licenseRequired ? t.required : t.notRequired}</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Options - Client Component */}
            <CarDetailClient 
              car={car} 
              currentLang={currentLang} 
              onShowBookingForm={() => setShowBookingForm(true)} 
            />
          </div>
        </div>

        {/* Online Booking Form - Appears when user clicks the booking button */}
        {showBookingForm && (
          <div ref={bookingRef} className="mt-16">
            <OnlineBookingForm car={car} currentLang={currentLang} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

function Gallery({ images, brand, model }: { images: string[]; brand: string; model: string }) {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl">
        <Image
          src={images[index]}
          alt={`${brand} ${model}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />
        <button onClick={prev} aria-label="Prev" className="absolute left-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-brand-dark/80 text-gray-800 dark:text-white shadow">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button onClick={next} aria-label="Next" className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 dark:bg-brand-dark/80 text-gray-800 dark:text-white shadow">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {images.map((src, i) => (
          <button key={src} onClick={() => setIndex(i)} className={`relative aspect-video rounded-lg overflow-hidden border ${index === i ? 'border-brand-gold' : 'border-transparent'}`}>
            <Image src={src} alt={`${brand} ${model} ${i+1}`} fill sizes="20vw" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}