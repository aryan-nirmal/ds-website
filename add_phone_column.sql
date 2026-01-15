-- Add phone column to profiles table if it doesn't exist
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Optional: Update RLS policies to ensure it can be written to
-- (Existing policies probably cover 'all rows' or 'all columns' but good to be safe)
-- The insert policy we discussed earlier:
-- create policy "Users can insert their own profile" on profiles for insert with check ( auth.uid() = id );
-- This usually allows all columns unless specific column-level privileges are set (uncommon in default Supabase setup).

-- Verify checking:
-- SELECT * FROM profiles LIMIT 1;
