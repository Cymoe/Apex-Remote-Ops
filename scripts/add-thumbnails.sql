-- Script to add thumbnail URLs for modules
-- You can manually add thumbnail URLs here

-- Example: Update specific modules with thumbnail URLs
-- UPDATE public.modules 
-- SET thumbnail_url = 'https://example.com/thumbnail.jpg'
-- WHERE id = 'module-id-here';

-- For Loom videos, you can:
-- 1. Take a screenshot of the video
-- 2. Upload it to your storage (Supabase Storage, Cloudinary, etc.)
-- 3. Update the module with the URL

-- Batch update example for multiple modules:
/*
UPDATE public.modules 
SET thumbnail_url = CASE id
    WHEN '339bfe7b-3221-48c7-84a1-04a0de9e78ce' THEN 'https://your-storage.com/thumb1.jpg'
    WHEN '3299c561-3dee-4ca0-a785-2a76f1ba2087' THEN 'https://your-storage.com/thumb2.jpg'
    ELSE thumbnail_url
END
WHERE id IN ('339bfe7b-3221-48c7-84a1-04a0de9e78ce', '3299c561-3dee-4ca0-a785-2a76f1ba2087');
*/

-- List all modules that need thumbnails
SELECT id, title, video_url, thumbnail_url
FROM public.modules
WHERE video_url IS NOT NULL 
  AND video_url LIKE '%loom%'
  AND (thumbnail_url IS NULL OR thumbnail_url = '')
ORDER BY order_index; 