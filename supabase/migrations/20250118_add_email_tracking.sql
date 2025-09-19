-- Create email_logs table for tracking all sent emails
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Email details
  to_email TEXT NOT NULL,
  from_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  type TEXT NOT NULL, -- application_received, application_approved, etc.
  
  -- Status tracking
  status TEXT NOT NULL CHECK (status IN ('sent', 'failed', 'queued', 'bounced')),
  resend_id TEXT, -- ID from Resend API
  error TEXT,
  
  -- Metadata
  metadata JSONB DEFAULT '{}',
  
  -- Engagement tracking
  opened_at TIMESTAMPTZ,
  clicked_at TIMESTAMPTZ,
  unsubscribed_at TIMESTAMPTZ,
  
  -- Indexes for performance
  CONSTRAINT email_logs_type_check CHECK (type IN (
    'application_received',
    'application_approved', 
    'application_rejected',
    'payment_confirmation',
    'welcome_sequence',
    'nurture_campaign',
    'custom'
  ))
);

-- Create indexes for common queries
CREATE INDEX idx_email_logs_to_email ON email_logs(to_email);
CREATE INDEX idx_email_logs_type ON email_logs(type);
CREATE INDEX idx_email_logs_status ON email_logs(status);
CREATE INDEX idx_email_logs_created_at ON email_logs(created_at DESC);
CREATE INDEX idx_email_logs_resend_id ON email_logs(resend_id);

-- Create email_preferences table for managing unsubscribes
CREATE TABLE IF NOT EXISTS email_preferences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Subscription preferences
  unsubscribed_all BOOLEAN DEFAULT FALSE,
  unsubscribed_marketing BOOLEAN DEFAULT FALSE,
  unsubscribed_at TIMESTAMPTZ,
  
  -- Communication preferences
  receive_updates BOOLEAN DEFAULT TRUE,
  receive_newsletters BOOLEAN DEFAULT TRUE,
  receive_promotions BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  unsubscribe_reason TEXT,
  resubscribed_at TIMESTAMPTZ
);

CREATE INDEX idx_email_preferences_email ON email_preferences(email);

-- Create email_queue table for scheduled sends
CREATE TABLE IF NOT EXISTS email_queue (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Schedule info
  scheduled_for TIMESTAMPTZ NOT NULL,
  send_after TIMESTAMPTZ,
  
  -- Email details
  to_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_type TEXT NOT NULL,
  template_data JSONB DEFAULT '{}',
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'sent', 'failed', 'cancelled')),
  attempts INTEGER DEFAULT 0,
  last_attempt_at TIMESTAMPTZ,
  sent_at TIMESTAMPTZ,
  error TEXT,
  
  -- Reference to sent email
  email_log_id UUID REFERENCES email_logs(id)
);

CREATE INDEX idx_email_queue_status ON email_queue(status);
CREATE INDEX idx_email_queue_scheduled_for ON email_queue(scheduled_for);
CREATE INDEX idx_email_queue_to_email ON email_queue(to_email);

-- Function to check if email should be sent (not unsubscribed)
CREATE OR REPLACE FUNCTION can_send_email(
  recipient_email TEXT,
  email_type TEXT
) RETURNS BOOLEAN AS $$
DECLARE
  prefs RECORD;
BEGIN
  SELECT * INTO prefs FROM email_preferences WHERE email = recipient_email;
  
  IF prefs IS NULL THEN
    RETURN TRUE; -- No preferences = can send
  END IF;
  
  IF prefs.unsubscribed_all THEN
    RETURN FALSE;
  END IF;
  
  -- Check specific preferences based on email type
  IF email_type IN ('welcome_sequence', 'nurture_campaign') AND prefs.unsubscribed_marketing THEN
    RETURN FALSE;
  END IF;
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

-- Function to log email opens (for webhook from Resend)
CREATE OR REPLACE FUNCTION log_email_opened(
  p_resend_id TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE email_logs 
  SET opened_at = NOW() 
  WHERE resend_id = p_resend_id AND opened_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Function to log email clicks (for webhook from Resend)
CREATE OR REPLACE FUNCTION log_email_clicked(
  p_resend_id TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE email_logs 
  SET clicked_at = NOW() 
  WHERE resend_id = p_resend_id AND clicked_at IS NULL;
END;
$$ LANGUAGE plpgsql;

-- Enable RLS
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_queue ENABLE ROW LEVEL SECURITY;

-- Policies for admin access (adjust based on your auth setup)
CREATE POLICY "Admins can view all email logs" ON email_logs
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Users can view their own email preferences" ON email_preferences
  FOR SELECT USING (email = auth.jwt() ->> 'email');

CREATE POLICY "Users can update their own email preferences" ON email_preferences
  FOR UPDATE USING (email = auth.jwt() ->> 'email');