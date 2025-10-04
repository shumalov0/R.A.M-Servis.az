// Example usage of the enhanced email system
import { 
  sendEnhancedBookingEmails, 
  generateConfirmationNumber,
  EnhancedEmailPayload,
  previewEmailTemplates
} from './email';
import { BookingFormData } from './types';

// Example booking data
const exampleBookingData: BookingFormData = {
  firstName: 'Aysel',
  lastName: 'Mammadova',
  email: 'aysel.mammadova@example.com',
  phone: '+994501234567',
  carId: 'toyota-camry-2023',
  pickupDate: '2024-02-15',
  dropoffDate: '2024-02-20',
  pickupLocation: 'Heydar Aliyev Airport',
  dropoffLocation: 'Baku City Center',
  additionalServices: ['GPS Navigation', 'Child Seat', 'Additional Driver'],
  paymentMethod: 'online',
  specialRequests: 'Please ensure the car is thoroughly cleaned and sanitized',
  totalDays: 5,
  totalPrice: 275,
  deposit: 150,
  serviceCharges: 25,
};

const exampleCarDetails = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
  image: 'https://ramservis.az/cars/toyota-camry-2023.jpg',
  dailyPrice: 50,
};

// Example function to send booking confirmation emails
export async function sendBookingConfirmation(
  bookingData: BookingFormData,
  carDetails: { brand: string; model: string; year: number; image: string; dailyPrice: number },
  language: string = 'en'
): Promise<void> {
  try {
    // Generate confirmation number
    const confirmationNumber = generateConfirmationNumber();
    
    // Create email payload
    const emailPayload: EnhancedEmailPayload = {
      customerEmail: bookingData.email,
      customerName: `${bookingData.firstName} ${bookingData.lastName}`,
      businessEmail: 'bookings@ramservis.az',
      bookingData,
      carDetails,
      confirmationNumber,
      language,
    };

    console.log(`📧 Sending booking confirmation emails for ${confirmationNumber}...`);

    // Send emails
    const result = await sendEnhancedBookingEmails(emailPayload);

    // Log results
    if (result.toCustomer.success) {
      console.log('✅ Customer confirmation email sent successfully');
    } else {
      console.error('❌ Failed to send customer email:', result.toCustomer.error);
    }

    if (result.toBusiness.success) {
      console.log('✅ Business notification email sent successfully');
    } else {
      console.error('❌ Failed to send business email:', result.toBusiness.error);
    }

    if (result.paymentLink) {
      console.log('💳 Payment link generated:', result.paymentLink);
    }

    console.log(`📋 Booking confirmation process completed for ${confirmationNumber}`);
    
  } catch (error) {
    console.error('💥 Error sending booking confirmation:', error);
    throw error;
  }
}

// Example function to preview email templates
export function previewBookingEmails(
  bookingData: BookingFormData,
  carDetails: { brand: string; model: string; year: number; image: string; dailyPrice: number },
  language: string = 'en'
): void {
  const confirmationNumber = generateConfirmationNumber();
  
  const emailPayload: EnhancedEmailPayload = {
    customerEmail: bookingData.email,
    customerName: `${bookingData.firstName} ${bookingData.lastName}`,
    businessEmail: 'bookings@ramservis.az',
    bookingData,
    carDetails,
    confirmationNumber,
    language,
  };

  const templates = previewEmailTemplates(emailPayload);
  
  console.log('📧 Email Template Preview:');
  console.log('========================');
  console.log('\n📄 Customer HTML Template (first 500 chars):');
  console.log(templates.customerHtml.substring(0, 500) + '...');
  
  console.log('\n📄 Business HTML Template (first 500 chars):');
  console.log(templates.businessHtml.substring(0, 500) + '...');
  
  console.log('\n📄 Customer Text Template:');
  console.log(templates.customerText);
  
  console.log('\n📄 Business Text Template:');
  console.log(templates.businessText);
}

// Example usage with different languages
export async function demonstrateMultilingualEmails(): Promise<void> {
  console.log('🌍 Demonstrating multilingual email support...\n');
  
  const languages = ['en', 'az', 'ru'];
  
  for (const language of languages) {
    console.log(`📧 Previewing ${language.toUpperCase()} email templates:`);
    console.log('='.repeat(50));
    
    try {
      previewBookingEmails(exampleBookingData, exampleCarDetails, language);
      console.log(`✅ ${language.toUpperCase()} templates generated successfully\n`);
    } catch (error) {
      console.error(`❌ Error generating ${language.toUpperCase()} templates:`, error);
    }
  }
}

// Example integration with booking form
export async function handleBookingSubmission(formData: any): Promise<{
  success: boolean;
  confirmationNumber?: string;
  paymentLink?: string;
  error?: string;
}> {
  try {
    // Validate form data (simplified)
    if (!formData.firstName || !formData.email || !formData.carId) {
      throw new Error('Missing required booking information');
    }

    // Convert form data to BookingFormData
    const bookingData: BookingFormData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      carId: formData.carId,
      pickupDate: formData.pickupDate,
      dropoffDate: formData.dropoffDate,
      pickupLocation: formData.pickupLocation,
      dropoffLocation: formData.dropoffLocation,
      additionalServices: formData.additionalServices || [],
      paymentMethod: formData.paymentMethod || 'cash',
      specialRequests: formData.specialRequests,
      totalDays: formData.totalDays,
      totalPrice: formData.totalPrice,
      deposit: formData.deposit,
      serviceCharges: formData.serviceCharges || 0,
    };

    // Get car details (this would typically come from a database)
    const carDetails = {
      brand: formData.carBrand || 'Toyota',
      model: formData.carModel || 'Camry',
      year: formData.carYear || 2023,
      image: formData.carImage || '',
      dailyPrice: formData.dailyPrice || 50,
    };

    // Send confirmation emails
    await sendBookingConfirmation(bookingData, carDetails, formData.language || 'en');

    return {
      success: true,
      confirmationNumber: generateConfirmationNumber(),
      paymentLink: bookingData.paymentMethod === 'online' ? 'https://payment.click2pay.az/...' : undefined,
    };

  } catch (error) {
    console.error('Booking submission error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

// Export example data for testing
export { exampleBookingData, exampleCarDetails };