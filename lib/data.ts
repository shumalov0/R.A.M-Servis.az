import { CustomerReview, Certificate, EnhancedCar, CarCategory } from "./types";

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

// Enhanced cars data with new fields
export const enhancedCars: EnhancedCar[] = [
  {
    id: "1",
    brand: "Hyundai",
    model: "Elantra",
    year: 2023,
    class: "Ekonom",
    fuelType: "Benzin",
    transmission: "Avtomat",
    engineSize: "2.0L",
    seats: 5,
    dailyPrice: 45,
    weeklyPrice: 280,
    monthlyPrice: 1100,
    deposit: 200,
    image:
      "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: ["Kondisioner", "GPS Naviqasiya", "Bluetooth", "USB Port"],
    rules: {
      minimumAge: 21,
      drivingExperience: 2,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "Economy",
    popularity: 85,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3972755/pexels-photo-3972755.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "2.0L 4-Cylinder",
      horsepower: 147,
      acceleration: "0-100 km/h in 9.2s",
      topSpeed: 190,
      fuelConsumption: "6.8L/100km",
    },
  },
  {
    id: "2",
    brand: "Toyota",
    model: "Camry",
    year: 2024,
    class: "Biznes",
    fuelType: "Benzin",
    transmission: "Avtomat",
    engineSize: "2.5L",
    seats: 5,
    dailyPrice: 75,
    weeklyPrice: 480,
    monthlyPrice: 1900,
    deposit: 300,
    image:
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: [
      "Premium Dəri Oturacaqlar",
      "Panorama Dam",
      "Adaptiv Kruiz Kontrol",
      "Wireless Charging",
    ],
    rules: {
      minimumAge: 23,
      drivingExperience: 3,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "Business",
    popularity: 92,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "2.5L 4-Cylinder",
      horsepower: 203,
      acceleration: "0-100 km/h in 7.8s",
      topSpeed: 210,
      fuelConsumption: "7.2L/100km",
    },
  },
  {
    id: "3",
    brand: "BMW",
    model: "X5",
    year: 2023,
    class: "Premium",
    fuelType: "Benzin",
    transmission: "Avtomat",
    engineSize: "3.0L",
    seats: 7,
    dailyPrice: 120,
    weeklyPrice: 780,
    monthlyPrice: 3100,
    deposit: 500,
    image:
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: ["4WD", "Premium Audio", "Heated Seats", "Advanced Safety"],
    rules: {
      minimumAge: 25,
      drivingExperience: 5,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "SUV",
    popularity: 88,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/136872/pexels-photo-136872.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "3.0L Twin-Turbo I6",
      horsepower: 335,
      acceleration: "0-100 km/h in 5.8s",
      topSpeed: 243,
      fuelConsumption: "9.1L/100km",
    },
  },
  {
    id: "4",
    brand: "Mercedes",
    model: "E-Class",
    year: 2024,
    class: "Lüks",
    fuelType: "Hybrid",
    transmission: "Avtomat",
    engineSize: "2.0L",
    seats: 5,
    dailyPrice: 95,
    weeklyPrice: 620,
    monthlyPrice: 2450,
    deposit: 400,
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: [
      "Massaj Oturacaqlar",
      "Ambient Lighting",
      "Premium Sound",
      "Driver Assistance",
    ],
    rules: {
      minimumAge: 25,
      drivingExperience: 4,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "Luxury",
    popularity: 95,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "2.0L Turbo Hybrid",
      horsepower: 255,
      acceleration: "0-100 km/h in 6.6s",
      topSpeed: 240,
      fuelConsumption: "5.9L/100km",
    },
  },
  {
    id: "5",
    brand: "Volkswagen",
    model: "Passat",
    year: 2023,
    class: "Komfort",
    fuelType: "Dizel",
    transmission: "Avtomat",
    engineSize: "2.0L TDI",
    seats: 5,
    dailyPrice: 60,
    weeklyPrice: 390,
    monthlyPrice: 1550,
    deposit: 250,
    image:
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: [
      "Digital Dashboard",
      "Lane Assist",
      "Park Assist",
      "Climate Control",
    ],
    rules: {
      minimumAge: 22,
      drivingExperience: 2,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "Economy",
    popularity: 78,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149137/pexels-photo-1149137.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "2.0L TDI Diesel",
      horsepower: 150,
      acceleration: "0-100 km/h in 8.7s",
      topSpeed: 210,
      fuelConsumption: "4.8L/100km",
    },
  },
  {
    id: "6",
    brand: "Kia",
    model: "Sportage",
    year: 2023,
    class: "SUV",
    fuelType: "Benzin",
    transmission: "Avtomat",
    engineSize: "2.4L",
    seats: 5,
    dailyPrice: 70,
    weeklyPrice: 450,
    monthlyPrice: 1800,
    deposit: 300,
    image:
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
    images: [
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    features: ["All Terrain", "Roof Rails", "Rearview Camera", "Smart Key"],
    rules: {
      minimumAge: 23,
      drivingExperience: 3,
      passportRequired: true,
      licenseRequired: true,
    },
    // New enhanced fields
    category: "SUV",
    popularity: 82,
    availability: true,
    gallery: [
      "https://images.pexels.com/photos/193991/pexels-photo-193991.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/244206/pexels-photo-244206.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    specifications: {
      engine: "2.4L 4-Cylinder",
      horsepower: 181,
      acceleration: "0-100 km/h in 8.9s",
      topSpeed: 195,
      fuelConsumption: "8.2L/100km",
    },
  },
];

// Keep original cars array for backward compatibility
export const cars: Car[] = enhancedCars.map((car) => {
  const {
    category,
    popularity,
    availability,
    gallery,
    specifications,
    ...originalCar
  } = car;
  return originalCar;
});

export const locations: Location[] = [
  { id: "office", name: "Ofisimizdən götürülmə", extraCharge: 0 },
  { id: "airport", name: "Heydər Əliyev Hava Limanı", extraCharge: 25 },
  { id: "city-center", name: "Şəhər Mərkəzi", extraCharge: 15 },
  { id: "hotel", name: "Otel/Yaşayış yeri", extraCharge: 20 },
  { id: "station", name: "Dəmir yolu vağzalı", extraCharge: 18 },
];

export const additionalServices: AdditionalService[] = [
  {
    id: "driver",
    name: "Şəxsi Sürücü",
    price: 50,
    description: "Təcrübəli sürücü ilə rahat səyahət",
  },
  {
    id: "child-seat",
    name: "Uşaq Oturacağı",
    price: 10,
    description: "0-12 yaş arası uşaqlar üçün təhlükəsiz oturacaq",
  },
  {
    id: "gps",
    name: "GPS Naviqasiya",
    price: 8,
    description: "Peşəkar GPS cihazı",
  },
  {
    id: "insurance",
    name: "Tam Sığorta",
    price: 25,
    description: "Genişləndirilmiş sığorta təminatı",
  },
];

export const customerReviews: CustomerReview[] = [
  {
    id: "1",
    customerName: "Əli Məmmədov",
    rating: 5,
    reviewText:
      "Çox yaxşı xidmət! Maşın təmiz və yaxşı vəziyyətdə idi. Heyət çox köməkçi oldu.",
    date: "2024-01-15",
    carRented: "Toyota Camry",
    verified: true,
    helpful: 12,
    source: "google",
  },
  {
    id: "2",
    customerName: "Leyla Həsənova",
    rating: 5,
    reviewText:
      "Mükəmməl təcrübə! Rezervasiya prosesi çox asan idi və maşın vaxtında təhvil verildi.",
    date: "2024-01-10",
    carRented: "BMW X5",
    verified: true,
    helpful: 8,
    source: "google",
  },
  {
    id: "3",
    customerName: "Rəşad Əliyev",
    rating: 4,
    reviewText: "Yaxşı qiymətlər və keyfiyyətli maşınlar. Tövsiyə edirəm!",
    date: "2024-01-08",
    carRented: "Hyundai Elantra",
    verified: true,
    helpful: 6,
    source: "internal",
  },
  {
    id: "4",
    customerName: "Günel Qasımova",
    rating: 5,
    reviewText:
      "Hər şey mükəmməl idi. Maşın çox rahat və təmiz idi. Mütləq yenidən istifadə edəcəyəm.",
    date: "2024-01-05",
    carRented: "Mercedes E-Class",
    verified: true,
    helpful: 15,
    source: "google",
  },
  {
    id: "5",
    customerName: "Orxan Babayev",
    rating: 4,
    reviewText:
      "Peşəkar xidmət və ədalətli qiymətlər. Kiçik gecikmə oldu, amma ümumiyyətlə məmnunam.",
    date: "2024-01-03",
    carRented: "Volkswagen Passat",
    verified: true,
    helpful: 4,
    source: "internal",
  },
  {
    id: "6",
    customerName: "Səbinə Rəhimova",
    rating: 5,
    reviewText:
      "Çox yaxşı təcrübə! Heyət çox mehriban və köməkçi idi. Maşın da əla vəziyyətdə idi.",
    date: "2023-12-28",
    carRented: "Kia Sportage",
    verified: true,
    helpful: 9,
    source: "google",
  },
  {
    id: "7",
    customerName: "Elvin Nərimanov",
    rating: 5,
    reviewText:
      "Mükəmməl xidmət! Sürətli rezervasiya və problemsiz təhvil alma prosesi.",
    date: "2023-12-25",
    carRented: "Toyota Camry",
    verified: true,
    helpful: 11,
    source: "facebook",
  },
  {
    id: "8",
    customerName: "Aynur Sultanova",
    rating: 4,
    reviewText:
      "Yaxşı qiymət-keyfiyyət nisbəti. Maşın təmiz və yanacaq dolu idi.",
    date: "2023-12-20",
    carRented: "Hyundai Elantra",
    verified: true,
    helpful: 7,
    source: "google",
  },
];

// Certificates data structure
export const certificates: Certificate[] = [
  {
    id: "1",
    title: "ISO 9001:2015 Keyfiyyət İdarəetmə Sistemi",
    image:
      "https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Beynəlxalq keyfiyyət standartlarına uyğunluq sertifikatı",
    issueDate: "2023-06-15",
    validUntil: "2026-06-15",
    issuer: "TÜV SÜD",
    credentialId: "ISO-9001-2023-AZ-001",
  },
  {
    id: "2",
    title: "Avtomobil İcarəsi Lisenziyası",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=800",
    description:
      "Azərbaycan Respublikası Nəqliyyat Nazirliyi tərəfindən verilmiş rəsmi lisenziya",
    issueDate: "2023-01-10",
    validUntil: "2028-01-10",
    issuer: "Nəqliyyat Nazirliyi",
    credentialId: "RNT-2023-001-AZ",
  },
  {
    id: "3",
    title: "Sığorta Sertifikatı",
    image:
      "https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Tam sığorta təminatı sertifikatı",
    issueDate: "2024-01-01",
    validUntil: "2024-12-31",
    issuer: "ASCO Sığorta",
    credentialId: "ASCO-2024-RS-789",
  },
  {
    id: "4",
    title: "Müştəri Məmnuniyyəti Mükafatı",
    image:
      "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "2023-cü il üçün ən yaxşı müştəri xidməti mükafatı",
    issueDate: "2023-12-01",
    issuer: "Azərbaycan Turizm Assosiasiyası",
    credentialId: "ATA-2023-CS-AWARD",
  },
  {
    id: "5",
    title: "Ekoloji Sertifikat",
    image:
      "https://images.pexels.com/photos/9324302/pexels-photo-9324302.jpeg?auto=compress&cs=tinysrgb&w=800",
    description: "Ətraf mühitə dost nəqliyyat xidmətləri sertifikatı",
    issueDate: "2023-09-20",
    validUntil: "2025-09-20",
    issuer: "Ekoloji Sertifikatlaşdırma Mərkəzi",
    credentialId: "ECO-2023-TRANS-456",
  },
];

// Car categories for navigation dropdown
export const carCategories: CarCategory[] = [
  {
    id: "economy",
    name: "economy",
    displayName: "Ekonom",
    icon: "🚗",
    description: "Sərfəli və praktik seçimlər",
    count: 2,
  },
  {
    id: "sedan",
    name: "sedan",
    displayName: "Sedan",
    icon: "🚙",
    description: "Rahat və geniş salon",
    count: 0,
  },
  {
    id: "suv",
    name: "suv",
    displayName: "SUV",
    icon: "🚐",
    description: "Yüksək və güclü maşınlar",
    count: 2,
  },
  {
    id: "business",
    name: "business",
    displayName: "Biznes",
    icon: "🚘",
    description: "İş səfərləri üçün ideal",
    count: 1,
  },
  {
    id: "luxury",
    name: "luxury",
    displayName: "Lüks",
    icon: "🏎️",
    description: "Premium təcrübə",
    count: 1,
  },
  {
    id: "comfort",
    name: "comfort",
    displayName: "Komfort",
    icon: "🚗",
    description: "Rahat və müasir",
    count: 0,
  },
];
