# How to Add Your Loom Videos

## Quick Setup (Recommended for MVP)

### 1. Get Your Loom URLs
For each Loom video:
1. Go to your Loom video
2. Click "Share" 
3. Copy the share link (e.g., `https://www.loom.com/share/abc123def456`)
4. Convert to embed URL: `https://www.loom.com/embed/abc123def456`

### 2. Add Videos to Database

Run this in your Supabase SQL editor:

```sql
-- First, check your existing modules
SELECT id, title, slug FROM modules ORDER BY course_id, order_index;

-- Then add video assets for each module
INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
('module-id-here', 'https://www.loom.com/embed/your-video-id', 600),
('another-module-id', 'https://www.loom.com/embed/another-video-id', 900);
```

### 3. That's It!
Your video player will automatically:
- Detect Loom URLs and embed them
- Track viewing progress
- Mark modules as complete when 90% watched

## Alternative Options

### Option 2: Download & Upload to Supabase
1. Download Loom videos as MP4
2. Upload to Supabase Storage:
   ```sql
   -- Create storage bucket if not exists
   INSERT INTO storage.buckets (id, name, public) 
   VALUES ('videos', 'videos', false);
   ```
3. Upload via Supabase Dashboard → Storage → videos bucket

### Option 3: Use Vimeo/YouTube
- Same process as Loom
- Just use the embed URLs
- YouTube: `https://www.youtube.com/embed/VIDEO_ID`
- Vimeo: `https://player.vimeo.com/video/VIDEO_ID`

## Benefits of Using Loom Directly
- ✅ No storage costs
- ✅ Loom handles video streaming/CDN
- ✅ Built-in analytics on Loom dashboard
- ✅ Easy to update videos
- ✅ Works immediately

## Testing Your Videos
1. Navigate to any course module
2. Video should load and play
3. Progress saves automatically
4. Check the video_progress table to verify