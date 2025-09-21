import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  console.log('=== DEBUG EMAIL ENDPOINT ===');
  
  const diagnostics = {
    environment: process.env.NODE_ENV,
    resendKeyExists: !!process.env.RESEND_API_KEY,
    resendKeyPreview: process.env.RESEND_API_KEY ? 
      `${process.env.RESEND_API_KEY.substring(0, 10)}...${process.env.RESEND_API_KEY.slice(-4)}` : 
      'NOT SET',
    resendKeyLength: process.env.RESEND_API_KEY?.length || 0,
    whatsappLinkExists: !!process.env.NEXT_PUBLIC_WHATSAPP_GROUP_LINK,
    stripeKeyExists: !!process.env.STRIPE_SECRET_KEY,
    supabaseUrlExists: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
  };

  // Try to actually send a test email
  let testEmailResult = null;
  
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const result = await resend.emails.send({
        from: 'Myles from Remote Ops <myles@remoteops.ai>',
        to: '2mylescameron@gmail.com',
        subject: `Production Test - ${new Date().toISOString()}`,
        html: `
          <h1>Production Email Test</h1>
          <p>Environment: ${process.env.NODE_ENV}</p>
          <p>Timestamp: ${new Date().toISOString()}</p>
          <p>This email was sent from the production debug endpoint.</p>
        `
      });
      testEmailResult = {
        success: true,
        id: result.data?.id,
        data: result.data
      };
    } catch (error: any) {
      testEmailResult = {
        success: false,
        error: error?.message || String(error),
        errorCode: error?.code,
        errorType: error?.type,
        fullError: JSON.stringify(error, null, 2)
      };
    }
  } else {
    testEmailResult = {
      success: false,
      error: 'RESEND_API_KEY not found in environment variables'
    };
  }

  return NextResponse.json({
    diagnostics,
    testEmailResult,
    timestamp: new Date().toISOString()
  });
}