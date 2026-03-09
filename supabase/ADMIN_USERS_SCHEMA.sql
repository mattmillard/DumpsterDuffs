-- =====================================================
-- ADMIN USERS AUTHENTICATION SCHEMA
-- =====================================================
-- This schema creates the admin_users table for authenticated
-- administrators and sets up Row Level Security policies.
--
-- SETUP INSTRUCTIONS:
-- 1. Run this SQL in your Supabase SQL Editor
-- 2. Create your first admin user in Supabase Auth UI:
--    - Go to Authentication → Users → Add User
--    - Email: matt.millard@me.com
--    - Set a strong password
--    - Enable "Auto Confirm User"
-- 3. Copy the user's UUID from the Auth panel
-- 4. Run the INSERT statement at the bottom (replace the UUID)
-- =====================================================

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login TIMESTAMP WITH TIME ZONE,
  
  -- Constraints
  CONSTRAINT admin_users_role_check CHECK (role IN ('owner', 'admin', 'dispatcher'))
);

-- Create updated_at trigger function if it doesn't exist
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update updated_at
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- RLS Policy: Admin users can read their own profile
CREATE POLICY "admin_users_read_own" ON admin_users
  FOR SELECT 
  USING (auth.uid() = id);

-- RLS Policy: Admin users can update their own profile (except role and is_active)
CREATE POLICY "admin_users_update_own" ON admin_users
  FOR UPDATE 
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id 
    AND role = (SELECT role FROM admin_users WHERE id = auth.uid())
    AND is_active = (SELECT is_active FROM admin_users WHERE id = auth.uid())
  );

-- RLS Policy: Owners can read all admin users
CREATE POLICY "admin_users_read_all_owners" ON admin_users
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'owner'
      AND admin_users.is_active = true
    )
  );

-- RLS Policy: Owners can insert new admin users
CREATE POLICY "admin_users_insert_owners" ON admin_users
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'owner'
      AND admin_users.is_active = true
    )
  );

-- RLS Policy: Owners can update any admin user
CREATE POLICY "admin_users_update_all_owners" ON admin_users
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'owner'
      AND admin_users.is_active = true
    )
  );

-- RLS Policy: Owners can delete admin users (but not themselves)
CREATE POLICY "admin_users_delete_owners" ON admin_users
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.role = 'owner'
      AND admin_users.is_active = true
    )
    AND admin_users.id != auth.uid()
  );

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);
CREATE INDEX IF NOT EXISTS idx_admin_users_active ON admin_users(is_active);

-- =====================================================
-- INITIAL ADMIN USER SETUP
-- =====================================================
-- After creating a user in Supabase Auth panel:
-- 1. Copy the user's UUID
-- 2. Replace 'YOUR-USER-UUID-HERE' below
-- 3. Run this INSERT statement

/*
INSERT INTO admin_users (id, email, full_name, role, is_active)
VALUES (
  'YOUR-USER-UUID-HERE',  -- Replace with actual UUID from auth.users
  'matt.millard@me.com',
  'Matt Millard',
  'owner',
  true
);
*/

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================
-- Run these to verify setup:

-- Check if table exists and has correct structure
-- SELECT column_name, data_type, is_nullable 
-- FROM information_schema.columns 
-- WHERE table_name = 'admin_users';

-- View all admin users
-- SELECT id, email, full_name, role, is_active, created_at, last_login 
-- FROM admin_users;

-- Check RLS policies
-- SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
-- FROM pg_policies 
-- WHERE tablename = 'admin_users';
