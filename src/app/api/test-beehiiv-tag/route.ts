import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET() {
  console.log('=== TESTING BEEHIIV TAGGING ===');
  
  try {
    // Try to tag your existing subscriber
    const result = await beehiiv.tagSubscriber('2mylescameron@gmail.com', ['lead']);
    
    return NextResponse.json({
      success: true,
      result,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error?.message || String(error),
    });
  }
}