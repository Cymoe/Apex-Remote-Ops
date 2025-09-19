-- Add has_full_name column to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS has_full_name BOOLEAN DEFAULT FALSE;

-- Update existing rows based on name content
UPDATE applications 
SET has_full_name = CASE 
    WHEN name IS NOT NULL AND name LIKE '% %' THEN TRUE
    ELSE FALSE
END
WHERE has_full_name IS NULL;