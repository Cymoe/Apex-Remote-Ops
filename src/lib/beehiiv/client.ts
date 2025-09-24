// Beehiiv API client for newsletter management
// Documentation: https://developers.beehiiv.com/

interface BeehiivSubscriber {
  email: string;
  reactivate_existing?: boolean;
  send_welcome_email?: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  referring_site?: string;
  custom_fields?: Array<{ name: string; value: string }>;
}


export class BeehiivClient {
  private apiKey: string;
  private publicationId: string;
  private baseUrl = 'https://api.beehiiv.com/v2';

  constructor() {
    this.apiKey = process.env.BEEHIIV_API_KEY || '';
    this.publicationId = process.env.BEEHIIV_PUBLICATION_ID || '';
    
    if (!this.apiKey || !this.publicationId) {
      console.warn('Beehiiv API key or Publication ID not configured');
    }
  }

  async addSubscriber(data: BeehiivSubscriber & { tags?: string[] }): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!this.apiKey || !this.publicationId) {
      console.error('Beehiiv not configured');
      return { success: false, error: 'Beehiiv not configured' };
    }

    try {
      const { tags, ...subscriberData } = data;
      
      // First, create/update the subscriber
      const response = await fetch(
        `${this.baseUrl}/publications/${this.publicationId}/subscriptions`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...subscriberData,
            reactivate_existing: true, // Reactivate if they unsubscribed
            send_welcome_email: false, // We handle welcome emails ourselves
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Beehiiv subscription error:', error);
        return { success: false, error };
      }

      const result = await response.json();
      console.log('Added to Beehiiv:', result);
      
      // If tags were provided and we have a subscriber ID, add tags
      if (tags && tags.length > 0 && result.data?.id) {
        console.log('Adding tags to subscriber:', tags);
        const tagsResponse = await fetch(
          `${this.baseUrl}/publications/${this.publicationId}/subscriptions/${result.data.id}/tags`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${this.apiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              tags: tags,
            }),
          }
        );
        
        if (tagsResponse.ok) {
          const tagsResult = await tagsResponse.json();
          console.log('Tags applied successfully:', tagsResult.data?.tags);
        } else {
          console.error('Failed to apply tags:', await tagsResponse.text());
        }
      }
      
      return { success: true, id: result.data?.id };
    } catch (error: any) {
      console.error('Beehiiv API error:', error);
      return { success: false, error: error?.message || String(error) };
    }
  }

  async tagSubscriber(email: string, tags: string[]): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey || !this.publicationId) {
      console.error('Beehiiv not configured');
      return { success: false, error: 'Beehiiv not configured' };
    }

    try {
      // First, get the subscriber ID by email
      const searchResponse = await fetch(
        `${this.baseUrl}/publications/${this.publicationId}/subscriptions?email=${encodeURIComponent(email)}`,
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
          },
        }
      );

      if (!searchResponse.ok) {
        const error = await searchResponse.text();
        console.error('Beehiiv search error:', error);
        return { success: false, error };
      }

      const searchResult = await searchResponse.json();
      console.log('Search result for', email, ':', JSON.stringify(searchResult, null, 2));
      const subscriber = searchResult.data?.[0];
      
      if (!subscriber) {
        console.error('Subscriber not found in Beehiiv:', email);
        console.error('Full search result:', searchResult);
        return { success: false, error: 'Subscriber not found' };
      }

      // Now update the subscriber with tags
      console.log('Updating subscriber with tags:', subscriber.id, tags);
      const updateResponse = await fetch(
        `${this.baseUrl}/publications/${this.publicationId}/subscriptions/${subscriber.id}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tags: tags,
          }),
        }
      );
      
      console.log('Update response status:', updateResponse.status);

      if (!updateResponse.ok) {
        const error = await updateResponse.text();
        console.error('Beehiiv tag error:', error);
        return { success: false, error };
      }
      
      const updateResult = await updateResponse.json();
      console.log('Tag update result:', updateResult);

      console.log(`Tagged ${email} with:`, tags);
      return { success: true };
    } catch (error: any) {
      console.error('Beehiiv API error:', error);
      return { success: false, error: error?.message || String(error) };
    }
  }
}

export const beehiiv = new BeehiivClient();