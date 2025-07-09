-- Clean up duplicate courses, keeping only the new structured ones

-- First, delete modules for old courses
DELETE FROM public.modules 
WHERE course_id IN (
  SELECT id FROM public.courses 
  WHERE slug IN ('premium-discord-server', 'next-level-contractors', 'test-course')
);

-- Delete the old courses
DELETE FROM public.courses 
WHERE slug IN ('premium-discord-server', 'next-level-contractors', 'test-course');

-- Update order_index to ensure proper ordering
UPDATE public.courses SET order_index = 1 WHERE slug = 'foundation-remote-ops';
UPDATE public.courses SET order_index = 2 WHERE slug = 'business-infrastructure';
UPDATE public.courses SET order_index = 3 WHERE slug = 'client-acquisition';
UPDATE public.courses SET order_index = 4 WHERE slug = 'operations-fulfillment';
UPDATE public.courses SET order_index = 5 WHERE slug = 'team-scaling';