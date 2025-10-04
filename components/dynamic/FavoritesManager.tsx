'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Trash2, 
  Eye, 
  Share2, 
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Calendar,
  DollarSign
} from 'lucide-react';
import { useFavorites } from '@/hooks/use-favorites';
import { enhancedCars } from '@/lib/data';
import { EnhancedCar } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import FavoriteButton from './FavoriteButton';
import SocialShare from './SocialShare';

type ViewMode = 'grid' | 'list';
type SortOption = 'name' | 'price-low' | 'price-high' | 'year-new' | 'year-old' | 'category';
type FilterOption = 'all' | 'economy' | 'business' | 'luxury' | 'suv';

interface FavoritesManagerProps {
  showHeader?: boolean;
  maxItems?: number;
  compact?: boolean;
}

export default function FavoritesManager({ 
  showHeader = true, 
  maxItems,
  compact = false 
}: FavoritesManagerProps) {
  const { favoriteIds, toggleFavorite } = useFavorites();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortOption>('name');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  // Get favorite cars data
  const favoriteCars = useMemo(() => {
    const cars = enhancedCars.filter(car => favoriteIds.includes(car.id));
    
    // Apply filter
    let filtered = cars;
    if (filterBy !== 'all') {
      filtered = cars.filter(car => 
        car.category.toLowerCase() === filterBy ||
        (filterBy === 'economy' && car.category.toLowerCase().includes('ekonom'))
      );
    }

    // Apply sorting
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return `${a.brand} ${a.model}`.localeCompare(`${b.brand} ${b.model}`);
        case 'price-low':
          return a.dailyPrice - b.dailyPrice;
        case 'price-high':
          return b.dailyPrice - a.dailyPrice;
        case 'year-new':
          return b.year - a.year;
        case 'year-old':
          return a.year - b.year;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return maxItems ? sorted.slice(0, maxItems) : sorted;
  }, [favoriteIds, sortBy, filterBy, maxItems]);

  const clearAllFavorites = () => {
    favoriteIds.forEach(id => toggleFavorite(id));
  };

  if (favoriteIds.length === 0) {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <Heart className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Favorites Yet
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Start adding cars to your favorites to see them here!
          </p>
          <Link href="/cars">
            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
              Browse Cars
            </Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {showHeader && (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              My Favorites
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {favoriteCars.length} of {favoriteIds.length} cars
            </p>
          </div>

          {!compact && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFavorites}
                className="text-red-600 border-red-200 hover:bg-red-50 dark:text-red-400 dark:border-red-800 dark:hover:bg-red-900/20"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            </div>
          )}
        </div>
      )}

      {!compact && (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
          {/* View Mode Toggle */}
          <div className="flex items-center space-x-1 border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Sort Options */}
          <div className="flex items-center space-x-2">
            <SortAsc className="h-4 w-4 text-gray-500" />
            <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="year-new">Newest First</SelectItem>
                <SelectItem value="year-old">Oldest First</SelectItem>
                <SelectItem value="category">Category</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filter Options */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <Select value={filterBy} onValueChange={(value: FilterOption) => setFilterBy(value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="economy">Economy</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="luxury">Luxury</SelectItem>
                <SelectItem value="suv">SUV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Cars Display */}
      <div className={
        viewMode === 'grid' 
          ? `grid grid-cols-1 ${compact ? 'md:grid-cols-2' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6`
          : 'space-y-4'
      }>
        {favoriteCars.map((car) => (
          <FavoriteCarCard 
            key={car.id} 
            car={car} 
            viewMode={viewMode}
            compact={compact}
          />
        ))}
      </div>

      {maxItems && favoriteCars.length === maxItems && favoriteIds.length > maxItems && (
        <div className="text-center">
          <Link href="/favorites">
            <Button variant="outline">
              View All {favoriteIds.length} Favorites
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

interface FavoriteCarCardProps {
  car: EnhancedCar;
  viewMode: ViewMode;
  compact: boolean;
}

function FavoriteCarCard({ car, viewMode, compact }: FavoriteCarCardProps) {
  if (viewMode === 'list') {
    return (
      <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-16 flex-shrink-0">
              <Image
                src={car.image}
                alt={`${car.brand} ${car.model}`}
                fill
                className="object-cover rounded"
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {car.brand} {car.model} {car.year}
              </h3>
              <div className="flex items-center space-x-4 mt-1">
                <Badge variant="secondary">{car.category}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {car.seats} seats • {car.fuelType}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <div className="text-right">
                <p className="text-lg font-bold text-amber-600 dark:text-amber-400">
                  ${car.dailyPrice}
                </p>
                <p className="text-xs text-gray-500">per day</p>
              </div>
              
              <div className="flex items-center space-x-1">
                <Link href={`/car/${car.id}`}>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </Link>
                <SocialShare car={car} />
                <FavoriteButton carId={car.id} size="sm" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
      <CardContent className="p-0">
        <div className="relative">
          <div className={`aspect-video relative overflow-hidden rounded-t-lg ${compact ? 'aspect-[4/3]' : ''}`}>
            <Image
              src={car.image}
              alt={`${car.brand} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute top-3 right-3">
              <FavoriteButton 
                carId={car.id} 
                carName={`${car.brand} ${car.model}`}
                size="sm"
                className="bg-white/90 hover:bg-white dark:bg-gray-800/90 dark:hover:bg-gray-800"
              />
            </div>
            <div className="absolute top-3 left-3">
              <Badge variant="secondary" className="bg-white/90 text-gray-800">
                {car.category}
              </Badge>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{car.year}</p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
              <span>{car.seats} seats</span>
              <span>{car.fuelType}</span>
              <span>{car.transmission}</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                  ${car.dailyPrice}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">per day</p>
              </div>
              
              <div className="flex items-center space-x-2">
                <SocialShare car={car} />
                <Link href={`/car/${car.id}`}>
                  <Button size="sm" className="bg-amber-600 hover:bg-amber-700 text-white">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}