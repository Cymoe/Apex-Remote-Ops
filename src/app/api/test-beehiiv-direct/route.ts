import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  console.log('API Key:', apiKey?.substring(0, 20) + '...');
  console.log('Publication ID:', publicationId);
  
  try {
    // Test 1: Check if we can access the publication
    const pubResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const pubData = await pubResponse.json();
    console.log('Publication response:', pubResponse.status);
    console.log('Publication data:', JSON.stringify(pubData, null, 2));
    
    // Test 2: Try to create a subscriber with minimal data
    const testEmail = `test-${Date.now()}@example.com`;
    const createResponse = await fetch(
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
    
    const createData = await createResponse.json();
    console.log('Create response status:', createResponse.status);
    console.log('Create response:', JSON.stringify(createData, null, 2));
    
    // Test 3: List subscribers to see if it was created
    const listResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?limit=5`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const listData = await listResponse.json();
    console.log('List response:', JSON.stringify(listData, null, 2));
    
    return NextResponse.json({
      publication: {
        status: pubResponse.status,
        name: pubData.data?.name || 'Not found',
      },
      createAttempt: {
        email: testEmail,
        status: createResponse.status,
        response: createData,
      },
      subscribers: listData.data || [],
      totalSubscribers: listData.total || 0,
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message,
      apiKeyExists: !!apiKey,
      publicationIdExists: !!publicationId,
    });
  }
}