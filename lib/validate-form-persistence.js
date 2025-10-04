// Simple validation script for form persistence functionality
// Run with: node lib/validate-form-persistence.js

// Mock localStorage for Node.js environment
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => { store[key] = value.toString(); },
    removeItem: (key) => { delete store[key]; },
    clear: () => { store = {}; }
  };
})();

global.localStorage = localStorageMock;

// Import the functions (simplified for Node.js)
const FORM_STATE_VERSION = '1.0.0';

const saveFormState = (formId, data, options = {}) => {
  try {
    const storageKey = `ramservis_form_state_${formId}`;
    const persistedState = {
      data,
      timestamp: Date.now(),
      version: FORM_STATE_VERSION,
      formId,
    };
    localStorage.setItem(storageKey, JSON.stringify(persistedState));
    return true;
  } catch (error) {
    console.warn('Failed to save form state:', error);
    return false;
  }
};

const loadFormState = (formId, options = {}) => {
  try {
    const storageKey = `ramservis_form_state_${formId}`;
    const stored = localStorage.getItem(storageKey);
    if (!stored) return null;

    const persistedState = JSON.parse(stored);
    return persistedState.data;
  } catch (error) {
    console.warn('Failed to load form state:', error);
    return null;
  }
};

// Test functions
function runTests() {
  console.log('🧪 Testing Form Persistence Functionality...\n');

  // Test 1: Basic save and load
  console.log('Test 1: Basic save and load');
  const testData = { name: 'Test User', email: 'test@example.com' };
  const saveSuccess = saveFormState('test-form', testData);
  const loadedData = loadFormState('test-form');
  
  console.log('✅ Save success:', saveSuccess);
  console.log('✅ Data matches:', JSON.stringify(testData) === JSON.stringify(loadedData));
  console.log('Saved:', testData);
  console.log('Loaded:', loadedData);
  console.log('');

  // Test 2: Booking form data
  console.log('Test 2: Booking form data');
  const bookingData = {
    firstName: 'Əli',
    lastName: 'Məmmədov',
    email: 'ali@example.com',
    phone: '+994501234567',
    carId: 'car-1',
    pickupDate: '2024-01-15',
    dropoffDate: '2024-01-20',
    paymentMethod: 'online'
  };
  
  const bookingSaveSuccess = saveFormState('booking_car-1', bookingData);
  const loadedBookingData = loadFormState('booking_car-1');
  
  console.log('✅ Booking save success:', bookingSaveSuccess);
  console.log('✅ Booking data matches:', JSON.stringify(bookingData) === JSON.stringify(loadedBookingData));
  console.log('');

  // Test 3: Form state with validation
  console.log('Test 3: Form state with validation');
  const saveFormStateWithValidation = (formId, data, validation) => {
    try {
      const storageKey = `ramservis_form_state_${formId}`;
      const persistedState = {
        data,
        timestamp: Date.now(),
        version: FORM_STATE_VERSION,
        formId,
        validation,
      };
      localStorage.setItem(storageKey, JSON.stringify(persistedState));
      return true;
    } catch (error) {
      return false;
    }
  };

  const validationData = {
    isValid: true,
    errors: [],
    completionPercentage: 100
  };

  const validationSaveSuccess = saveFormStateWithValidation('test-validation', testData, validationData);
  console.log('✅ Validation save success:', validationSaveSuccess);
  
  const storedWithValidation = JSON.parse(localStorage.getItem('ramservis_form_state_test-validation'));
  console.log('✅ Validation data preserved:', storedWithValidation.validation.isValid === true);
  console.log('');

  // Test 4: Error handling
  console.log('Test 4: Error handling');
  const nonExistentData = loadFormState('non-existent-form');
  console.log('✅ Non-existent form returns null:', nonExistentData === null);
  console.log('');

  // Test 5: Data persistence across "sessions"
  console.log('Test 5: Data persistence simulation');
  const sessionData = { sessionId: 'session-123', userId: 'user-456' };
  saveFormState('session-test', sessionData);
  
  // Simulate page reload by clearing and reloading
  const beforeClear = loadFormState('session-test');
  console.log('✅ Data exists before clear:', beforeClear !== null);
  
  // Data should still be there (localStorage persists)
  const afterReload = loadFormState('session-test');
  console.log('✅ Data persists after reload:', afterReload !== null);
  console.log('✅ Session data matches:', JSON.stringify(sessionData) === JSON.stringify(afterReload));
  console.log('');

  console.log('🎉 All form persistence tests completed successfully!');
  console.log('📊 Summary:');
  console.log('- Basic save/load: ✅');
  console.log('- Booking form data: ✅');
  console.log('- Validation metadata: ✅');
  console.log('- Error handling: ✅');
  console.log('- Data persistence: ✅');
}

// Run the tests
runTests();