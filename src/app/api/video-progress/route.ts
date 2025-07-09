import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { videoAssetId, progressSeconds } = await req.json();

    if (!videoAssetId || progressSeconds === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Use the update_video_progress function
    const { error } = await supabase.rpc('update_video_progress', {
      p_video_asset_id: videoAssetId,
      p_progress_seconds: progressSeconds,
    });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Video progress API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const supabase = createClient();
    const { searchParams } = new URL(req.url);
    const videoAssetId = searchParams.get('videoAssetId');

    if (!videoAssetId) {
      return NextResponse.json({ error: 'Video asset ID required' }, { status: 400 });
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: progress, error } = await supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('video_asset_id', videoAssetId)
      .single();

    if (error && error.code !== 'PGRST116') { // Not found is ok
      throw error;
    }

    return NextResponse.json({ progress: progress || null });
  } catch (error) {
    console.error('Get video progress error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}