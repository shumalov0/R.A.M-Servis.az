"use client";

import { FC, useState, useRef, memo, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Eye, Heart } from "lucide-react";
import { EnhancedCar } from "@/lib/types";
import { Translation } from "@/lib/translations";
import { useFavorites } from "@/hooks/use-favorites";

interface OtherCarsSectionProps {
  cars: EnhancedCar[];
  excludeIds?: string[];
  maxCars?: number;
  category?: string;
  currentLang: string;
  t: Translation;
  getLocalizedCarClass: (carClass: string) => string;
  getLocalizedFuelType: (fuelType: string) => string;
  getLocalizedTransmission: (transmission: string) => string;
}

const OtherCarsSection: FC<OtherCarsSectionProps> = memo(function OtherCarsSection({
  cars,
  excludeIds = [],
  maxCars = 6,
  category,
  currentLang,
  t,
  getLocalizedCarClass,
  getLocalizedFuelType,
  getLocalizedTransmission,
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [selectedCar, setSelectedCar] = useState<EnhancedCar | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter cars based on excludeIds and category
  const filteredCars = cars
    .filter(car => !excludeIds.includes(car.id))
    .filter(car => !category || car.category.toLowerCase() === category.toLowerCase())
    .slice(0, maxCars);

  // Don't render if no cars to show
  if (filteredCars.length === 0) {
    return null;
  }

  const scrollLeft = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -320,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollRight = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 320,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleQuickView = useCallback((car: EnhancedCar) => {
    setSelectedCar(car);
  }, []);

  const handleBookNow = useCallback((carId: string) => {
    window.location.href = `/booking?car=${carId}&lang=${currentLang}`;
  }, [currentLang]);

  return (
    <section className="py-16 bg-gray-50/50 dark:bg-brand-dark/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {currentLang === 'az' ? 'Digər Maşınlar' : 
               currentLang === 'en' ? 'Other Cars' :
               currentLang === 'ru' ? 'Другие автомобили' : 'سيارات أخرى'}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {currentLang === 'az' ? 'Daha çox seçim üçün digər mövcud maşınlarımıza baxın' :
               currentLang === 'en' ? 'Explore more of our available vehicles for additional options' :
               currentLang === 'ru' ? 'Изучите больше наших доступных автомобилей для дополнительных вариантов' : 'استكشف المزيد من مركباتنا المتاحة للحصول على خيارات إضافية'}
            </p>
          </div>
          
          {/* Navigation Buttons */}
          <div className="hidden md:flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={scrollLeft}
              className="rounded-full border-gray-300 hover:border-brand-gold hover:bg-brand-gold/10"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={scrollRight}
              className="rounded-full border-gray-300 hover:border-brand-gold hover:bg-brand-gold/10"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Horizontal Scrollable Cars */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {filteredCars.map((car) => (
              <div key={car.id} className="flex-none w-80">
                <Link href={`/car/${car.id}?lang=${currentLang}`} prefetch={true} className="block">
                  <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-800 hover:scale-105 hover:-translate-y-1">
                  {/* Car Image */}
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={car.gallery?.[0] || car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-110"
                    />
                    
                    {/* Favorite Button */}
                    <button
                      aria-label="Toggle favorite"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(car.id);
                      }}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          isFavorite(car.id)
                            ? "fill-brand-gold text-brand-gold"
                            : "text-gray-600 dark:text-gray-300"
                        }`}
                      />
                    </button>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className="bg-white text-brand-gold px-3 py-1 rounded-md text-xs font-medium"
                      >
                        {getLocalizedCarClass(car.class)}
                      </Badge>
                    </div>

                    {/* Quick View Button */}
                    <div className="absolute bottom-4 right-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="secondary"
                            className="bg-white/90 hover:bg-white text-gray-900 rounded-full p-2"
                            onClick={() => handleQuickView(car)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>
                  </div>

                  {/* Car Details */}
                  <CardContent className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                        {car.brand} {car.model}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                        <Image
                          src="/icons/location.svg"
                          alt="location"
                          height={12}
                          width={12}
                        />
                        <span>27A Ahmed Racabli Baku Narimanov</span>
                      </p>
                    </div>

                    {/* Car Specifications */}
                    <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 dark:text-gray-300 mb-4">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/mile.svg) no-repeat center",
                            mask: "url(/icons/mile.svg) no-repeat center",
                          }}
                        />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/fuel.svg) no-repeat center",
                            mask: "url(/icons/fuel.svg) no-repeat center",
                          }}
                        />
                        <span>{getLocalizedFuelType(car.fuelType)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/automatic.svg) no-repeat center",
                            mask: "url(/icons/automatic.svg) no-repeat center",
                          }}
                        />
                        <span>{getLocalizedTransmission(car.transmission)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/seat.svg) no-repeat center",
                            mask: "url(/icons/seat.svg) no-repeat center",
                          }}
                        />
                        <span>{car.seats} {t.person}</span>
                      </div>
                    </div>

                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-gray-900 dark:text-white">
                          {car.dailyPrice}₼
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          {t.perDay}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Link href={`/car/${car.id}?lang=${currentLang}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white"
                          >
                            {currentLang === 'az' ? 'Ətraflı' : 
                             currentLang === 'en' ? 'Details' :
                             currentLang === 'ru' ? 'Подробнее' : 'التفاصيل'}
                          </Button>
                        </Link>
                        <Button
                          size="sm"
                          className="bg-brand-gold hover:bg-brand-gold/90 text-white"
                          onClick={() => handleBookNow(car.id)}
                        >
                          {currentLang === 'az' ? 'Sifariş' : 
                           currentLang === 'en' ? 'Book' :
                           currentLang === 'ru' ? 'Забронировать' : 'احجز'}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Quick View Modal */}
        {selectedCar && (
          <Dialog open={!!selectedCar} onOpenChange={() => setSelectedCar(null)}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold">
                  {selectedCar.brand} {selectedCar.model} ({selectedCar.year})
                </DialogTitle>
              </DialogHeader>
              
              <div className="grid md:grid-cols-2 gap-6">
                {/* Car Images */}
                <div className="space-y-4">
                  <div className="aspect-video relative rounded-lg overflow-hidden">
                    <Image
                      src={selectedCar.gallery?.[0] || selectedCar.image}
                      alt={`${selectedCar.brand} ${selectedCar.model}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {selectedCar.gallery && selectedCar.gallery.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {selectedCar.gallery.slice(1, 5).map((image, index) => (
                        <div key={index} className="aspect-square relative rounded-md overflow-hidden">
                          <Image
                            src={image}
                            alt={`${selectedCar.brand} ${selectedCar.model} ${index + 2}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Car Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">
                      {currentLang === 'az' ? 'Əsas Məlumatlar' : 
                       currentLang === 'en' ? 'Basic Information' :
                       currentLang === 'ru' ? 'Основная информация' : 'المعلومات الأساسية'}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">
                          {currentLang === 'az' ? 'Kateqoriya' : 
                           currentLang === 'en' ? 'Category' :
                           currentLang === 'ru' ? 'Категория' : 'الفئة'}:
                        </span>
                        <p className="font-medium">{selectedCar.category}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {currentLang === 'az' ? 'Yanacaq' : 
                           currentLang === 'en' ? 'Fuel' :
                           currentLang === 'ru' ? 'Топливо' : 'الوقود'}:
                        </span>
                        <p className="font-medium">{getLocalizedFuelType(selectedCar.fuelType)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {currentLang === 'az' ? 'Ötürücü' : 
                           currentLang === 'en' ? 'Transmission' :
                           currentLang === 'ru' ? 'Коробка передач' : 'ناقل الحركة'}:
                        </span>
                        <p className="font-medium">{getLocalizedTransmission(selectedCar.transmission)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">
                          {currentLang === 'az' ? 'Oturacaq' : 
                           currentLang === 'en' ? 'Seats' :
                           currentLang === 'ru' ? 'Места' : 'المقاعد'}:
                        </span>
                        <p className="font-medium">{selectedCar.seats}</p>
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  {selectedCar.specifications && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {currentLang === 'az' ? 'Texniki Xüsusiyyətlər' : 
                         currentLang === 'en' ? 'Specifications' :
                         currentLang === 'ru' ? 'Технические характеристики' : 'المواصفات التقنية'}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {currentLang === 'az' ? 'Mühərrik' : 
                             currentLang === 'en' ? 'Engine' :
                             currentLang === 'ru' ? 'Двигатель' : 'المحرك'}:
                          </span>
                          <span className="font-medium">{selectedCar.specifications.engine}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {currentLang === 'az' ? 'Güc' : 
                             currentLang === 'en' ? 'Horsepower' :
                             currentLang === 'ru' ? 'Мощность' : 'القوة الحصانية'}:
                          </span>
                          <span className="font-medium">{selectedCar.specifications.horsepower} HP</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {currentLang === 'az' ? 'Sürətlənmə' : 
                             currentLang === 'en' ? 'Acceleration' :
                             currentLang === 'ru' ? 'Разгон' : 'التسارع'}:
                          </span>
                          <span className="font-medium">{selectedCar.specifications.acceleration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">
                            {currentLang === 'az' ? 'Yanacaq sərfiyyatı' : 
                             currentLang === 'en' ? 'Fuel consumption' :
                             currentLang === 'ru' ? 'Расход топлива' : 'استهلاك الوقود'}:
                          </span>
                          <span className="font-medium">{selectedCar.specifications.fuelConsumption}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Features */}
                  {selectedCar.features && selectedCar.features.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-3">
                        {currentLang === 'az' ? 'Xüsusiyyətlər' : 
                         currentLang === 'en' ? 'Features' :
                         currentLang === 'ru' ? 'Особенности' : 'الميزات'}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedCar.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pricing */}
                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-3xl font-bold text-gray-900 dark:text-white">
                          {selectedCar.dailyPrice}₼
                        </span>
                        <span className="text-gray-500 ml-2">{t.perDay}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Link href={`/car/${selectedCar.id}?lang=${currentLang}`} className="flex-1">
                        <Button variant="outline" className="w-full">
                          {currentLang === 'az' ? 'Ətraflı Məlumat' : 
                           currentLang === 'en' ? 'View Details' :
                           currentLang === 'ru' ? 'Подробная информация' : 'عرض التفاصيل'}
                        </Button>
                      </Link>
                      <Button
                        className="flex-1 bg-brand-gold hover:bg-brand-gold/90"
                        onClick={() => handleBookNow(selectedCar.id)}
                      >
                        {currentLang === 'az' ? 'İndi Sifariş Et' : 
                         currentLang === 'en' ? 'Book Now' :
                         currentLang === 'ru' ? 'Забронировать сейчас' : 'احجز الآن'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* View All Cars Link */}
        <div className="text-center mt-8">
          <Link href={`/cars?lang=${currentLang}`}>
            <Button
              variant="outline"
              size="lg"
              className="border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-white px-8 py-3"
            >
              {currentLang === 'az' ? 'Bütün Maşınları Gör' : 
               currentLang === 'en' ? 'View All Cars' :
               currentLang === 'ru' ? 'Посмотреть все автомобили' : 'عرض جميع السيارات'}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
});

export default OtherCarsSection;