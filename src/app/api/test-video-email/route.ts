import { NextRequest, NextResponse } from 'next/server';
import { sendWelcomeEmailToVideoBuyer, sendVideoPurchaseEmail } from '@/lib/email/video-emails';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') || 'test@example.com';
  const type = searchParams.get('type') || 'new'; // 'new' or 'existing'
  
  console.log('Testing video email:', { email, type, apiKey: !!process.env.RESEND_API_KEY });
  
  try {
    let result;
    
    if (type === 'new') {
      console.log('Sending new buyer email...');
      result = await sendWelcomeEmailToVideoBuyer(email);
    } else {
      console.log('Sending existing buyer email...');
      result = await sendVideoPurchaseEmail(email);
    }
    
    console.log('Email result:', result);
    
    return NextResponse.json({
      success: true,
      result,
      emailType: type,
      sentTo: email,
      apiKeyExists: !!process.env.RESEND_API_KEY,
      apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 10)
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
      apiKeyExists: !!process.env.RESEND_API_KEY
    }, { status: 500 });
  }
}