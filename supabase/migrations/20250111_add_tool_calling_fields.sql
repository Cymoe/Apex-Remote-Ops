-- Add fields for enhanced tool calling data
ALTER TABLE applications ADD COLUMN IF NOT EXISTS revenue_context text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS capital_context text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS special_circumstances text;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS key_factors text[];

-- Add tool calls tracking to conversations
ALTER TABLE application_conversations ADD COLUMN IF NOT EXISTS tool_calls jsonb;

-- Update qualification_scores table
ALTER TABLE qualification_scores ADD COLUMN IF NOT EXISTS decision_factors text[];