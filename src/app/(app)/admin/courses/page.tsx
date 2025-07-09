import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Edit, Video, Plus, Settings } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CATEGORY_LABELS: Record<string, string> = {
  'foundation': 'Foundation',
  'technology': 'Technology & Infrastructure',
  'client-acquisition': 'Client Acquisition',
  'operations': 'Operations & Fulfillment',
  'team-building': 'Team Building',
  'finance': 'Finance & Legal',
  'marketing': 'Marketing',
  'sales': 'Sales'
};

export default async function AdminCoursesPage() {
  try {
    const supabase = createClient();
    
    // Check if user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error('Auth error in admin courses page:', authError);
      redirect('/auth/sign-in');
    }
    if (!user) {
      redirect('/auth/sign-in');
    }

    // Get all courses first
    const { data: courses, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('order_index', { ascending: true });

    if (coursesError) {
      console.error('Error fetching courses:', coursesError);
      throw new Error(`Failed to fetch courses: ${coursesError.message}`);
    }

    // Get module counts separately to avoid aggregate function issues
    const coursesWithCounts = await Promise.all(
      (courses || []).map(async (course) => {
        const { count, error: countError } = await supabase
          .from('modules')
          .select('*', { count: 'exact', head: true })
          .eq('course_id', course.id);
        
        if (countError) {
          console.error(`Error fetching module count for course ${course.id}:`, countError);
        }
        
        return {
          ...course,
          modules: [{ count: count || 0 }]
        };
      })
    );

    return renderPage(coursesWithCounts);
  } catch (error) {
    console.error('AdminCoursesPage error:', error);
    throw error;
  }
}

function renderPage(courses: any[]) {

  return (
    <div className="space-y-6 text-pure-white">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-pure-white">Course Management</h1>
        <Link href="/admin/courses/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Course
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {courses?.map((course) => (
          <Card key={course.id} className="bg-carbon-black border-slate-gray hover:border-pure-white/20 transition-colors">
            <CardHeader className="pb-3">
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg text-pure-white line-clamp-2">{course.title}</CardTitle>
                  {!course.is_published && (
                    <Badge variant="secondary" className="bg-slate-gray text-xs shrink-0">Draft</Badge>
                  )}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="outline" className="border-slate-gray text-xs">
                    {course.modules?.[0]?.count || 0} modules
                  </Badge>
                  <Badge variant="outline" className="border-slate-gray text-xs">
                    {course.level}
                  </Badge>
                  {course.category && (
                    <Badge variant="outline" className="border-slate-gray text-xs">
                      {CATEGORY_LABELS[course.category] || course.category}
                    </Badge>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-sm text-medium-gray line-clamp-2 mb-3">{course.description}</p>
              <div className="flex items-center gap-3 text-xs text-light-gray mb-4">
                <span>{course.duration_hours} hours</span>
                {course.estimated_weeks && (
                  <>
                    <span>•</span>
                    <span>{course.estimated_weeks} weeks</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/courses/${course.slug}/edit`} className="flex-1">
                  <Button size="sm" variant="outline" className="w-full border-slate-gray text-xs">
                    <Settings className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Link href={`/admin/courses/${course.slug}/modules`} className="flex-1">
                  <Button size="sm" className="w-full text-xs">
                    <Video className="w-3 h-3 mr-1" />
                    Modules
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}