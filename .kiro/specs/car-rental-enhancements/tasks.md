# Implementation Plan

- [x] 1. Project Setup and Dependencies

  - Install and configure new dependencies (Formik, Yup, Three.js, @react-three/fiber)
  - Update package.json with required packages
  - Configure TypeScript types for new dependencies
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 10.1, 10.2_

- [x] 2. Enhanced Data Models and Types

  - [x] 2.1 Create enhanced TypeScript interfaces

    - Define CustomerReview, Certificate, and enhanced Car interfaces
    - Create BookingFormData interface with Formik integration
    - Add CarFilters and CarCategory types for filtering functionality
    - _Requirements: 2.1, 2.2, 2.3, 4.1, 4.2_

  - [x] 2.2 Update existing data structures
    - Extend cars data with new fields (category, popularity, gallery)
    - Create mock customer reviews data
    - Create certificates data structure
    - _Requirements: 2.1, 2.2, 8.1, 8.2_

- [x] 3. Form Validation and Schemas

  - [ ] 3.1 Create Yup validation schemas

    - Implement bookingValidationSchema with all field validations
    - Add multilingual error messages support
    - Create validation utilities for phone numbers and dates
    - _Requirements: 6.1, 6.2, 6.6, 6.7_

  - [ ] 3.2 Create form validation utilities
    - Implement form field validation helpers
    - Create error message formatting functions
    - Add form state persistence utilities
    - _Requirements: 6.1, 6.2, 6.7_

- [x] 4. Three.js Background Animation Component

  - [x] 4.1 Create ThreeBackground component

    - Implement basic Three.js scene with particles or geometric shapes
    - Add device performance detection
    - Implement responsive behavior and reduced motion support
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6_

  - [x] 4.2 Integrate Three.js background into layouts
    - Add ThreeBackground to main layout components
    - Ensure proper z-index layering
    - Test performance on different devices
    - _Requirements: 10.1, 10.2, 10.3_

- [-] 5. WhatsApp Integration Component

  - [x] 5.1 Create WhatsAppButton component

    - Implement floating button with proper positioning
    - Add responsive behavior for mobile and desktop
    - Create pre-filled message functionality
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_

  - [ ] 5.2 Integrate WhatsApp button globally
    - Add WhatsAppButton to main layout
    - Implement context-aware messaging
    - Test cross-device functionality
    - _Requirements: 3.1, 3.2, 3.3_

- [-] 6. Google Customer Reviews Component

  - [x] 6.1 Create GoogleReviews component

    - Implement responsive review cards layout
    - Add star rating display component
    - Create loading and error states
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

  - [ ] 6.2 Integrate reviews into pages
    - Add GoogleReviews to home page
    - Add GoogleReviews to about page
    - Implement multilingual review content
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 7. Certificates Carousel Component

  - [x] 7.1 Create CertificatesCarousel component

    - Implement carousel using Embla Carousel
    - Add touch/swipe support and keyboard navigation
    - Create certificate modal for detailed view
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6_

  - [x] 7.2 Integrate certificates carousel
    - Add CertificatesCarousel to home page
    - Add CertificatesCarousel to about page
    - Create certificates data and images
    - _Requirements: 8.1, 8.2_

- [x] 8. Enhanced Cars Page with Filtering

  - [x] 8.1 Create car filtering components

    - Implement CarsFilters component with all filter options
    - Create filter state management with URL synchronization
    - Add sorting functionality (price, year, popularity)
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [x] 8.2 Implement pagination and search

    - Add pagination component with page size options
    - Implement search functionality
    - Create "no results" state handling
    - _Requirements: 4.1, 4.2, 4.4, 4.6_

  - [x] 8.3 Update cars page layout
    - Integrate filtering sidebar/modal
    - Add prominent "Book" buttons to car cards
    - Implement responsive grid layout
    - _Requirements: 4.1, 4.2, 4.5_

- [x] 9. Other Cars Section Component

  - [x] 9.1 Create OtherCarsSection component

    - Implement horizontal scrollable car cards
    - Add logic to exclude already displayed cars
    - Create quick view functionality
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [x] 9.2 Integrate Other Cars into home page
    - Add OtherCarsSection to home page layout
    - Implement navigation to car details
    - Test responsive behavior
    - _Requirements: 5.1, 5.2, 5.4_

- [ ] 10. Enhanced Booking Form with Formik

  - [ ] 10.1 Create EnhancedBookingForm component

    - Implement multi-step form using Formik
    - Add real-time validation with Yup schemas
    - Create progress indicator and step navigation
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7_

  - [x] 10.2 Implement price calculation logic

    - Create dynamic price calculation based on dates and services
    - Add real-time price updates as user changes selections
    - Implement pricing display with breakdown
    - _Requirements: 6.3, 6.4_

  - [x] 10.3 Add form output display

    - Create booking summary component
    - Display all form inputs and calculated prices
    - Add form state persistence
    - _Requirements: 6.5, 6.7_

  - [x] 10.4 Fix responsive design issues
    - Ensure form works properly on all screen sizes
    - Fix layout issues in mobile view
    - Test form usability across devices
    - _Requirements: 6.6_

- [x] 11. Email Automation Enhancement

  - [x] 11.1 Improve email sending process

    - Enhance email templates with better formatting
    - Add booking details to email content
    - Implement error handling and retry logic
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5_

  - [x] 11.2 Implement Click2Pay integration

    - Add Click2Pay link generation for online payments
    - Include payment links in business notification emails
    - Implement secure payment link handling
    - _Requirements: 7.3, 7.4, 7.6_

  - [x] 11.3 Create email templates
    - Design customer confirmation email template
    - Design business notification email template
    - Add multilingual email support
    - _Requirements: 7.1, 7.2, 7.4_

- [x] 12. Navigation Enhancement with Dropdown

  - [x] 12.1 Create CarCategoryDropdown component

    - Implement hover-triggered dropdown menu
    - Add car categories with proper styling
    - Create smooth animations for dropdown
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5_

  - [x] 12.2 Integrate dropdown into Header
    - Update Header component with category dropdown
    - Implement category filtering navigation
    - Test dropdown behavior across devices
    - _Requirements: 9.1, 9.2, 9.3_

- [x] 13. Performance and Code Optimization

  - [x] 13.1 Optimize component performance

    - Implement React.memo for expensive components
    - Add lazy loading for Three.js components
    - Optimize image loading and caching
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5_

  - [x] 13.2 Remove duplicate code and refactor
    - Consolidate reusable components
    - Extract common utilities and hooks
    - Optimize bundle size with code splitting
    - _Requirements: 1.1, 1.2, 1.4_

- [x] 14. Enhanced Animations and Visual Effects

  - [x] 14.1 Add smooth page transitions

    - Implement page transition animations using Framer Motion
    - Add loading states with elegant spinners
    - Create hover effects for interactive elements
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 14.2 Implement scroll-based animations
    - Add parallax effects for sections
    - Create scroll-triggered animations
    - Implement smooth scrolling behavior
    - _Requirements: 11.1, 11.2, 11.4, 11.5_

- [x] 15. Testing and Quality Assurance

  - [x] 15.1 Create component tests

    - Write unit tests for new components
    - Test form validation logic
    - Create integration tests for booking flow
    - _Requirements: 1.1, 6.1, 6.2, 7.1, 7.2_

  - [x] 15.2 Test responsive design and accessibility
    - Test all components on different screen sizes
    - Verify keyboard navigation functionality
    - Check color contrast and accessibility compliance
    - _Requirements: 1.1, 1.3, 6.6, 11.6_

- [ ] 16. Final Integration and Polish

  - [x] 16.1 Integrate all components into pages

    - Update home page with all new components
    - Update about page with reviews and certificates
    - Update cars page with enhanced filtering
    - _Requirements: 2.1, 2.2, 4.1, 5.1, 8.1, 8.2_

  - [x] 16.2 Final testing and bug fixes
    - Test complete user journey from browsing to booking
    - Fix any remaining responsive issues
    - Optimize performance and loading times
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 11.1, 11.2_
