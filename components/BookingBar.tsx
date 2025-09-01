'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { locations, cars } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

type CarTypeOption = { value: string; label: string };

export default function BookingBar() {
  const router = useRouter();

  const carTypes: CarTypeOption[] = useMemo(() => {
    const classes = Array.from(new Set(cars.map((c) => c.class)));
    return classes.map((cls) => ({ value: cls, label: cls }));
  }, []);

  const [carType, setCarType] = useState<string | undefined>();
  const [pickupLocation, setPickupLocation] = useState<string | undefined>();
  const [dropoffLocation, setDropoffLocation] = useState<string | undefined>();
  const [pickupDate, setPickupDate] = useState<string>('');
  const [returnDate, setReturnDate] = useState<string>('');

  const isValid = pickupLocation && dropoffLocation && pickupDate && returnDate;

  const handleSubmit = () => {
    const params = new URLSearchParams();
    if (carType) params.set('type', carType);
    if (pickupLocation) params.set('pickup', pickupLocation);
    if (dropoffLocation) params.set('dropoff', dropoffLocation);
    if (pickupDate) params.set('from', pickupDate);
    if (returnDate) params.set('to', returnDate);
    router.push(`/booking?${params.toString()}`);
  };

  return (
            <div className="w-full rounded-[20px] md:rounded-[30px] relative border bg-white/90 dark:bg-brand-dark/70 backdrop-blur p-4 md:p-10">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <div className="md:col-span-1 border-r-[1px] border-gray-400 dark:border-[#f5b754]">

          <Select onValueChange={(v) => setCarType(v)} value={carType}>
            <SelectTrigger >
              <SelectValue placeholder="Choose Car Type" />
            </SelectTrigger>
            <SelectContent>
              {carTypes.map((ct) => (
                <SelectItem key={ct.value} value={ct.value}>{ct.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1 border-r-[1px] border-gray-400 dark:border-[#f5b754]">
          <Select onValueChange={(v) => setPickupLocation(v)} value={pickupLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Pick Up Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1 border-r-[1px] border-gray-400 dark:border-[#f5b754]">
          <Input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} />
        </div>
        <div className="md:col-span-1 border-r-[1px] border-gray-400 dark:border-[#f5b754]">
          <Select onValueChange={(v) => setDropoffLocation(v)} value={dropoffLocation}>
            <SelectTrigger>
              <SelectValue placeholder="Drop Off Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((l) => (
                <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="md:col-span-1">
          <Input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
        </div>
        <div className="md:col-span-1 flex items-stretch">
          <Button className="w-full py-5 rounded-[30px]" disabled={!isValid} onClick={handleSubmit}>Rent Now</Button>
        </div>
      </div>
    </div>
  );
}


