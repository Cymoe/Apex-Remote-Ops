import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET() {
  console.log('=== TESTING FRESH SUBSCRIBER WITH TAGS ===');
  
  const testEmail = `test-${Date.now()}@example.com`;
  
  try {
    // Add a fresh subscriber with tags included
    const result = await beehiiv.addSubscriber({
      email: testEmail,
      utm_source: 'test',
      utm_medium: 'api_test',
      utm_campaign: 'tag_test',
      tags: ['lead', 'customer', 'blueprint-buyer'], // Include all tags
      custom_fields: []
    });
    
    console.log('Add subscriber result:', result);
    
    // Now fetch the subscriber to verify tags were applied
    const apiKey = process.env.BEEHIIV_API_KEY;
    const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
    
    if (result.success && result.id) {
      const checkResponse = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${result.id}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const subscriber = await checkResponse.json();
      console.log('Fetched subscriber:', JSON.stringify(subscriber, null, 2));
      
      return NextResponse.json({
        success: true,
        testEmail,
        addResult: result,
        subscriber: subscriber.data,
        tags: subscriber.data?.tags || 'No tags field',
        message: 'Check if tags were applied during creation'
      });
    }
    
    return NextResponse.json({
      success: false,
      error: 'Failed to add subscriber',
      result
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    });
  }
}