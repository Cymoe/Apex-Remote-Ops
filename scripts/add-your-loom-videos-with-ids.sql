-- Add your Loom videos to RemoteOps
-- Replace the Loom URLs with your actual Loom embed URLs

INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
-- Module 1: Introduction to Remote Operations
('7dc4118d-ff47-4a30-8598-f9c7e19f7427', 'https://www.loom.com/embed/YOUR-LOOM-ID-1', 600),

-- Module 2: Building Self-Managing Teams  
('1dcb6ceb-8eeb-4f71-af56-3584db4ed6f9', 'https://www.loom.com/embed/YOUR-LOOM-ID-2', 600),

-- Module 3: Standard Operating Procedures
('19b58332-ff90-4333-b9b2-4339ace6cb2d', 'https://www.loom.com/embed/YOUR-LOOM-ID-3', 600),

-- Module 4: Communication Frameworks
('30926e3a-206f-4996-93e8-6764e585baf5', 'https://www.loom.com/embed/YOUR-LOOM-ID-4', 600),

-- Module 5: Performance Metrics & KPIs
('556c4757-22f1-45ab-b4e8-794e3ec95887', 'https://www.loom.com/embed/YOUR-LOOM-ID-5', 600),

-- Module 6: Troubleshooting Common Issues
('5b6a7d8f-060c-4bad-a2f5-670482d6a8ea', 'https://www.loom.com/embed/YOUR-LOOM-ID-6', 600),

-- Module 7: Case Studies: Success Stories
('690fb438-974d-4840-9510-e81c708cf55f', 'https://www.loom.com/embed/YOUR-LOOM-ID-7', 600),

-- Module 8: Your 90-Day Implementation Plan
('28ddd900-70a8-4941-9f68-cbf7c7d876a2', 'https://www.loom.com/embed/YOUR-LOOM-ID-8', 600);

-- To use Zoom recordings:
-- 1. Download from Zoom
-- 2. Upload to Loom/Vimeo/YouTube
-- 3. Use the embed URL here

-- To check your videos:
SELECT 
  m.title as module,
  va.storage_path as video_url
FROM video_assets va
JOIN modules m ON va.module_id = m.id
ORDER BY m.order_index;