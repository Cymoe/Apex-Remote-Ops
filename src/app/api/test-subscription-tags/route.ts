import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  console.log('=== TESTING SUBSCRIPTION TAGS ENDPOINTS ===');
  
  try {
    // Test 1: Try to GET subscription tags endpoint
    console.log('\n1. Testing GET /subscription_tags');
    const tagsListResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscription_tags`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    console.log('GET /subscription_tags status:', tagsListResponse.status);
    if (tagsListResponse.ok) {
      const tagsData = await tagsListResponse.json();
      console.log('Tags list:', JSON.stringify(tagsData, null, 2));
    }
    
    // Test 2: Try to create a subscription tag
    console.log('\n2. Testing POST /subscription_tags');
    const createTagResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscription_tags`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'api-test-tag',
          description: 'Tag created via API'
        }),
      }
    );
    
    console.log('POST /subscription_tags status:', createTagResponse.status);
    const createResult = await createTagResponse.text();
    console.log('Create tag response:', createResult);
    
    // Test 3: Try to add tag to subscription
    // First create a test subscriber
    const testEmail = `tag-test-${Date.now()}@example.com`;
    const createSubResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: testEmail,
          reactivate_existing: false,
          send_welcome_email: false,
        }),
      }
    );
    
    const subData = await createSubResponse.json();
    console.log('\n3. Created test subscriber:', subData.data?.id);
    
    if (subData.data?.id) {
      // Try different ways to add tags
      const tagMethods = [
        {
          name: 'POST subscription tags',
          method: 'POST',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subData.data.id}/tags`,
          body: { tags: ['lead', 'customer'] }
        },
        {
          name: 'PUT subscription with tags',
          method: 'PUT',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subData.data.id}`,
          body: { tags: ['lead', 'customer'] }
        },
        {
          name: 'PATCH subscription tags',
          method: 'PATCH',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subData.data.id}/tags`,
          body: { tags: ['lead', 'customer'] }
        }
      ];
      
      for (const method of tagMethods) {
        console.log(`\nTrying: ${method.name}`);
        const response = await fetch(method.url, {
          method: method.method,
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(method.body),
        });
        
        console.log(`${method.name} status:`, response.status);
        if (response.status !== 404) {
          const result = await response.text();
          console.log(`${method.name} response:`, result);
        }
      }
      
      // Now fetch with expanded tags
      console.log('\n4. Fetching subscriber with expanded tags');
      const fetchWithTagsResponse = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subData.data.id}?expand=tags`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const expandedData = await fetchWithTagsResponse.json();
      console.log('Subscriber with expanded tags:', JSON.stringify(expandedData, null, 2));
    }
    
    return NextResponse.json({
      message: 'Check console logs for detailed output',
      endpoints_tested: [
        'GET /subscription_tags',
        'POST /subscription_tags',
        'POST /subscriptions/:id/tags',
        'PUT /subscriptions/:id (with tags)',
        'PATCH /subscriptions/:id/tags',
        'GET /subscriptions/:id?expand=tags'
      ]
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message,
    });
  }
}