-- Add fields for high-ticket sales qualification
ALTER TABLE applications 
-- Stage tracking
ADD COLUMN IF NOT EXISTS stage TEXT DEFAULT 'greeting',
-- Pain points and needs
ADD COLUMN IF NOT EXISTS pain_points TEXT,
-- Budget qualification
ADD COLUMN IF NOT EXISTS budget TEXT,
ADD COLUMN IF NOT EXISTS budget_flexibility TEXT,
-- Timeline and urgency
ADD COLUMN IF NOT EXISTS timeline TEXT,
ADD COLUMN IF NOT EXISTS urgency_level TEXT,
-- Decision factors
ADD COLUMN IF NOT EXISTS why_apex TEXT,
ADD COLUMN IF NOT EXISTS coachability TEXT,
-- Behavioral counters
ADD COLUMN IF NOT EXISTS evasion_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS low_effort_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS confusion_count INTEGER DEFAULT 0,
-- Qualification signals
ADD COLUMN IF NOT EXISTS shows_ownership BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS growth_mindset BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS warrior_story BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS is_decision_maker BOOLEAN DEFAULT FALSE;

-- Add check constraint for stage
ALTER TABLE applications 
DROP CONSTRAINT IF EXISTS valid_stage;

ALTER TABLE applications 
ADD CONSTRAINT valid_stage 
CHECK (stage IN ('greeting', 'establishing_authority', 'collecting_name', 'collecting_email', 
                 'needs_analysis', 'collecting_business', 'budget_qualification', 
                 'timeline_urgency', 'collecting_why', 'fit_assessment', 'qualifying', 'complete'));

-- Add check constraint for budget flexibility
ALTER TABLE applications
ADD CONSTRAINT valid_budget_flexibility
CHECK (budget_flexibility IN ('low', 'medium', 'high') OR budget_flexibility IS NULL);

-- Add check constraint for urgency level
ALTER TABLE applications
ADD CONSTRAINT valid_urgency_level
CHECK (urgency_level IN ('low', 'medium', 'high') OR urgency_level IS NULL);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_stage ON applications(stage);
CREATE INDEX IF NOT EXISTS idx_applications_qualification_score ON applications(qualification_score);
CREATE INDEX IF NOT EXISTS idx_applications_is_decision_maker ON applications(is_decision_maker);