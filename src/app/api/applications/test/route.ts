import { NextRequest, NextResponse } from 'next/server';
import { sendApplicationReceivedEmail } from '@/lib/email/service';

// GET /api/applications/test?email=your@email.com
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const email = searchParams.get('email') || 'test@example.com';
  const firstName = searchParams.get('name') || 'Test';
  
  // Generate test application ID
  const applicationId = `TEST-${Date.now()}`;
  
  try {
    // Send confirmation email without database
    const emailResult = await sendApplicationReceivedEmail({
      to: email,
      firstName,
      applicationId,
    });

    return NextResponse.json({
      success: emailResult.success,
      message: emailResult.success 
        ? `Application confirmation email sent to ${email}` 
        : 'Failed to send email',
      applicationId,
      emailDetails: {
        to: email,
        firstName,
        applicationId,
        resendId: emailResult.id,
      },
      testNote: 'This is a test endpoint - no data was saved to database',
    });

  } catch (error) {
    console.error('Test error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to send test email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}