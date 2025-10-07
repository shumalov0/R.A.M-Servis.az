'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { getOptimizedImageSrc, getResponsiveSizes, generateBlurDataURL } from '@/lib/image-optimization';

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
}



export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  quality = 80, // Optimized for WebP
  placeholder = 'blur',
  blurDataURL,
  onLoad,
  onError,
  fallbackSrc = '/cars/placeholder.jpg',
  loading = 'lazy',
  ...props
}: OptimizedImageProps) {
  // All images are now WebP
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Generate blur data URL if not provided
  const defaultBlurDataURL = blurDataURL || generateBlurDataURL(width || 400, height || 300);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    
    // Try fallback image
    if (imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(false);
    }
    
    onError?.();
  };

  // Optimize sizes based on common breakpoints
  const optimizedSizes = fill 
    ? sizes || '100vw'
    : sizes || getResponsiveSizes(width);

  return (
    <div className={cn('relative overflow-hidden bg-gray-100', className)}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={optimizedSizes}
        quality={quality}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={defaultBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        loading={loading}
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="text-xs">Şəkil yüklənmədi</p>
          </div>
        </div>
      )}
    </div>
  );
}