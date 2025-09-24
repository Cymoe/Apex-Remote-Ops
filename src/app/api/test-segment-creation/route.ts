import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  console.log('=== TESTING SEGMENT CREATION AND APPLICATION ===');
  
  try {
    // Step 1: Try to create segments
    const segmentNames = ['lead', 'customer', 'blueprint-buyer'];
    const createdSegments = [];
    
    for (const segmentName of segmentNames) {
      console.log(`\nAttempting to create segment: ${segmentName}`);
      
      // Try different ways to create a segment
      const attempts = [
        {
          method: 'POST',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/segments`,
          body: { name: segmentName }
        },
        {
          method: 'POST',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/segments`,
          body: { 
            name: segmentName,
            description: `Segment for ${segmentName}`,
            filters: []
          }
        },
        {
          method: 'PUT',
          url: `https://api.beehiiv.com/v2/publications/${publicationId}/segments/${segmentName}`,
          body: { name: segmentName }
        }
      ];
      
      for (const attempt of attempts) {
        const response = await fetch(attempt.url, {
          method: attempt.method,
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(attempt.body),
        });
        
        const result = await response.text();
        console.log(`${attempt.method} response (${response.status}):`, result);
        
        if (response.ok) {
          createdSegments.push({
            name: segmentName,
            method: attempt.method,
            result: JSON.parse(result)
          });
          break;
        }
      }
    }
    
    // Step 2: List segments again
    console.log('\n=== LISTING SEGMENTS AFTER CREATION ATTEMPTS ===');
    const listResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/segments`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const segments = await listResponse.json();
    console.log('Segments:', JSON.stringify(segments, null, 2));
    
    // Step 3: Try to create a subscriber with segment IDs if they exist
    if (segments.data && segments.data.length > 0) {
      const testEmail = `segment-id-test-${Date.now()}@example.com`;
      const segmentIds = segments.data.map(s => s.id);
      
      console.log('\n=== CREATING SUBSCRIBER WITH SEGMENT IDs ===');
      console.log('Segment IDs:', segmentIds);
      
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
            segment_ids: segmentIds,
            segments: segmentIds,
            reactivate_existing: false,
            send_welcome_email: false,
          }),
        }
      );
      
      const createResult = await createResponse.json();
      console.log('Create with segment IDs result:', JSON.stringify(createResult, null, 2));
      
      // Fetch to verify
      if (createResponse.ok && createResult.data?.id) {
        const fetchResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${createResult.data.id}`,
          {
            headers: {
              'Authorization': `Bearer ${apiKey}`,
            },
          }
        );
        
        const subscriber = await fetchResponse.json();
        console.log('Fetched subscriber with segments:', JSON.stringify(subscriber, null, 2));
      }
    }
    
    return NextResponse.json({
      message: 'Check console logs for detailed output',
      createdSegments,
      existingSegments: segments.data || [],
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ 
      error: error.message,
    });
  }
}