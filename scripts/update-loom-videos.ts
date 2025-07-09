// Script to update your modules with real Loom video URLs
// Run with: npx tsx scripts/update-loom-videos.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

// Replace these with your actual Loom embed URLs
const loomVideos = {
  'Introduction to Remote Operations': 'https://www.loom.com/embed/YOUR_VIDEO_ID_1',
  'Building Self-Managing Teams': 'https://www.loom.com/embed/YOUR_VIDEO_ID_2',
  'Standard Operating Procedures': 'https://www.loom.com/embed/YOUR_VIDEO_ID_3',
  'Communication Frameworks': 'https://www.loom.com/embed/YOUR_VIDEO_ID_4',
  'Performance Metrics & KPIs': 'https://www.loom.com/embed/YOUR_VIDEO_ID_5',
};

async function updateLoomVideos() {
  for (const [title, videoUrl] of Object.entries(loomVideos)) {
    const { error } = await supabase
      .from('modules')
      .update({ video_url: videoUrl })
      .eq('title', title);
    
    if (error) {
      console.error(`Failed to update ${title}:`, error);
    } else {
      console.log(`✓ Updated ${title}`);
    }
  }
}

updateLoomVideos().catch(console.error);