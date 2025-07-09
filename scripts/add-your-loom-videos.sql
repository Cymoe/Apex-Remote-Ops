-- Step 1: First, let's see all your modules
SELECT 
  m.id as module_id,
  m.title as module_title,
  c.title as course_title
FROM modules m
JOIN courses c ON m.course_id = c.id
ORDER BY c.title, m.order_index;

-- Step 2: Add your Loom videos
-- Replace the module_id and Loom URLs with your actual values
-- To get Loom embed URL: change "share" to "embed" in the URL

-- Example for "The Remote Operations Flywheel" course (8 modules):
INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
-- Module 1
('replace-with-module-1-id', 'https://www.loom.com/embed/your-loom-id-1', 600),
-- Module 2
('replace-with-module-2-id', 'https://www.loom.com/embed/your-loom-id-2', 600),
-- Module 3
('replace-with-module-3-id', 'https://www.loom.com/embed/your-loom-id-3', 600),
-- Module 4
('replace-with-module-4-id', 'https://www.loom.com/embed/your-loom-id-4', 600),
-- Module 5
('replace-with-module-5-id', 'https://www.loom.com/embed/your-loom-id-5', 600),
-- Module 6
('replace-with-module-6-id', 'https://www.loom.com/embed/your-loom-id-6', 600),
-- Module 7
('replace-with-module-7-id', 'https://www.loom.com/embed/your-loom-id-7', 600),
-- Module 8
('replace-with-module-8-id', 'https://www.loom.com/embed/your-loom-id-8', 600);

-- You can also use Zoom recordings if you upload them somewhere:
-- 1. Download Zoom recording
-- 2. Upload to Loom, Vimeo, or YouTube (unlisted)
-- 3. Use the embed URL

-- Or for live Zoom sessions, you could add the Zoom link as a resource:
UPDATE modules 
SET resources = jsonb_build_array(
  jsonb_build_object(
    'title', 'Live Zoom Session',
    'url', 'https://zoom.us/j/your-meeting-id',
    'type', 'zoom'
  )
)
WHERE id = 'module-id-here';