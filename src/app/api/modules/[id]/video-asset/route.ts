import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate environment variables
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      console.error('Missing Supabase environment variables');
      return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
    }

    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get video asset for this module
    const { data: videoAsset, error } = await supabase
      .from('video_assets')
      .select('id')
      .eq('module_id', params.id)
      .single();

    if (error) {
      // Handle table not existing or other errors gracefully
      if (error.code === '42P01' || error.message?.includes('relation') || error.message?.includes('does not exist')) {
        console.log('video_assets table not found, returning module ID as fallback');
        return NextResponse.json({ videoAssetId: params.id });
      }
      // If no video asset found (PGRST116), return module ID
      if (error.code === 'PGRST116') {
        return NextResponse.json({ videoAssetId: params.id });
      }
      // Log other errors but still return a response
      console.error('Database error:', error);
      return NextResponse.json({ videoAssetId: params.id });
    }

    return NextResponse.json({ videoAssetId: videoAsset.id });
  } catch (error) {
    console.error('Module video asset API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}