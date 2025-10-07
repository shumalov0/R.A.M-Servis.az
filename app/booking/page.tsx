import { redirect } from 'next/navigation';

export default function BookingPage({ searchParams }: { searchParams: { car?: string; lang?: string } }) {
  const carId = searchParams.car;
  const lang = searchParams.lang || 'az';
  
  if (carId) {
    redirect(`/car/${carId}?lang=${lang}`);
  } else {
    redirect(`/cars?lang=${lang}`);
  }
}