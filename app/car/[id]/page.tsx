import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { cars } from '@/lib/data';
import CarDetailPageContent from '@/components/CarDetailPageContent';

export async function generateStaticParams() {
  return cars.map((car) => ({
    id: car.id,
  }));
}

interface CarDetailProps {
  params: { id: string };
}

export default function CarDetail({ params }: CarDetailProps) {
  const car = cars.find(c => c.id === params.id);

  if (!car) {
    notFound();
  }

  return <CarDetailPageContent car={car} initialLang={'az'} />;
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const car = cars.find(c => c.id === params.id);
  if (!car) return {};
  const title = `${car.brand} ${car.model} ${car.year} icarə | Bakı Rent a Car`;
  const description = `${car.brand} ${car.model} ${car.year} ${car.class} sinif, ${car.fuelType}, ${car.transmission}. Günlük ${car.dailyPrice}$-dan. Ram Servis-də sərfəli maşın icarəsi.`;
  const url = `https://www.ramservis.az/car/${car.id}`;
  return {
    title,
    description,
    alternates: {
      canonical: `/car/${car.id}`,
    },
    openGraph: {
      title,
      description,
      url,
      images: [{ url: car.image }],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [car.image],
    },
  };
}