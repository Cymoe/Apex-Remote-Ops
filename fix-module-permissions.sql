-- Run this SQL in your Supabase SQL Editor to fix module creation permissions
-- Go to: Supabase Dashboard > SQL Editor > New Query

-- 1. Check if RLS is enabled on modules table
SELECT 
  tablename, 
  rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename IN ('modules', 'courses');

-- 2. Enable RLS if not already enabled
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;

-- 3. Check existing policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies
WHERE tablename IN ('modules', 'courses')
ORDER BY tablename, policyname;

-- 4. Drop any existing policies that might conflict
DROP POLICY IF EXISTS "Anyone can view modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can create modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can update modules" ON public.modules;
DROP POLICY IF EXISTS "Authenticated users can delete modules" ON public.modules;

-- 5. Create proper policies for modules
CREATE POLICY "Anyone can view modules"
  ON public.modules FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create modules"
  ON public.modules FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update modules"
  ON public.modules FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete modules"
  ON public.modules FOR DELETE
  TO authenticated
  USING (true);

-- 6. Verify the policies were created
SELECT 
  tablename,
  policyname,
  cmd
FROM pg_policies
WHERE tablename = 'modules'
ORDER BY policyname;

-- 7. Test insert (this should work for authenticated users)
-- Uncomment and modify the following line with a real course_id to test:
-- INSERT INTO public.modules (course_id, title, slug, description, video_duration_minutes, order_index, type) 
-- VALUES ('your-course-id-here', 'Test Module', 'test-module', 'Test Description', 30, 999, 'video'); 