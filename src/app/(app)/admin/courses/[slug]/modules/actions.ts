'use server';

import { createAdminClient } from '@/lib/supabase/admin';
import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function createModule(courseId: string, formData: any) {
  try {
    // Check authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: 'Not authenticated' };
    }
    
    // Use admin client for database operations
    const adminSupabase = createAdminClient();
    
    const { data, error } = await adminSupabase
      .from('modules')
      .insert([{
        ...formData,
        course_id: courseId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }])
      .select()
      .single();
      
    if (error) {
      return { 
        error: error.message || 'Failed to create module',
        details: error
      };
    }
    
    // Get course slug from course
    const { data: course } = await adminSupabase
      .from('courses')
      .select('slug')
      .eq('id', courseId)
      .single();
    
    // Revalidate the modules page
    if (course?.slug) {
      revalidatePath(`/admin/courses/${course.slug}/modules`);
    }
    
    return { data, success: true };
  } catch (error: any) {
    return { 
      error: error?.message || 'Server error',
      details: error
    };
  }
}

export async function updateModule(moduleId: string, formData: any) {
  try {
    // Check authentication
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      return { error: 'Not authenticated' };
    }
    
    // Use admin client for database operations
    const adminSupabase = createAdminClient();
    
    const { data, error } = await adminSupabase
      .from('modules')
      .update({
        ...formData,
        updated_at: new Date().toISOString()
      })
      .eq('id', moduleId)
      .select()
      .single();
      
    if (error) {
      return { 
        error: error.message || 'Failed to update module',
        details: error
      };
    }
    
    // Get course slug from module's course
    const { data: module } = await adminSupabase
      .from('modules')
      .select('course:courses(slug)')
      .eq('id', moduleId)
      .single();
    
    // Revalidate the modules page
    if (module?.course?.slug) {
      revalidatePath(`/admin/courses/${module.course.slug}/modules`);
    }
    
    return { data, success: true };
  } catch (error: any) {
    return { 
      error: error?.message || 'Server error',
      details: error
    };
  }
}