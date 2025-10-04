/**
 * Examples of how to use the validation schemas with Formik
 * This file demonstrates practical usage patterns for the car rental application
 */

import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { 
  createBookingValidationSchema,
  createContactValidationSchema,
  getValidationMessages,
  validatePhoneNumber,
  formatPhoneNumber
} from './index';
import { BookingFormData } from '@/lib/types';

// Example 1: Basic Booking Form with Formik
export const BookingFormExample = ({ currentLang = 'az' }) => {
  const validationSchema = createBookingValidationSchema(currentLang);
  const messages = getValidationMessages(currentLang);

  const initialValues: Partial<BookingFormData> = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carId: '',
    pickupDate: '',
    dropoffDate: '',
    pickupLocation: '',
    dropoffLocation: '',
    additionalServices: [],
    paymentMethod: 'cash',
    specialRequests: '',
    totalDays: 0,
    totalPrice: 0,
    deposit: 0,
    serviceCharges: 0,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          // Process booking submission
          console.log('Booking submitted:', values);
          
          // Here you would typically send the data to your API
          // await submitBooking(values);
          
        } catch (error) {
          console.error('Booking submission failed:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, setFieldValue, errors, touched }) => (
        <Form>
          {/* Personal Information */}
          <div>
            <label htmlFor="firstName">First Name</label>
            <Field
              type="text"
              name="firstName"
              placeholder={messages.required}
            />
            <ErrorMessage name="firstName" component="div" />
          </div>

          <div>
            <label htmlFor="lastName">Last Name</label>
            <Field
              type="text"
              name="lastName"
              placeholder={messages.required}
            />
            <ErrorMessage name="lastName" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field
              type="email"
              name="email"
              placeholder="example@email.com"
            />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="phone">Phone</label>
            <Field
              type="tel"
              name="phone"
              placeholder="+994501234567"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const formatted = formatPhoneNumber(e.target.value);
                setFieldValue('phone', formatted);
              }}
            />
            <ErrorMessage name="phone" component="div" />
            {values.phone && validatePhoneNumber(values.phone) && (
              <div style={{ color: 'green', fontSize: '12px' }}>
                ✓ Valid phone number
              </div>
            )}
          </div>

          {/* Rental Details */}
          <div>
            <label htmlFor="pickupDate">Pickup Date</label>
            <Field
              type="date"
              name="pickupDate"
              min={new Date().toISOString().split('T')[0]}
            />
            <ErrorMessage name="pickupDate" component="div" />
          </div>

          <div>
            <label htmlFor="dropoffDate">Drop-off Date</label>
            <Field
              type="date"
              name="dropoffDate"
              min={values.pickupDate || new Date().toISOString().split('T')[0]}
            />
            <ErrorMessage name="dropoffDate" component="div" />
          </div>

          {/* Payment Method */}
          <div>
            <label>Payment Method</label>
            <div>
              <label>
                <Field type="radio" name="paymentMethod" value="cash" />
                Cash Payment
              </label>
            </div>
            <div>
              <label>
                <Field type="radio" name="paymentMethod" value="online" />
                Online Payment
              </label>
            </div>
            <ErrorMessage name="paymentMethod" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

// Example 2: Contact Form with Validation
export const ContactFormExample = ({ currentLang = 'en' }) => {
  const validationSchema = createContactValidationSchema(currentLang);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          console.log('Contact form submitted:', values);
          // await submitContactForm(values);
          resetForm();
        } catch (error) {
          console.error('Contact form submission failed:', error);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div>
            <label htmlFor="phone">Phone (Optional)</label>
            <Field type="tel" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div>
            <label htmlFor="subject">Subject</label>
            <Field type="text" name="subject" />
            <ErrorMessage name="subject" component="div" />
          </div>

          <div>
            <label htmlFor="message">Message</label>
            <Field as="textarea" name="message" rows={5} />
            <ErrorMessage name="message" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

// Example 3: Manual Validation (without Formik)
export const manualValidationExample = async () => {
  const schema = createBookingValidationSchema('az');
  
  const testData = {
    firstName: 'Əli',
    lastName: 'Məmmədov',
    email: 'ali@example.com',
    phone: '+994501234567',
    // ... other fields
  };

  try {
    // Validate entire object
    await schema.validate(testData, { abortEarly: false });
    console.log('✅ All validation passed');
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      console.log('❌ Validation errors:', error.errors);
    }
  }

  // Validate individual field
  try {
    await schema.validateAt('email', testData);
    console.log('✅ Email is valid');
  } catch (error: any) {
    console.log('❌ Email validation failed:', error.message);
  }
};

// Example 4: Custom validation with utilities
export const customValidationExample = () => {
  const phoneNumbers = ['+994501234567', '0501234567', 'invalid'];
  
  phoneNumbers.forEach(phone => {
    const isValid = validatePhoneNumber(phone);
    const formatted = formatPhoneNumber(phone);
    
    console.log(`Phone: ${phone}`);
    console.log(`Valid: ${isValid}`);
    console.log(`Formatted: ${formatted}`);
    console.log('---');
  });
};

// Example 5: Multilingual validation messages
export const multilingualExample = () => {
  const languages = ['az', 'en', 'ru', 'ar'];
  
  languages.forEach(lang => {
    const messages = getValidationMessages(lang);
    console.log(`${lang.toUpperCase()}: ${messages.required}`);
  });
};

// Example 6: Real-time validation hook
export const useRealTimeValidation = (schema: any, fieldName: string) => {
  const [error, setError] = React.useState<string | null>(null);
  
  const validateField = async (value: any) => {
    try {
      await schema.validateAt(fieldName, { [fieldName]: value });
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { error, validateField };
};

// Export all examples
export default {
  BookingFormExample,
  ContactFormExample,
  manualValidationExample,
  customValidationExample,
  multilingualExample,
  useRealTimeValidation,
};