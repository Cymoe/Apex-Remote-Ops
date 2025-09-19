-- Add thumbnail_url column to modules table
ALTER TABLE public.modules 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Comment on the new column
COMMENT ON COLUMN public.modules.thumbnail_url IS 'URL to the thumbnail image for the module video'; 