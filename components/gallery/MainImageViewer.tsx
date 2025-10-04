'use client';

import { useState, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, Maximize2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
// Removed animation imports for better performance
import { announceToScreenReader } from '@/lib/accessibility-utils';
import { getSafeImageSrc, FALLBACK_IMAGES, addCacheBuster } from '@/lib/image-utils';

interface MainImageViewerProps {
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  onFullscreenOpen: () => void;
  carInfo: { brand: string; model: string; year: number };
}

export default function MainImageViewer({
  images,
  currentIndex,
  onIndexChange,
  onFullscreenOpen,
  carInfo
}: MainImageViewerProps) {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentImageSrc, setCurrentImageSrc] = useState(getSafeImageSrc(images[currentIndex] || ''));
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    setHasError(false);
    setRetryCount(0);
    onIndexChange(newIndex);
    announceToScreenReader(`Image ${newIndex + 1} of ${images.length}`);
  }, [currentIndex, images.length, onIndexChange]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    setHasError(false);
    setRetryCount(0);
    onIndexChange(newIndex);
    announceToScreenReader(`Image ${newIndex + 1} of ${images.length}`);
  }, [currentIndex, images.length, onIndexChange]);

  // Reset state when currentIndex changes
  useEffect(() => {
    setHasError(false);
    setRetryCount(0);
    setCurrentImageSrc(getSafeImageSrc(images[currentIndex] || ''));
  }, [currentIndex, images]);

  const toggleZoom = useCallback(() => {
    setIsZoomed(!isZoomed);
    announceToScreenReader(isZoomed ? 'Zoom disabled' : 'Zoom enabled');
  }, [isZoomed]);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handlePrevious();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleNext();
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onFullscreenOpen();
      } else if (event.key === 'z' || event.key === 'Z') {
        event.preventDefault();
        toggleZoom();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handlePrevious, handleNext, onFullscreenOpen, toggleZoom]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    // Prevent default to avoid double handling
    event.preventDefault();
  }, []);

  const handleImageLoad = () => {
    setHasError(false);
    setRetryCount(0);
  };

  const handleImageError = (event: any) => {
    const currentSrc = event.target.src;
    const currentFallbackIndex = FALLBACK_IMAGES.findIndex(img => 
      currentSrc.includes(img.split('/').pop()?.split('?')[0] || '')
    );
    
    // Try next fallback image
    if (currentFallbackIndex < FALLBACK_IMAGES.length - 1) {
      const nextFallback = FALLBACK_IMAGES[currentFallbackIndex + 1];
      setCurrentImageSrc(nextFallback);
      return;
    }
    
    // All fallbacks failed, try retry with original image
    if (retryCount < 2 && !currentSrc.includes('placeholder') && !currentSrc.includes('data:image')) {
      setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setHasError(false);
        setCurrentImageSrc(addCacheBuster(images[currentIndex]));
      }, Math.pow(2, retryCount) * 1000);
      return;
    }
    
    // Everything failed
    setHasError(true);
  };



  if (images.length === 0) {
    return (
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No images available</p>
      </div>
    );
  }

  return (
    <div
      onKeyDown={handleKeyDown}
      onClick={(e) => {
        // Only zoom if clicking on the main area, not on buttons
        if (e.target === e.currentTarget || (e.target as HTMLElement).tagName === 'IMG') {
          toggleZoom();
        }
      }}
      tabIndex={0}
      role="img"
      aria-label={`${carInfo.brand} ${carInfo.model} ${carInfo.year} image gallery. Currently showing image ${currentIndex + 1} of ${images.length}. Click to zoom, use arrow keys to navigate, Enter for fullscreen.`}
      className="relative aspect-video overflow-hidden rounded-2xl shadow-2xl bg-gray-100 dark:bg-gray-800 group cursor-pointer focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
    >
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-2">📷</div>
          <p className="text-sm">Image failed to load</p>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={(e) => {
              e.stopPropagation();
              setHasError(false);
              setRetryCount(0);
              setCurrentImageSrc(addCacheBuster(images[currentIndex]));
            }}
          >
            Retry ({retryCount}/2)
          </Button>
        </div>
      ) : (
        <img
          src={currentImageSrc}
          alt={`${carInfo.brand} ${carInfo.model} ${carInfo.year} - Image ${currentIndex + 1} of ${images.length}. ${isZoomed ? 'Zoomed view.' : 'Click to zoom or open fullscreen.'}`}
          className={`w-full h-full object-cover transition-transform duration-300 cursor-pointer ${isZoomed ? 'scale-110' : 'scale-100'}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          loading={currentIndex === 0 ? 'eager' : 'lazy'}
          crossOrigin="anonymous"
        />
      )}

      {/* Navigation Controls */}
      {images.length > 1 && (
        <>
          <Button
            variant="secondary"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 min-w-[44px] min-h-[44px] touch-target"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
            aria-label={`Previous image. Currently showing ${currentIndex + 1} of ${images.length}`}
            type="button"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity duration-200 min-w-[44px] min-h-[44px] touch-target"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={`Next image. Currently showing ${currentIndex + 1} of ${images.length}`}
            type="button"
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </>
      )}

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg min-w-[44px] min-h-[44px] touch-target"
          onClick={(e) => {
            e.stopPropagation();
            toggleZoom();
          }}
          aria-label={isZoomed ? "Zoom out" : "Zoom in"}
          aria-pressed={isZoomed}
          type="button"
        >
          <ZoomIn className="h-4 w-4" aria-hidden="true" />
        </Button>

        <Button
          variant="secondary"
          size="icon"
          className="bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-800 shadow-lg min-w-[44px] min-h-[44px] touch-target"
          onClick={(e) => {
            e.stopPropagation();
            onFullscreenOpen();
          }}
          aria-label="Open fullscreen gallery view"
          type="button"
        >
          <Maximize2 className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>

      {/* Image Counter */}
      {images.length > 1 && (
        <div 
          className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium"
          aria-live="polite"
          aria-label={`Image ${currentIndex + 1} of ${images.length}`}
        >
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Screen reader instructions */}
      <div className="sr-only">
        Use arrow keys to navigate between images, Enter or Space to open fullscreen, Z to toggle zoom. 
        Swipe left or right on touch devices to navigate between images.
      </div>
    </div>
  );
}