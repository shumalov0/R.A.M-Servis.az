'use client';

import React, { useEffect, useCallback, useRef } from 'react';

interface PerformanceOptimizationOptions {
  enableImageOptimization?: boolean;
  enableLazyLoading?: boolean;
  enablePreloading?: boolean;
  debounceMs?: number;
}

export function usePerformanceOptimization(options: PerformanceOptimizationOptions = {}) {
  const {
    enableImageOptimization = true,
    enableLazyLoading = true,
    enablePreloading = true,
    debounceMs = 300
  } = options;

  const intersectionObserver = useRef<IntersectionObserver | null>(null);
  const preloadedResources = useRef<Set<string>>(new Set());

  // Initialize Intersection Observer for lazy loading
  useEffect(() => {
    if (!enableLazyLoading || typeof window === 'undefined') return;

    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;
            
            // Handle lazy image loading
            if (element.dataset.src && element.tagName === 'IMG') {
              const img = element as HTMLImageElement;
              img.src = element.dataset.src;
              img.removeAttribute('data-src');
            }
            
            intersectionObserver.current?.unobserve(element);
          }
        });
      },
      {
        rootMargin: '50px',
        threshold: 0.1
      }
    );

    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, [enableLazyLoading]);

  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string = 'fetch') => {
    if (!enablePreloading || preloadedResources.current.has(href)) return;

    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    
    if (as === 'image') {
      link.type = 'image/webp';
    }
    
    document.head.appendChild(link);
    preloadedResources.current.add(href);
  }, [enablePreloading]);

  // Optimize images with WebP support
  const optimizeImageSrc = useCallback((src: string, width?: number, quality: number = 85) => {
    if (!enableImageOptimization) return src;

    // Check if browser supports WebP
    const supportsWebP = typeof window !== 'undefined' && 
      document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0;

    if (supportsWebP && !src.includes('.webp')) {
      const url = new URL(src, window.location.origin);
      url.searchParams.set('format', 'webp');
      url.searchParams.set('quality', quality.toString());
      if (width) {
        url.searchParams.set('width', width.toString());
      }
      return url.toString();
    }

    return src;
  }, [enableImageOptimization]);

  // Debounced function for performance-sensitive operations
  const debounce = useCallback(<T extends (...args: any[]) => any>(
    func: T,
    delay: number = debounceMs
  ): ((...args: Parameters<T>) => void) => {
    let timeoutId: NodeJS.Timeout;
    
    return (...args: Parameters<T>) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  }, [debounceMs]);

  // Observe element for lazy loading
  const observeElement = useCallback((element: HTMLElement) => {
    if (intersectionObserver.current && element) {
      intersectionObserver.current.observe(element);
    }
  }, []);

  // Prefetch route on hover
  const prefetchRoute = useCallback((href: string) => {
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      window.requestIdleCallback(() => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }, []);

  // Cleanup function
  const cleanup = useCallback(() => {
    intersectionObserver.current?.disconnect();
    preloadedResources.current.clear();
  }, []);

  return {
    // Core functions
    preloadResource,
    optimizeImageSrc,
    observeElement,
    prefetchRoute,
    cleanup,
    
    // Utilities
    debounce,
    
    // State
    isOptimizationEnabled: {
      images: enableImageOptimization,
      lazyLoading: enableLazyLoading,
      preloading: enablePreloading
    }
  };
}

// Higher-order component for automatic performance optimization
export function withPerformanceOptimization<P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
  options?: PerformanceOptimizationOptions
) {
  return function OptimizedComponent(props: P) {
    return React.createElement(Component as React.ComponentType<P>, props as P);
  };
}