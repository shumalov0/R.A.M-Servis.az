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

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="cars"
      className="py-20 px-4 sm:px-6 lg:px-8 dark:bg-brand-dark/80"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          {t.ourFleet.split(" ").slice(0, -2).join(" ")}{" "}
          <span className="text-brand-gold dark:text-brand-gold">
            {t.ourFleet.split(" ").slice(-2).join(" ")}
          </span>
        </h2>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car) => (
              <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden border border-gray-200 dark:border-gray-800 group:hover:delay-150 w-[90%] group-hover:scale-110 ">
                {/* Şəkil hissəsi */}
                <div className="aspect-video relative  overflow-hidden imageParent  ">
                  <Image
                    src={car.images?.length ? car.images[0] : car.image}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="object-cover transition-transform duration-500  h-full imag hover:scale-110 "
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
                  <Link href={`/car/${car.id}?lang=${currentLang}`}>
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
                    <div className="flex items-center py-7  font-semibold justify-between">
                      <h6 className="carPrice text-[24px] ">
                        {car.dailyPrice}₼{" "}
                        <span className="text-[16px] font-light">
                          {" "}
                          {t.perDay}
                        </span>
                      </h6>
                      <button className="btn dark:bg-neutral-500">
                        Book Now
                      </button>
                    </div>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CarsSection;
