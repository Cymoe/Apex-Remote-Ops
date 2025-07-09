-- Add tagline column to modules table
ALTER TABLE public.modules 
ADD COLUMN IF NOT EXISTS tagline VARCHAR(255);

-- Add comment for documentation
COMMENT ON COLUMN public.modules.tagline IS 'Brief one-line summary of the module content';

-- Update RLS policies to include the new column (if needed)
-- The existing policies should already cover this since they use SELECT *