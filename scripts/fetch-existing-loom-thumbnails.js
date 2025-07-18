const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Try multiple possible key names
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                          process.env.SUPABASE_SERVICE_KEY || 
                          process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check your .env.local file.');
  console.error('Required variables:');
  console.error('  NEXT_PUBLIC_SUPABASE_URL');
  console.error('  SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SERVICE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to extract Loom video ID from URL
function extractLoomId(url) {
  const patterns = [
    /loom\.com\/share\/([a-zA-Z0-9]+)/,
    /loom\.com\/embed\/([a-zA-Z0-9]+)/
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Function to fetch Loom metadata using oEmbed
async function fetchLoomMetadata(loomId) {
  try {
    const url = `https://www.loom.com/v1/oembed?url=https://www.loom.com/share/${loomId}&format=json`;
    console.log(`Fetching metadata for Loom ID: ${loomId}`);
    
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to fetch metadata for ${loomId}: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    return {
      title: data.title,
      thumbnailUrl: data.thumbnail_url,
      duration: data.duration
    };
  } catch (error) {
    console.error(`Error fetching metadata for ${loomId}:`, error);
    return null;
  }
}

// Main function to update all Loom videos
async function updateLoomThumbnails() {
  console.log('Starting Loom thumbnail update process...\n');
  
  // Fetch all modules with Loom videos that don't have thumbnails
  const { data: modules, error } = await supabase
    .from('modules')
    .select('id, title, video_url, thumbnail_url')
    .ilike('video_url', '%loom.com%')
    .is('thumbnail_url', null)
    .order('created_at', { ascending: true });
  
  if (error) {
    console.error('Error fetching modules:', error);
    return;
  }
  
  console.log(`Found ${modules.length} Loom videos without thumbnails\n`);
  
  if (modules.length === 0) {
    console.log('All Loom videos already have thumbnails! 🎉');
    return;
  }
  
  let successCount = 0;
  let failCount = 0;
  
  for (const module of modules) {
    const loomId = extractLoomId(module.video_url);
    
    if (!loomId) {
      console.log(`❌ Could not extract Loom ID from: ${module.video_url}`);
      failCount++;
      continue;
    }
    
    const metadata = await fetchLoomMetadata(loomId);
    
    if (metadata && metadata.thumbnailUrl) {
      // Update the module with the thumbnail URL
      const { error: updateError } = await supabase
        .from('modules')
        .update({ thumbnail_url: metadata.thumbnailUrl })
        .eq('id', module.id);
      
      if (updateError) {
        console.error(`❌ Error updating module ${module.id}:`, updateError);
        failCount++;
      } else {
        console.log(`✅ Updated "${module.title}" with thumbnail`);
        successCount++;
      }
    } else {
      console.log(`❌ No thumbnail found for "${module.title}"`);
      failCount++;
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log('\n========== Summary ==========');
  console.log(`Total modules processed: ${modules.length}`);
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`❌ Failed updates: ${failCount}`);
  console.log('=============================\n');
}

// Run the update
updateLoomThumbnails().catch(console.error); 