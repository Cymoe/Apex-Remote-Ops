import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test basic connection
    const { data: authUser, error: authError } = await supabase.auth.getUser();
    
    // Check tables
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('id, title, slug')
      .limit(5);
      
    const { data: modules, error: modulesError } = await supabase
      .from('modules')
      .select('id, title, course_id')
      .limit(5);
      
    const { data: videoAssets, error: videoError } = await supabase
      .from('video_assets')
      .select('id, module_id, storage_path')
      .limit(5);
    
    return NextResponse.json({
      auth: {
        user: authUser?.user?.email || 'Not logged in',
        error: authError?.message
      },
      courses: {
        count: courses?.length || 0,
        data: courses,
        error: coursesError?.message
      },
      modules: {
        count: modules?.length || 0,
        data: modules,
        error: modulesError?.message
      },
      videoAssets: {
        count: videoAssets?.length || 0,
        data: videoAssets,
        error: videoError?.message
      }
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ 
      error: error.message,
      stack: error.stack
    }, { status: 500 });
  }
}