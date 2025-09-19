-- Add columns to track returning visitors
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS is_returning_visitor BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS previous_status TEXT,
ADD COLUMN IF NOT EXISTS previous_score INTEGER;