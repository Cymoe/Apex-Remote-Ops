-- Enhanced Course Structure Migration
-- This migration adds fields needed for a scalable course platform

-- Add new fields to courses table
ALTER TABLE public.courses 
ADD COLUMN IF NOT EXISTS level TEXT CHECK (level IN ('Beginner', 'Intermediate', 'Advanced')) DEFAULT 'Beginner',
ADD COLUMN IF NOT EXISTS category TEXT,
ADD COLUMN IF NOT EXISTS prerequisites TEXT[],
ADD COLUMN IF NOT EXISTS is_published BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT,
ADD COLUMN IF NOT EXISTS estimated_weeks INTEGER;

-- Add new fields to modules table
ALTER TABLE public.modules
ADD COLUMN IF NOT EXISTS lessons_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'video' CHECK (type IN ('video', 'workshop', 'resource', 'assessment')),
ADD COLUMN IF NOT EXISTS is_locked BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS prerequisite_module_id UUID REFERENCES public.modules(id);

-- Create lessons table for future granular content
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  module_id UUID REFERENCES public.modules(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration_minutes INTEGER,
  order_index INTEGER NOT NULL DEFAULT 0,
  resources JSONB DEFAULT '[]'::jsonb,
  transcript TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create unique index for lesson slugs within modules
CREATE UNIQUE INDEX IF NOT EXISTS lessons_module_slug_unique ON public.lessons(module_id, slug);

-- Create learning paths table
CREATE TABLE IF NOT EXISTS public.learning_paths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  course_ids UUID[] NOT NULL,
  target_audience TEXT,
  estimated_duration_weeks INTEGER,
  order_index INTEGER DEFAULT 0,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create course categories table
CREATE TABLE IF NOT EXISTS public.course_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  icon TEXT,
  color TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Add RLS policies for new tables
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;

-- Lessons policies
CREATE POLICY "Lessons are viewable by authenticated users" ON public.lessons
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage lessons" ON public.lessons
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Learning paths policies
CREATE POLICY "Learning paths are viewable by everyone" ON public.learning_paths
  FOR SELECT TO authenticated
  USING (is_published = true);

CREATE POLICY "Authenticated users can manage learning paths" ON public.learning_paths
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Course categories policies
CREATE POLICY "Categories are viewable by everyone" ON public.course_categories
  FOR SELECT TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage categories" ON public.course_categories
  FOR ALL TO authenticated
  USING (true)
  WITH CHECK (true);

-- Update existing courses with categories
UPDATE public.courses SET category = 
  CASE 
    WHEN slug = 'remote-operations-flywheel' THEN 'foundation'
    WHEN slug = 'hiring-remote-teams' THEN 'team-building'
    WHEN slug = 'financial-architecture' THEN 'finance'
    WHEN slug = 'automated-sales' THEN 'sales'
    WHEN slug = 'remote-tech-stack' THEN 'technology'
    ELSE 'general'
  END
WHERE category IS NULL;

-- Insert initial categories
INSERT INTO public.course_categories (name, slug, description, icon, color, order_index) VALUES
  ('Foundation', 'foundation', 'Core concepts and getting started', 'Rocket', '#3B82F6', 1),
  ('Client Acquisition', 'client-acquisition', 'Marketing, sales, and lead generation', 'Users', '#10B981', 2),
  ('Operations', 'operations', 'Systems, processes, and fulfillment', 'Settings', '#F59E0B', 3),
  ('Team Building', 'team-building', 'Hiring, managing, and scaling teams', 'UserPlus', '#8B5CF6', 4),
  ('Finance', 'finance', 'Financial management and architecture', 'DollarSign', '#EF4444', 5),
  ('Technology', 'technology', 'Tools, automation, and tech stack', 'Cpu', '#6366F1', 6),
  ('Scaling', 'scaling', 'Growth strategies and optimization', 'TrendingUp', '#EC4899', 7)
ON CONFLICT (slug) DO NOTHING;