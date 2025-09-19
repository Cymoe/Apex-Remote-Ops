import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CourseEditForm } from '@/components/admin/course-edit-form';

export default async function NewCoursePage() {
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/sign-in');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-pure-white">Create New Course</h1>
      <CourseEditForm />
    </div>
  );
}