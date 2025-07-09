-- Complete Setup Script for RemoteOps (Without Vector Extension)
-- Run this entire script in your Supabase SQL Editor

-- ========================================
-- 1. CREATE AI CHAT TABLES (Simplified)
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

-- Simplified knowledge base without vector embeddings
create table if not exists public.knowledge_base (
  id uuid default gen_random_uuid() primary key,
  content text not null,
  metadata jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ========================================
-- 2. CREATE VIDEO TABLES
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
-- 3. CREATE USER PROFILES TABLE
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

-- ========================================
-- 4. ENABLE ROW LEVEL SECURITY
-- ========================================
alter table public.conversations enable row level security;
alter table public.messages enable row level security;
alter table public.knowledge_base enable row level security;
alter table public.video_assets enable row level security;
alter table public.video_progress enable row level security;
alter table public.profiles enable row level security;

-- ========================================
-- 5. CREATE ALL POLICIES (Fixed)
-- ========================================
-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Users can view own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can create own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can update own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can delete own conversations" ON public.conversations;
DROP POLICY IF EXISTS "Users can view messages in own conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can create messages in own conversations" ON public.messages;
DROP POLICY IF EXISTS "Users can read knowledge base" ON public.knowledge_base;
DROP POLICY IF EXISTS "Authenticated users can view video assets" ON public.video_assets;
DROP POLICY IF EXISTS "Users can view own video progress" ON public.video_progress;
DROP POLICY IF EXISTS "Users can create own video progress" ON public.video_progress;
DROP POLICY IF EXISTS "Users can update own video progress" ON public.video_progress;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

-- Now create policies
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
-- 6. CREATE FUNCTIONS
-- ========================================
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

-- ========================================
-- 7. CREATE STORAGE BUCKETS
-- ========================================
insert into storage.buckets (id, name, public) 
values ('videos', 'videos', false), ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- ========================================
-- 8. CHECK YOUR MODULES
-- ========================================
SELECT 'Your existing modules:' as info;
SELECT id, title, slug, course_id FROM modules ORDER BY course_id, order_index;

-- ========================================
-- 9. ADD YOUR LOOM VIDEOS
-- ========================================
-- Now add your Loom videos using the module IDs from above
-- Example (replace with your actual module IDs and Loom URLs):

/*
INSERT INTO video_assets (module_id, storage_path, duration_seconds) VALUES
('your-module-id-1', 'https://www.loom.com/embed/your-loom-id-1', 600),
('your-module-id-2', 'https://www.loom.com/embed/your-loom-id-2', 900),
('your-module-id-3', 'https://www.loom.com/embed/your-loom-id-3', 1200);
*/

-- ========================================
-- DONE!
-- ========================================
SELECT 'Setup complete! Tables created successfully.' as status;