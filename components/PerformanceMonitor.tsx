'use client';

import { useEffect } from 'react';

export default function PerformanceMonitor() {
  useEffect(() => {
    // Web Vitals monitoring
    if (typeof window !== 'undefined') {
      import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
        const sendToAnalytics = (metric: any) => {
          // Send to Google Analytics if available
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'web_vital', {
              event_category: 'Web Vitals',
              event_label: metric.name,
              value: Math.round(metric.value),
              non_interaction: true,
            });
          }
          
          // Log to console in development
          if (process.env.NODE_ENV === 'development') {
            console.log(`${metric.name}: ${metric.value}`);
          }
        };

        onCLS(sendToAnalytics);
        onINP(sendToAnalytics);
        onFCP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      }).catch(() => {
        // Silently fail if web-vitals is not available
      });
    }

    // Performance observer for resource timing
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // Monitor large images
            if (entry.name.includes('.jpg') || entry.name.includes('.png') || entry.name.includes('.webp')) {
              const size = (entry as any).transferSize;
              if (size > 100000) { // 100KB
                console.warn(`Large image detected: ${entry.name} (${Math.round(size / 1024)}KB)`);
              }
            }
          });
        });
        
        observer.observe({ entryTypes: ['resource'] });
        
        return () => observer.disconnect();
      } catch (error) {
        console.warn('Performance Observer not supported');
      }
    }
  }, []);

  return null;
}