/**
 * Navigation utilities for handling both client-side and static export navigation
 */

export const navigateTo = (url: string, forceReload = false) => {
  if (typeof window === 'undefined') return;
  
  if (forceReload) {
    window.location.href = url;
  } else {
    // Use window.location for better compatibility
    window.location.href = url;
  }
};

export const isStaticExport = () => {
  // Check if we're in static export mode
  return process.env.NODE_ENV === 'production' && !process.env.NEXT_RUNTIME;
};

export const createNavigationHandler = (url: string, router?: any) => {
  return (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    // Use router if provided, otherwise fallback to window.location
    if (router && typeof router.push === 'function') {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };
};