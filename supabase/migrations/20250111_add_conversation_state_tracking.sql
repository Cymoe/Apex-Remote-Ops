-- Add conversation state tracking to applications table
ALTER TABLE applications ADD COLUMN IF NOT EXISTS conversation_state jsonb DEFAULT '{}'::jsonb;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS current_stage text DEFAULT 'greeting';
ALTER TABLE applications ADD COLUMN IF NOT EXISTS attempt_counts jsonb DEFAULT '{}'::jsonb;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS conversation_flags jsonb DEFAULT '{}'::jsonb;
ALTER TABLE applications ADD COLUMN IF NOT EXISTS collected_data jsonb DEFAULT '{}'::jsonb;

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_applications_conversation_id ON applications(conversation_id);
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_current_stage ON applications(current_stage);

-- Add stage tracking to application_conversations
ALTER TABLE application_conversations ADD COLUMN IF NOT EXISTS stage text;
ALTER TABLE application_conversations ADD COLUMN IF NOT EXISTS extracted_data jsonb DEFAULT '{}'::jsonb;
ALTER TABLE application_conversations ADD COLUMN IF NOT EXISTS validation_result jsonb DEFAULT '{}'::jsonb;

-- Create a function to update conversation state
CREATE OR REPLACE FUNCTION update_conversation_state(
  p_conversation_id uuid,
  p_stage text,
  p_collected_data jsonb,
  p_attempt_counts jsonb,
  p_flags jsonb
) RETURNS void AS $$
BEGIN
  UPDATE applications
  SET 
    current_stage = p_stage,
    collected_data = p_collected_data,
    attempt_counts = p_attempt_counts,
    conversation_flags = p_flags,
    conversation_state = jsonb_build_object(
      'stage', p_stage,
      'collectedData', p_collected_data,
      'attemptCounts', p_attempt_counts,
      'flags', p_flags,
      'lastUpdateTime', now()
    ),
    last_message_at = now()
  WHERE conversation_id = p_conversation_id;
END;
$$ LANGUAGE plpgsql;

-- Create view for conversation analytics
CREATE OR REPLACE VIEW conversation_analytics AS
SELECT
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as total_conversations,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_count,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_count,
  COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_count,
  AVG(qualification_score) as avg_qualification_score,
  AVG(message_count) as avg_message_count,
  COUNT(CASE WHEN is_returning_visitor = true THEN 1 END) as returning_visitors
FROM applications
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date DESC;

-- Create view for stage conversion funnel
CREATE OR REPLACE VIEW stage_conversion_funnel AS
SELECT
  current_stage,
  COUNT(*) as count,
  COUNT(CASE WHEN status = 'qualified' THEN 1 END) as qualified_from_stage,
  COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejected_from_stage
FROM applications
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY current_stage
ORDER BY 
  CASE current_stage
    WHEN 'greeting' THEN 1
    WHEN 'collecting_name' THEN 2
    WHEN 'collecting_email' THEN 3
    WHEN 'qualifying_revenue' THEN 4
    WHEN 'qualifying_capital' THEN 5
    WHEN 'qualifying_time' THEN 6
    WHEN 'qualifying_reason' THEN 7
    WHEN 'transformation_questions' THEN 8
    WHEN 'price_discussion' THEN 9
    WHEN 'closing' THEN 10
  END;