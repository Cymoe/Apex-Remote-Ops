import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  console.log('=== TESTING BEEHIIV SEGMENTS AND TAGS ===');
  
  try {
    // Test 1: Create subscriber with segments (another possible field name)
    const testEmail = `segment-test-${Date.now()}@example.com`;
    
    const attempts = [
      {
        name: 'With segments field',
        body: {
          email: testEmail,
          segments: ['lead', 'customer'],
          reactivate_existing: false,
          send_welcome_email: false,
        }
      },
      {
        name: 'With tier field', 
        body: {
          email: `tier-${Date.now()}@example.com`,
          tier: 'premium',
          reactivate_existing: false,
          send_welcome_email: false,
        }
      },
      {
        name: 'With metadata field',
        body: {
          email: `meta-${Date.now()}@example.com`,
          metadata: {
            tags: ['lead', 'customer']
          },
          reactivate_existing: false,
          send_welcome_email: false,
        }
      },
      {
        name: 'With custom_fields containing tags',
        body: {
          email: `custom-${Date.now()}@example.com`,
          custom_fields: [
            { name: 'tags', value: 'lead,customer' },
            { name: 'tag', value: 'lead' }
          ],
          reactivate_existing: false,
          send_welcome_email: false,
        }
      }
    ];
    
    const results = [];
    
    for (const attempt of attempts) {
      console.log(`\nTrying: ${attempt.name}`);
      console.log('Body:', JSON.stringify(attempt.body, null, 2));
      
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attempt.body),
        }
      );
      
      const result = await response.json();
      console.log(`Response (${response.status}):`, JSON.stringify(result, null, 2));
      
      // If successful, fetch the subscriber to see all fields
      if (response.ok && result.data?.id) {
        const fetchResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${result.data.id}`,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
        
        const fetchedData = await fetchResponse.json();
        console.log('Fetched subscriber:', JSON.stringify(fetchedData, null, 2));
        
        results.push({
          attempt: attempt.name,
          created: response.ok,
          subscriberData: fetchedData.data,
          allFields: Object.keys(fetchedData.data || {}),
        });
      } else {
        results.push({
          attempt: attempt.name,
          created: false,
          error: result,
        });
      }
    }
    
    // Test 2: Check if we can list segments/tags endpoint
    console.log('\n=== CHECKING FOR SEGMENTS/TAGS ENDPOINTS ===');
    
    const endpointsToTest = [
      '/segments',
      '/tags',
      '/labels',
      '/groups',
      '/lists',
    ];
    
    const endpointResults = [];
    
    for (const endpoint of endpointsToTest) {
      const url = `https://api.beehiiv.com/v2/publications/${publicationId}${endpoint}`;
      console.log(`Testing: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      
      endpointResults.push({
        endpoint,
        status: response.status,
        exists: response.status !== 404,
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(`${endpoint} response:`, JSON.stringify(data, null, 2));
      }
    }
    
    return NextResponse.json({
      message: 'Check console logs for detailed output',
      subscriberTests: results,
      endpointTests: endpointResults,
      supportedFields: results
        .filter(r => r.created && r.allFields)
        .map(r => r.allFields)
        .flat()
        .filter((v, i, a) => a.indexOf(v) === i), // unique fields
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message,
    });
  }
}