'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  FileText, 
  Download, 
  Mail, 
  Printer, 
  Copy, 
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  MapPin,
  Car,
  CreditCard,
  DollarSign,
  Clock
} from 'lucide-react';
import { BookingFormData, EnhancedCar } from '@/lib/types';
import { locations, additionalServices } from '@/lib/data';
import { useTranslation } from '@/lib/translations';

interface BookingFormOutputProps {
  formData: BookingFormData;
  car: EnhancedCar | null;
  priceBreakdown: {
    days: number;
    basePrice: number;
    locationCharges: number;
    serviceCharges: number;
    total: number;
    deposit: number;
  };
  currentLang: string;
  confirmationNumber?: string;
  showActions?: boolean;
  onPrint?: () => void;
  onDownload?: () => void;
  onEmail?: () => void;
}

export default function BookingFormOutput({
  formData,
  car,
  priceBreakdown,
  currentLang,
  confirmationNumber,
  showActions = true,
  onPrint,
  onDownload,
  onEmail
}: BookingFormOutputProps) {
  const t = useTranslation(currentLang);
  const [copied, setCopied] = useState(false);

  const getLocationName = (locationId: string) => {
    const location = locations.find(l => l.id === locationId);
    return location?.name || locationId;
  };

  const getServiceName = (serviceId: string) => {
    const service = additionalServices.find(s => s.id === serviceId);
    return service?.name || serviceId;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLang === 'az' ? 'az-AZ' : 'en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString(currentLang === 'az' ? 'az-AZ' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const copyToClipboard = async () => {
    const text = generateTextOutput();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  const generateTextOutput = () => {
    return `
REZERVASIYA TƏSDIQ MƏKTUBU
${confirmationNumber ? `Təsdiq nömrəsi: ${confirmationNumber}` : ''}
Tarix: ${new Date().toLocaleString()}

ŞƏXSI MƏLUMATLAR:
Ad Soyad: ${formData.firstName} ${formData.lastName}
E-mail: ${formData.email}
Telefon: ${formData.phone}

AVTOMOBIL MƏLUMATLARI:
${car ? `${car.brand} ${car.model} (${car.year})` : 'Seçilməyib'}
${car ? `Sinif: ${car.class}` : ''}
${car ? `Yanacaq: ${car.fuelType}` : ''}
${car ? `Transmissiya: ${car.transmission}` : ''}
${car ? `Oturacaq sayı: ${car.seats}` : ''}

İCARƏ TƏFƏRRÜATLARİ:
Götürülmə tarixi: ${formatDate(formData.pickupDate)}
Qaytarılma tarixi: ${formatDate(formData.dropoffDate)}
Götürülmə yeri: ${getLocationName(formData.pickupLocation)}
Qaytarılma yeri: ${getLocationName(formData.dropoffLocation)}
İcarə müddəti: ${priceBreakdown.days} gün

${formData.additionalServices.length > 0 ? `
ƏLAVƏ XİDMƏTLƏR:
${formData.additionalServices.map(serviceId => `- ${getServiceName(serviceId)}`).join('\n')}
` : ''}

ÖDƏNIŞ MƏLUMATLARI:
Ödəniş üsulu: ${formData.paymentMethod === 'online' ? 'Onlayn ödəniş' : 'Nağd ödəniş'}
Əsas qiymət: $${priceBreakdown.basePrice}
${priceBreakdown.locationCharges > 0 ? `Məkan dəyişikliyi: $${priceBreakdown.locationCharges}` : ''}
${priceBreakdown.serviceCharges > 0 ? `Əlavə xidmətlər: $${priceBreakdown.serviceCharges}` : ''}
Ümumi məbləğ: $${priceBreakdown.total}
Depozit: $${priceBreakdown.deposit}

${formData.specialRequests ? `
XÜSUSİ İSTƏKLƏR:
${formData.specialRequests}
` : ''}

Ram Servis Car Rental
Təşəkkür edirik!
    `.trim();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800 dark:text-green-200">
            <CheckCircle className="h-6 w-6" />
            Rezervasiya Təsdiqləndi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {confirmationNumber && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-700 dark:text-green-300">
                  Təsdiq nömrəsi:
                </span>
                <Badge variant="secondary" className="font-mono">
                  {confirmationNumber}
                </Badge>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm text-green-700 dark:text-green-300">
              <Clock className="h-4 w-4" />
              <span>Yaradılma tarixi: {new Date().toLocaleString()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      {showActions && (
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={onPrint} className="text-xs sm:text-sm">
                <Printer className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">Çap et</span>
                <span className="sm:hidden">Çap</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onDownload} className="text-xs sm:text-sm">
                <Download className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">PDF yüklə</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <Button variant="outline" size="sm" onClick={onEmail} className="text-xs sm:text-sm">
                <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">E-mail göndər</span>
                <span className="sm:hidden">E-mail</span>
              </Button>
              <Button variant="outline" size="sm" onClick={copyToClipboard} className="text-xs sm:text-sm">
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                <span className="hidden sm:inline">{copied ? 'Kopyalandı!' : 'Kopyala'}</span>
                <span className="sm:hidden">{copied ? 'OK!' : 'Kopy'}</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Complete Booking Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Personal Information */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <User className="h-4 w-4 sm:h-5 sm:w-5" />
              Şəxsi Məlumatlar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            <div className="space-y-2">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Ad:</span>
                <span className="font-medium text-sm sm:text-base break-words">{formData.firstName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Soyad:</span>
                <span className="font-medium text-sm sm:text-base break-words">{formData.lastName}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-600 dark:text-gray-400 text-sm">E-mail:</span>
                <span className="font-medium text-sm sm:text-base break-all">{formData.email}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:justify-between gap-1">
                <span className="text-gray-600 dark:text-gray-400 text-sm">Telefon:</span>
                <span className="font-medium text-sm sm:text-base">{formData.phone}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Car Information */}
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <Car className="h-4 w-4 sm:h-5 sm:w-5" />
              Avtomobil Məlumatları
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            {car ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-12 sm:w-20 sm:h-16 relative overflow-hidden rounded flex-shrink-0">
                    <img
                      src={car.image}
                      alt={`${car.brand} ${car.model}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-sm sm:text-base truncate">{car.brand} {car.model}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{car.year}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Sinif:</span>
                    <span className="truncate ml-2">{car.class}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Yanacaq:</span>
                    <span className="truncate ml-2">{car.fuelType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Transmissiya:</span>
                    <span className="truncate ml-2">{car.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Oturacaq:</span>
                    <span className="truncate ml-2">{car.seats}</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm">Avtomobil məlumatları mövcud deyil</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Rental Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            İcarə Təfərrüatları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Götürülmə tarixi:</span>
                </div>
                <p className="font-medium ml-6">{formatDate(formData.pickupDate)}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Götürülmə yeri:</span>
                </div>
                <p className="font-medium ml-6">{getLocationName(formData.pickupLocation)}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Qaytarılma tarixi:</span>
                </div>
                <p className="font-medium ml-6">{formatDate(formData.dropoffDate)}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Qaytarılma yeri:</span>
                </div>
                <p className="font-medium ml-6">{getLocationName(formData.dropoffLocation)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-blue-800 dark:text-blue-200 font-medium">
                İcarə müddəti:
              </span>
              <span className="text-blue-900 dark:text-blue-100 font-bold">
                {priceBreakdown.days} gün
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional Services */}
      {formData.additionalServices.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Əlavə Xidmətlər
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formData.additionalServices.map((serviceId) => {
                const service = additionalServices.find(s => s.id === serviceId);
                return (
                  <div key={serviceId} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <span>{service?.name || serviceId}</span>
                    <Badge variant="secondary">
                      ${service?.price || 0}/gün
                    </Badge>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Ödəniş Məlumatları
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-400">Ödəniş üsulu:</span>
              <Badge variant={formData.paymentMethod === 'online' ? 'default' : 'secondary'}>
                {formData.paymentMethod === 'online' ? 'Onlayn ödəniş' : 'Nağd ödəniş'}
              </Badge>
            </div>
            
            <Separator />
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Əsas qiymət ({priceBreakdown.days} gün):</span>
                <span className="font-semibold">${priceBreakdown.basePrice}</span>
              </div>
              {priceBreakdown.locationCharges > 0 && (
                <div className="flex justify-between">
                  <span>Məkan dəyişikliyi:</span>
                  <span className="font-semibold">${priceBreakdown.locationCharges}</span>
                </div>
              )}
              {priceBreakdown.serviceCharges > 0 && (
                <div className="flex justify-between">
                  <span>Əlavə xidmətlər:</span>
                  <span className="font-semibold">${priceBreakdown.serviceCharges}</span>
                </div>
              )}
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-lg font-bold">
              <span>Ümumi məbləğ:</span>
              <span className="text-amber-600">${priceBreakdown.total}</span>
            </div>
            
            <div className="flex justify-between text-red-600 dark:text-red-400">
              <span className="font-semibold">Depozit:</span>
              <span className="font-semibold">${priceBreakdown.deposit}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      {formData.specialRequests && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Xüsusi İstəklər
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {formData.specialRequests}
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Footer */}
      <Card className="bg-gray-50 dark:bg-gray-900">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-lg">Ram Servis Car Rental</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Rezervasiyanız üçün təşəkkür edirik!
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              Bu sənəd avtomatik olaraq yaradılmışdır və imza tələb etmir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}