import { NextResponse } from 'next/server';
import { beehiiv } from '@/lib/beehiiv/client';

export async function GET() {
  console.log('=== TESTING BEEHIIV API ===');
  
  const diagnostics = {
    apiKeyExists: !!process.env.BEEHIIV_API_KEY,
    apiKeyPreview: process.env.BEEHIIV_API_KEY ? 
      `${process.env.BEEHIIV_API_KEY.substring(0, 10)}...` : 
      'NOT SET',
    publicationIdExists: !!process.env.BEEHIIV_PUBLICATION_ID,
    publicationId: process.env.BEEHIIV_PUBLICATION_ID || 'NOT SET',
  };

  // Try to add a test subscriber
  let testResult = null;
  
  if (process.env.BEEHIIV_API_KEY && process.env.BEEHIIV_PUBLICATION_ID) {
    try {
      const result = await beehiiv.addSubscriber({
        email: `test-${Date.now()}@example.com`,
        utm_source: 'test',
        utm_medium: 'api_test',
      });
      testResult = result;
    } catch (error: any) {
      testResult = {
        success: false,
        error: error?.message || String(error),
      };
    }
  } else {
    testResult = {
      success: false,
      error: 'Beehiiv credentials not configured'
    };
  }

  return NextResponse.json({
    diagnostics,
    testResult,
    timestamp: new Date().toISOString()
  });
}