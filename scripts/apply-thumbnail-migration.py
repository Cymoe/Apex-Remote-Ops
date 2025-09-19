#!/usr/bin/env python3
"""
Apply the thumbnail_url migration to the modules table.
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv(dotenv_path='.env.local')

# Get Supabase credentials from environment
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

# Try alternative key name if first one doesn't exist
if not SUPABASE_SERVICE_KEY:
    SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("Error: Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables")
    print("Please ensure your .env.local file contains:")
    print("  NEXT_PUBLIC_SUPABASE_URL=your_supabase_url")
    print("  SUPABASE_SERVICE_KEY=your_service_role_key")
    sys.exit(1)

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

print("🚀 Applying thumbnail_url migration to modules table...\n")

# Migration SQL
migration_sql = """
-- Add thumbnail_url column to modules table
ALTER TABLE public.modules 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.modules.thumbnail_url IS 'URL of the video thumbnail, automatically fetched for Loom videos';

-- Create index for performance when querying modules with thumbnails
CREATE INDEX IF NOT EXISTS idx_modules_thumbnail_url ON public.modules(thumbnail_url) WHERE thumbnail_url IS NOT NULL;
"""

try:
    # Execute the migration
    result = supabase.postgrest.rpc('exec_sql', {'sql': migration_sql}).execute()
    print("❌ Direct SQL execution failed. This is expected if exec_sql function doesn't exist.")
    print("Trying alternative approach...\n")
except Exception as e:
    print(f"Note: Direct SQL execution not available: {e}")
    print("\nThe migration SQL has been created at:")
    print("supabase/migrations/20250117_add_thumbnail_url_to_modules.sql\n")

# Check if column exists using a query
try:
    # Try to select the column - if it exists, this will work
    result = supabase.table('modules').select('id, thumbnail_url').limit(1).execute()
    print("✅ Success! The thumbnail_url column already exists in the modules table.")
    print("\nYou can now run the thumbnail fetch script:")
    print("node scripts/fetch-existing-loom-thumbnails.js")
except Exception as e:
    error_message = str(e)
    if 'thumbnail_url' in error_message:
        print("❌ The thumbnail_url column does not exist yet.\n")
        print("Please apply the migration using one of these methods:\n")
        print("1. Supabase Dashboard:")
        print("   - Go to your Supabase dashboard")
        print("   - Navigate to SQL Editor")
        print("   - Paste and run the contents of:")
        print("   supabase/migrations/20250117_add_thumbnail_url_to_modules.sql\n")
        print("2. Supabase CLI (if linked):")
        print("   npx supabase db push --linked\n")
        print("3. Local development (requires Docker):")
        print("   npx supabase start")
        print("   npx supabase db push")
    else:
        print(f"Error checking column: {e}")

print("\n" + "="*50)
print("Migration SQL saved at:")
print("supabase/migrations/20250117_add_thumbnail_url_to_modules.sql")
print("="*50) 