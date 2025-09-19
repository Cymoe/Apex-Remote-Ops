import { NextRequest, NextResponse } from 'next/server';
import { 
  sendApplicationReceivedEmail,
  sendApplicationApprovedEmail,
  sendApplicationRejectedEmail,
  sendPaymentConfirmationEmail 
} from '@/lib/email/service';

// GET /api/test-email?type=received&email=test@example.com
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const type = searchParams.get('type') || 'received';
  const email = searchParams.get('email') || 'test@example.com';
  const firstName = searchParams.get('name') || 'Test';
  
  try {
    let result;
    
    switch (type) {
      case 'received':
        result = await sendApplicationReceivedEmail({
          to: email,
          firstName,
          applicationId: 'TEST-' + Date.now(),
        });
        break;
        
      case 'approved':
        result = await sendApplicationApprovedEmail({
          to: email,
          firstName,
          territory: 'Dallas-Fort Worth',
          calendarLink: 'https://calendly.com/apex-ops/onboarding',
        });
        break;
        
      case 'rejected':
        result = await sendApplicationRejectedEmail({
          to: email,
          firstName,
          rejectionReason: 'This is a test rejection reason.',
        });
        break;
        
      case 'payment':
        result = await sendPaymentConfirmationEmail({
          to: email,
          firstName,
          territory: 'Houston Metro',
        });
        break;
        
      default:
        return NextResponse.json(
          { error: 'Invalid email type. Use: received, approved, rejected, or payment' },
          { status: 400 }
        );
    }
    
    return NextResponse.json({
      success: result.success,
      type,
      sentTo: email,
      message: result.success 
        ? `Test ${type} email sent successfully to ${email}` 
        : 'Failed to send email',
      resendId: result.id,
      error: result.error,
    });
    
  } catch (error) {
    console.error('Test email error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}