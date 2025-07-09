-- Create user profiles table
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

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Function to handle user creation
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

-- Trigger to create profile on signup
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

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

-- Add constraint to ensure usernames are lowercase and valid
alter table public.profiles
add constraint username_format check (
  username ~ '^[a-z0-9_-]{3,30}$'
);

-- Create index for username lookups
create index idx_profiles_username on public.profiles(username);

-- Update trigger for updated_at
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row
  execute procedure public.set_updated_at();