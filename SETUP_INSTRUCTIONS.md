# RemoteOps Setup Instructions

## Features Implemented

### 1. Apex AI Chat with RAG
- **OpenAI Integration**: Chat interface with GPT-4 for strategic operations advice
- **RAG System**: Supabase Vector database for knowledge base search
- **Conversation Management**: Save and retrieve chat history
- **Streaming Responses**: Real-time AI responses with streaming

### 2. Video Player
- **Custom Video Player**: Built with react-player
- **Progress Tracking**: Automatic save of viewing progress
- **Advanced Controls**: Play/pause, seek, volume, fullscreen, skip forward/back
- **Module Completion**: Marks modules complete when 90% viewed

## Setup Instructions

### 1. Environment Variables
Add these to your `.env.local` file:
```
OPENAI_API_KEY=your_openai_api_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 2. Database Setup
Run the migrations in your Supabase SQL editor:

1. **AI Chat Schema** (`supabase/migrations/001_apex_ai_chat.sql`)
   - Enables vector extension
   - Creates conversations and messages tables
   - Sets up knowledge base with vector embeddings
   - Configures RLS policies

2. **Video Streaming Schema** (`supabase/migrations/002_video_streaming.sql`)
   - Creates video_assets table for metadata
   - Creates video_progress tracking
   - Sets up progress update function
   - Configures RLS policies

### 3. Supabase Storage
Create a storage bucket named `videos` in your Supabase dashboard:
```sql
INSERT INTO storage.buckets (id, name, public) VALUES ('videos', 'videos', false);
```

### 4. Knowledge Base Setup
To populate the RAG knowledge base, you'll need to:
1. Generate embeddings for your content using OpenAI
2. Insert them into the knowledge_base table
3. Example script:
```javascript
const embedding = await openai.embeddings.create({
  model: 'text-embedding-ada-002',
  input: 'Your knowledge content here',
});

await supabase.from('knowledge_base').insert({
  content: 'Your knowledge content here',
  embedding: embedding.data[0].embedding,
  metadata: { category: 'operations', topic: 'team-management' }
});
```

### 5. Video Upload
For production:
1. Upload videos to Supabase Storage `videos` bucket
2. Create video_assets records with the storage path
3. The video player will generate signed URLs automatically

Currently using a demo video URL for testing.

## Usage

### AI Chat
- Navigate to `/chat`
- Start a new conversation or select existing
- Ask questions about remote operations, team management, or strategy
- Conversations are saved automatically

### Video Player
- Navigate to any course module
- Video progress saves automatically every 10 seconds
- Module marked complete at 90% watched
- Progress syncs across devices

## API Endpoints

### Chat
- `POST /api/chat` - Send messages and get AI responses
- `GET /api/conversations` - List user conversations
- `DELETE /api/conversations?id=` - Delete a conversation

### Video
- `GET /api/video/[id]` - Get video URL and metadata
- `POST /api/video-progress` - Update viewing progress
- `GET /api/modules/[id]/video-asset` - Get video asset for module

## Next Steps

1. **Production Video Storage**: Upload actual course videos to Supabase
2. **Knowledge Base Content**: Populate with RemoteOps-specific content
3. **AI Fine-tuning**: Customize system prompts for your use case
4. **Analytics**: Add viewing analytics and engagement metrics
5. **Offline Support**: Implement video download for offline viewing