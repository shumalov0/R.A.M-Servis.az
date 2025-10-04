// components/CarsSection.tsx
import { FC, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Car as CarIcon, Users, Fuel, Settings, Calendar } from "lucide-react";
import { Car } from "@/lib/data";
import { Heart } from "lucide-react";
import { useFavorites } from "@/hooks/use-favorites";
import { Translation } from "@/lib/translations";
import LoadingSpinner from "./LoadingSpinner";
import LocationIcon from "@/public/icons/location.svg";
// Removed animation imports for better performance
import { useRouter } from "next/navigation";

interface CarsSectionProps {
  cars: Car[];
  t: Translation;
  currentLang: string;
  getLocalizedCarClass: (carClass: string) => string;
  getLocalizedFuelType: (fuelType: string) => string;
  getLocalizedTransmission: (transmission: string) => string;
}

const CarsSection: FC<CarsSectionProps> = ({
  cars,
  t,
  currentLang,
  getLocalizedCarClass,
  getLocalizedFuelType,
  getLocalizedTransmission,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {cars.map((car) => (
            <Link
              key={car.id}
              href={`/car/${car.id}?lang=${currentLang}`}
              prefetch={true}
              className="block"
            >
              <Card className="rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-800 w-full cursor-pointer hover:shadow-xl transition-shadow duration-300">
              
              {/* Şəkil hissəsi */}
              <div className="aspect-video relative overflow-hidden imageParent">
                  <Image
                    src={car.images?.length ? car.images[0] : car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover h-full"
                    priority={false}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />

                  {/* Badge */}
                  <div className="absolute top-4  right-4">
                    <Badge
                      variant="secondary"
                      className=" bg-white text-[#dbbc42] px-[12px] py-[3px] rounded-[4px] text-[12px] "
                    >
                      {getLocalizedCarClass(car.class)}
                    </Badge>
                  </div>
                </div>

                {/* Alt info hissəsi */}
                <div className="bg-white dark:bg-brand-dark rounded-3xl p-6  px-10 info">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {car.brand} {car.model}
                  </h3>
                  <button
                    aria-label="Toggle favorite"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(car.id);
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-black/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:scale-110 transition"
                  >
                    {" "}
                    <Heart
                      className={`h-5 w-5 ${
                        isFavorite(car.id)
                          ? "fill-brand-gold text-brand-gold"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    />{" "}
                  </button>

                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-[5px] pt-1">
                    <Image
                      src="/icons/location.svg"
                      alt="location"
                      height={10}
                      width={10}
                    />
                    <span> 27A Ahmed Racabli Baku Narimanov</span>
                  </p>

                  {/* Ayrıcı xətt */}
                  <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                  <div>
                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-300">
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/mile.svg) no-repeat center",
                            mask: "url(/icons/mile.svg) no-repeat center",
                          }}
                        />
                        <span>{car.year}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/fuel.svg) no-repeat center",
                            mask: "url(/icons/fuel.svg) no-repeat center",
                          }}
                        />
                        <span>{getLocalizedFuelType(car.fuelType)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask:
                              "url(/icons/Automatic.svg) no-repeat center",
                            mask: "url(/icons/Automatic.svg) no-repeat center",
                          }}
                        />
                        <span>
                          {getLocalizedTransmission(car.transmission)}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div
                          className="w-4 h-4 bg-gray-700 dark:bg-white"
                          style={{
                            WebkitMask: "url(/icons/seat.svg) no-repeat center",
                            mask: "url(/icons/seat.svg) no-repeat center",
                          }}
                        />
                        <span>
                          {car.seats} {t.person}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center py-7 font-semibold justify-between">
                      <h6 className="carPrice text-[24px]">
                        {car.dailyPrice}₼{" "}
                        <span className="text-[16px] font-light">
                          {" "}
                          {t.perDay}
                        </span>
                      </h6>
                      <Button 
                        className="bg-brand-gold hover:bg-brand-gold/90 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transform transition-all duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // Navigate to booking with car pre-selected
                          window.location.href = `/booking?car=${car.id}&lang=${currentLang}`;
                        }}
                      >
                        {currentLang === 'az' ? 'İndi Sifariş Et' : 
                         currentLang === 'en' ? 'Book Now' : 
                         currentLang === 'ru' ? 'Забронировать' : 'احجز الآن'}
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

export default CarsSection;
