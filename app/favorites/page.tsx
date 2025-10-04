import { FavoritesManager } from '@/components/dynamic';
import Header from '@/components/Header';

export default function FavoritesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FavoritesManager />
      </div>
    </div>
  );
}

export const metadata = {
  title: 'My Favorites | Ram Servis Car Rental',
  description: 'View and manage your favorite cars for rental in Baku, Azerbaijan.',
};