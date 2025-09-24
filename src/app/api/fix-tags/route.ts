import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  try {
    // First get the subscriber ID for your email
    const listResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?email=2mylescameron@gmail.com`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const listData = await listResponse.json();
    console.log('Found subscribers:', listData);
    
    if (listData.data && listData.data.length > 0) {
      const subscriber = listData.data[0];
      console.log('Updating subscriber:', subscriber.id);
      
      // Try different methods to add tags
      const methods = [
        { method: 'PATCH', body: { tags: ['lead', 'customer'] } },
        { method: 'PUT', body: { tags: ['lead', 'customer'] } },
        { method: 'PATCH', body: { tag: 'lead' } },
        { method: 'PATCH', body: { labels: ['lead', 'customer'] } },
        { method: 'PATCH', body: { custom_fields: [{ name: 'tag', value: 'lead' }] } },
      ];
      
      for (const attempt of methods) {
        console.log('Trying:', attempt);
        
        const updateResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriber.id}`,
          {
            method: attempt.method,
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(attempt.body),
          }
        );
        
        const result = await updateResponse.text();
        console.log(`Response (${updateResponse.status}):`, result);
        
        if (updateResponse.ok) {
          return NextResponse.json({
            success: true,
            method: attempt,
            result: JSON.parse(result),
            message: 'Check Beehiiv dashboard for tags'
          });
        }
      }
    }
    
    return NextResponse.json({
      error: 'Could not apply tags',
      subscribers: listData.data
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message });
  }
}