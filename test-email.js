// Simple test script for email functionality
const { generateConfirmationNumber } = require('./lib/email.ts');

try {
  console.log('Testing email functionality...');
  
  // Test confirmation number generation
  const confirmation1 = generateConfirmationNumber();
  const confirmation2 = generateConfirmationNumber();
  
  console.log('Generated confirmation numbers:');
  console.log('1:', confirmation1);
  console.log('2:', confirmation2);
  console.log('Are unique:', confirmation1 !== confirmation2);
  
  console.log('✅ Email functionality test completed successfully');
} catch (error) {
  console.error('❌ Email functionality test failed:', error.message);
}