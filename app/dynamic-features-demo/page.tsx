import { enhancedCars } from '@/lib/data';
import { 
  AvailabilityStatus, 
  SimilarCars, 
  CustomerReviews, 
  SocialShare, 
  FavoriteButton,
  FavoritesManager 
} from '@/components/dynamic';

export default function DynamicFeaturesDemo() {
  const demoCard = enhancedCars[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-gray-50 dark:from-zinc-800 dark:bg-brand-dark/70 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Dynamic Car Detail Features Demo
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Showcasing real-time features and dynamic content for enhanced user experience
          </p>
        </div>

        <div className="space-y-16">
          {/* Availability Status Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Real-time Availability Status
            </h2>
            <div className="max-w-md">
              <AvailabilityStatus carId={demoCard.id} />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Shows real-time availability with auto-refresh every 30 seconds. Click the refresh button to manually update.
            </p>
          </section>

          {/* Social Share Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Social Media Sharing
            </h2>
            <div className="flex items-center space-x-4">
              <SocialShare car={demoCard} />
              <FavoriteButton 
                carId={demoCard.id} 
                carName={`${demoCard.brand} ${demoCard.model}`}
                showLabel={true}
              />
            </div>
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Share car details on social media platforms and manage favorites with local storage persistence.
            </p>
          </section>

          {/* Customer Reviews Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Customer Reviews System
            </h2>
            <CustomerReviews carId={demoCard.id} carModel={`${demoCard.brand} ${demoCard.model}`} />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Interactive reviews with filtering, sorting, and pagination. Includes rating distribution and verified reviews.
            </p>
          </section>

          {/* Similar Cars Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Similar Cars Recommendations
            </h2>
            <SimilarCars currentCar={demoCard} />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              AI-powered recommendations based on category, price range, features, and user preferences.
            </p>
          </section>

          {/* Favorites Manager Demo */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Favorites Management System
            </h2>
            <FavoritesManager />
            <p className="text-gray-600 dark:text-gray-400 mt-4">
              Complete favorites management with view modes, filtering, sorting, and persistent storage.
            </p>
          </section>

          {/* Feature Summary */}
          <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Implementation Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  ✅ Completed Features
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Real-time availability checking with auto-refresh</li>
                  <li>• Similar cars recommendation engine</li>
                  <li>• Customer reviews with filtering and sorting</li>
                  <li>• Social media sharing functionality</li>
                  <li>• Enhanced favorites system with persistence</li>
                  <li>• Responsive design and accessibility compliance</li>
                  <li>• Comprehensive test coverage</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  🚀 Key Benefits
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                  <li>• Improved user engagement and retention</li>
                  <li>• Real-time data updates for better UX</li>
                  <li>• Social sharing increases organic reach</li>
                  <li>• Personalized recommendations boost conversions</li>
                  <li>• Customer reviews build trust and credibility</li>
                  <li>• Favorites system encourages return visits</li>
                  <li>• Mobile-first responsive design</li>
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}