'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Save, Video, Image } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ModuleVideoFormProps {
  module: any;
}

export function ModuleVideoForm({ module }: ModuleVideoFormProps) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [fetchingThumbnail, setFetchingThumbnail] = useState(false);
  const [videoUrl, setVideoUrl] = useState(module.video_url || '');
  const [thumbnailUrl, setThumbnailUrl] = useState(module.thumbnail_url || '');
  const [tagline, setTagline] = useState(module.tagline || '');
  const [description, setDescription] = useState(module.description || '');

  // Automatically fetch Loom thumbnail when URL changes
  useEffect(() => {
    const fetchLoomThumbnail = async () => {
      if (!videoUrl.includes('loom.com/share/') || videoUrl.length < 40) return;
      
      setFetchingThumbnail(true);
      try {
        const response = await fetch('/api/fetch-loom-metadata', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ videoUrl })
        });
        
        if (response.ok) {
          const data = await response.json();
          if (data.thumbnailUrl) {
            setThumbnailUrl(data.thumbnailUrl);
            console.log('Loom thumbnail fetched:', data.thumbnailUrl);
          }
        }
      } catch (error) {
        console.error('Failed to fetch Loom thumbnail:', error);
      } finally {
        setFetchingThumbnail(false);
      }
    };

    // Debounce the fetch to avoid too many requests
    const timeoutId = setTimeout(fetchLoomThumbnail, 1000);
    return () => clearTimeout(timeoutId);
  }, [videoUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate module ID exists
      if (!module?.id) {
        throw new Error('Module ID is missing');
      }

      // Convert Loom share URL to embed URL if needed
      let embedUrl = videoUrl;
      if (videoUrl.includes('loom.com/share/')) {
        embedUrl = videoUrl.replace('/share/', '/embed/');
      }

      console.log('Updating module:', module.id);
      console.log('Video URL:', embedUrl);
      console.log('Thumbnail URL:', thumbnailUrl);
      console.log('Description:', description);

      const { data, error } = await supabase
        .from('modules')
        .update({
          video_url: embedUrl || null,
          thumbnail_url: thumbnailUrl || null,
          tagline: tagline || null,
          description: description || null,
        })
        .eq('id', module.id)
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to update module');
      }

      console.log('Update result:', data);
      
      // Show success message
      alert('Module updated successfully!');
      
      router.refresh();
    } catch (error: any) {
      console.error('Error updating module:', error);
      // Check for common error scenarios
      if (error.message?.includes('JWT') || error.message?.includes('refresh_token')) {
        alert('Your session has expired. Please refresh the page and try again.');
      } else if (error.message?.includes('network') || error.message?.includes('fetch')) {
        alert('Network error. Please check your connection and try again.');
      } else if (error.message?.includes('PGRST301')) {
        alert('Database connection error. Please try again later.');
      } else if (error.message?.includes('23503')) {
        alert('Invalid course or module reference. Please refresh the page.');
      } else if (error.message?.includes('permission') || error.message?.includes('RLS')) {
        alert('Permission denied. Please ensure you have admin access.');
      } else {
        alert('Failed to update module: ' + (error.message || 'Unknown error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`video-${module.id}`} className="text-light-gray">
          Video URL
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={`video-${module.id}`}
            type="url"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="https://www.loom.com/share/... or embed URL"
            className="bg-deep-black border-slate-gray text-pure-white"
          />
          {module.video_url && (
            <Badge variant="secondary" className="shrink-0">
              <Video className="w-3 h-3 mr-1" />
              Has Video
            </Badge>
          )}
        </div>
        <p className="text-xs text-medium-gray">
          Paste your Loom share link - we'll automatically convert it to embed format
          {fetchingThumbnail && " and fetch the thumbnail"}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`thumbnail-${module.id}`} className="text-light-gray">
          Thumbnail URL {fetchingThumbnail && <span className="text-professional-blue">(fetching...)</span>}
        </Label>
        <div className="flex items-center gap-2">
          <Input
            id={`thumbnail-${module.id}`}
            type="url"
            value={thumbnailUrl}
            onChange={(e) => setThumbnailUrl(e.target.value)}
            placeholder="Auto-filled for Loom videos"
            className="bg-deep-black border-slate-gray text-pure-white"
          />
          {thumbnailUrl && (
            <Badge variant="secondary" className="shrink-0">
              <Image className="w-3 h-3 mr-1" />
              Has Thumbnail
            </Badge>
          )}
        </div>
        <p className="text-xs text-medium-gray">
          Automatically fetched for Loom videos, or paste a custom thumbnail URL
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`tagline-${module.id}`} className="text-light-gray">
          Tagline
        </Label>
        <Input
          id={`tagline-${module.id}`}
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="Brief one-line summary of the module"
          maxLength={255}
          className="bg-deep-black border-slate-gray text-pure-white"
        />
        <p className="text-xs text-medium-gray">
          A catchy one-liner that summarizes the key benefit or learning outcome
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`desc-${module.id}`} className="text-light-gray">
          Description
        </Label>
        <Textarea
          id={`desc-${module.id}`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Brief description of what this module covers..."
          className="bg-deep-black border-slate-gray text-pure-white resize-none"
          rows={3}
        />
      </div>


      <Button
        type="submit"
        disabled={loading}
        className="bg-professional-blue hover:bg-professional-blue/90"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </>
        )}
      </Button>
    </form>
  );
}