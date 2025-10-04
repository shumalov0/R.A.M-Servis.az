# Enhanced Email System Documentation

## Overview

The enhanced email system for Ram Servis Car Rental provides comprehensive email automation with the following features:

- **Multilingual Support**: English, Azerbaijani, and Russian
- **Click2Pay Integration**: Secure online payment links
- **Professional Templates**: HTML and plain text versions
- **Retry Logic**: Automatic retry with exponential backoff
- **Error Handling**: Comprehensive error logging and recovery
- **Template Generation**: Dynamic email content based on booking data

## Features

### 1. Enhanced Email Sending (`lib/email.ts`)

#### Key Functions:

- `sendEnhancedBookingEmails()`: Main function for sending booking confirmations
- `generateConfirmationNumber()`: Creates unique booking confirmation numbers
- `generateClick2PayLink()`: Creates secure payment links
- `validatePaymentLink()`: Validates payment link security

#### Configuration:

Set these environment variables in `.env.local`:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_TEMPLATE_CUSTOMER=customer_template_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_BUSINESS=business_template_id

# Click2Pay Configuration
NEXT_PUBLIC_CLICK2PAY_MERCHANT_ID=your_merchant_id
CLICK2PAY_SECRET_KEY=your_secret_key
NEXT_PUBLIC_CLICK2PAY_BASE_URL=https://payment.click2pay.az
NEXT_PUBLIC_SITE_URL=https://ramservis.az
```

### 2. Email Templates (`lib/email-templates.ts`)

#### Features:

- **Responsive HTML Design**: Mobile-friendly email layouts
- **Multilingual Content**: Support for EN, AZ, RU languages
- **Professional Styling**: Modern, branded email appearance
- **Dynamic Content**: Booking details, car information, payment links

#### Template Types:

1. **Customer Confirmation Email**:
   - Booking confirmation with details
   - Car information and images
   - Payment instructions
   - Contact information
   - Next steps

2. **Business Notification Email**:
   - New booking alert
   - Customer information
   - Revenue tracking
   - Action items
   - Quick contact links

### 3. Click2Pay Integration

#### Payment Link Generation:

```typescript
const paymentLink = generateBookingPaymentLink(
  bookingData,
  confirmationNumber,
  carDetails
);
```

#### Security Features:

- Secure parameter encoding
- Expiration timestamps
- Order ID validation
- Return URL configuration

### 4. Error Handling & Retry Logic

#### Retry Configuration:

```typescript
const emailConfig: EmailConfig = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  timeout: 10000,   // 10 seconds
};
```

#### Error Types Handled:

- Network timeouts
- API rate limits
- Invalid configurations
- Template rendering errors

## Usage Examples

### Basic Email Sending:

```typescript
import { sendEnhancedBookingEmails, generateConfirmationNumber } from './lib/email';

const emailPayload: EnhancedEmailPayload = {
  customerEmail: 'customer@example.com',
  customerName: 'John Doe',
  businessEmail: 'bookings@ramservis.az',
  bookingData: bookingFormData,
  carDetails: carInformation,
  confirmationNumber: generateConfirmationNumber(),
  language: 'en',
};

const result = await sendEnhancedBookingEmails(emailPayload);
```

### With Payment Link:

```typescript
// For online payments, payment link is automatically generated
const bookingData = {
  // ... other booking data
  paymentMethod: 'online',
};

const result = await sendEnhancedBookingEmails(emailPayload);
console.log('Payment link:', result.paymentLink);
```

### Template Preview:

```typescript
import { previewEmailTemplates } from './lib/email';

const templates = previewEmailTemplates(emailPayload);
console.log('Customer HTML:', templates.customerHtml);
console.log('Business HTML:', templates.businessHtml);
```

## Email Template Structure

### Customer Email Includes:

- **Header**: Ram Servis branding and confirmation number
- **Car Details**: Vehicle information with image
- **Booking Details**: Dates, locations, duration
- **Payment Information**: Total cost, payment method, payment link
- **Contact Information**: Phone, email, WhatsApp
- **Next Steps**: Instructions for pickup

### Business Email Includes:

- **Alert Header**: New booking notification
- **Customer Information**: Contact details
- **Revenue Summary**: Total booking value
- **Car Information**: Vehicle details
- **Rental Details**: Dates and locations
- **Action Items**: Required follow-up tasks
- **Quick Actions**: Call, email, WhatsApp buttons

## Multilingual Support

### Supported Languages:

- **English (en)**: Default language
- **Azerbaijani (az)**: Local language
- **Russian (ru)**: Regional language

### Language Selection:

```typescript
const emailPayload = {
  // ... other data
  language: 'az', // or 'en', 'ru'
};
```

### Adding New Languages:

1. Add translations to `emailTranslations` in `email-templates.ts`
2. Update the `EmailContent` interface if needed
3. Test with the new language code

## Testing

### Test Functions Available:

```typescript
import { runEmailTests } from './lib/email.test';

// Run all tests
const results = runEmailTests();
console.log(`Tests: ${results.passed} passed, ${results.failed} failed`);
```

### Individual Tests:

- `testConfirmationNumber()`: Confirmation number generation
- `testClick2PayLink()`: Payment link creation
- `testBookingPaymentLink()`: Booking-specific payment links
- `testPaymentLinkValidation()`: Link security validation
- `testEmailTemplates()`: Template generation

## Integration with Booking Form

### Form Submission Handler:

```typescript
import { handleBookingSubmission } from './lib/email-usage-example';

const result = await handleBookingSubmission(formData);
if (result.success) {
  console.log('Booking confirmed:', result.confirmationNumber);
  if (result.paymentLink) {
    // Redirect to payment
    window.location.href = result.paymentLink;
  }
} else {
  console.error('Booking failed:', result.error);
}
```

## Performance Considerations

### Optimization Features:

- **Parallel Email Sending**: Customer and business emails sent simultaneously
- **Template Caching**: Reuse generated templates when possible
- **Retry Logic**: Exponential backoff prevents API overload
- **Timeout Handling**: Prevents hanging requests

### Monitoring:

- All email operations are logged to console
- Success/failure rates tracked
- Retry attempts recorded
- Payment link generation monitored

## Security

### Payment Link Security:

- Secure parameter encoding
- Expiration timestamps
- Order validation
- Return URL verification

### Email Security:

- No sensitive data in URLs
- Secure template rendering
- Input validation
- Error message sanitization

## Troubleshooting

### Common Issues:

1. **EmailJS Configuration Missing**:
   - Check environment variables
   - Verify EmailJS service setup

2. **Payment Links Not Working**:
   - Verify Click2Pay configuration
   - Check merchant ID and secret key

3. **Templates Not Rendering**:
   - Check template data completeness
   - Verify language code validity

4. **Emails Not Sending**:
   - Check network connectivity
   - Verify EmailJS service status
   - Review retry logs

### Debug Mode:

Enable detailed logging by setting:
```env
NODE_ENV=development
```

This will provide verbose console output for debugging email operations.

## Future Enhancements

### Planned Features:

- **Email Analytics**: Open rates, click tracking
- **Template Editor**: Visual email template customization
- **A/B Testing**: Template performance comparison
- **SMS Integration**: Backup notification system
- **Email Scheduling**: Delayed send capabilities

### API Integration:

- **CRM Integration**: Customer data synchronization
- **Analytics Integration**: Email performance tracking
- **Payment Gateway**: Enhanced payment processing
- **Calendar Integration**: Booking reminders