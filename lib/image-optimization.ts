/**
 * Image optimization utilities for WebP support
 */

// Check if WebP is supported by the browser
export const isWebPSupported = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

// All images are now WebP, no conversion needed
export const getOptimizedImageSrc = (originalSrc: string): string => {
  return originalSrc;
};

// Get multiple image sources for different formats (for picture element)
export const getImageSources = (originalSrc: string) => {
  const webpSrc = getOptimizedImageSrc(originalSrc);
  
  return {
    webp: webpSrc,
    fallback: originalSrc,
  };
};

// Generate responsive image sizes
export const getResponsiveSizes = (maxWidth?: number): string => {
  if (!maxWidth) {
    return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
  }
  
  if (maxWidth <= 400) {
    return '(max-width: 768px) 100vw, 400px';
  }
  
  if (maxWidth <= 800) {
    return '(max-width: 768px) 100vw, 800px';
  }
  
  return `(max-width: 768px) 100vw, ${maxWidth}px`;
};

// Preload critical images
export const preloadImage = (src: string, priority: boolean = false): void => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = priority ? 'preload' : 'prefetch';
  link.as = 'image';
  link.href = getOptimizedImageSrc(src);
  
  // Add WebP support check
  if (isWebPSupported()) {
    link.type = 'image/webp';
  }
  
  document.head.appendChild(link);
};

// Generate blur data URL for better loading experience
export const generateBlurDataURL = (width: number = 10, height: number = 10): string => {
  if (typeof window === 'undefined') return '';
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  // Create a simple gradient blur effect
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, '#f3f4f6');
  gradient.addColorStop(1, '#e5e7eb');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL();
};