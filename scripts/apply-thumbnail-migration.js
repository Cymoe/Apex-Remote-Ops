const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing environment variables. Please check your .env.local file.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function applyMigration() {
  console.log('Applying thumbnail_url migration to modules table...\n');
  
  try {
    // Check if column already exists
    const { data: columns, error: columnsError } = await supabase
      .rpc('get_table_columns', { table_name: 'modules' });
    
    if (columnsError) {
      // If the function doesn't exist, try to add the column anyway
      console.log('Checking columns failed, attempting to add column...');
    } else if (columns && columns.some(col => col.column_name === 'thumbnail_url')) {
      console.log('✅ Column thumbnail_url already exists in modules table');
      return;
    }
    
    // Add the column using raw SQL through RPC
    const migrationSQL = `
      ALTER TABLE public.modules 
      ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
      
      COMMENT ON COLUMN public.modules.thumbnail_url IS 'URL of the video thumbnail, automatically fetched for Loom videos';
      
      CREATE INDEX IF NOT EXISTS idx_modules_thumbnail_url ON public.modules(thumbnail_url) WHERE thumbnail_url IS NOT NULL;
    `;
    
    // Note: Direct SQL execution requires a database function or manual execution
    console.log('Migration SQL to be executed:');
    console.log(migrationSQL);
    console.log('\nSince direct SQL execution is not available through the client,');
    console.log('please run the following command to apply the migration:\n');
    console.log('npx supabase db push --linked\n');
    console.log('Or execute the SQL in supabase/migrations/20250117_add_thumbnail_url_to_modules.sql directly in your Supabase dashboard.');
    
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration check
applyMigration().catch(console.error); 