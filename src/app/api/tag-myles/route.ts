import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET() {
  console.log('=== TAGGING MYLES EMAIL ===');
  
  try {
    // Try to tag your existing subscriber with all the tags
    const result = await beehiiv.tagSubscriber('2mylescameron@gmail.com', ['lead', 'customer', 'blueprint-buyer']);
    
    console.log('Tag result:', result);
    
    return NextResponse.json({
      success: true,
      result,
      message: 'Check Beehiiv dashboard - tags should appear now',
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Error:', error);
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    });
  }
}