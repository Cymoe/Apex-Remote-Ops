'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { createClient } from '@/lib/supabase/client';
import { toast } from 'sonner';

interface CourseEditFormProps {
  course?: any;
}

const COURSE_CATEGORIES = [
  { value: 'foundation', label: 'Foundation' },
  { value: 'technology', label: 'Technology & Infrastructure' },
  { value: 'client-acquisition', label: 'Client Acquisition' },
  { value: 'operations', label: 'Operations & Fulfillment' },
  { value: 'team-building', label: 'Team Building' },
  { value: 'finance', label: 'Finance & Legal' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'sales', label: 'Sales' }
];

export function CourseEditForm({ course }: CourseEditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: course?.title || '',
    slug: course?.slug || '',
    description: course?.description || '',
    duration_hours: course?.duration_hours || 0,
    estimated_weeks: course?.estimated_weeks || 0,
    level: course?.level || 'Beginner',
    category: course?.category || 'foundation',
    is_published: course?.is_published ?? true,
    prerequisites: course?.prerequisites || []
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createClient();
      
      if (course) {
        // Update existing course
        const { error } = await supabase
          .from('courses')
          .update(formData)
          .eq('id', course.id);

        if (error) throw error;
        toast.success('Course updated successfully');
      } else {
        // Create new course
        const { error } = await supabase
          .from('courses')
          .insert([formData]);

        if (error) throw error;
        toast.success('Course created successfully');
      }

      router.push('/admin/courses');
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-carbon-black border-slate-gray">
      <CardHeader>
        <CardTitle className="text-pure-white">
          {course ? 'Edit Course' : 'Create New Course'}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-pure-white">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug" className="text-pure-white">Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                required
                placeholder="course-url-slug"
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-pure-white">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="bg-deep-black border-slate-gray text-pure-white"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="level" className="text-pure-white">Level</Label>
              <Select
                value={formData.level}
                onValueChange={(value) => setFormData({ ...formData, level: value })}
              >
                <SelectTrigger className="bg-deep-black border-slate-gray text-pure-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-carbon-black border-slate-gray">
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-pure-white">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-deep-black border-slate-gray text-pure-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-carbon-black border-slate-gray">
                  {COURSE_CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="duration_hours" className="text-pure-white">Duration (hours)</Label>
              <Input
                id="duration_hours"
                type="number"
                value={formData.duration_hours}
                onChange={(e) => setFormData({ ...formData, duration_hours: parseInt(e.target.value) || 0 })}
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="estimated_weeks" className="text-pure-white">Estimated Weeks</Label>
              <Input
                id="estimated_weeks"
                type="number"
                value={formData.estimated_weeks}
                onChange={(e) => setFormData({ ...formData, estimated_weeks: parseInt(e.target.value) || 0 })}
                className="bg-deep-black border-slate-gray text-pure-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-pure-white">Status</Label>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="is_published"
                  checked={formData.is_published}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked as boolean })}
                  className="border-slate-gray"
                />
                <Label htmlFor="is_published" className="text-pure-white cursor-pointer">
                  Published
                </Label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="border-slate-gray text-pure-white hover:bg-slate-gray"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : (course ? 'Update Course' : 'Create Course')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}