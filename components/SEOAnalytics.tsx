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

    // Core Web Vitals tracking - sadə versiya
    if (typeof window !== 'undefined') {
      import('web-vitals').then((webVitals) => {
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

        // Web-vitals v5 API istifadə et
        if (webVitals.onCLS) webVitals.onCLS(sendToGoogleAnalytics);
        if (webVitals.onINP) webVitals.onINP(sendToGoogleAnalytics);
        if (webVitals.onFCP) webVitals.onFCP(sendToGoogleAnalytics);
        if (webVitals.onLCP) webVitals.onLCP(sendToGoogleAnalytics);
        if (webVitals.onTTFB) webVitals.onTTFB(sendToGoogleAnalytics);
      }).catch(() => {
        // Web vitals yüklənmədi, heç bir şey etmə
      });
    }
  }, [pathname]);

  return null;
}