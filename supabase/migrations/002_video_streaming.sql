-- Create video_assets table for video metadata
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

-- Create video_progress table for tracking user progress
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

-- Enable RLS
alter table public.video_assets enable row level security;
alter table public.video_progress enable row level security;

-- Policies for video_assets (read-only for authenticated users)
create policy "Authenticated users can view video assets"
  on public.video_assets for select
  using (auth.uid() is not null);

-- Policies for video_progress
create policy "Users can view own video progress"
  on public.video_progress for select
  using (auth.uid() = user_id);

create policy "Users can create own video progress"
  on public.video_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update own video progress"
  on public.video_progress for update
  using (auth.uid() = user_id);

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
  -- Get video duration
  select duration_seconds into v_duration
  from public.video_assets
  where id = p_video_asset_id;

  -- Insert or update progress
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
    p_progress_seconds >= v_duration * 0.9, -- Mark as completed if watched 90%
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

-- Storage bucket for videos (run this in Supabase dashboard)
-- insert into storage.buckets (id, name, public) values ('videos', 'videos', false);