-- Verify that the tables were created correctly
-- Run this script in the Supabase SQL Editor after running create_vector_tables.sql

-- Check if vector extension is enabled
SELECT name, default_version, installed_version 
FROM pg_available_extensions 
WHERE name = 'vector';

-- Check table structure for prospect_vectors
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'prospect_vectors'
ORDER BY ordinal_position;

-- Check table structure for conversation_vectors  
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'conversation_vectors'
ORDER BY ordinal_position;

-- Check indexes
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('prospect_vectors', 'conversation_vectors')
ORDER BY tablename, indexname;

-- Check functions
SELECT 
    routine_name,
    routine_type,
    data_type
FROM information_schema.routines 
WHERE routine_name IN ('match_prospects', 'analyze_conversation_patterns');

-- Check RLS policies
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE tablename IN ('prospect_vectors', 'conversation_vectors')
ORDER BY tablename, policyname;

-- Test inserting sample data (optional)
-- INSERT INTO prospect_vectors (conversation_id, profile_text, business_type, revenue_info, challenges, conversation_stage)
-- VALUES ('test-conv-1', 'Sample profile text', 'SaaS', '$1M ARR', 'Scaling issues', 'qualification');

-- INSERT INTO conversation_vectors (conversation_id, user_message, agent_response, response_effectiveness)
-- VALUES ('test-conv-1', 'Hello, I need help with my business', 'How can I assist you today?', 8);

-- Count records (should be 0 initially unless you inserted sample data)
SELECT 'prospect_vectors' as table_name, COUNT(*) as record_count FROM prospect_vectors
UNION ALL
SELECT 'conversation_vectors' as table_name, COUNT(*) as record_count FROM conversation_vectors;