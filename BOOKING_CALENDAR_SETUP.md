# Booking Calendar System Setup

## 🚀 Quick Setup

### 1. Database Setup (Required)

Go to your Supabase project → SQL Editor and run:

```bash
/Users/Matt/Documents/DumpsterDuffsV2/supabase/BOOKING_OPERATIONS_SCHEMA.sql
```

This creates:

- `bookings` table (enhanced with all fields)
- `booking_blocked_dates` table (date blocking)
- `booking_blacklist` table (customer blacklist)
- `booking_activity_log` table (audit trail)

### 2. Verify Setup

After running the SQL, the admin calendar will automatically detect the tables and enable all features.

## 📋 Features

### ✅ Calendar Management

- **Visual Calendar Grid** - See availability at a glance
- **Block Dates** - Globally or per dumpster size
- **Free Dates** - Unblock previously blocked dates
- **Capacity Indicators** - Real-time availability per size

### ✅ Booking Management

- **View All Bookings** - By day, week, or month
- **Cancel Bookings** - With reason tracking
- **Restore Bookings** - Undo cancellations
- **Status Updates** - Track booking lifecycle

### ✅ Blacklist System

- **Block by Phone** - Prevent repeat problem customers
- **Block by Email** - Email-based blocking
- **Block by Name** - Name matching with normalization
- **Block by Address** - Address-based blocking
- **Toggle Active/Inactive** - Temporarily disable blocks

### ✅ Smart Availability

- **Inventory-Aware** - Respects total units per size
- **Date Range Blocking** - Block entire ranges
- **Size-Specific Blocks** - Block specific sizes only
- **Real-time Updates** - Instant UI refresh

## 🎯 Admin Panel Access

Navigate to: `/admin/calendar`

## 🔐 Security

- Row Level Security (RLS) enabled
- Service role required for mutations
- Public can only view active bookings (for availability)
- Activity logging for all changes

## 💳 Ready for Stripe

Once calendar is working, add your Stripe keys to `.env.local`:

```bash
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
```

The booking flow will automatically integrate with Stripe checkout.
