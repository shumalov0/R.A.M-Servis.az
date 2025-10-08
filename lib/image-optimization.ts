/**
 * Advanced image optimization utilities for car rental website
 */

export type ImageContext = 'thumbnail' | 'card' | 'detail' | 'gallery' | 'hero';

export interface OptimizedImageConfig {
  width: number;
  height: number;
  quality: number;
  sizes: string;
  priority?: boolean;
}

/**
 * Get optimized image source with Next.js optimization parameters
 */
export function getOptimizedImageSrc(
  src: string, 
  width: number, 
  quality: number = 80
): string {
  // For local images, let Next.js handle optimization
  if (src.startsWith('/')) {
    return src;
  }
  
  // For external images, return as-is (Next.js will optimize them)
  return src;
}

/**
 * Get responsive sizes string based on context
 */
export function getResponsiveSizes(width?: number, context?: ImageContext): string {
  if (context) {
    switch (context) {
      case 'thumbnail':
        return '(max-width: 640px) 25vw, (max-width: 1024px) 20vw, 150px';
      case 'card':
        return '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px';
      case 'detail':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 600px';
      case 'gallery':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px';
      case 'hero':
        return '(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 1200px';
    }
  }
  
  // Fallback based on width
  if (!width) return '100vw';
  
  if (width <= 150) return '(max-width: 640px) 25vw, 150px';
  if (width <= 300) return '(max-width: 640px) 50vw, 300px';
  if (width <= 600) return '(max-width: 640px) 100vw, 600px';
  
  return '(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px';
}

/**
 * Get optimal configuration for different image contexts
 */
export function getOptimalImageConfig(context: ImageContext): OptimizedImageConfig {
  const configs: Record<ImageContext, OptimizedImageConfig> = {
    thumbnail: {
      width: 150,
      height: 100,
      quality: 75,
      sizes: getResponsiveSizes(150, 'thumbnail'),
      priority: false
    },
    card: {
      width: 300,
      height: 200,
      quality: 80,
      sizes: getResponsiveSizes(300, 'card'),
      priority: false
    },
    detail: {
      width: 600,
      height: 400,
      quality: 85,
      sizes: getResponsiveSizes(600, 'detail'),
      priority: false
    },
    gallery: {
      width: 800,
      height: 600,
      quality: 90,
      sizes: getResponsiveSizes(800, 'gallery'),
      priority: false
    },
    hero: {
      width: 1200,
      height: 800,
      quality: 90,
      sizes: getResponsiveSizes(1200, 'hero'),
      priority: true
    }
  };
  
  return configs[context];
}

/**
 * Generate blur data URL for better loading experience
 */
export function generateBlurDataURL(
  width: number = 10, 
  height: number = 10, 
  color: string = '#f3f4f6'
): string {
  // Create a simple SVG blur placeholder
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${color};stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

/**
 * Preload critical images for better performance
 */
export function preloadCriticalImages(imageSrcs: string[]): void {
  if (typeof window === 'undefined') return;
  
  imageSrcs.forEach(src => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
}

/**
 * Get image loading strategy based on position
 */
export function getLoadingStrategy(isAboveFold: boolean = false): {
  loading: 'lazy' | 'eager';
  priority: boolean;
} {
  return {
    loading: isAboveFold ? 'eager' : 'lazy',
    priority: isAboveFold
  };
}

/**
 * Calculate optimal quality based on image size and context
 */
export function calculateOptimalQuality(
  width: number, 
  context: ImageContext,
  isRetina: boolean = false
): number {
  let baseQuality: number;
  
  switch (context) {
    case 'thumbnail':
      baseQuality = 70;
      break;
    case 'card':
      baseQuality = 80;
      break;
    case 'detail':
      baseQuality = 85;
      break;
    case 'gallery':
      baseQuality = 90;
      break;
    case 'hero':
      baseQuality = 90;
      break;
    default:
      baseQuality = 80;
  }
  
  // Reduce quality for very large images to save bandwidth
  if (width > 1000) {
    baseQuality = Math.max(baseQuality - 10, 70);
  }
  
  // Increase quality slightly for retina displays
  if (isRetina) {
    baseQuality = Math.min(baseQuality + 5, 95);
  }
  
  return baseQuality;
}