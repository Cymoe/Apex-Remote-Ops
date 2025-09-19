import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const supabase = createClient();
    const body = await req.json();
    
    // Check authentication
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json({ 
        error: 'Not authenticated',
        authError 
      }, { status: 401 });
    }
    
    // Use admin client for database operations
    const adminSupabase = createAdminClient();
    
    // Check if course exists
    const { data: course, error: courseError } = await adminSupabase
      .from('courses')
      .select('id, title')
      .eq('id', body.course_id)
      .single();
      
    if (courseError || !course) {
      return NextResponse.json({ 
        error: 'Course not found',
        courseError,
        courseId: body.course_id
      }, { status: 404 });
    }
    
    // Try to insert module using admin client
    const { data, error } = await adminSupabase
      .from('modules')
      .insert([{
        ...body,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select();
      
    if (error) {
      return NextResponse.json({ 
        error: 'Database error',
        details: {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code
        },
        body,
        course
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      success: true,
      data,
      course,
      user: user.email
    });
    
  } catch (error: any) {
    return NextResponse.json({ 
      error: 'Server error',
      message: error?.message || 'Unknown error',
      stack: error?.stack
    }, { status: 500 });
  }
}