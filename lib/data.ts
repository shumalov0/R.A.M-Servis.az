export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  class: string;
  fuelType: string;
  transmission: string;
  engineSize: string;
  seats: number;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  deposit: number;
  image: string; // primary image (legacy)
  images?: string[]; // gallery images (4-5)
  features: string[];
  rules: {
    minimumAge: number;
    drivingExperience: number;
    passportRequired: boolean;
    licenseRequired: boolean;
  };
}

export interface Location {
  id: string;
  name: string;
  extraCharge: number;
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
  description: string;
}

export const cars: Car[] = [
  {
    id: '1',
    brand: 'Hyundai',
    model: 'Elantra',
    year: 2023,
    class: 'Ekonom',
    fuelType: 'Benzin',
    transmission: 'Avtomat',
    engineSize: '2.0L',
    seats: 5,
    dailyPrice: 45,
    weeklyPrice: 280,
    monthlyPrice: 1100,
    deposit: 200,
    image: 'https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-1-26-416x340.png',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Kondisioner', 'GPS Naviqasiya', 'Bluetooth', 'USB Port'],
    rules: {
      minimumAge: 21,
      drivingExperience: 2,
      passportRequired: true,
      licenseRequired: true,
    },
  },
  {
    id: '2',
    brand: 'Toyota',
    model: 'Camry',
    year: 2024,
    class: 'Biznes',
    fuelType: 'Benzin',
    transmission: 'Avtomat',
    engineSize: '2.5L',
    seats: 5,
    dailyPrice: 75,
    weeklyPrice: 480,
    monthlyPrice: 1900,
    deposit: 300,
    image: 'https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-6-416x340.png',
      'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/3050708/pexels-photo-3050708.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Premium Dəri Oturacaqlar', 'Panorama Dam', 'Adaptiv Kruiz Kontrol', 'Wireless Charging'],
    rules: {
      minimumAge: 23,
      drivingExperience: 3,
      passportRequired: true,
      licenseRequired: true,
    },
  },
  {
    id: '3',
    brand: 'BMW',
    model: 'X5',
    year: 2023,
    class: 'Premium',
    fuelType: 'Benzin',
    transmission: 'Avtomat',
    engineSize: '3.0L',
    seats: 7,
    dailyPrice: 120,
    weeklyPrice: 780,
    monthlyPrice: 3100,
    deposit: 500,
    image: 'https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-7-416x340.png',
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['4WD', 'Premium Audio', 'Heated Seats', 'Advanced Safety'],
    rules: {
      minimumAge: 25,
      drivingExperience: 5,
      passportRequired: true,
      licenseRequired: true,
    },
  },
  {
    id: '4',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2024,
    class: 'Lüks',
    fuelType: 'Hybrid',
    transmission: 'Avtomat',
    engineSize: '2.0L',
    seats: 5,
    dailyPrice: 95,
    weeklyPrice: 620,
    monthlyPrice: 2450,
    deposit: 400,
    image: 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-2-416x340.png',
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Massaj Oturacaqlar', 'Ambient Lighting', 'Premium Sound', 'Driver Assistance'],
    rules: {
      minimumAge: 25,
      drivingExperience: 4,
      passportRequired: true,
      licenseRequired: true,
    },
  },
  {
    id: '5',
    brand: 'Volkswagen',
    model: 'Passat',
    year: 2023,
    class: 'Komfort',
    fuelType: 'Dizel',
    transmission: 'Avtomat',
    engineSize: '2.0L TDI',
    seats: 5,
    dailyPrice: 60,
    weeklyPrice: 390,
    monthlyPrice: 1550,
    deposit: 250,
    image: 'https://carento.alithemes.net/wp-content/uploads/2025/06/car-1-416x340.png',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-1-416x340.png',
      'https://carento.alithemes.net/wp-content/uploads/2025/06/banner7.png',
      'https://carento.alithemes.net/wp-content/uploads/2025/06/banner9.png',
      'https://images.pexels.com/photos/3050708/pexels-photo-3050708.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['Digital Dashboard', 'Lane Assist', 'Park Assist', 'Climate Control'],
    rules: {
      minimumAge: 22,
      drivingExperience: 2,
      passportRequired: true,
      licenseRequired: true,
    },
  },
  {
    id: '6',
    brand: 'Kia',
    model: 'Sportage',
    year: 2023,
    class: 'SUV',
    fuelType: 'Benzin',
    transmission: 'Avtomat',
    engineSize: '2.4L',
    seats: 5,
    dailyPrice: 70,
    weeklyPrice: 450,
    monthlyPrice: 1800,
    deposit: 300,
    image: 'https://carento.alithemes.net/wp-content/uploads/2025/06/car-1-13-416x340.png',
    images: [
      'https://carento.alithemes.net/wp-content/uploads/2025/06/car-1-13-416x340.png',
      'https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200'
    ],
    features: ['All Terrain', 'Roof Rails', 'Rearview Camera', 'Smart Key'],
    rules: {
      minimumAge: 23,
      drivingExperience: 3,
      passportRequired: true,
      licenseRequired: true,
    },
  },
];

export const locations: Location[] = [
  { id: 'office', name: 'Ofisimizdən götürülmə', extraCharge: 0 },
  { id: 'airport', name: 'Heydər Əliyev Hava Limanı', extraCharge: 25 },
  { id: 'city-center', name: 'Şəhər Mərkəzi', extraCharge: 15 },
  { id: 'hotel', name: 'Otel/Yaşayış yeri', extraCharge: 20 },
  { id: 'station', name: 'Dəmir yolu vağzalı', extraCharge: 18 },
];

export const additionalServices: AdditionalService[] = [
  {
    id: 'driver',
    name: 'Şəxsi Sürücü',
    price: 50,
    description: 'Təcrübəli sürücü ilə rahat səyahət',
  },
  {
    id: 'child-seat',
    name: 'Uşaq Oturacağı',
    price: 10,
    description: '0-12 yaş arası uşaqlar üçün təhlükəsiz oturacaq',
  },
  {
    id: 'gps',
    name: 'GPS Naviqasiya',
    price: 8,
    description: 'Peşəkar GPS cihazı',
  },
  {
    id: 'insurance',
    name: 'Tam Sığorta',
    price: 25,
    description: 'Genişləndirilmiş sığorta təminatı',
  },
];