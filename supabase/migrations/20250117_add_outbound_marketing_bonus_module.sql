-- Add bonus module to Marketing: Outbound Mastery course
INSERT INTO public.modules (course_id, title, slug, description, video_url, video_duration_minutes, order_index, type, tagline, is_locked)
SELECT 
  c.id,
  'Bonus: Advanced Outbound Strategies',
  'advanced-outbound-strategies',
  'Advanced techniques and case studies for mastering outbound marketing',
  'https://www.loom.com/share/bbfeb396eaa34c17bb67a305115265f6?sid=49e7e5de-a8f2-44ac-9ba2-e88cd2f26836',
  20, -- Estimated duration, adjust as needed
  10, -- This will be the 10th module
  'video',
  'Take your outbound game to the next level',
  false
FROM public.courses c
WHERE c.slug = 'client-acquisition'; 