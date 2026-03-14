-- Booking Operations Schema for Dumpster Duff's
-- Run this in Supabase SQL Editor to set up the booking calendar system

-- ============================================================================
-- TABLE: bookings (enhance existing or create if missing)
-- ============================================================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Customer information
  customer_name TEXT NOT NULL,
  customer_email TEXT,
  customer_phone TEXT NOT NULL,
  customer_company TEXT,
  
  -- Booking details
  size_yards INTEGER NOT NULL,
  delivery_date DATE NOT NULL,
  return_date DATE NOT NULL,
  delivery_address_line_1 TEXT NOT NULL,
  delivery_address_line_2 TEXT,
  delivery_city TEXT NOT NULL,
  delivery_state TEXT NOT NULL DEFAULT 'MO',
  delivery_zip TEXT NOT NULL,
  placement_notes TEXT,
  
  -- Pricing
  subtotal DECIMAL(10,2) NOT NULL,
  delivery_fee DECIMAL(10,2) DEFAULT 0,
  tax DECIMAL(10,2) DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL,
  
  -- Payment
  payment_status TEXT DEFAULT 'pending',
  payment_intent_id TEXT,
  
  -- Status
  status TEXT NOT NULL DEFAULT 'pending',
  cancellation_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS bookings_delivery_date_idx ON bookings(delivery_date);
CREATE INDEX IF NOT EXISTS bookings_return_date_idx ON bookings(return_date);
CREATE INDEX IF NOT EXISTS bookings_status_idx ON bookings(status);
CREATE INDEX IF NOT EXISTS bookings_customer_phone_idx ON bookings(customer_phone);
CREATE INDEX IF NOT EXISTS bookings_customer_email_idx ON bookings(customer_email);

-- ============================================================================
-- TABLE: booking_blocked_dates
-- ============================================================================
CREATE TABLE IF NOT EXISTS booking_blocked_dates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  date DATE NOT NULL,
  size_yards INTEGER, -- NULL means block all sizes
  reason TEXT,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX IF NOT EXISTS blocked_dates_date_active_idx ON booking_blocked_dates(date, is_active);
CREATE INDEX IF NOT EXISTS blocked_dates_size_idx ON booking_blocked_dates(size_yards);

-- ============================================================================
-- TABLE: booking_internal_reservations
-- ============================================================================
CREATE TABLE IF NOT EXISTS booking_internal_reservations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  size_yards INTEGER NOT NULL,
  start_date DATE NOT NULL,
  pickup_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'picked_up', 'pickup_missed')),

  notes TEXT,
  pickup_notes TEXT,
  pickup_confirmed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT,

  CONSTRAINT booking_internal_reservations_pickup_after_start CHECK (pickup_date >= start_date)
);

CREATE INDEX IF NOT EXISTS booking_internal_reservations_active_idx
  ON booking_internal_reservations(status, pickup_date);
CREATE INDEX IF NOT EXISTS booking_internal_reservations_range_idx
  ON booking_internal_reservations(start_date, pickup_date, size_yards);

-- ============================================================================
-- TABLE: booking_blacklist
-- ============================================================================
CREATE TABLE IF NOT EXISTS booking_blacklist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  entry_type TEXT NOT NULL CHECK (entry_type IN ('phone', 'email', 'name', 'address')),
  value TEXT NOT NULL,
  normalized_value TEXT NOT NULL, -- Cleaned version for matching
  reason TEXT,
  is_active BOOLEAN DEFAULT true,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX IF NOT EXISTS blacklist_type_normalized_idx ON booking_blacklist(entry_type, normalized_value);
CREATE INDEX IF NOT EXISTS blacklist_active_idx ON booking_blacklist(is_active);

-- ============================================================================
-- TABLE: booking_activity_log
-- ============================================================================
CREATE TABLE IF NOT EXISTS booking_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  booking_id UUID REFERENCES bookings(id) ON DELETE CASCADE,
  action TEXT NOT NULL, -- 'created', 'cancelled', 'restored', 'status_changed', etc.
  notes TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

CREATE INDEX IF NOT EXISTS activity_log_booking_idx ON booking_activity_log(booking_id);
CREATE INDEX IF NOT EXISTS activity_log_created_idx ON booking_activity_log(created_at DESC);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) - Adjust based on your auth setup
-- ============================================================================

-- Enable RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_blocked_dates ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_blacklist ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_internal_reservations ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access (for server-side operations)
CREATE POLICY "Service role full access to bookings" ON bookings
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to blocked dates" ON booking_blocked_dates
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to blacklist" ON booking_blacklist
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to activity log" ON booking_activity_log
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role full access to internal reservations" ON booking_internal_reservations
  FOR ALL USING (auth.role() = 'service_role');

-- Policy: Allow public read access to active non-cancelled bookings (for availability checking)
CREATE POLICY "Public can view active bookings" ON bookings
  FOR SELECT USING (status IN ('pending', 'scheduled', 'in_progress'));

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for bookings table
DROP TRIGGER IF EXISTS update_bookings_updated_at ON bookings;
CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_internal_reservations_updated_at ON booking_internal_reservations;
CREATE TRIGGER update_internal_reservations_updated_at
  BEFORE UPDATE ON booking_internal_reservations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- SAMPLE DATA (optional - remove in production)
-- ============================================================================

-- Uncomment to insert sample blocked dates
INSERT INTO booking_blocked_dates (date, reason) VALUES
  ('2026-12-25', 'Christmas - No deliveries'),
  ('2026-01-01', 'New Year - No deliveries');

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Run these to verify the setup
SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name LIKE 'booking%';
SELECT COUNT(*) FROM bookings;
SELECT COUNT(*) FROM booking_blocked_dates;
SELECT COUNT(*) FROM booking_blacklist;
SELECT COUNT(*) FROM booking_activity_log;
SELECT COUNT(*) FROM booking_internal_reservations;
