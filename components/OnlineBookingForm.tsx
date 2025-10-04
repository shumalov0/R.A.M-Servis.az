'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, MapPin, User, Mail, Phone, CreditCard } from 'lucide-react';
import Image from 'next/image';
import { Car, locations, additionalServices } from '@/lib/data';
import { sendBookingEmailsLegacy } from '@/lib/email';
import { Translation } from '@/lib/translations';

interface OnlineBookingFormProps {
  car?: Car;
  currentLang: string;
  t: Translation;
}

interface BookingData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupDate: string;
  dropoffDate: string;
  pickupLocation: string;
  dropoffLocation: string;
  additionalServices: string[];
  paymentMethod: 'online' | 'cash';
}

export default function OnlineBookingForm({ car, currentLang, t }: OnlineBookingFormProps) {
  const [formData, setFormData] = useState<BookingData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pickupDate: '',
    dropoffDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    additionalServices: [],
    paymentMethod: 'cash'
  });

  const [pricing, setPricing] = useState({
    days: 0,
    basePrice: 0,
    locationCharges: 0,
    serviceCharges: 0,
    total: 0,
    deposit: car?.deposit || 0
  });

  const [step, setStep] = useState(1); // 1: Personal, 2: Dates/Locations, 3: Services/Payment, 4: Review

  // Calculate pricing
  useEffect(() => {
    if (formData.pickupDate && formData.dropoffDate) {
      const pickup = new Date(formData.pickupDate);
      const dropoff = new Date(formData.dropoffDate);
      const timeDiff = dropoff.getTime() - pickup.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      if (days >= 2 && car) {
        let dailyRate = car.dailyPrice;
        let basePrice = 0;

        // Calculate base price based on rental period
        if (days >= 30) {
          const months = Math.floor(days / 30);
          const remainingDays = days % 30;
          basePrice = (months * car.monthlyPrice) + (remainingDays * car.dailyPrice);
        } else if (days >= 7) {
          const weeks = Math.floor(days / 7);
          const remainingDays = days % 7;
          basePrice = (weeks * car.weeklyPrice) + (remainingDays * car.dailyPrice);
        } else {
          basePrice = days * car.dailyPrice;
        }

        // Calculate location charges
        const pickupLocation = locations.find(l => l.id === formData.pickupLocation);
        const dropoffLocation = locations.find(l => l.id === formData.dropoffLocation);
        const locationCharges = (pickupLocation?.extraCharge || 0) + (dropoffLocation?.extraCharge || 0);

        // Calculate service charges
        const serviceCharges = formData.additionalServices.reduce((total, serviceId) => {
          const service = additionalServices.find(s => s.id === serviceId);
          return total + (service ? service.price * days : 0);
        }, 0);

        const total = basePrice + locationCharges + serviceCharges;

        setPricing({
          days,
          basePrice,
          locationCharges,
          serviceCharges,
          total,
          deposit: car.deposit
        });
      }
    }
  }, [formData.pickupDate, formData.dropoffDate, formData.pickupLocation, formData.dropoffLocation, formData.additionalServices, car]);

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      additionalServices: checked 
        ? [...prev.additionalServices, serviceId]
        : prev.additionalServices.filter(id => id !== serviceId)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) return;
    if (!car) return;
    
    // Prepare booking details
    const bookingDetails = {
      car: `${car.brand} ${car.model} (${car.year})`,
      customer: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      pickupLocation: locations.find(l => l.id === formData.pickupLocation)?.name || '',
      dropoffLocation: locations.find(l => l.id === formData.dropoffLocation)?.name || '',
      additionalServices: formData.additionalServices.map(id => 
        additionalServices.find(s => s.id === id)?.name || ''
      ),
      pricing,
      paymentMethod: formData.paymentMethod
    };

    // Save to localStorage
    const existingBookings = JSON.parse(localStorage.getItem('ramservis_bookings') || '[]');
    const newBooking = {
      ...bookingDetails,
      id: Date.now().toString(),
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    existingBookings.push(newBooking);
    localStorage.setItem('ramservis_bookings', JSON.stringify(existingBookings));

    // Email receipts: to customer and to business
    try {
      const payload = {
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        businessEmail: 'info@ramservis.az',
        car: `${car.brand} ${car.model} (${car.year})`,
        dates: `${formData.pickupDate} - ${formData.dropoffDate}`,
        locations: `${locations.find(l => l.id === formData.pickupLocation)?.name} → ${locations.find(l => l.id === formData.dropoffLocation)?.name}`,
        services: (formData.additionalServices.map(id => additionalServices.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'Yoxdur'),
        total: `$${pricing.total}`,
      };
      await sendBookingEmailsLegacy(payload);
    } catch (e) {
      console.warn('Email sending failed or skipped:', e);
    }

    if (formData.paymentMethod === 'online') {
      // Send WhatsApp message for online payment with customer contacts
      const message = `Yeni rezervasiya (ONLINE):\n\nMüştəri: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nTelefon: ${formData.phone}\nMaşın: ${car.brand} ${car.model} (${car.year})\nTarix: ${formData.pickupDate} - ${formData.dropoffDate}\nGötürülmə/Qaytarılma: ${locations.find(l => l.id === formData.pickupLocation)?.name} → ${locations.find(l => l.id === formData.dropoffLocation)?.name}\nƏlavə xidmətlər: ${formData.additionalServices.map(id => additionalServices.find(s => s.id === id)?.name).filter(Boolean).join(', ') || 'Yoxdur'}\nÜmumi məbləğ: ${pricing.total} USD\n\nXahiş olunur online ödəniş üçün link/kart məlumatı göndərilsin.`;
      const whatsappUrl = `https://wa.me/+994708559001?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }

    alert('Rezervasiyanız uğurla göndərildi! E-mail ünvanınıza təsdiq göndəriləcək.');
    
    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      pickupDate: '',
      dropoffDate: '',
      pickupLocation: '',
      dropoffLocation: '',
      additionalServices: [],
      paymentMethod: 'cash'
    });
    setStep(1);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && 
                     formData.pickupDate && formData.dropoffDate && formData.pickupLocation && 
                     formData.dropoffLocation && pricing.days >= 2;

  const isStepValid = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.pickupDate && formData.dropoffDate && formData.pickupLocation && formData.dropoffLocation && pricing.days >= 2;
    }
    if (step === 3) {
      return formData.paymentMethod === 'cash' || formData.paymentMethod === 'online';
    }
    if (step === 4) {
      return isFormValid;
    }
    return false;
  };

  const nextStep = () => {
    if (isStepValid()) setStep((s) => Math.min(4, s + 1));
  };
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const getLocalizedLocationName = (locationName: string): string => {
    const locationMap: Record<string, Record<string, string>> = {
      'Ofisimizdən götürülmə': { az: 'Ofisimizdən götürülmə', en: 'Office pickup', ru: 'Получение из офиса', ar: 'الاستلام من المكتب' },
      'Heydər Əliyev Hava Limanı': { az: 'Heydər Əliyev Hava Limanı', en: 'Heydar Aliyev Airport', ru: 'Аэропорт Гейдара Алиева', ar: 'مطار حيدر علييف' },
      'Şəhər Mərkəzi': { az: 'Şəhər Mərkəzi', en: 'City Center', ru: 'Центр Города', ar: 'وسط المدينة' },
      'Otel/Yaşayış yeri': { az: 'Otel/Yaşayış yeri', en: 'Hotel/Residence', ru: 'Отель/Место проживания', ar: 'الفندق/مكان الإقامة' },
      'Dəmir yolu vağzalı': { az: 'Dəmir yolu vağzalı', en: 'Railway Station', ru: 'Железнодорожный Вокзал', ar: 'محطة السكك الحديدية' },
    };
    return locationMap[locationName]?.[currentLang] || locationName;
  };

  const getLocalizedServiceName = (serviceName: string): string => {
    const serviceMap: Record<string, Record<string, string>> = {
      'Şəxsi Sürücü': { az: 'Şəxsi Sürücü', en: 'Personal Driver', ru: 'Личный Водитель', ar: 'سائق شخصي' },
      'Uşaq Oturacağı': { az: 'Uşaq Oturacağı', en: 'Child Seat', ru: 'Детское Кресло', ar: 'مقعد الأطفال' },
      'GPS Naviqasiya': { az: 'GPS Naviqasiya', en: 'GPS Navigation', ru: 'GPS Навигация', ar: 'نظام تحديد المواقع' },
      'Tam Sığorta': { az: 'Tam Sığorta', en: 'Full Insurance', ru: 'Полная Страховка', ar: 'تأمين شامل' },
    };
    return serviceMap[serviceName]?.[currentLang] || serviceName;
  };

  const getLocalizedServiceDescription = (description: string): string => {
    const descMap: Record<string, Record<string, string>> = {
      'Təcrübəli sürücü ilə rahat səyahət': { az: 'Təcrübəli sürücü ilə rahat səyahət', en: 'Comfortable travel with experienced driver', ru: 'Комфортное путешествие с опытным водителем', ar: 'سفر مريح مع سائق ذو خبرة' },
      '0-12 yaş arası uşaqlar üçün təhlükəsiz oturacaq': { az: '0-12 yaş arası uşaqlar üçün təhlükəsiz oturacaq', en: 'Safe seat for children aged 0-12', ru: 'Безопасное кресло для детей 0-12 лет', ar: 'مقعد آمن للأطفال من عمر 0-12' },
      'Peşəkar GPS cihazı': { az: 'Peşəkar GPS cihazı', en: 'Professional GPS device', ru: 'Профессиональное GPS устройство', ar: 'جهاز GPS احترافي' },
      'Genişləndirilmiş sığorta təminatı': { az: 'Genişləndirilmiş sığorta təminatı', en: 'Extended insurance coverage', ru: 'Расширенное страховое покрытие', ar: 'تغطية تأمينية موسعة' },
    };
    return descMap[description]?.[currentLang] || description;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          {t.onlineReservation}
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {car 
            ? `${car.brand} ${car.model} (${car.year}) üçün online rezervasiya edin` 
            : 'Avtomobil seçin və online rezervasiya edin'}
        </p>
        <div className="mt-6 h-2 w-full bg-gray-200 dark:bg-brand-dark/70  rounded-full">
          <div
            className="h-2 bg-amber-600 rounded-full transition-all"
            style={{ width: `${(step - 1) * 33.33}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">Addım {step} / 4</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Form */}
        <div className="lg:col-span-2">
          <Card className="bg-white dark:bg-brand-dark/70  shadow-xl border-0">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                {t.rentalDetails}
              </CardTitle>
              <CardDescription>
                {step === 1 && t.personalInfo}
                {step === 2 && `${t.pickupDate} • ${t.dropoffDate} • ${t.pickupLocation}`}
                {step === 3 && `${t.additionalServices} • ${t.paymentMethod}`}
                {step === 4 && t.priceSummary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-8">
                {step === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t.firstName} *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {t.lastName} *
                      </Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {t.email} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone" className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        {t.phone} *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                        className="mt-2"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="pickupDate" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {t.pickupDate} *
                        </Label>
                        <Input
                          id="pickupDate"
                          type="date"
                          value={formData.pickupDate}
                          onChange={(e) => handleInputChange('pickupDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          required
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label htmlFor="dropoffDate" className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          {t.dropoffDate} *
                        </Label>
                        <Input
                          id="dropoffDate"
                          type="date"
                          value={formData.dropoffDate}
                          onChange={(e) => handleInputChange('dropoffDate', e.target.value)}
                          min={formData.pickupDate || new Date().toISOString().split('T')[0]}
                          required
                          className="mt-2"
                        />
                      </div>
                    </div>

                    {pricing.days > 0 && pricing.days < 2 && (
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <p className="text-red-700 text-sm">
                          {t.minimumRentalPeriod}: {pricing.days} {t.days}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {t.pickupLocation} *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('pickupLocation', value)} value={formData.pickupLocation}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder={t.selectLocation} />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem key={location.id} value={location.id}>
                                <div className="flex justify-between items-center w-full">
                                  <span>{getLocalizedLocationName(location.name)}</span>
                                  {location.extraCharge > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                      +${location.extraCharge}
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          {t.dropoffLocation} *
                        </Label>
                        <Select onValueChange={(value) => handleInputChange('dropoffLocation', value)} value={formData.dropoffLocation}>
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder={t.selectLocation} />
                          </SelectTrigger>
                          <SelectContent>
                            {locations.map(location => (
                              <SelectItem key={location.id} value={location.id}>
                                <div className="flex justify-between items-center w-full">
                                  <span>{getLocalizedLocationName(location.name)}</span>
                                  {location.extraCharge > 0 && (
                                    <Badge variant="secondary" className="ml-2">
                                      +${location.extraCharge}
                                    </Badge>
                                  )}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {step === 3 && (
                  <>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        {t.additionalServices}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {additionalServices.map(service => (
                          <div key={service.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-amber-50/50 dark:bg-brand-dark/70  transition-colors">
                            <div className="flex items-center h-5">
                              <Checkbox
                                id={`service-${service.id}`}
                                checked={formData.additionalServices.includes(service.id)}
                                onCheckedChange={(checked) => handleServiceChange(service.id, checked as boolean)}
                              />
                            </div>
                            <div className="flex-1">
                              <Label 
                                htmlFor={`service-${service.id}`} 
                                className="text-base font-medium cursor-pointer block"
                              >
                                {getLocalizedServiceName(service.name)}
                              </Label>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {getLocalizedServiceDescription(service.description)}
                              </p>
                              <p className="text-sm font-semibold text-brand-gold dark:text-brand-gold mt-1">
                                ${service.price}/{t.perDay.replace('/', '')}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {t.paymentMethod}
                      </h3>
                      <RadioGroup 
                        value={formData.paymentMethod} 
                        onValueChange={(value) => handleInputChange('paymentMethod', value as 'online' | 'cash')}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-amber-50/50 dark:bg-brand-dark/70  transition-colors">
                          <RadioGroupItem value="cash" id="cash" className="h-5 w-5" />
                          <Label htmlFor="cash" className="flex-1 cursor-pointer text-base">
                            {t.cashPayment}
                          </Label>
                        </div>
                        <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-amber-50/50 dark:bg-brand-dark/70  transition-colors">
                          <RadioGroupItem value="online" id="online" className="h-5 w-5" />
                          <Label htmlFor="online" className="flex-1 cursor-pointer text-base">
                            {t.onlinePayment}
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </>
                )}

                {step === 4 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Müştəri</h4>
                        <p className="text-gray-600 dark:text-gray-300">{formData.firstName} {formData.lastName}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.email}</p>
                        <p className="text-gray-600 dark:text-gray-300">{formData.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">İcarə</h4>
                        <p className="text-gray-600 dark:text-gray-300">{formData.pickupDate} → {formData.dropoffDate}</p>
                        <p className="text-gray-600 dark:text-gray-300">{locations.find(l => l.id === formData.pickupLocation)?.name} → {locations.find(l => l.id === formData.dropoffLocation)?.name}</p>
                        <p className="text-gray-600 dark:text-gray-300">Ödəniş: {formData.paymentMethod === 'online' ? t.onlinePayment : t.cashPayment}</p>
                      </div>
                    </div>
                    <Separator className="bg-gray-200  dark:bg-brand-dark/70 " />
                    {pricing.days >= 2 ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">{t.rentalPeriod}:</span>
                          <span className="font-semibold">{pricing.days} {t.days}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300">{t.basePrice}:</span>
                          <span className="font-semibold">${pricing.basePrice}</span>
                        </div>
                        {pricing.locationCharges > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">{t.locationChanges}:</span>
                            <span className="font-semibold">${pricing.locationCharges}</span>
                          </div>
                        )}
                        {pricing.serviceCharges > 0 && (
                          <div className="flex justify-between">
                            <span className="text-gray-600 dark:text-gray-300">{t.additionalServicesPrice}:</span>
                            <span className="font-semibold">${pricing.serviceCharges}</span>
                          </div>
                        )}
                        <Separator className="bg-gray-200 dark:bg-brand-dark/70 " />
                        <div className="flex justify-between text-lg">
                          <span className="font-bold">{t.totalAmount}:</span>
                          <span className="font-bold text-brand-gold dark:text-brand-gold">${pricing.total}</span>
                        </div>
                        <div className="flex justify-between text-red-600 dark:text-red-400">
                          <span className="font-semibold">{t.deposit}:</span>
                          <span className="font-semibold">${pricing.deposit}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400">
                          {t.minimumRentalPeriod}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <Button type="button" variant="outline" onClick={prevStep} disabled={step === 1}>
                    Geri
                  </Button>
                  {step < 4 ? (
                    <Button type="button" onClick={nextStep} disabled={!isStepValid()} className="bg-brand-gold hover:bg-brand-gold/80 text-white">
                      Növbəti
                    </Button>
                  ) : (
                    <Button 
                      type="submit" 
                      disabled={!isFormValid}
                      className="bg-brand-gold hover:bg-brand-gold/80 text-white"
                    >
                      {formData.paymentMethod === 'online' ? t.onlinePayment : t.makeReservation}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Price Summary */}
        <div>
          <Card className="bg-white  dark:bg-brand-dark/70 shadow-xl border-0 sticky top-24">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-900 dark:text-white">
                {t.priceSummary}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {car && (
                <div className="text-center">
                  <div className="aspect-video relative overflow-hidden rounded-lg mb-4">
                    <Image
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {car.brand} {car.model}
                  </h3>
                  <p className="text-brand-gold dark:text-brand-gold font-semibold">
                    {car.year}
                  </p>
                </div>
              )}

              <Separator className="bg-gray-200  dark:bg-brand-dark/70 " />

              {pricing.days >= 2 ? (
                <>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.rentalPeriod}:</span>
                      <span className="font-semibold">{pricing.days} {t.days}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">{t.basePrice}:</span>
                      <span className="font-semibold">${pricing.basePrice}</span>
                    </div>
                    {pricing.locationCharges > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{t.locationChanges}:</span>
                        <span className="font-semibold">${pricing.locationCharges}</span>
                      </div>
                    )}
                    {pricing.serviceCharges > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">{t.additionalServicesPrice}:</span>
                        <span className="font-semibold">${pricing.serviceCharges}</span>
                      </div>
                    )}
                    <Separator className="bg-gray-200  dark:bg-brand-dark/70 " />
                    <div className="flex justify-between text-lg">
                      <span className="font-bold">{t.totalAmount}:</span>
                      <span className="font-bold text-brand-gold dark:text-brand-gold">${pricing.total}</span>
                    </div>
                    <div className="flex justify-between text-red-600 dark:text-red-400">
                      <span className="font-semibold">{t.deposit}:</span>
                      <span className="font-semibold">${pricing.deposit}</span>
                    </div>
                  </div>

                  <div className="bg-amber-50 dark:bg-brand-dark/70  rounded-lg p-4">
                    <h4 className="font-semibold text-brand-gold dark:text-brand-gold mb-2">
                      {t.rentalRules}
                    </h4>
                    <ul className="text-sm text-brand-gold dark:text-brand-gold space-y-1">
                      <li>• Minimum yaş: 21</li>
                      <li>• Sürücülük təcrübəsi: 2 il</li>
                      <li>• Pasport tələbi: Bəli</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400">
                    {t.minimumRentalPeriod}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="bg-white dark:bg-brand-dark/70  shadow-xl border-0 mt-6">
            <CardHeader>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                {t.contactInfo}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                <span className="text-gray-700 dark:text-gray-300">+994 70 855 90 01</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                <span className="text-gray-700 dark:text-gray-300">info@ramservis.az</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-5 w-5 text-brand-gold dark:text-brand-gold" />
                <span className="text-gray-700 dark:text-gray-300">Bakı, Azərbaycan</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}