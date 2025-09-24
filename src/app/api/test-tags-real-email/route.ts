import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function POST(request: Request) {
  const { email } = await request.json();
  
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }
  
  console.log('=== TESTING TAGS WITH REAL EMAIL ===');
  console.log('Email:', email);
  
  try {
    // Add subscriber with tags
    const result = await beehiiv.addSubscriber({
      email,
      tags: ['lead', 'test-tag'], // Add multiple tags
      utm_source: 'website',
      utm_medium: 'api_test',
      utm_campaign: 'tag_verification',
      custom_fields: []
    });
    
    console.log('Add subscriber result:', result);
    
    // Fetch the subscriber to verify tags
    if (result.success && result.id) {
      const apiKey = process.env.BEEHIIV_API_KEY;
      const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
      
      // Fetch with expanded tags
      const fetchResponse = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${result.id}?expand=tags`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const subscriber = await fetchResponse.json();
      console.log('Fetched subscriber with tags:', JSON.stringify(subscriber, null, 2));
      
      return NextResponse.json({
        success: true,
        email,
        subscriberId: result.id,
        tags: subscriber.data?.tags || [],
        message: 'Check Beehiiv dashboard to confirm tags are visible'
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
    }, { status: 500 });
  }
}