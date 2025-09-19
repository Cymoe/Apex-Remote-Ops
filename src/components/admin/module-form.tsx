'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createModule, updateModule } from '@/app/(app)/admin/courses/[slug]/modules/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'react-hot-toast';

interface ModuleFormProps {
  courseId: string;
  module?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const MODULE_TYPES = [
  { value: 'video', label: 'Video' },
  { value: 'workshop', label: 'Workshop' },
  { value: 'resource', label: 'Resource' },
  { value: 'assessment', label: 'Assessment' },
];

export function ModuleForm({ courseId, module, onSuccess, onCancel }: ModuleFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: module?.title || '',
    slug: module?.slug || '',
    description: module?.description || '',
    video_duration_minutes: module?.video_duration_minutes || 30,
    order_index: module?.order_index || 1,
    type: module?.type || 'video',
    tagline: module?.tagline || '',
    is_locked: module?.is_locked || false,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleTitleChange = (value: string) => {
    setFormData({
      ...formData,
      title: value,
      slug: module ? formData.slug : generateSlug(value),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add validation
      if (!courseId) {
        throw new Error('Course ID is required');
      }
      
      let result;
      
      if (module) {
        // Update existing module
        result = await updateModule(module.id, formData);
      } else {
        // Create new module
        result = await createModule(courseId, formData);
      }
      
      if (result.error) {
        console.error('Module operation error:', result);
        throw new Error(result.error);
      }
      
      toast.success(module ? 'Module updated successfully' : 'Module created successfully');
      router.refresh();
      if (onSuccess) onSuccess();
    } catch (error: any) {
      console.error('Error saving module:', {
        error,
        message: error?.message,
        courseId,
        formData
      });
      const errorMessage = error?.message || 'Failed to save module';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Module Title</Label>
          <Input
            id="title"
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="e.g., Introduction to Remote Operations"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="slug">URL Slug</Label>
          <Input
            id="slug"
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            placeholder="e.g., intro-remote-ops"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe what students will learn in this module..."
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tagline">Tagline (Optional)</Label>
        <Input
          id="tagline"
          value={formData.tagline}
          onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
          placeholder="e.g., Master the basics in 30 minutes"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            value={formData.video_duration_minutes}
            onChange={(e) => setFormData({ ...formData, video_duration_minutes: parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="order">Order Index</Label>
          <Input
            id="order"
            type="number"
            min="1"
            value={formData.order_index}
            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 1 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Module Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger id="type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MODULE_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_locked"
          checked={formData.is_locked}
          onChange={(e) => setFormData({ ...formData, is_locked: e.target.checked })}
          className="h-4 w-4 rounded border-gray-300"
        />
        <Label htmlFor="is_locked" className="text-sm font-normal">
          Lock this module (requires completion of previous modules)
        </Label>
      </div>

      <div className="flex justify-end gap-4">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : module ? 'Update Module' : 'Create Module'}
        </Button>
      </div>
    </form>
  );
} 