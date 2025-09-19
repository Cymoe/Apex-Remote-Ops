-- Update vector tables to match exact specifications
-- This migration updates the existing tables to the new structure

-- First, drop the existing tables if they exist
DROP TABLE IF EXISTS conversation_vectors CASCADE;
DROP TABLE IF EXISTS prospect_vectors CASCADE;

-- Create prospect_vectors table with exact specifications
CREATE TABLE prospect_vectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id TEXT NOT NULL,
    profile_text TEXT,
    embedding VECTOR(1536),
    business_type TEXT,
    revenue_info TEXT,
    challenges TEXT,
    conversation_stage TEXT,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create conversation_vectors table with exact specifications
CREATE TABLE conversation_vectors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id TEXT NOT NULL,
    user_message TEXT,
    agent_response TEXT,
    message_embedding VECTOR(1536),
    response_embedding VECTOR(1536),
    response_effectiveness INTEGER,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS prospect_vectors_conversation_id_idx ON prospect_vectors(conversation_id);
CREATE INDEX IF NOT EXISTS prospect_vectors_business_type_idx ON prospect_vectors(business_type);
CREATE INDEX IF NOT EXISTS prospect_vectors_stage_idx ON prospect_vectors(conversation_stage);
CREATE INDEX IF NOT EXISTS conversation_vectors_conversation_id_idx ON conversation_vectors(conversation_id);
CREATE INDEX IF NOT EXISTS conversation_vectors_effectiveness_idx ON conversation_vectors(response_effectiveness);

-- Create vector similarity indexes for fast similarity search
CREATE INDEX IF NOT EXISTS prospect_vectors_embedding_idx ON prospect_vectors 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS conversation_vectors_message_embedding_idx ON conversation_vectors 
USING ivfflat (message_embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS conversation_vectors_response_embedding_idx ON conversation_vectors 
USING ivfflat (response_embedding vector_cosine_ops) WITH (lists = 100);

-- Create function for prospect similarity matching (updated for new structure)
CREATE OR REPLACE FUNCTION match_prospects(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    conversation_id text,
    profile_text text,
    business_type text,
    revenue_info text,
    challenges text,
    conversation_stage text,
    metadata jsonb,
    similarity_score float
)
LANGUAGE sql STABLE
AS $$
    SELECT
        pv.conversation_id,
        pv.profile_text,
        pv.business_type,
        pv.revenue_info,
        pv.challenges,
        pv.conversation_stage,
        pv.metadata,
        1 - (pv.embedding <=> query_embedding) as similarity_score
    FROM prospect_vectors pv
    WHERE pv.embedding IS NOT NULL
      AND 1 - (pv.embedding <=> query_embedding) > match_threshold
    ORDER BY pv.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Create function for conversation pattern analysis (updated for new structure)
CREATE OR REPLACE FUNCTION analyze_conversation_patterns(
    target_conversation_id text,
    similarity_threshold float DEFAULT 0.8,
    pattern_count int DEFAULT 10
)
RETURNS TABLE (
    conversation_id text,
    user_message text,
    agent_response text,
    response_effectiveness integer,
    similarity_score float,
    metadata jsonb
)
LANGUAGE sql STABLE
AS $$
    SELECT
        cv.conversation_id,
        cv.user_message,
        cv.agent_response,
        cv.response_effectiveness,
        1 - (cv.message_embedding <=> target_embedding.message_embedding) as similarity_score,
        cv.metadata
    FROM conversation_vectors cv,
         (SELECT message_embedding FROM conversation_vectors WHERE conversation_id = target_conversation_id ORDER BY created_at DESC LIMIT 1) as target_embedding
    WHERE cv.conversation_id != target_conversation_id
      AND cv.message_embedding IS NOT NULL
      AND target_embedding.message_embedding IS NOT NULL
      AND 1 - (cv.message_embedding <=> target_embedding.message_embedding) > similarity_threshold
    ORDER BY cv.message_embedding <=> target_embedding.message_embedding
    LIMIT pattern_count;
$$;

-- Create trigger to automatically update updated_at timestamp for prospect_vectors
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_prospect_vectors_updated_at 
    BEFORE UPDATE ON prospect_vectors 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- RLS (Row Level Security) policies
ALTER TABLE prospect_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_vectors ENABLE ROW LEVEL SECURITY;

-- Allow service role to access all data
CREATE POLICY "Service role can access all prospect vectors" ON prospect_vectors
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access all conversation vectors" ON conversation_vectors
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read their own data (if they have matching conversation_id)
CREATE POLICY "Users can read prospect vectors" ON prospect_vectors
    FOR SELECT USING (true);

CREATE POLICY "Users can read conversation vectors" ON conversation_vectors
    FOR SELECT USING (true);

-- Allow authenticated users to insert their own data
CREATE POLICY "Users can insert prospect vectors" ON prospect_vectors
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can insert conversation vectors" ON conversation_vectors
    FOR INSERT WITH CHECK (true);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update prospect vectors" ON prospect_vectors
    FOR UPDATE USING (true);

CREATE POLICY "Users can update conversation vectors" ON conversation_vectors
    FOR UPDATE USING (true);