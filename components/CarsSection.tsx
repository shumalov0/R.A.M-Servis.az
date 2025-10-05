// components/CarsSection.tsx
import { FC, useState, useEffect } from "react";
import { Car } from "@/lib/data";
import { Translation } from "@/lib/translations";
import LoadingSpinner from "./LoadingSpinner";
import CarCard from "./CarCard";

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
  const [isLoading, setIsLoading] = useState(true);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 px-[22px]">
          {cars.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              currentLang={currentLang}
              t={t}
              getLocalizedCarClass={getLocalizedCarClass}
              getLocalizedFuelType={getLocalizedFuelType}
              getLocalizedTransmission={getLocalizedTransmission}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CarsSection;
