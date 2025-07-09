-- Example: How to add your Loom videos
-- Replace the module_id and Loom URLs with your actual values

-- Step 1: Run the check-modules.sql query first to get your module IDs

-- Step 2: For each Loom video, convert the share URL to embed URL:
-- Share URL: https://www.loom.com/share/abc123def456
-- Embed URL: https://www.loom.com/embed/abc123def456

-- Step 3: Insert your videos (replace with your actual data):
INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
-- Remote Operations Flywheel modules
('your-module-id-1', 'https://www.loom.com/embed/your-loom-id-1', 600),
('your-module-id-2', 'https://www.loom.com/embed/your-loom-id-2', 900),
('your-module-id-3', 'https://www.loom.com/embed/your-loom-id-3', 720),
('your-module-id-4', 'https://www.loom.com/embed/your-loom-id-4', 800),
('your-module-id-5', 'https://www.loom.com/embed/your-loom-id-5', 1000),
('your-module-id-6', 'https://www.loom.com/embed/your-loom-id-6', 650),
('your-module-id-7', 'https://www.loom.com/embed/your-loom-id-7', 750),
('your-module-id-8', 'https://www.loom.com/embed/your-loom-id-8', 900);

-- You can also check what videos you've added:
SELECT 
  va.id,
  m.title as module_title,
  va.storage_path,
  va.duration_seconds
FROM video_assets va
JOIN modules m ON va.module_id = m.id
ORDER BY m.course_id, m.order_index;