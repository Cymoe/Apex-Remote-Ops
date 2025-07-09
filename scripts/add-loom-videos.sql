-- Script to add Loom videos to your video_assets table
-- Replace the values with your actual Loom URLs and module IDs

-- Example: Add Loom videos for your modules
-- Get your Loom share URL (e.g., https://www.loom.com/share/YOUR_VIDEO_ID)
-- Convert to embed URL: https://www.loom.com/embed/YOUR_VIDEO_ID

-- First, get your module IDs
SELECT id, title, course_id FROM modules ORDER BY course_id, order_index;

-- Then insert video assets for each module
-- Replace MODULE_ID and LOOM_URL with your actual values
INSERT INTO video_assets (module_id, storage_path, duration_seconds, resolution, mime_type) VALUES
-- Example entries (update with your data):
-- ('your-module-id-1', 'https://www.loom.com/embed/abc123', 600, '1080p', 'video/mp4'),
-- ('your-module-id-2', 'https://www.loom.com/embed/def456', 900, '1080p', 'video/mp4'),
-- ('your-module-id-3', 'https://www.loom.com/embed/ghi789', 1200, '1080p', 'video/mp4');

-- Alternative: Update existing modules with video URLs directly
-- UPDATE modules SET video_url = 'https://www.loom.com/embed/YOUR_VIDEO_ID' WHERE id = 'your-module-id';