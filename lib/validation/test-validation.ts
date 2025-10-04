import * as Yup from 'yup';
import { 
  createBookingValidationSchema,
  createContactValidationSchema,
  createNewsletterValidationSchema,
  createCarFilterValidationSchema,
  createQuickBookingValidationSchema,
  createReviewValidationSchema,
  createWhatsAppMessageValidationSchema,
  getValidationMessages,
  validationMessages
} from './schemas';
import { 
  validatePhoneNumber,
  formatPhoneNumber,
  isValidDate,
  isDateInFuture,
  calculateDaysBetween,
  isWeekend,
  isHoliday,
  getDateValidationMessage,
  formatDateForDisplay
} from './utils';
import { BookingFormData } from '@/lib/types';

// Test data for validation (using future dates)
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
const dayAfterTomorrow = new Date();
dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 3);

const validBookingData: BookingFormData = {
  firstName: 'Əli',
  lastName: 'Məmmədov',
  email: 'ali.mammadov@gmail.com',
  phone: '+994501234567',
  carId: 'car-123',
  pickupDate: tomorrow.toISOString().split('T')[0],
  dropoffDate: dayAfterTomorrow.toISOString().split('T')[0],
  pickupLocation: 'Heydər Əliyev Hava Limanı',
  dropoffLocation: 'Şəhər Mərkəzi',
  additionalServices: ['gps', 'child-seat'],
  paymentMethod: 'cash' as const,
  specialRequests: 'Zəhmət olmasa maşını təmiz hazırlayın',
  totalDays: 2,
  totalPrice: 120,
  deposit: 50,
  serviceCharges: 20,
};

const invalidBookingData = {
  firstName: '', // Required field empty
  lastName: 'A', // Too short
  email: 'invalid-email', // Invalid email format
  phone: '123', // Invalid phone format
  carId: '',
  pickupDate: '2023-01-01', // Past date
  dropoffDate: '2023-01-01', // Same as pickup date
  pickupLocation: '',
  dropoffLocation: '',
  additionalServices: [],
  paymentMethod: 'invalid' as any,
  totalDays: 0,
  totalPrice: -10,
  deposit: -5,
  serviceCharges: -1,
};

// Test validation schemas
export const testValidationSchemas = async () => {
  console.log('🧪 Testing Validation Schemas...\n');
  
  // Test multilingual messages
  console.log('📝 Testing multilingual messages:');
  const azMessages = getValidationMessages('az');
  const enMessages = getValidationMessages('en');
  const ruMessages = getValidationMessages('ru');
  const arMessages = getValidationMessages('ar');
  
  console.log('AZ Required:', azMessages.required);
  console.log('EN Required:', enMessages.required);
  console.log('RU Required:', ruMessages.required);
  console.log('AR Required:', arMessages.required);
  console.log('');
  
  // Test booking validation schema
  console.log('🚗 Testing Booking Validation Schema:');
  const bookingSchema = createBookingValidationSchema('az');
  
  try {
    await bookingSchema.validate(validBookingData);
    console.log('✅ Valid booking data passed validation');
  } catch (error) {
    console.log('❌ Valid booking data failed:', error);
  }
  
  try {
    await bookingSchema.validate(invalidBookingData);
    console.log('❌ Invalid booking data should have failed but passed');
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log('✅ Invalid booking data correctly failed validation');
      console.log('   Errors:', error.errors);
    }
  }
  
  // Test contact validation schema
  console.log('\n📞 Testing Contact Validation Schema:');
  const contactSchema = createContactValidationSchema('en');
  
  const validContactData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+994501234567',
    subject: 'Inquiry about car rental',
    message: 'I would like to rent a car for next week.',
  };
  
  try {
    await contactSchema.validate(validContactData);
    console.log('✅ Valid contact data passed validation');
  } catch (error) {
    console.log('❌ Valid contact data failed:', error);
  }
  
  // Test newsletter validation schema
  console.log('\n📧 Testing Newsletter Validation Schema:');
  const newsletterSchema = createNewsletterValidationSchema('ru');
  
  try {
    await newsletterSchema.validate({ email: 'test@example.com' });
    console.log('✅ Valid newsletter email passed validation');
  } catch (error) {
    console.log('❌ Valid newsletter email failed:', error);
  }
  
  try {
    await newsletterSchema.validate({ email: 'invalid-email' });
    console.log('❌ Invalid newsletter email should have failed but passed');
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      console.log('✅ Invalid newsletter email correctly failed validation');
    }
  }
  
  // Test car filter validation schema
  console.log('\n🔍 Testing Car Filter Validation Schema:');
  const filterSchema = createCarFilterValidationSchema('en');
  
  const validFilterData = {
    category: ['SUV', 'Sedan'],
    priceRange: [50, 200],
    year: [2020, 2024],
    fuelType: ['gasoline', 'hybrid'],
    transmission: ['automatic'],
    features: ['gps', 'bluetooth'],
    seats: [4, 5, 7],
    class: ['premium', 'luxury'],
    availability: true,
  };
  
  try {
    await filterSchema.validate(validFilterData);
    console.log('✅ Valid filter data passed validation');
  } catch (error) {
    console.log('❌ Valid filter data failed:', error);
  }
  
  // Test quick booking validation schema
  console.log('\n⚡ Testing Quick Booking Validation Schema:');
  const quickBookingSchema = createQuickBookingValidationSchema('az');
  
  const quickBookingTomorrow = new Date();
  quickBookingTomorrow.setDate(quickBookingTomorrow.getDate() + 1);
  
  const validQuickBookingData = {
    name: 'Əli Məmmədov',
    phone: '+994501234567',
    carId: 'car-123',
    preferredDate: quickBookingTomorrow.toISOString().split('T')[0],
  };
  
  try {
    await quickBookingSchema.validate(validQuickBookingData);
    console.log('✅ Valid quick booking data passed validation');
  } catch (error) {
    console.log('❌ Valid quick booking data failed:', error);
  }
  
  // Test review validation schema
  console.log('\n⭐ Testing Review Validation Schema:');
  const reviewSchema = createReviewValidationSchema('en');
  
  const validReviewData = {
    customerName: 'John Smith',
    email: 'john.smith@example.com',
    rating: 5,
    reviewText: 'Excellent service and great car quality. Highly recommended!',
    carRented: 'BMW X5 2023',
  };
  
  try {
    await reviewSchema.validate(validReviewData);
    console.log('✅ Valid review data passed validation');
  } catch (error) {
    console.log('❌ Valid review data failed:', error);
  }
  
  // Test WhatsApp message validation schema
  console.log('\n💬 Testing WhatsApp Message Validation Schema:');
  const whatsappSchema = createWhatsAppMessageValidationSchema('az');
  
  const validWhatsAppData = {
    message: 'Salam, maşın icarəsi haqqında məlumat almaq istəyirəm.',
    context: 'inquiry' as const,
    carId: 'car-123',
    urgency: 'medium' as const,
  };
  
  try {
    await whatsappSchema.validate(validWhatsAppData);
    console.log('✅ Valid WhatsApp message data passed validation');
  } catch (error) {
    console.log('❌ Valid WhatsApp message data failed:', error);
  }
  
  // Test phone number validation utilities
  console.log('\n📱 Testing Phone Number Utilities:');
  const phoneTests = [
    '+994501234567', // Valid Azerbaijan mobile
    '0501234567', // Valid local format
    '994501234567', // Valid without +
    '501234567', // Valid short format
    '+1234567890', // Valid international
    '123', // Invalid too short
    'abc123', // Invalid with letters
  ];
  
  for (const phone of phoneTests) {
    const isValid = validatePhoneNumber(phone);
    const formatted = formatPhoneNumber(phone);
    console.log(`Phone: ${phone} | Valid: ${isValid} | Formatted: ${formatted}`);
  }
  
  // Test date validation utilities
  console.log('\n📅 Testing Date Utilities:');
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const weekend = new Date('2024-12-07'); // Saturday
  const holiday = new Date('2024-01-01'); // New Year
  
  const dateTests = [
    tomorrow.toISOString().split('T')[0],
    yesterday.toISOString().split('T')[0],
    weekend.toISOString().split('T')[0],
    holiday.toISOString().split('T')[0],
    'invalid-date',
  ];
  
  for (const dateStr of dateTests) {
    const valid = isValidDate(dateStr);
    const future = isDateInFuture(dateStr);
    const weekendCheck = isWeekend(dateStr);
    const holidayCheck = isHoliday(dateStr);
    const formatted = formatDateForDisplay(dateStr, 'az');
    const validationMsg = getDateValidationMessage(dateStr, 'pickup', 'az');
    
    console.log(`Date: ${dateStr}`);
    console.log(`  Valid: ${valid} | Future: ${future} | Weekend: ${weekendCheck} | Holiday: ${holidayCheck}`);
    console.log(`  Formatted: ${formatted}`);
    console.log(`  Validation: ${validationMsg || 'OK'}`);
    console.log('');
  }
  
  // Test date calculations
  console.log('📊 Testing Date Calculations:');
  const startDate = '2024-12-01';
  const endDate = '2024-12-05';
  const days = calculateDaysBetween(startDate, endDate);
  console.log(`Days between ${startDate} and ${endDate}: ${days}`);
  
  console.log('\n🎉 Validation testing completed!');
};

// Export individual test functions for specific testing
export const testPhoneValidation = () => {
  console.log('📱 Testing Phone Validation...');
  const phones = ['+994501234567', '0501234567', '123', 'invalid'];
  phones.forEach(phone => {
    console.log(`${phone}: ${validatePhoneNumber(phone) ? '✅' : '❌'}`);
  });
};

export const testDateValidation = () => {
  console.log('📅 Testing Date Validation...');
  const dates = ['2024-12-01', '2023-01-01', 'invalid'];
  dates.forEach(date => {
    console.log(`${date}: ${isValidDate(date) ? '✅' : '❌'}`);
  });
};

export const testMultilingualMessages = () => {
  console.log('🌍 Testing Multilingual Messages...');
  const languages = ['az', 'en', 'ru', 'ar'];
  languages.forEach(lang => {
    const messages = getValidationMessages(lang);
    console.log(`${lang.toUpperCase()}: ${messages.required}`);
  });
};

// Run tests if this file is executed directly
if (typeof window === 'undefined' && require.main === module) {
  testValidationSchemas().catch(console.error);
}