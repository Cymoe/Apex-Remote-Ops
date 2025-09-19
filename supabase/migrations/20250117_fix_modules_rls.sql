-- Fix RLS policies for modules table to allow authenticated users to manage modules

-- First, ensure RLS is enabled
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can view modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can create modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can update modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can delete modules" ON public.modules;

-- Create new policies
-- Allow anyone to view modules
CREATE POLICY "Anyone can view modules"
  ON public.modules FOR SELECT
  USING (true);

-- Allow authenticated users to create modules
CREATE POLICY "Authenticated users can create modules"
  ON public.modules FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update modules
CREATE POLICY "Authenticated users can update modules"
  ON public.modules FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Allow authenticated users to delete modules
CREATE POLICY "Authenticated users can delete modules"
  ON public.modules FOR DELETE
  TO authenticated
  USING (true);

-- Also ensure the courses table has proper RLS
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- Drop existing course policies if they exist
DROP POLICY IF EXISTS "Anyone can view courses" ON public.courses;
DROP POLICY IF EXISTS "Authenticated users can manage courses" ON public.courses;

-- Allow anyone to view courses
CREATE POLICY "Anyone can view courses"
  ON public.courses FOR SELECT
  USING (true);

-- Allow authenticated users to manage courses
CREATE POLICY "Authenticated users can manage courses"
  ON public.courses FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true); 