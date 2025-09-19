import { Resend } from 'resend';
import { createClient } from '@/lib/supabase/server';
import {
  ApplicationReceivedEmail,
  ApplicationApprovedEmail,
  ApplicationRejectedEmail,
} from './templates';

const resend = new Resend(process.env.RESEND_API_KEY);
// Using verified domain remoteops.ai
// Back to our domain but with personal touch
const FROM_EMAIL = 'Sarah from APEX <sarah@remoteops.ai>';
const REPLY_TO = 'sarah@remoteops.ai';

export interface EmailData {
  to: string;
  firstName?: string;
  lastName?: string;
  applicationId?: string;
  territory?: string;
  calendarLink?: string;
  rejectionReason?: string;
}

export interface EmailLog {
  id?: string;
  to: string;
  from: string;
  subject: string;
  type: string;
  status: 'sent' | 'failed' | 'queued';
  resend_id?: string;
  error?: string;
  metadata?: any;
  created_at?: string;
  opened_at?: string;
  clicked_at?: string;
}

// Helper to log emails to database
async function logEmail(log: EmailLog) {
  // Temporarily skip database logging due to column mismatch
  console.log('Email log (skipping DB):', {
    to: log.to,
    subject: log.subject,
    status: log.status,
    type: log.type
  });
  return; // Skip database for now
  
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from('email_logs')
      .insert(log);
    
    if (error) {
      console.error('Failed to log email:', error);
    }
  } catch (err) {
    console.error('Email logging error:', err);
  }
}

// Helper to add subscriber to Beehiiv (for later integration)
async function addToBeehiiv(email: string, data: any) {
  if (!process.env.BEEHIIV_API_KEY || !process.env.BEEHIIV_PUBLICATION_ID) {
    console.log('Beehiiv not configured, skipping subscriber addition');
    return;
  }

  try {
    const response = await fetch(
      `https://api.beehiiv.com/v2/publications/${process.env.BEEHIIV_PUBLICATION_ID}/subscriptions`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          reactivate_existing: true,
          send_welcome_email: false,
          custom_fields: data,
        }),
      }
    );

    if (!response.ok) {
      console.error('Failed to add to Beehiiv:', await response.text());
    }
  } catch (error) {
    console.error('Beehiiv integration error:', error);
  }
}

// 1. Send Application Received Email
export async function sendApplicationReceivedEmail(data: EmailData) {
  const { to, firstName, applicationId, territory } = data;
  
  try {
    console.log('Sending email to:', to, 'with firstName:', firstName);
    
    const emailHtml = ApplicationReceivedEmail({
      firstName,
      email: to,
      applicationId: applicationId || 'PENDING',
    });

    console.log('Email HTML generated, sending...');

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `Re: Your question about APEX territory`,
      headers: {
        'X-Priority': '1',
        'Importance': 'high',
      },
      text: `Hey ${firstName},

Just saw your application come through - perfect timing!

We're reviewing applications for ${territory || 'your area'} right now. I'll personally review yours within the next few hours.

Quick question - what made you interested in APEX specifically? Just curious since we get a lot of applications.

Talk soon,
Sarah
Remote Ops Team

P.S. Keep an eye on your inbox - I'll have an update for you shortly.`,
      html: emailHtml,
    });

    console.log('Resend result:', result);

    if (result.error) {
      console.error('Resend error details:', result.error);
    }

    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Received',
      type: 'application_received',
      status: result.error ? 'failed' : 'sent',
      resend_id: result.data?.id,
      error: result.error?.message,
      metadata: { applicationId, firstName },
    });

    // Add to Beehiiv with 'application-submitted' tag
    await addToBeehiiv(to, {
      first_name: firstName,
      application_status: 'submitted',
      application_id: applicationId,
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send application received email:', error);
    
    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Received',
      type: 'application_received',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: { applicationId, firstName },
    });

    return { success: false, error };
  }
}

// 2. Send Application Approved Email
export async function sendApplicationApprovedEmail(data: EmailData) {
  const { to, firstName, territory, calendarLink } = data;
  
  if (!territory || !calendarLink) {
    throw new Error('Territory and calendar link are required for approval email');
  }

  try {
    const emailHtml = ApplicationApprovedEmail({
      firstName,
      email: to,
      territory,
      calendarLink,
    });

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `${firstName}, great news about ${territory}`,
      react: emailHtml,
    });

    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Approved',
      type: 'application_approved',
      status: result.error ? 'failed' : 'sent',
      resend_id: result.data?.id,
      error: result.error?.message,
      metadata: { territory, firstName },
    });

    // Update Beehiiv subscriber
    await addToBeehiiv(to, {
      first_name: firstName,
      application_status: 'approved',
      territory,
      approved_date: new Date().toISOString(),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send approval email:', error);
    
    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Approved',
      type: 'application_approved',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: { territory, firstName },
    });

    return { success: false, error };
  }
}

// 3. Send Application Rejected Email
export async function sendApplicationRejectedEmail(data: EmailData) {
  const { to, firstName, rejectionReason } = data;
  
  try {
    const emailHtml = ApplicationRejectedEmail({
      firstName,
      email: to,
      reason: rejectionReason,
    });

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `${firstName}, quick update on your application`,
      react: emailHtml,
    });

    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Rejected',
      type: 'application_rejected',
      status: result.error ? 'failed' : 'sent',
      resend_id: result.data?.id,
      error: result.error?.message,
      metadata: { firstName, reason: rejectionReason },
    });

    // Update Beehiiv to nurture sequence
    await addToBeehiiv(to, {
      first_name: firstName,
      application_status: 'rejected',
      rejected_date: new Date().toISOString(),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send rejection email:', error);
    
    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Application Rejected',
      type: 'application_rejected',
      status: 'failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      metadata: { firstName },
    });

    return { success: false, error };
  }
}

// 4. Send Payment Confirmation Email
export async function sendPaymentConfirmationEmail(data: EmailData) {
  const { to, firstName, territory } = data;
  
  try {
    // Simple payment confirmation - welcome sequence will be handled by Beehiiv
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject: `Welcome to APEX! Your ${territory} territory is confirmed`,
      html: `
        <h2>Payment Confirmed!</h2>
        <p>Hi ${firstName},</p>
        <p>Your payment has been processed successfully. Welcome to the APEX Operator program!</p>
        <p><strong>Your territory:</strong> ${territory}</p>
        <p><strong>What happens next:</strong></p>
        <ul>
          <li>You'll receive portal access within 10 minutes</li>
          <li>Your 30-day roadmap will be emailed shortly</li>
          <li>You'll be added to the operator WhatsApp group</li>
        </ul>
        <p>Check your email over the next few days for important onboarding information.</p>
        <p>Best,<br>The APEX Team</p>
      `,
    });

    await logEmail({
      to,
      from: FROM_EMAIL,
      subject: 'Payment Confirmation',
      type: 'payment_confirmation',
      status: result.error ? 'failed' : 'sent',
      resend_id: result.data?.id,
      error: result.error?.message,
      metadata: { territory, firstName },
    });

    // Update Beehiiv to 'active-operator' segment
    await addToBeehiiv(to, {
      first_name: firstName,
      application_status: 'paid',
      territory,
      operator_status: 'active',
      purchase_date: new Date().toISOString(),
    });

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send payment confirmation:', error);
    return { success: false, error };
  }
}

// 5. Send Generic Email (for custom messages)
export async function sendEmail({
  to,
  subject,
  html,
  react,
  type = 'custom',
}: {
  to: string | string[];
  subject: string;
  html?: string;
  react?: React.ReactElement;
  type?: string;
}) {
  try {
    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      replyTo: REPLY_TO,
      subject,
      html,
      react,
    });

    const recipients = Array.isArray(to) ? to : [to];
    for (const recipient of recipients) {
      await logEmail({
        to: recipient,
        from: FROM_EMAIL,
        subject,
        type,
        status: result.error ? 'failed' : 'sent',
        resend_id: result.data?.id,
        error: result.error?.message,
      });
    }

    return { success: true, id: result.data?.id };
  } catch (error) {
    console.error('Failed to send email:', error);
    return { success: false, error };
  }
}