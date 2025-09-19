import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CourseEditForm } from '@/components/admin/course-edit-form';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function EditCoursePage({ params }: PageProps) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  // Check if user is authenticated
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect('/auth/sign-in');
  }

  // Get course data
  const { data: course } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single();

  if (!course) {
    redirect('/admin/courses');
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-pure-white">Edit Course</h1>
      <CourseEditForm course={course} />
    </div>
  );
}