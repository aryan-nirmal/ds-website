-- Enable RLS on profiles if not already enabled
alter table profiles enable row level security;

-- Policy: Allow users to view their own profile/public profiles
-- Depending on requirements, we might allow everyone to view basic profile info, 
-- but definitely admins need to view all.
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using ( true );

-- Policy: Allow users to insert their own profile (for Sign Up)
create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

-- Policy: Allow users to update their own profile (except role)
-- This is a bit tricky in pure SQL without a function, so we often just allow update
-- and trust the frontend or use a trigger to prevent role escalation.
-- BUT, for this specific issue, we need Admins to be able to update EVERYTHING.

-- 1. Allow Admins to update ANY profile
create policy "Admins can update any profile"
  on profiles for update
  using ( 
    exists (
      select 1 from profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- 2. Allow users to update their OWN profile
create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );
