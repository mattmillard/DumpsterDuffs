/**
 * One-time script to set up booking operations schema in Supabase
 * Run with: node scripts/setup-booking-schema.ts
 */

require('dotenv').config({ path: '.env.local' });

async function setupSchema() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  
  if (!supabaseUrl) {
    console.error('❌ Missing NEXT_PUBLIC_SUPABASE_URL in .env.local');
    process.exit(1);
  }

  // Extract project reference from Supabase URL
  const projectRef = supabaseUrl.match(/https:\/\/(.+?)\.supabase\.co/)?.[1];
  
  if (!projectRef) {
    console.error('❌ Invalid Supabase URL format');
    process.exit(1);
  }

  console.log('\n📦 Booking Operations Schema Setup');
  console.log('='.repeat(60));
  console.log(`🔗 Project: ${projectRef}`);
  console.log('\n⚠️  NOTE: Supabase requires manual SQL execution for security.\n');
  
  console.log('✨ Quick Setup (Choose One):\n');
  
  console.log('Option 1: Web Dashboard (Easiest) ⭐');
  console.log('  1. Open: https://supabase.com/dashboard/project/' + projectRef + '/sql/new');
  console.log('  2. Copy contents from: supabase/BOOKING_OPERATIONS_SCHEMA.sql');
  console.log('  3. Paste into SQL Editor and click "Run"\n');
  
  console.log('Option 2: Clipboard Shortcut (macOS)');
  console.log('  1. Run: pbcopy < supabase/BOOKING_OPERATIONS_SCHEMA.sql');
  console.log('  2. Open SQL Editor and paste (Cmd+V)\n');
  
  console.log('Option 3: Supabase CLI');
  console.log('  1. Install CLI: npm install -g supabase');
  console.log('  2. Link: supabase link --project-ref ' + projectRef);
  console.log('  3. Save schema to: supabase/migrations/001_booking_operations.sql');
  console.log('  4. Push: supabase db push\n');

  // Try to copy to clipboard automatically
  try {
    const { execSync } = require('child_process');
    const path = require('path');
    const schemaPath = path.join(__dirname, '..', 'supabase', 'BOOKING_OPERATIONS_SCHEMA.sql');
    execSync(`pbcopy < "${schemaPath}"`, { stdio: 'ignore' });
    console.log('✅ SQL schema copied to clipboard! Paste in Supabase SQL Editor.\n');
    console.log('👉 Click here to open SQL Editor: https://supabase.com/dashboard/project/' + projectRef + '/sql/new\n');
  } catch (err) {
    // Clipboard copy failed (not macOS or pbcopy not available)
    console.log('💡 Could not auto-copy to clipboard (use Option 2 above)\n');
  }

  console.log('='.repeat(60));
  console.log('📄 Schema file: supabase/BOOKING_OPERATIONS_SCHEMA.sql');
  console.log('📖 Need help? See: BOOKING_CALENDAR_SETUP.md\n');
}

setupSchema();
