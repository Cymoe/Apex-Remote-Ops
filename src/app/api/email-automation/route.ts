import { NextResponse } from 'next/server';
import { loopsEmailManager } from '@/lib/loops/email-manager';
import { emailTemplates } from '@/lib/email/email-sequences';

export async function POST(request: Request) {
  const { 
    action, 
    email, 
    sequenceName, 
    emailIndex, 
    firstName 
  } = await request.json();
  
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }
  
  console.log('=== EMAIL AUTOMATION API ===');
  console.log('Action:', action);
  console.log('Email:', email);
  
  try {
    let result;
    
    switch (action) {
      case 'send_sequence_email':
        // Send a specific email from a sequence
        if (!sequenceName || emailIndex === undefined) {
          return NextResponse.json({ 
            error: 'sequenceName and emailIndex required' 
          }, { status: 400 });
        }
        
        result = await loopsEmailManager.sendSequenceEmail(
          sequenceName,
          emailIndex,
          email,
          { firstName: firstName || 'there' }
        );
        break;
        
      case 'preview_email':
        // Preview an email template
        if (!sequenceName || emailIndex === undefined) {
          return NextResponse.json({ 
            error: 'sequenceName and emailIndex required' 
          }, { status: 400 });
        }
        
        const sequence = emailTemplates[sequenceName as keyof typeof emailTemplates];
        if (!sequence || !sequence.sequence[emailIndex]) {
          return NextResponse.json({ error: 'Email not found' }, { status: 404 });
        }
        
        const emailTemplate = sequence.sequence[emailIndex];
        
        // Replace variables for preview
        let html = emailTemplate.html;
        let text = emailTemplate.text;
        
        const vars = { firstName: firstName || 'there' };
        Object.entries(vars).forEach(([key, value]) => {
          const regex = new RegExp(`{{\\s*${key}\\s*(?:\\|\\s*([^}]+))?}}`, 'g');
          html = html.replace(regex, (match, defaultValue) => value || defaultValue || '');
          text = text.replace(regex, (match, defaultValue) => value || defaultValue || '');
        });
        
        return NextResponse.json({
          success: true,
          preview: {
            subject: emailTemplate.subject,
            previewText: emailTemplate.previewText,
            from: emailTemplate.from,
            html,
            text
          }
        });
        
      case 'list_sequences':
        // List all available sequences
        const sequences = Object.keys(emailTemplates).map(key => {
          const seq = emailTemplates[key as keyof typeof emailTemplates];
          return {
            name: key,
            emailCount: seq.sequence.length,
            emails: seq.sequence.map((e, i) => ({
              index: i,
              id: e.id,
              subject: e.subject,
              delay: e.delay,
              delayReadable: e.delay === 0 ? 'Immediate' : 
                e.delay === 86400000 ? '1 day' :
                e.delay === 172800000 ? '2 days' :
                e.delay === 345600000 ? '4 days' :
                e.delay === 604800000 ? '7 days' :
                `${e.delay / 86400000} days`
            }))
          };
        });
        
        return NextResponse.json({
          success: true,
          sequences
        });
        
      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
    
    console.log('Result:', result);
    
    return NextResponse.json({
      success: result?.success || false,
      action,
      email,
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

export async function GET() {
  return NextResponse.json({
    message: 'Email Automation API - All emails written in code, no UI needed',
    info: 'This system lets you write all email templates in /src/lib/email/templates.ts and send them via API',
    endpoints: {
      send_sequence_email: {
        description: 'Send a specific email from a sequence',
        required: ['email', 'sequenceName', 'emailIndex'],
        optional: ['firstName']
      },
      preview_email: {
        description: 'Preview an email with variables replaced',
        required: ['sequenceName', 'emailIndex'],
        optional: ['firstName']
      },
      list_sequences: {
        description: 'List all available email sequences',
        required: []
      }
    },
    example: {
      action: 'send_sequence_email',
      email: 'user@example.com',
      sequenceName: 'leadNurture',
      emailIndex: 0,
      firstName: 'John'
    },
    note: 'Loops handles the automation timing, we handle the content'
  });
}