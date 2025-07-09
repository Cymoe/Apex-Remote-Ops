-- Complete Setup Script for RemoteOps
-- Run this entire script in your Supabase SQL Editor

-- ========================================
-- 1. ENABLE VECTOR EXTENSION
-- ========================================
create extension if not exists vector;

-- ========================================
-- 2. CREATE AI CHAT TABLES
-- ========================================
-- Conversations table
create table if not exists public.conversations (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Messages table
create table if not exists public.messages (
  id uuid default gen_random_uuid() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Knowledge base for RAG
create table if not exists public.knowledge_base (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  metadata jsonb,
  embedding vector(1536),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for vector similarity search
create index if not exists idx_knowledge_base_embedding on public.knowledge_base using ivfflat (embedding vector_cosine_ops) with (lists = 100);

-- ========================================
-- 3. CREATE VIDEO TABLES
-- ========================================
-- Video assets table
create table if not exists public.video_assets (
  id uuid default gen_random_uuid() primary key,
  module_id uuid references public.modules(id) on delete cascade not null,
  storage_path text not null,
  duration_seconds integer,
  resolution text,
  file_size_bytes bigint,
  mime_type text default 'video/mp4',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Video progress tracking
create table if not exists public.video_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  video_asset_id uuid references public.video_assets(id) on delete cascade not null,
  progress_seconds integer default 0,
  completed boolean default false,
  last_watched_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, video_asset_id)
);

-- ========================================
-- 4. CREATE USER PROFILES TABLE
-- ========================================
create table if not exists public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  username text unique,
  full_name text,
  bio text,
  avatar_url text,
  company text,
  job_title text,
  location text,
  website text,
  linkedin_url text,
  twitter_url text,
  skills text[],
  interests text[],
  timezone text default 'UTC',
  email_notifications boolean default true,
  marketing_emails boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add username constraint
DO $$ 
BEGIN 
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'username_format'
  ) THEN
    alter table public.profiles
    add constraint username_format check (
      username ~ '^[a-z0-9_-]{3,30}$'
    );
  END IF;
END $$;

-- Create index for username lookups
create index if not exists idx_profiles_username on public.profiles(username);

-- ========================================
-- 5. ENABLE ROW LEVEL SECURITY
-- ========================================
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.video_assets enable row level security;
alter table public.video_progress enable row level security;
alter table public.profiles enable row level security;

-- ========================================
-- 6. CREATE POLICIES
-- ========================================
-- Conversations policies
create policy "Users can view own conversations" on public.conversations for select using (auth.uid() = user_id);
create policy "Users can create own conversations" on public.conversations for insert with check (auth.uid() = user_id);
create policy "Users can update own conversations" on public.conversations for update using (auth.uid() = user_id);
create policy "Users can delete own conversations" on public.conversations for delete using (auth.uid() = user_id);

-- Messages policies
create policy "Users can view messages in own conversations" on public.messages for select
using (exists (select 1 from public.conversations where conversations.id = messages.conversation_id and conversations.user_id = auth.uid()));

create policy "Users can create messages in own conversations" on public.messages for insert
with check (exists (select 1 from public.conversations where conversations.id = messages.conversation_id and conversations.user_id = auth.uid()));

-- Knowledge base policies
create policy "Users can read knowledge base" on public.knowledge_base for select using (auth.uid() is not null);

-- Video assets policies
create policy "Authenticated users can view video assets" on public.video_assets for select using (auth.uid() is not null);

-- Video progress policies
create policy "Users can view own video progress" on public.video_progress for select using (auth.uid() = user_id);
create policy "Users can create own video progress" on public.video_progress for insert with check (auth.uid() = user_id);
create policy "Users can update own video progress" on public.video_progress for update using (auth.uid() = user_id);

-- Profiles policies
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile" on public.profiles for update using (auth.uid() = id);

-- ========================================
-- 7. CREATE FUNCTIONS
-- ========================================
-- Function to search similar content
create or replace function match_knowledge(
  query_embedding vector(1536),
  match_threshold float,
  match_count int
)
returns table (
  id uuid,
  content text,
  metadata jsonb,
  similarity float
)
language sql stable
as $$
  select
    id,
    content,
    metadata,
    1 - (knowledge_base.embedding <=> query_embedding) as similarity
  from knowledge_base
  where 1 - (knowledge_base.embedding <=> query_embedding) > match_threshold
  order by similarity desc
  limit match_count;
$$;

-- Function to update video progress
create or replace function update_video_progress(
  p_video_asset_id uuid,
  p_progress_seconds integer
)
returns void
language plpgsql
security definer
as $$
declare
  v_duration integer;
begin
  select duration_seconds into v_duration
  from public.video_assets
  where id = p_video_asset_id;

  insert into public.video_progress (
    user_id,
    video_asset_id,
    progress_seconds,
    completed,
    last_watched_at,
    updated_at
  )
  values (
    auth.uid(),
    p_video_asset_id,
    p_progress_seconds,
    p_progress_seconds >= v_duration * 0.9,
    now(),
    now()
  )
  on conflict (user_id, video_asset_id)
  do update set
    progress_seconds = excluded.progress_seconds,
    completed = excluded.completed,
    last_watched_at = excluded.last_watched_at,
    updated_at = excluded.updated_at;
end;
$$;

-- Function to handle new user creation
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

-- Function to check username availability
create or replace function public.is_username_available(username text)
returns boolean as $$
begin
  return not exists (
    select 1 from public.profiles
    where profiles.username = is_username_available.username
  );
end;
$$ language plpgsql security definer;

-- Function to set updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- ========================================
-- 8. CREATE TRIGGERS
-- ========================================
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.set_updated_at();

-- ========================================
-- 9. CREATE STORAGE BUCKETS
-- ========================================
insert into storage.buckets (id, name, public) 
values ('videos', 'videos', false), ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- ========================================
-- 10. SAMPLE DATA - ADD YOUR LOOM VIDEOS HERE!
-- ========================================
-- First, let's see what modules you have:
SELECT id, title, slug, course_id FROM modules ORDER BY course_id, order_index;

-- ========================================
-- HOW TO ADD YOUR LOOM VIDEOS:
-- ========================================
-- For each Loom video you have:
-- 1. Get the Loom share URL (e.g., https://www.loom.com/share/abc123)
-- 2. Convert to embed URL: https://www.loom.com/embed/abc123
-- 3. Insert into video_assets table

-- Example (uncomment and modify with your actual data):
/*
INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
-- Replace these with your actual module IDs and Loom embed URLs
('module-id-1', 'https://www.loom.com/embed/your-video-id-1', 600),
('module-id-2', 'https://www.loom.com/embed/your-video-id-2', 900),
('module-id-3', 'https://www.loom.com/embed/your-video-id-3', 1200);
*/

-- ========================================
-- FINAL MESSAGE
-- ========================================
SELECT 'Setup complete! Next steps:' as message
UNION ALL
SELECT '1. Add your Loom video URLs to the video_assets table above'
UNION ALL
SELECT '2. Add your OpenAI API key to .env.local'
UNION ALL
SELECT '3. Add your Supabase service role key to .env.local'
UNION ALL
SELECT '4. Restart your dev server (npm run dev)';