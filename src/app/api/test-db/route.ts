import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // First, just test environment variables
    const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
    const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!hasUrl || !hasKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        env: { hasUrl, hasKey }
      }, { status: 500 });
    }
    
    // Try to import and create client
    const { createClient } = await import('@/lib/supabase/server');
    
    try {
      const supabase = await createClient();
      
      // Test auth
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      return NextResponse.json({
        success: true,
        auth: {
          user: user ? 'authenticated' : 'not authenticated',
          error: authError?.message
        },
        env: { hasUrl, hasKey }
      });
    } catch (clientError) {
      return NextResponse.json({
        error: 'Client creation error',
        message: clientError instanceof Error ? clientError.message : 'Unknown error',
        env: { hasUrl, hasKey }
      }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({
      error: 'General error',
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}