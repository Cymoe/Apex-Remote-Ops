-- Add thumbnail_url column to modules table
ALTER TABLE public.modules 
ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;

-- Add comment for documentation
COMMENT ON COLUMN public.modules.thumbnail_url IS 'URL of the video thumbnail, automatically fetched for Loom videos';

-- Create index for performance when querying modules with thumbnails
CREATE INDEX IF NOT EXISTS idx_modules_thumbnail_url ON public.modules(thumbnail_url) WHERE thumbnail_url IS NOT NULL; 