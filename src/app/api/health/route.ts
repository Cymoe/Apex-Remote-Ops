import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  const checks = {
    environment: false,
    database: false,
    auth: false,
    timestamp: new Date().toISOString(),
  };

  try {
    // Check environment variables
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      checks.environment = true;
    }

    const supabase = await createClient();

    // Check database connection
    const { error: dbError } = await supabase
      .from('courses')
      .select('count', { count: 'exact', head: true });

    if (!dbError) {
      checks.database = true;
    } else {
      console.error('Database check failed:', dbError);
    }

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (!authError) {
      checks.auth = !!user;
    }

    const allHealthy = Object.values(checks).every(v => v === true || typeof v === 'string');

    return NextResponse.json({
      status: allHealthy ? 'healthy' : 'unhealthy',
      checks,
    }, {
      status: allHealthy ? 200 : 503,
    });
  } catch (error) {
    console.error('Health check error:', error);
    return NextResponse.json({
      status: 'error',
      checks,
      error: error instanceof Error ? error.message : 'Unknown error',
    }, {
      status: 503,
    });
  }
}