import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function GET() {
  console.log('=== TESTING RESEND API ===');
  console.log('API Key exists:', !!process.env.RESEND_API_KEY);
  console.log('API Key preview:', process.env.RESEND_API_KEY?.substring(0, 15) + '...');
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  
  try {
    const result = await resend.emails.send({
      from: 'Myles from Remote Ops <onboarding@resend.dev>',
      to: '2mylescameron@gmail.com',
      subject: 'Test Email - Resend API Working',
      html: `
        <h1>Test Email</h1>
        <p>If you're seeing this, Resend is working!</p>
        <p>Timestamp: ${new Date().toISOString()}</p>
      `
    });
    
    console.log('Email sent successfully:', result);
    
    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      data: result.data
    });
  } catch (error: any) {
    console.error('Email send failed:', error);
    console.error('Full error:', JSON.stringify(error, null, 2));
    
    return NextResponse.json({
      success: false,
      error: error?.message || 'Unknown error',
      details: error
    }, { status: 500 });
  }
}