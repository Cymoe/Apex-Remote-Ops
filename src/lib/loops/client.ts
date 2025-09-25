// Loops.so API client for email automation
// Documentation: https://loops.so/docs/api-reference

interface LoopsContact {
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  userGroup?: string;
  userId?: string;
  mailingLists?: Record<string, boolean>;
}

interface LoopsEvent {
  email?: string;
  userId?: string;
  eventName: string;
  eventProperties?: Record<string, any>;
  mailingLists?: Record<string, boolean>;
}

export class LoopsClient {
  private apiKey: string;
  private baseUrl = 'https://app.loops.so/api/v1';

  constructor() {
    this.apiKey = process.env.LOOPS_API_KEY || '';
    
    if (!this.apiKey) {
      console.warn('Loops API key not configured');
    }
  }

  async createOrUpdateContact(data: LoopsContact): Promise<{ success: boolean; id?: string; error?: string }> {
    if (!this.apiKey) {
      console.error('Loops not configured');
      return { success: false, error: 'Loops not configured' };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/contacts/update`,
        {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            source: data.source || 'website',
            userGroup: data.userGroup || 'lead',
            userId: data.userId,
            mailingLists: data.mailingLists,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Loops contact error:', error);
        return { success: false, error };
      }

      const result = await response.json();
      console.log('Added/Updated in Loops:', result);
      
      return { success: true, id: result.id };
    } catch (error: any) {
      console.error('Loops API error:', error);
      return { success: false, error: error?.message || String(error) };
    }
  }

  async sendEvent(data: LoopsEvent): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      console.error('Loops not configured');
      return { success: false, error: 'Loops not configured' };
    }

    if (!data.email && !data.userId) {
      return { success: false, error: 'Either email or userId is required' };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/events/send`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: data.email,
            userId: data.userId,
            eventName: data.eventName,
            eventProperties: data.eventProperties,
            mailingLists: data.mailingLists,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Loops event error:', error);
        return { success: false, error };
      }

      const result = await response.json();
      console.log('Loops event sent:', result);
      
      return { success: true };
    } catch (error: any) {
      console.error('Loops API error:', error);
      return { success: false, error: error?.message || String(error) };
    }
  }

  async sendTransactionalEmail(
    transactionalId: string,
    email: string,
    dataVariables: Record<string, any> = {}
  ): Promise<{ success: boolean; error?: string }> {
    if (!this.apiKey) {
      console.error('Loops not configured');
      return { success: false, error: 'Loops not configured' };
    }

    try {
      const response = await fetch(
        `${this.baseUrl}/transactional`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionalId,
            email,
            dataVariables,
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error('Loops transactional error:', error);
        return { success: false, error };
      }

      const result = await response.json();
      console.log('Loops transactional email sent:', result);
      
      return { success: true };
    } catch (error: any) {
      console.error('Loops API error:', error);
      return { success: false, error: error?.message || String(error) };
    }
  }

  // Helper method to trigger nurture sequence for leads
  async startLeadNurture(email: string, firstName?: string): Promise<{ success: boolean; error?: string }> {
    // First create/update the contact
    const contactResult = await this.createOrUpdateContact({
      email,
      firstName,
      userGroup: 'lead',
      source: 'video_landing_page',
    });

    if (!contactResult.success) {
      return contactResult;
    }

    // Then trigger the nurture sequence event
    return this.sendEvent({
      email,
      eventName: 'blueprint_lead_captured',
      eventProperties: {
        firstName: firstName || '',
        capturedAt: new Date().toISOString(),
      }
    });
  }

  // Helper method to mark someone as a customer
  async markAsCustomer(email: string, productType: string = 'blueprint'): Promise<{ success: boolean; error?: string }> {
    // Update contact to customer status
    const contactResult = await this.createOrUpdateContact({
      email,
      userGroup: 'customer',
    });

    if (!contactResult.success) {
      return contactResult;
    }

    // Trigger purchase event
    return this.sendEvent({
      email,
      eventName: 'purchase_completed',
      eventProperties: {
        productType,
        purchasedAt: new Date().toISOString(),
        amount: productType === 'blueprint' ? 497 : 0,
      }
    });
  }
}

export const loops = new LoopsClient();