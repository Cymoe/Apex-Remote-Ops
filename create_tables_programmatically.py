#!/usr/bin/env python3
"""
Create Supabase vector tables programmatically using the service role key.
This script uses the Supabase Python client to create the tables.
"""

import os
import sys
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get Supabase credentials from environment
SUPABASE_URL = os.getenv("NEXT_PUBLIC_SUPABASE_URL")
SUPABASE_SERVICE_KEY = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

if not SUPABASE_URL or not SUPABASE_SERVICE_KEY:
    print("Error: Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables")
    sys.exit(1)

# Create Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)

# SQL to create the tables
create_tables_sql = """
-- Enable the vector extension if not already enabled
CREATE EXTENSION IF NOT EXISTS vector;

-- Drop existing tables if they exist (be careful with this in production)
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
"""

# SQL to create indexes
create_indexes_sql = """
-- Create indexes for better performance
CREATE INDEX prospect_vectors_conversation_id_idx ON prospect_vectors(conversation_id);
CREATE INDEX prospect_vectors_business_type_idx ON prospect_vectors(business_type);
CREATE INDEX prospect_vectors_stage_idx ON prospect_vectors(conversation_stage);
CREATE INDEX conversation_vectors_conversation_id_idx ON conversation_vectors(conversation_id);
CREATE INDEX conversation_vectors_effectiveness_idx ON conversation_vectors(response_effectiveness);

-- Create vector similarity indexes for fast similarity search
CREATE INDEX prospect_vectors_embedding_idx ON prospect_vectors 
USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX conversation_vectors_message_embedding_idx ON conversation_vectors 
USING ivfflat (message_embedding vector_cosine_ops) WITH (lists = 100);

CREATE INDEX conversation_vectors_response_embedding_idx ON conversation_vectors 
USING ivfflat (response_embedding vector_cosine_ops) WITH (lists = 100);
"""

# SQL to create functions
create_functions_sql = """
-- Create function for prospect similarity matching
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

-- Create function for conversation pattern analysis
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
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_prospect_vectors_updated_at 
    BEFORE UPDATE ON prospect_vectors 
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
"""

# SQL to create RLS policies
create_rls_sql = """
-- Enable Row Level Security
ALTER TABLE prospect_vectors ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversation_vectors ENABLE ROW LEVEL SECURITY;

-- Allow service role to access all data
CREATE POLICY "Service role can access all prospect vectors" ON prospect_vectors
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can access all conversation vectors" ON conversation_vectors
    FOR ALL USING (auth.role() = 'service_role');

-- Allow authenticated users to read data
CREATE POLICY "Users can read prospect vectors" ON prospect_vectors
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Users can read conversation vectors" ON conversation_vectors
    FOR SELECT USING (auth.role() = 'authenticated');

-- Allow authenticated users to insert data
CREATE POLICY "Users can insert prospect vectors" ON prospect_vectors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can insert conversation vectors" ON conversation_vectors
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update data
CREATE POLICY "Users can update prospect vectors" ON prospect_vectors
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Grant necessary permissions
GRANT ALL ON prospect_vectors TO authenticated;
GRANT ALL ON conversation_vectors TO authenticated;
GRANT ALL ON prospect_vectors TO service_role;
GRANT ALL ON conversation_vectors TO service_role;
"""

def run_sql(sql_commands, description):
    """Run SQL commands and handle errors"""
    print(f"Running {description}...")
    try:
        result = supabase.rpc('sql', {'sql': sql_commands})
        print(f"✓ {description} completed successfully")
        return True
    except Exception as e:
        print(f"✗ Error in {description}: {e}")
        return False

def verify_tables():
    """Verify that tables were created correctly"""
    print("\nVerifying tables...")
    
    # Check if tables exist
    check_tables_sql = """
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('prospect_vectors', 'conversation_vectors');
    """
    
    try:
        result = supabase.rpc('sql', {'sql': check_tables_sql})
        if result.data:
            tables = [row['table_name'] for row in result.data]
            print(f"✓ Found tables: {tables}")
        else:
            print("✗ No tables found")
        return True
    except Exception as e:
        print(f"✗ Error verifying tables: {e}")
        return False

def main():
    """Main function to create tables"""
    print("Creating Supabase vector tables...")
    print(f"Supabase URL: {SUPABASE_URL}")
    
    # Run SQL commands in sequence
    steps = [
        (create_tables_sql, "table creation"),
        (create_indexes_sql, "index creation"),
        (create_functions_sql, "function creation"),
        (create_rls_sql, "RLS policy creation")
    ]
    
    success = True
    for sql, description in steps:
        if not run_sql(sql, description):
            success = False
            break
    
    if success:
        verify_tables()
        print("\n✓ All tables created successfully!")
        print("\nNext steps:")
        print("1. Go to your Supabase dashboard")
        print("2. Navigate to the Table Editor")
        print("3. You should see 'prospect_vectors' and 'conversation_vectors' tables")
    else:
        print("\n✗ Some operations failed. Check the errors above.")

if __name__ == "__main__":
    main()