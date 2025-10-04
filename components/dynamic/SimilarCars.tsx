'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Users, Fuel, Settings, Star } from 'lucide-react';
import { EnhancedCar } from '@/lib/types';
import { enhancedCars } from '@/lib/data';
import { useFavorites } from '@/hooks/use-favorites';
import { Heart } from 'lucide-react';

interface SimilarCarsProps {
  currentCar: EnhancedCar;
  maxRecommendations?: number;
}

export default function SimilarCars({ currentCar, maxRecommendations = 4 }: SimilarCarsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();

  // Calculate similarity score based on category, price range, and features
  const similarCars = useMemo(() => {
    const candidates = enhancedCars.filter(car => car.id !== currentCar.id);
    
    const scoredCars = candidates.map(car => {
      let score = 0;
      
      // Category match (highest weight)
      if (car.category === currentCar.category) score += 40;
      
      // Price range similarity (within 30% range)
      const priceDiff = Math.abs(car.dailyPrice - currentCar.dailyPrice);
      const priceRange = currentCar.dailyPrice * 0.3;
      if (priceDiff <= priceRange) score += 25;
      
      // Seat count match
      if (car.seats === currentCar.seats) score += 15;
      
      // Fuel type match
      if (car.fuelType === currentCar.fuelType) score += 10;
      
      // Transmission match
      if (car.transmission === currentCar.transmission) score += 5;
      
      // Feature overlap
      const commonFeatures = car.features.filter(feature => 
        currentCar.features.includes(feature)
      ).length;
      score += commonFeatures * 2;
      
      // Popularity boost
      score += car.popularity * 0.1;
      
      return { car, score };
    });
    
    return scoredCars
      .sort((a, b) => b.score - a.score)
      .slice(0, maxRecommendations)
      .map(item => item.car);
  }, [currentCar, maxRecommendations]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, similarCars.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, similarCars.length - 1)) % Math.max(1, similarCars.length - 1));
  };

  if (similarCars.length === 0) {
    return null;
  }

  const visibleCars = similarCars.slice(currentIndex, currentIndex + 2);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          Similar Cars You Might Like
        </h3>
        
        {similarCars.length > 2 && (
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              disabled={currentIndex >= similarCars.length - 2}
              className="h-8 w-8 p-0"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleCars.map((car) => (
          <Card key={car.id} className="group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-0">
              <div className="relative">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <Image
                    src={car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(car.id);
                      }}
                      className="h-8 w-8 p-0 bg-white/80 hover:bg-white/90 dark:bg-gray-800/80 dark:hover:bg-gray-800/90"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isFavorite(car.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-600 dark:text-gray-400'
                        }`} 
                      />
                    </Button>
                  </div>
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="bg-white/90 text-gray-800">
                      {car.category}
                    </Badge>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {car.brand} {car.model}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{car.seats}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Fuel className="h-4 w-4" />
                      <span>{car.fuelType}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Settings className="h-4 w-4" />
                      <span>{car.transmission}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                        ${car.dailyPrice}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {(car.popularity / 20).toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <Link href={`/car/${car.id}`}>
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {similarCars.length > 2 && (
        <div className="flex justify-center space-x-2">
          {Array.from({ length: Math.ceil(similarCars.length / 2) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * 2)}
              className={`h-2 w-2 rounded-full transition-colors ${
                Math.floor(currentIndex / 2) === index
                  ? 'bg-amber-600'
                  : 'bg-gray-300 dark:bg-gray-600'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}