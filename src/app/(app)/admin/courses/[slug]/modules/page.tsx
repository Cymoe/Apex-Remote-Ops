import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';
import { ModuleVideoForm } from '@/components/admin/module-video-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

interface PageProps {
  params: { slug: string };
}

export default async function AdminModulesPage({ params }: PageProps) {
  try {
    const resolvedParams = await params;
    const supabase = createClient();
    
    // Check if user is authenticated
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      redirect('/auth/sign-in');
    }

  // Get course with modules
  const { data: course, error } = await supabase
    .from('courses')
    .select(`
      *,
      modules (*)
    `)
    .eq('slug', resolvedParams.slug)
    .single();

  if (error) {
    console.error('Error fetching course:', error);
    // Check for specific database errors
    if (error.code === 'PGRST301') {
      throw new Error('Database connection error. Please check your Supabase configuration.');
    }
    if (error.code === '42P01') {
      throw new Error('Database table not found. Please ensure migrations have been run.');
    }
    throw new Error(`Failed to fetch course data: ${error.message}`);
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-6 min-h-screen bg-carbon-black text-pure-white">
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/courses"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Courses
        </Link>
      </div>

      <div>
        <h1 className="text-3xl font-bold text-pure-white">{course.title}</h1>
        <p className="text-muted-foreground mt-2">Manage video links for course modules</p>
      </div>

      <div className="grid gap-4">
        {course.modules?.map((module: any) => (
          <Card key={module.id} className="bg-slate-gray border-slate-gray">
            <CardHeader className="border-b border-carbon-black">
              <CardTitle className="text-pure-white">
                Module {module.order_index}: {module.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-slate-gray">
              <ModuleVideoForm module={module} />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  } catch (error) {
    console.error('AdminModulesPage error:', error);
    // Re-throw to let the error boundary handle it
    throw error;
  }
}