-- Analytics Schema for Dumpster Duff's Admin Dashboard
-- Tracks page views, user interactions, form progression, and referrers

-- Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id TEXT NOT NULL,
  event_type TEXT NOT NULL, -- 'page_view', 'form_start', 'form_step', 'form_complete', 'phone_click', 'button_click'
  page_path TEXT NOT NULL,
  page_title TEXT,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  user_agent TEXT,
  device_type TEXT, -- 'mobile', 'tablet', 'desktop'
  browser TEXT,
  os TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  event_data JSONB, -- Additional event-specific data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Analytics Sessions Table
CREATE TABLE IF NOT EXISTS analytics_sessions (
  session_id TEXT PRIMARY KEY,
  first_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_seen TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  page_views INTEGER DEFAULT 1,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  landing_page TEXT,
  device_type TEXT,
  converted BOOLEAN DEFAULT FALSE, -- Set to true if they submit a booking form
  called BOOLEAN DEFAULT FALSE -- Set to true if they click the phone number
);

-- Indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_type ON analytics_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analytics_events_page_path ON analytics_events(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_first_seen ON analytics_sessions(first_seen DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_sessions_converted ON analytics_sessions(converted);

-- Enable Row Level Security
ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics_sessions ENABLE ROW LEVEL SECURITY;

-- Public can insert analytics (but not read)
CREATE POLICY "Public can insert analytics events" ON analytics_events
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Public can insert/update sessions" ON analytics_sessions
  FOR ALL USING (true);

-- Admin can read all analytics
CREATE POLICY "Admin can read analytics events" ON analytics_events
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

CREATE POLICY "Admin can read analytics sessions" ON analytics_sessions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Helper view for daily stats
CREATE OR REPLACE VIEW analytics_daily_stats AS
SELECT
  DATE(created_at) as date,
  COUNT(*) as total_events,
  COUNT(DISTINCT session_id) as unique_visitors,
  COUNT(*) FILTER (WHERE event_type = 'page_view') as page_views,
  COUNT(*) FILTER (WHERE event_type = 'phone_click') as phone_clicks,
  COUNT(*) FILTER (WHERE event_type = 'form_start') as form_starts,
  COUNT(*) FILTER (WHERE event_type = 'form_complete') as form_completions
FROM analytics_events
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Grant access to admin users
GRANT SELECT ON analytics_daily_stats TO authenticated;
