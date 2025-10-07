import { Suspense } from 'react';
import { Metadata } from 'next';
import FixedHeader from '@/components/FixedHeader';
import Footer from '@/components/Footer';
import { cars } from '@/lib/data';
import { translations } from '@/lib/translations';
import CarsPageClient from '@/components/CarsPageClient';

export const metadata: Metadata = {
  title: 'Maşın Parkımız | Ram Servis',
  description: 'Geniş maşın seçimimizdən sizə uyğun olanı tapın və rahat səyahətinizi təmin edin.',
};

// Calculate default price range from cars data
const defaultPriceRange: [number, number] = (() => {
  const prices = cars.map(c => c.dailyPrice);
  return [Math.min(...prices), Math.max(...prices)];
})();

export default function CarsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70 transition-colors duration-300">
      <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]">Loading...</div>}>
        <CarsPageClient 
          cars={cars}
          translations={translations}
          defaultPriceRange={defaultPriceRange}
        />
      </Suspense>
    </div>
  );
}