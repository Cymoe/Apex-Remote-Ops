import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function POST(request: Request) {
  const { email } = await request.json();
  
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
  }
  
  try {
    // Add subscriber with tags
    const result = await beehiiv.addSubscriber({
      email,
      utm_source: 'website',
      utm_medium: 'landing_page',
      utm_campaign: 'video_blueprint',
      tags: ['lead'],
      custom_fields: []
    });
    
    console.log('Add subscriber result:', result);
    
    return NextResponse.json({
      success: true,
      result,
      message: 'Check Beehiiv dashboard - real email should appear as active subscriber'
    });
    
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    }, { status: 500 });
  }
}