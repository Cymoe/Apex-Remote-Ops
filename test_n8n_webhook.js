// Test script for N8N Multi-Agent Webhook
const fetch = require('node-fetch');

const WEBHOOK_URL = 'https://webblabs.app.n8n.cloud/webhook/apex-chat';

async function testWebhook() {
  console.log('🧪 Testing N8N Multi-Agent Webhook...');
  
  const testMessage = {
    message: "Hello, I'm interested in APEX Remote Operations",
    history: "",
    prospect: {}
  };
  
  try {
    console.log('📡 Sending test message to:', WEBHOOK_URL);
    console.log('💬 Message:', testMessage.message);
    
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testMessage)
    });
    
    if (response.ok) {
      const result = await response.text();
      console.log('✅ Success! Response:', result);
    } else {
      console.log('❌ Error:', response.status, response.statusText);
      const errorText = await response.text();
      console.log('Error details:', errorText);
    }
    
  } catch (error) {
    console.error('❌ Network error:', error.message);
  }
}

// Run test
testWebhook();