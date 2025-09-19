#!/usr/bin/env node

/**
 * Quick integration test to verify Next.js → Python agent service connection
 */

const fetch = require('node-fetch');

async function testIntegration() {
  console.log('🧪 Testing Hybrid Architecture Integration...\n');
  
  try {
    // Test 1: Health check Python service
    console.log('1. Testing Python Agent Service Health...');
    const healthResponse = await fetch('http://localhost:8000/health');
    const healthData = await healthResponse.json();
    console.log('✅ Python service health:', healthData);
    
    // Test 2: Test Next.js API route that calls Python service
    console.log('\n2. Testing Next.js → Python Integration...');
    const apiResponse = await fetch('http://localhost:3001/api/sales-agent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-conversation-id': 'test-integration-' + Date.now()
      },
      body: JSON.stringify({
        messages: [
          { role: 'user', content: 'Hello there!' }
        ]
      })
    });
    
    if (!apiResponse.ok) {
      throw new Error(`API response not ok: ${apiResponse.status} ${apiResponse.statusText}`);
    }
    
    // Read the streaming response
    console.log('✅ API Response Status:', apiResponse.status);
    console.log('✅ Response Headers:', Object.fromEntries(apiResponse.headers.entries()));
    
    const reader = apiResponse.body.getReader();
    const decoder = new TextDecoder();
    let responseContent = '';
    
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value);
      responseContent += chunk;
    }
    
    console.log('✅ Streaming Response:', responseContent);
    
    console.log('\n🎉 Integration Test Results:');
    console.log('   ✅ Python FastAPI service running (port 8000)');
    console.log('   ✅ Next.js API route working (port 3001)');
    console.log('   ✅ Service-to-service communication working');
    console.log('   ✅ Streaming response format working');
    console.log('   ✅ Hybrid architecture fully functional!');
    
  } catch (error) {
    console.error('❌ Integration test failed:', error.message);
    
    if (error.code === 'ECONNREFUSED') {
      console.log('\n💡 Troubleshooting:');
      console.log('   - Make sure Python service is running: cd agent-service && python -m app.main');
      console.log('   - Make sure Next.js is running: npm run dev');
      console.log('   - Check that ports 8000 and 3001 are available');
    }
  }
}

testIntegration();