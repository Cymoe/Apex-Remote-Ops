-- Add vector embeddings support for APEX Knowledge Graph
-- This enables semantic similarity search for prospect intelligence

-- Enable the vector extension (pgvector)
CREATE EXTENSION IF NOT EXISTS vector;

-- Create prospect_vectors table for semantic prospect profiles
CREATE TABLE IF NOT EXISTS prospect_vectors (
    id BIGSERIAL PRIMARY KEY,
    conversation_id uuid REFERENCES applications(conversation_id),
    profile_text text NOT NULL,
    embedding vector(1536), -- OpenAI text-embedding-3-small dimension
    business_type text,
    revenue_info text,
    challenges text,
    conversation_stage text,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Create conversation_vectors table for conversation pattern analysis
CREATE TABLE IF NOT EXISTS conversation_vectors (
    id BIGSERIAL PRIMARY KEY,
    conversation_id uuid REFERENCES applications(conversation_id),
    conversation_text text NOT NULL,
    embedding vector(1536),
    effectiveness_score integer DEFAULT 0,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS prospect_vectors_conversation_id_idx ON prospect_vectors(conversation_id);
CREATE INDEX IF NOT EXISTS prospect_vectors_business_type_idx ON prospect_vectors(business_type);
CREATE INDEX IF NOT EXISTS prospect_vectors_stage_idx ON prospect_vectors(conversation_stage);
CREATE INDEX IF NOT EXISTS conversation_vectors_conversation_id_idx ON conversation_vectors(conversation_id);
CREATE INDEX IF NOT EXISTS conversation_vectors_effectiveness_idx ON conversation_vectors(effectiveness_score);

-- Create vector similarity index for fast similarity search
CREATE INDEX IF NOT EXISTS prospect_vectors_embedding_idx ON prospect_vectors 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX IF NOT EXISTS conversation_vectors_embedding_idx ON conversation_vectors 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

-- Create function for prospect similarity matching
CREATE OR REPLACE FUNCTION match_prospects(
    query_embedding vector(1536),
    match_threshold float DEFAULT 0.7,
    match_count int DEFAULT 5
)
RETURNS TABLE (
    conversation_id uuid,
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
    WHERE 1 - (pv.embedding <=> query_embedding) > match_threshold
    ORDER BY pv.embedding <=> query_embedding
    LIMIT match_count;
$$;

-- Create function for conversation pattern analysis
CREATE OR REPLACE FUNCTION analyze_conversation_patterns(
    target_conversation_id uuid,
    similarity_threshold float DEFAULT 0.8,
    pattern_count int DEFAULT 10
)
RETURNS TABLE (
    conversation_id uuid,
    conversation_text text,
    effectiveness_score integer,
    similarity_score float,
    metadata jsonb
)
LANGUAGE sql STABLE
AS $$
    SELECT
        cv.conversation_id,
        cv.conversation_text,
        cv.effectiveness_score,
        1 - (cv.embedding <=> target_embedding.embedding) as similarity_score,
        cv.metadata
    FROM conversation_vectors cv,
         (SELECT embedding FROM conversation_vectors WHERE conversation_id = target_conversation_id ORDER BY created_at DESC LIMIT 1) as target_embedding
    WHERE cv.conversation_id != target_conversation_id
      AND 1 - (cv.embedding <=> target_embedding.embedding) > similarity_threshold
    ORDER BY cv.embedding <=> target_embedding.embedding
    LIMIT pattern_count;
$$;

-- Create view for prospect intelligence dashboard
CREATE OR REPLACE VIEW prospect_intelligence_dashboard AS
SELECT
    a.conversation_id,
    a.name,
    a.email,
    a.status,
    a.qualification_score,
    pv.business_type,
    pv.revenue_info,
    pv.challenges,
    pv.conversation_stage,
    COUNT(cv.id) as conversation_count,
    AVG(cv.effectiveness_score) as avg_effectiveness,
    MAX(cv.created_at) as last_conversation_at
FROM applications a
LEFT JOIN prospect_vectors pv ON a.conversation_id = pv.conversation_id
LEFT JOIN conversation_vectors cv ON a.conversation_id = cv.conversation_id
WHERE a.created_at >= NOW() - INTERVAL '30 days'
GROUP BY a.conversation_id, a.name, a.email, a.status, a.qualification_score, 
         pv.business_type, pv.revenue_info, pv.challenges, pv.conversation_stage
ORDER BY a.created_at DESC;

-- Create trigger to automatically update updated_at timestamp
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

-- Allow authenticated users to read their own data
CREATE POLICY "Users can read their own prospect vectors" ON prospect_vectors
    FOR SELECT USING (
        conversation_id IN (
            SELECT conversation_id FROM applications 
            WHERE email = auth.email()
        )
    );

CREATE POLICY "Users can read their own conversation vectors" ON conversation_vectors
    FOR SELECT USING (
        conversation_id IN (
            SELECT conversation_id FROM applications 
            WHERE email = auth.email()
        )
    );