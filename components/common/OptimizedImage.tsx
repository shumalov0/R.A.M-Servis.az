'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useHydration } from '@/hooks/use-hydration';
import { 
  getOptimizedImageSrc, 
  getResponsiveSizes, 
  generateBlurDataURL,
  getOptimalImageConfig,
  getLoadingStrategy,
  calculateOptimalQuality,
  type ImageContext
} from '@/lib/image-optimization';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  fallbackSrc?: string;
  loading?: 'lazy' | 'eager';
  context?: ImageContext;
  isAboveFold?: boolean;
}



export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  fill = false,
  sizes,
  quality,
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc = '/cars/placeholder.svg',
  loading,
  context = 'card',
  isAboveFold = false,
  ...props
}: OptimizedImageProps) {
  const isHydrated = useHydration();
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRetina, setIsRetina] = useState(false);

  // Handle retina detection after hydration
  useEffect(() => {
    if (isHydrated && typeof window !== 'undefined') {
      setIsRetina(window.devicePixelRatio > 1);
    }
  }, [isHydrated]);

  // Get optimal configuration based on context
  const optimalConfig = getOptimalImageConfig(context);
  const loadingStrategy = getLoadingStrategy(isAboveFold);
  
  // Use provided values or fall back to optimal config
  const finalWidth = width || optimalConfig.width;
  const finalHeight = height || optimalConfig.height;
  const finalQuality = quality || calculateOptimalQuality(finalWidth, context, isRetina);
  const finalPriority = priority !== undefined ? priority : loadingStrategy.priority;
  const finalLoading = loading || loadingStrategy.loading;
  
  // Generate blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(finalWidth, finalHeight);

  const handleLoad = () => {
    if (isHydrated) {
      setIsLoading(false);
    }
    onLoad?.();
  };

  const handleError = () => {
    if (isHydrated) {
      setHasError(true);
      setIsLoading(false);
      
      // Try fallback image
      if (imgSrc !== fallbackSrc) {
        setImgSrc(fallbackSrc);
        setHasError(false);
      }
    }
    
    onError?.();
  };

  // Optimize sizes based on context and breakpoints
  const optimizedSizes = fill 
    ? sizes || '100vw'
    : sizes || getResponsiveSizes(finalWidth, context);

  // Don't render loading states until hydrated to avoid hydration mismatch
  if (!isHydrated) {
    return (
      <div className={cn('relative overflow-hidden bg-gray-100', className)}>
        <Image
          src={imgSrc}
          alt={alt}
          width={fill ? undefined : finalWidth}
          height={fill ? undefined : finalHeight}
          fill={fill}
          sizes={optimizedSizes}
          quality={finalQuality}
          priority={finalPriority}
          placeholder={placeholder}
          blurDataURL={defaultBlurDataURL}
          onLoad={handleLoad}
          onError={handleError}
          loading={finalLoading}
          className="transition-opacity duration-300"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-gray-100', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : finalWidth}
        height={fill ? undefined : finalHeight}
        fill={fill}
        sizes={optimizedSizes}
        quality={finalQuality}
        priority={finalPriority}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={finalLoading}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          hasError && 'grayscale'
        )}
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        {...props}
      />
      
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Şəkil yüklənmədi</p>
          </div>
        </div>
      )}
    </div>
  );
}