import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  try {
    // List all subscribers
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?limit=100&expand=tags`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const data = await response.json();
    
    // Format the response for easy reading
    const formatted = {
      total: data.total || 0,
      subscribers: (data.data || []).map((sub: any) => ({
        email: sub.email,
        status: sub.status,
        tags: sub.tags || [],
        created: new Date(sub.created * 1000).toISOString(),
        tier: sub.subscription_tier,
        id: sub.id
      }))
    };
    
    console.log('Subscribers found:', formatted);
    
    return NextResponse.json(formatted);
    
  } catch (error: any) {
    console.error('Error listing subscribers:', error);
    return NextResponse.json({ 
      error: error.message,
    });
  }
}