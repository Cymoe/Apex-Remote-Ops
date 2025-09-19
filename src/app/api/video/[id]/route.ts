import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get video asset details
    const { data: videoAsset, error: assetError } = await supabase
      .from('video_assets')
      .select('*')
      .eq('id', params.id)
      .single();

    if (assetError || !videoAsset) {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }

    // Get user's progress for this video
    const { data: progress } = await supabase
      .from('video_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('video_asset_id', params.id)
      .single();

    // Check if video has a direct URL (like Loom)
    if (videoAsset?.storage_path?.startsWith('http')) {
      // Direct URL (Loom, Vimeo, etc)
      return NextResponse.json({
        videoAsset: videoAsset,
        url: videoAsset.storage_path,
        progress: progress || null,
      });
    }
    
    // Otherwise use demo URL (replace with Supabase Storage later)
    const demoVideoUrl = 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4';

    return NextResponse.json({
      videoAsset: videoAsset || { id: params.id, duration_seconds: 600 },
      url: demoVideoUrl,
      progress: progress || null,
    });
  } catch (error) {
    console.error('Video API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}