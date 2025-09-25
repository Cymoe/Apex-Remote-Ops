// Email Manager for Loops
// Write all emails in code, deploy via API
// No UI needed - everything is version controlled

import { emailTemplates } from '@/lib/email/email-sequences';

interface LoopsTransactionalEmail {
  id: string;
  name: string;
  subject: string;
  from: string;
  replyTo?: string;
  html: string;
  text: string;
}

export class LoopsEmailManager {
  private apiKey: string;
  private baseUrl = 'https://app.loops.so/api/v1';

  constructor() {
    this.apiKey = process.env.LOOPS_API_KEY || '';
  }

  // Create or update a transactional email template in Loops
  async deployTransactionalEmail(email: LoopsTransactionalEmail) {
    if (!this.apiKey) {
      console.error('Loops API key not configured');
      return { success: false, error: 'No API key' };
    }

    try {
      // Note: Loops doesn't currently have an API endpoint to create transactional templates
      // This is a placeholder for when they add it
      // For now, you'll need to create these in the UI once, then use the IDs
      console.log('Email template ready for Loops:', {
        id: email.id,
        name: email.name,
        subject: email.subject
      });
      
      return { 
        success: true, 
        message: 'Email template prepared. Create in Loops UI with this ID: ' + email.id 
      };
    } catch (error) {
      console.error('Error deploying email:', error);
      return { success: false, error: String(error) };
    }
  }

  // Send a transactional email using a template
  async sendTransactionalEmail(
    transactionalId: string,
    recipientEmail: string,
    dataVariables: Record<string, any> = {}
  ) {
    if (!this.apiKey) {
      console.error('Loops API key not configured');
      return { success: false, error: 'No API key' };
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
            email: recipientEmail,
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
      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending transactional email:', error);
      return { success: false, error: String(error) };
    }
  }

  // Deploy all email templates from our code
  async deployAllTemplates() {
    const results = [];
    
    // Deploy lead nurture sequence
    for (const email of emailTemplates.leadNurture.sequence) {
      const result = await this.deployTransactionalEmail({
        id: email.id,
        name: email.subject,
        subject: email.subject,
        from: email.from,
        replyTo: email.replyTo,
        html: email.html,
        text: email.text,
      });
      results.push({ email: email.id, ...result });
    }
    
    // Deploy customer onboarding sequence
    for (const email of emailTemplates.customerOnboarding.sequence) {
      const result = await this.deployTransactionalEmail({
        id: email.id,
        name: email.subject,
        subject: email.subject,
        from: email.from,
        replyTo: email.replyTo,
        html: email.html,
        text: email.text,
      });
      results.push({ email: email.id, ...result });
    }
    
    return results;
  }

  // Get email template from our code
  getEmailTemplate(sequenceName: string, emailId: string) {
    const sequence = emailTemplates[sequenceName as keyof typeof emailTemplates];
    if (!sequence) return null;
    
    return sequence.sequence.find(email => email.id === emailId);
  }

  // Send the next email in a sequence
  async sendSequenceEmail(
    sequenceName: string,
    emailIndex: number,
    recipientEmail: string,
    dataVariables: Record<string, any> = {}
  ) {
    const sequence = emailTemplates[sequenceName as keyof typeof emailTemplates];
    if (!sequence || !sequence.sequence[emailIndex]) {
      return { success: false, error: 'Email not found in sequence' };
    }

    const email = sequence.sequence[emailIndex];
    
    // For now, since Loops doesn't have API for creating templates,
    // we'll send using Resend directly with our templates
    // Once Loops adds the API, we can switch to using their transactional IDs
    
    try {
      const { Resend } = await import('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      
      // Replace variables in content
      let html = email.html;
      let text = email.text;
      
      Object.entries(dataVariables).forEach(([key, value]) => {
        const regex = new RegExp(`{{\\s*${key}\\s*(?:\\|\\s*([^}]+))?}}`, 'g');
        html = html.replace(regex, (match, defaultValue) => value || defaultValue || '');
        text = text.replace(regex, (match, defaultValue) => value || defaultValue || '');
      });
      
      const { data, error } = await resend.emails.send({
        from: email.from,
        to: recipientEmail,
        subject: email.subject,
        html,
        text,
        reply_to: email.replyTo,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true, emailId: data?.id };
    } catch (error) {
      console.error('Error sending sequence email:', error);
      return { success: false, error: String(error) };
    }
  }
}

export const loopsEmailManager = new LoopsEmailManager();