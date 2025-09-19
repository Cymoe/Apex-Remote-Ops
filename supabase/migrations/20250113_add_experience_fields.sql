-- Add experience and motivation fields to applications table
ALTER TABLE public.applications
ADD COLUMN IF NOT EXISTS experience TEXT,
ADD COLUMN IF NOT EXISTS why_location_independence TEXT,
ADD COLUMN IF NOT EXISTS current_situation TEXT,
ADD COLUMN IF NOT EXISTS biggest_challenge TEXT,
ADD COLUMN IF NOT EXISTS commitment TEXT,
ADD COLUMN IF NOT EXISTS shows_potential BOOLEAN DEFAULT FALSE;

-- Create indexes for the new fields
CREATE INDEX IF NOT EXISTS idx_applications_experience ON public.applications(experience);
CREATE INDEX IF NOT EXISTS idx_applications_why_location_independence ON public.applications(why_location_independence);
CREATE INDEX IF NOT EXISTS idx_applications_shows_potential ON public.applications(shows_potential);