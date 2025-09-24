import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUBLICATION_ID;
  
  if (!apiKey || !publicationId) {
    return NextResponse.json({ error: 'Missing credentials' });
  }

  try {
    // 1. First, list all subscribers to see what we have
    console.log('Fetching subscribers...');
    const listResponse = await fetch(
      `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions?limit=10`,
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );
    
    const subscribers = await listResponse.json();
    console.log('Subscribers:', JSON.stringify(subscribers, null, 2));
    
    // 2. Try to update the first subscriber with a tag
    if (subscribers.data && subscribers.data.length > 0) {
      const subscriber = subscribers.data[0];
      console.log(`Attempting to tag subscriber: ${subscriber.email} (ID: ${subscriber.id})`);
      
      // Try different tag formats
      const tagFormats = [
        { tags: ['lead'] },
        { tags: 'lead' },
        { tag: 'lead' },
        { labels: ['lead'] },
        { segments: ['lead'] }
      ];
      
      for (const format of tagFormats) {
        console.log(`Trying format:`, format);
        
        const updateResponse = await fetch(
          `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriber.id}`,
          {
            method: 'PATCH',
            headers: {
              'Authorization': `Bearer ${apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(format),
          }
        );
        
        const responseText = await updateResponse.text();
        console.log(`Response (${updateResponse.status}):`, responseText);
        
        if (updateResponse.ok) {
          console.log('Success with format:', format);
          break;
        }
      }
      
      // Fetch the subscriber again to see if tags were applied
      const checkResponse = await fetch(
        `https://api.beehiiv.com/v2/publications/${publicationId}/subscriptions/${subscriber.id}`,
        {
          headers: {
            'Authorization': `Bearer ${apiKey}`,
          },
        }
      );
      
      const updatedSubscriber = await checkResponse.json();
      console.log('Updated subscriber:', JSON.stringify(updatedSubscriber, null, 2));
    }
    
    return NextResponse.json({
      subscribers: subscribers.data?.slice(0, 3), // Return first 3 for review
      message: 'Check server logs for detailed tag testing results'
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message });
  }
}