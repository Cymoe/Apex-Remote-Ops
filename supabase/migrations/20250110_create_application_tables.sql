-- Create applications table
CREATE TABLE IF NOT EXISTS applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Applicant info (collected during conversation)
  email TEXT,
  name TEXT,
  phone TEXT,
  location TEXT,
  
  -- Business info
  current_business TEXT,
  current_revenue TEXT,
  business_experience TEXT,
  
  -- Qualification
  status TEXT DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'qualified', 'rejected', 'scheduled', 'accepted')),
  qualification_score INTEGER DEFAULT 0,
  qualification_notes TEXT,
  
  -- Tracking
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  message_count INTEGER DEFAULT 0,
  
  -- Next steps
  calendar_link_sent BOOLEAN DEFAULT FALSE,
  nda_sent BOOLEAN DEFAULT FALSE,
  nda_signed BOOLEAN DEFAULT FALSE,
  call_scheduled_at TIMESTAMPTZ,
  
  -- Decision
  decision TEXT CHECK (decision IN ('accepted', 'rejected', 'waitlist')),
  decision_at TIMESTAMPTZ,
  decision_notes TEXT,
  
  -- Investment
  payment_status TEXT CHECK (payment_status IN ('pending', 'completed', 'failed')),
  payment_completed_at TIMESTAMPTZ
);

-- Create conversation messages table
CREATE TABLE IF NOT EXISTS application_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  user_message TEXT NOT NULL,
  agent_response TEXT NOT NULL,
  message_count INTEGER NOT NULL,
  
  -- Analysis
  sentiment_score DECIMAL,
  qualification_signals JSONB,
  
  FOREIGN KEY (conversation_id) REFERENCES applications(conversation_id) ON DELETE CASCADE
);

-- Create qualification scores table (for tracking scoring evolution)
CREATE TABLE IF NOT EXISTS qualification_scores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  score INTEGER NOT NULL,
  business_experience_score INTEGER,
  financial_readiness_score INTEGER,
  commitment_level_score INTEGER,
  program_fit_score INTEGER,
  
  notes TEXT,
  should_advance BOOLEAN DEFAULT FALSE,
  
  FOREIGN KEY (conversation_id) REFERENCES applications(conversation_id) ON DELETE CASCADE
);

-- Create indexes
CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_created_at ON applications(created_at);
CREATE INDEX idx_applications_conversation_id ON applications(conversation_id);
CREATE INDEX idx_conversations_conversation_id ON application_conversations(conversation_id);
CREATE INDEX idx_conversations_created_at ON application_conversations(created_at);

-- Enable RLS
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE application_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE qualification_scores ENABLE ROW LEVEL SECURITY;

-- Create function to update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for updated_at
CREATE TRIGGER update_applications_updated_at BEFORE UPDATE ON applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS Policies (admin only for now)
CREATE POLICY "Admin can view all applications" ON applications
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can view all conversations" ON application_conversations
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin can view all scores" ON qualification_scores
  FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Insert policies for the AI agent (using service role)
CREATE POLICY "Service role can insert applications" ON applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can update applications" ON applications
  FOR UPDATE USING (true);

CREATE POLICY "Service role can insert conversations" ON application_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Service role can insert scores" ON qualification_scores
  FOR INSERT WITH CHECK (true);