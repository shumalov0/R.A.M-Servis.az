'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function SEOAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Google Analytics page view tracking
    if (typeof window.gtag !== 'undefined') {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }

    // Core Web Vitals tracking
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const sendToGoogleAnalytics = (metric: any) => {
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', 'web_vital', {
            event_category: 'Web Vitals',
            event_label: metric.name,
            value: Math.round(metric.value),
            non_interaction: true,
          });
        }
      };

      onCLS(sendToGoogleAnalytics);
      onINP(sendToGoogleAnalytics); // FID əvəzinə INP istifadə edilir
      onFCP(sendToGoogleAnalytics);
      onLCP(sendToGoogleAnalytics);
      onTTFB(sendToGoogleAnalytics);
    }).catch(() => {
      // Web vitals yüklənmədi, heç bir şey etmə
    });
  }, [pathname]);

  return null;
}