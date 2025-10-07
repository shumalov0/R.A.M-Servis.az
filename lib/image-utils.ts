/**
 * Image loading utilities for handling external URLs and fallbacks
 */

export const DEFAULT_FALLBACK_IMAGE = '/cars/placeholder.svg';

export const FALLBACK_IMAGES = [
  '/cars/12.webp',
  '/cars/search.webp',
  '/cars/placeholder.svg',
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTIwIiByPSI0MCIgZmlsbD0iI2Q1ZDlkZiIvPjxwYXRoIGQ9Im0xODAgMTEwIDEwIDEwIDIwLTIwIDEwIDEwdjI1SDE4MHoiIGZpbGw9IiNhN2I2YzIiLz48dGV4dCB4PSI1MCUiIHk9IjcwJSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE2IiBmaWxsPSIjNjc3NDg5IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5DYXIgSW1hZ2U8L3RleHQ+PC9zdmc+'
];

/**
 * Check browser support for modern image formats
 */
export function checkImageFormatSupport(): Promise<{
  avif: boolean;
  webp: boolean;
}> {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    const avifSupport = canvas.toDataURL('image/avif').indexOf('data:image/avif') === 0;
    const webpSupport = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    
    resolve({
      avif: avifSupport,
      webp: webpSupport
    });
  });
}

/**
 * Get optimal image format based on browser support
 */
export async function getOptimalImageFormat(): Promise<'avif' | 'webp' | 'jpeg'> {
  if (typeof window === 'undefined') return 'jpeg';
  
  try {
    const support = await checkImageFormatSupport();
    if (support.avif) return 'avif';
    if (support.webp) return 'webp';
    return 'jpeg';
  } catch {
    return 'jpeg';
  }
}

/**
 * Generate responsive image sizes string
 */
export function generateImageSizes(width?: number): string {
  if (!width) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
  }
  
  if (width <= 400) {
    return '(max-width: 640px) 100vw, 400px';
  }
  
  if (width <= 800) {
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px';
  }
  
  return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw';
}

/**
 * Generate blur data URL for better loading experience
 */
export function generateBlurDataURL(width: number = 10, height: number = 10, color: string = '#f3f4f6'): string {
  if (typeof window === 'undefined') {
    return `data:image/svg+xml;base64,${btoa(`<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="${color}"/></svg>`)}`;
  }
  
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, width, height);
  
  return canvas.toDataURL('image/jpeg', 0.1);
}

/**
 * Preload an image and return a promise
 */
export function preloadImage(src: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
}

/**
 * Try to load an image with fallbacks
 */
export async function loadImageWithFallback(src: string): Promise<string> {
  try {
    // Try original image first
    await preloadImage(src);
    return src;
  } catch (error) {
    console.warn(`Failed to load image: ${src}`, error);
    
    // Try fallback images
    for (const fallback of FALLBACK_IMAGES) {
      try {
        await preloadImage(fallback);
        return fallback;
      } catch (fallbackError) {
        console.warn(`Failed to load fallback image: ${fallback}`, fallbackError);
      }
    }
    
    // Return default fallback if all else fails
    return DEFAULT_FALLBACK_IMAGE;
  }
}

/**
 * Get a safe image source with immediate fallback
 */
export function getSafeImageSrc(src: string): string {
  // If it's already a local image or data URL, return as is
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }
  
  // For external URLs, we'll handle them in the component
  return src;
}

/**
 * Check if an image URL is likely to work
 */
export function isValidImageUrl(url: string): boolean {
  if (!url || typeof url !== 'string') return false;
  
  // Check for common image extensions
  const imageExtensions = /\.(jpg|jpeg|png|gif|webp|svg)(\?.*)?$/i;
  
  // Check for data URLs
  const isDataUrl = url.startsWith('data:image/');
  
  // Check for local paths
  const isLocalPath = url.startsWith('/');
  
  // Check for valid HTTP(S) URLs with image extensions
  const isValidHttpUrl = (url.startsWith('http://') || url.startsWith('https://')) && imageExtensions.test(url);
  
  return isDataUrl || isLocalPath || isValidHttpUrl;
}

/**
 * Add cache busting parameter to URL
 */
export function addCacheBuster(url: string): string {
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}t=${Date.now()}`;
}