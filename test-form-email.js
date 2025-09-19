// Test script for form submission → email flow
// Run with: node test-form-email.js

async function testFormSubmission() {
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com', // Change to your real email for testing
    phone: '555-1234',
    currentRevenue: '$100K-250K',
    businessExperience: '5+ years in construction',
    desiredTerritory: 'Dallas-Fort Worth',
    capitalAvailable: '$50K+',
    timelineToStart: 'Within 30 days',
    whyApply: 'Looking to scale my business remotely',
    agreedToTerms: true
  };

  console.log('🚀 Testing form submission → email flow');
  console.log('📧 Sending to:', testData.email);
  console.log('-----------------------------------');

  try {
    const response = await fetch('http://localhost:3000/api/applications/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Application submitted successfully!');
      console.log('📋 Application ID:', result.applicationId);
      console.log('📧 Email sent:', result.emailSent ? 'Yes' : 'No');
      
      if (result.data?.nextSteps) {
        console.log('\n📌 Next Steps:');
        result.data.nextSteps.forEach((step, i) => {
          console.log(`   ${i + 1}. ${step}`);
        });
      }
    } else {
      console.error('❌ Submission failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run the test
testFormSubmission();

console.log('\n💡 TIP: Change the email to your real address to receive the actual email!');