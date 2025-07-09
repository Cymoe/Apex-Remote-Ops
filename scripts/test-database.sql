-- Test if tables exist
SELECT 
    'courses' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'courses') as exists
UNION ALL
SELECT 
    'modules' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'modules') as exists
UNION ALL
SELECT 
    'video_assets' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'video_assets') as exists
UNION ALL
SELECT 
    'video_progress' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'video_progress') as exists
UNION ALL
SELECT 
    'conversations' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'conversations') as exists
UNION ALL
SELECT 
    'messages' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'messages') as exists
UNION ALL
SELECT 
    'profiles' as table_name, 
    EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'profiles') as exists;