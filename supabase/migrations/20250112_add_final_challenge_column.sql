-- Add is_final_challenge column to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS is_final_challenge BOOLEAN DEFAULT FALSE;

-- Update existing rows to false
UPDATE applications 
SET is_final_challenge = FALSE
WHERE is_final_challenge IS NULL;