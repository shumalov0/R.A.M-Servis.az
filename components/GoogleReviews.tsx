'use client';

import React, { useState, useEffect, memo, useCallback, useRef } from 'react';
import { CustomerReview } from '@/lib/types';
import { customerReviews } from '@/lib/data';
import StarRating from './StarRating';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription } from './ui/alert';
import { AlertCircle, CheckCircle, MessageSquare } from 'lucide-react';

interface GoogleReviewsProps {
  maxReviews?: number;
  showRating?: boolean;
  autoScroll?: boolean;
  currentLang: string;
  className?: string;
}

const GoogleReviews = memo(function GoogleReviews({
  maxReviews = 6,
  showRating = true,
  autoScroll = true,
  currentLang = 'az',
  className = ''
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<CustomerReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [averageRating, setAverageRating] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulate API call with loading state
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get reviews and calculate average rating
        const allReviews = customerReviews;
        const limitedReviews = allReviews.slice(0, maxReviews);
        const avgRating = allReviews.reduce((sum, review) => sum + review.rating, 0) / allReviews.length;
        
        setReviews(limitedReviews);
        setAverageRating(avgRating);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [maxReviews]);

  // Carousel auto-scroll
  useEffect(() => {
    if (!autoScroll || reviews.length <= 1) return;
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 3500);
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    };
  }, [autoScroll, reviews.length]);

  const goTo = useCallback((idx: number) => {
    if (reviews.length === 0) return;
    const normalized = ((idx % reviews.length) + reviews.length) % reviews.length;
    setCurrentIndex(normalized);
  }, [reviews.length]);

  const next = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const prev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Format date based on language - memoized for performance
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    const localeMap: Record<string, string> = {
      az: 'az-AZ',
      en: 'en-US',
      ru: 'ru-RU',
      ar: 'ar-SA'
    };

    return date.toLocaleDateString(localeMap[currentLang] || 'az-AZ', options);
  }, [currentLang]);

  // Get source badge color - memoized for performance
  const getSourceBadgeColor = useCallback((source: string) => {
    switch (source) {
      case 'google':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'facebook':
        return 'bg-blue-600 text-white';
      case 'internal':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  }, []);

  // Get source display name - memoized for performance
  const getSourceDisplayName = useCallback((source: string) => {
    switch (source) {
      case 'google':
        return 'Google';
      case 'facebook':
        return 'Facebook';
      case 'internal':
        return currentLang === 'az' ? 'Daxili' : currentLang === 'en' ? 'Internal' : currentLang === 'ru' ? 'Внутренний' : 'داخلي';
      default:
        return source;
    }
  }, [currentLang]);

  // Translations
  const translations = {
    az: {
      title: 'Müştəri Rəyləri',
      subtitle: 'Müştərilərimizin bizim haqqımızda dedikləri',
      verified: 'Təsdiqlənmiş',
      helpful: 'faydalı',
      noReviews: 'Hələ rəy yoxdur',
      loadingError: 'Rəylər yüklənərkən xəta baş verdi',
      averageRating: 'Orta reytinq',
      totalReviews: 'rəy',
      rented: 'icarəyə götürüb'
    },
    en: {
      title: 'Customer Reviews',
      subtitle: 'What our customers say about us',
      verified: 'Verified',
      helpful: 'helpful',
      noReviews: 'No reviews yet',
      loadingError: 'Error loading reviews',
      averageRating: 'Average rating',
      totalReviews: 'reviews',
      rented: 'rented'
    },
    ru: {
      title: 'Отзывы Клиентов',
      subtitle: 'Что говорят о нас наши клиенты',
      verified: 'Проверено',
      helpful: 'полезно',
      noReviews: 'Пока нет отзывов',
      loadingError: 'Ошибка загрузки отзывов',
      averageRating: 'Средний рейтинг',
      totalReviews: 'отзывов',
      rented: 'арендовал'
    },
    ar: {
      title: 'آراء العملاء',
      subtitle: 'ما يقوله عملاؤنا عنا',
      verified: 'موثق',
      helpful: 'مفيد',
      noReviews: 'لا توجد مراجعات بعد',
      loadingError: 'خطأ في تحميل المراجعات',
      averageRating: 'متوسط التقييم',
      totalReviews: 'مراجعة',
      rented: 'استأجر'
    }
  };

  const t = translations[currentLang as keyof typeof translations] || translations.az;

  // Loading state
  if (loading) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-64">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <Alert className="max-w-md mx-auto">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {t.loadingError}
            </AlertDescription>
          </Alert>
        </div>
      </section>
    );
  }

  // No reviews state
  if (reviews.length === 0) {
    return (
      <section className={`py-16 ${className}`}>
        <div className="container mx-auto px-4">
          <div className="text-center">
            <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t.title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t.noReviews}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`py-16 bg-gray-50 dark:bg-gray-900 ${className}`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            {t.subtitle}
          </p>
          
          {/* Average Rating Display */}
          {showRating && (
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <StarRating rating={averageRating} size="lg" showRating />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t.averageRating} • {customerReviews.length} {t.totalReviews}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          <div className="overflow-hidden rounded-xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)`, width: `${reviews.length * 100}%` }}
            >
              {reviews.map((review) => (
                <div key={review.id} className="w-full flex-shrink-0 px-0 md:px-2 lg:px-3" style={{ width: `${100 / reviews.length}%` }}>
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {review.customerName.charAt(0).toUpperCase()}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {review.customerName}
                      </h3>
                      <div className="flex items-center gap-2">
                        <StarRating rating={review.rating} size="sm" />
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t.verified}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Source Badge */}
                  <Badge className={`text-xs ${getSourceBadgeColor(review.source)}`}>
                    {getSourceDisplayName(review.source)}
                  </Badge>
                </div>

                {/* Review Text */}
                <div className="flex-1 mb-4">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-4">
                    {review.carRented && (
                      <span className="flex items-center gap-1">
                        <span>{t.rented}</span>
                        <span className="font-medium">{review.carRented}</span>
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {review.helpful && review.helpful > 0 && (
                      <span className="flex items-center gap-1">
                        <span>👍</span>
                        <span>{review.helpful} {t.helpful}</span>
                      </span>
                    )}
                    <span>{formatDate(review.date)}</span>
                  </div>
                </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          {reviews.length > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                aria-label="Previous review"
                onClick={prev}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                ‹
              </button>
              <div className="flex items-center gap-2">
                {reviews.map((_, idx) => (
                  <button
                    key={idx}
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => goTo(idx)}
                    className={`h-2.5 w-2.5 rounded-full ${currentIndex === idx ? 'bg-brand-gold' : 'bg-gray-300 dark:bg-gray-600'}`}
                  />
                ))}
              </div>
              <button
                aria-label="Next review"
                onClick={next}
                className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200"
              >
                ›
              </button>
            </div>
          )}
        </div>

        {/* Hide view more in carousel mode */}
      </div>
    </section>
  );
});

export default GoogleReviews;