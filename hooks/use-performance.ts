"use client";

import React, { useEffect, useCallback, useRef, useState } from "react";

// Simple device performance detection
const detectDevicePerformance = (): "low" | "medium" | "high" => {
  if (typeof window === "undefined") return "medium";

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  const cores = navigator.hardwareConcurrency || 2;
  const memory = (navigator as any).deviceMemory || 2;

  if (prefersReducedMotion || isMobile) return "low";
  if (cores >= 8 && memory >= 8) return "high";
  if (cores >= 4 && memory >= 4) return "medium";

  return "low";
};

export const usePerformance = () => {
  const [devicePerformance, setDevicePerformance] = useState<
    "low" | "medium" | "high"
  >("medium");
  const [isOptimized, setIsOptimized] = useState(false);
  const intersectionObserver = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Detect device performance
    const performance = detectDevicePerformance();
    setDevicePerformance(performance);

    // Initialize intersection observer for lazy loading
    intersectionObserver.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement;

            // Handle lazy image loading
            if (element.dataset.src && element.tagName === "IMG") {
              const img = element as HTMLImageElement;
              img.src = element.dataset.src;
              img.removeAttribute("data-src");
            }

            intersectionObserver.current?.unobserve(element);
          }
        });
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    setIsOptimized(true);

    return () => {
      intersectionObserver.current?.disconnect();
    };
  }, []);

  // Preload critical resources
  const preloadResource = useCallback((href: string, as: string = "fetch") => {
    if (typeof window === "undefined") return;

    const link = document.createElement("link");
    link.rel = "preload";
    link.href = href;
    link.as = as;

    if (as === "image") {
      link.type = "image/webp";
    }

    document.head.appendChild(link);
  }, []);

  // Prefetch route on hover
  const prefetchRoute = useCallback((href: string) => {
    if (typeof window === "undefined") return;

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        const link = document.createElement("link");
        link.rel = "prefetch";
        link.href = href;
        document.head.appendChild(link);
      });
    }
  }, []);

  // Observe element for lazy loading
  const observeElement = useCallback((element: HTMLElement | null) => {
    if (element && intersectionObserver.current) {
      intersectionObserver.current.observe(element);
    }
  }, []);

  // Check if component should be loaded based on performance
  const shouldLoadComponent = useCallback(
    (priority: "high" | "medium" | "low") => {
      if (devicePerformance === "high") return true;
      if (devicePerformance === "medium" && priority !== "low") return true;
      if (devicePerformance === "low" && priority === "high") return true;
      return false;
    },
    [devicePerformance]
  );

  // Debounce function for performance-sensitive operations
  const debounce = useCallback(
    <T extends (...args: any[]) => any>(
      func: T,
      delay: number = 300
    ): ((...args: Parameters<T>) => void) => {
      let timeoutId: NodeJS.Timeout;

      return (...args: Parameters<T>) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
      };
    },
    []
  );

  // Measure component performance
  const measureComponent = useCallback((componentName: string) => {
    const startTime = performance.now();

    return () => {
      const renderTime = performance.now() - startTime;
      // Simple console log in development only
      if (process.env.NODE_ENV === "development") {
        // console.log(`${componentName} render time: ${renderTime.toFixed(2)}ms`);
      }
    };
  }, []);

  // Get optimized image props
  const getOptimizedImageProps = useCallback(
    (src: string, width?: number) => {
      const quality =
        devicePerformance === "high"
          ? 85
          : devicePerformance === "medium"
          ? 75
          : 65;

      return {
        src,
        quality,
        loading: "lazy" as const,
        placeholder: "blur" as const,
        blurDataURL:
          "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=",
        sizes: width
          ? `${width}px`
          : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
      };
    },
    [devicePerformance]
  );

  return {
    devicePerformance,
    isOptimized,
    preloadResource,
    prefetchRoute,
    observeElement,
    shouldLoadComponent,
    debounce,
    measureComponent,
    getOptimizedImageProps,
  };
};

// Higher-order component for performance optimization
export const withPerformanceOptimization = <P extends object>(
  Component: React.ComponentType<P>,
  componentName: string,
  priority: "high" | "medium" | "low" = "medium"
) => {
  return function OptimizedComponent(props: P) {
    const { shouldLoadComponent, measureComponent } = usePerformance();

    useEffect(() => {
      const endMeasurement = measureComponent(componentName);
      return endMeasurement;
    }, [measureComponent]);

    if (!shouldLoadComponent(priority)) {
      return null;
    }

    return React.createElement(Component, props);
  };
};
