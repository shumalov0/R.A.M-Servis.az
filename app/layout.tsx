import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import ClientLayout from "@/components/ClientLayout";
import Script from "next/script";
import dynamic from "next/dynamic";

// Lazy load heavy components with performance optimization
const SEOAnalytics = dynamic(() => import("@/components/SEOAnalytics"), {
  ssr: false,
  loading: () => null,
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.ramservis.az"),
  title: {
    default: "Ram Servis | Bakı Maşın İcarəsi və Rent a Car Xidməti",
    template: "%s | Ram Servis",
  },
  description:
    "Bakı və Azərbaycanda etibarlı maşın icarəsi. Gündəlik, həftəlik və aylıq rent a car. Hava limanına çatdırılma, sürücü ilə icarə, sərfəli qiymətlər.",
  keywords: [
    "maşın icarəsi",
    "rent a car",
    "Bakı rent a car",
    "maşın kirayəsi",
    "avtomobil icarəsi",
    "Bakı maşın icarəsi",
    "airport delivery",
    "car rental Azerbaijan",
    "Baku car hire",
  ],
  alternates: {
    canonical: "/",
    languages: {
      "az-AZ": "/",
      en: "/?lang=en",
      ru: "/?lang=ru",
      ar: "/?lang=ar",
    },
  },
  openGraph: {
    type: "website",
    locale: "az_AZ",
    url: "https://www.ramservis.az/",
    siteName: "Ram Servis",
    title: "Ram Servis | Bakı Maşın İcarəsi və Rent a Car Xidməti",
    description:
      "Bakı və Azərbaycanda etibarlı maşın icarəsi. Gündəlik, həftəlik və aylıq rent a car.",
    images: [
      {
        url: "https://www.ramservis.az/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ram Servis - Bakı Maşın İcarəsi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ram Servis | Bakı Maşın İcarəsi",
    description:
      "Bakı və Azərbaycanda etibarlı maşın icarəsi. Hava limanına çatdırılma, sərfəli qiymətlər.",
    images: ["https://www.ramservis.az/og-image.jpg"],
  },
  icons: {
    icon: "/icons/logosyellow.png",
    shortcut: "/icons/logosyellow.png",
    apple: "/icons/logosyellow.png",
  },
  category: "travel",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="az">
      <head>
        {/* Performance Optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />

        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Resource Hints */}
        <link
          rel="preload"
          href="/icons/logosyellow.png"
          as="image"
          type="image/png"
        />

        {/* Google Site Verification - Deploy sonrası əlavə edin */}
        <meta
          name="google-site-verification"
          content="YOUR_VERIFICATION_CODE"
        />

        {/* Bing Verification */}
        {/* <meta name="msvalidate.01" content="YOUR_BING_VERIFICATION_CODE" /> */}
      </head>
      <body className={inter.className}>
        {/* Preload critical resources */}
        <Script
          id="preload-critical"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              // Preload critical resources immediately
              const criticalImages = ['/icons/logosyellow.png'];
              criticalImages.forEach(src => {
                const link = document.createElement('link');
                link.rel = 'preload';
                link.href = src;
                link.as = 'image';
                document.head.appendChild(link);
              });
            `
          }}
        />

        {/* Google Analytics - Load with delay to improve performance */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_title: document.title,
                  page_location: window.location.href,
                });
              `}
            </Script>
          </>
        )}

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <script
            type="application/ld+json"
            suppressHydrationWarning
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "Ram Servis",
                url: "https://www.ramservis.az",
                logo: "https://www.ramservis.az/logo.png",
                sameAs: [
                  "https://www.facebook.com/ramservis",
                  "https://www.instagram.com/ramservis",
                ],
                contactPoint: [
                  {
                    "@type": "ContactPoint",
                    telephone: "+994708559001",
                    contactType: "customer service",
                    areaServed: "AZ",
                    availableLanguage: ["az", "en", "ru", "ar"],
                  },
                ],
                address: {
                  "@type": "PostalAddress",
                  addressLocality: "Bakı",
                  addressCountry: "AZ",
                },
              }),
            }}
          />
          <ClientLayout>{children}</ClientLayout>
          
          {/* Load heavy components only after initial render */}
          <SEOAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
