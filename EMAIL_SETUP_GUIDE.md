# Email Setup Guide: GoDaddy Forwarding + Resend Transactional Emails

## Overview
This guide helps you maintain your existing GoDaddy email forwarding (`dustin@dumpsterduffs.com`) while adding automated booking confirmation emails using Resend.

**Key Principle:** Transactional emails (booking confirmations) use a separate service (Resend) to avoid interfering with your operational email.

---

## Why This Setup Works

1. **Receiving Email (GoDaddy):** `dustin@dumpsterduffs.com` → forwards to your personal inbox
2. **Sending Email (Resend):** `bookings@dumpsterduffs.com` → automated confirmations only
3. **No Conflict:** Different email addresses, different DNS records, different purposes

---

## Step 1: Sign Up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up with your email (it's free for 3,000 emails/month, then $20/month for 50,000)
3. Verify your email address

---

## Step 2: Add Your Domain to Resend

1. In Resend Dashboard, click **Domains** → **Add Domain**
2. Enter: `dumpsterduffs.com`
3. Resend will show you DNS records to add (we'll configure these next)

---

## Step 3: Configure DNS Records in GoDaddy

### Important: Your Current GoDaddy Setup (DO NOT CHANGE)

Your existing email forwarding uses these records (leave them alone):
- **MX Records** pointing to GoDaddy's mail servers
- These handle `dustin@dumpsterduffs.com` forwarding

### New Records to Add for Resend

Go to GoDaddy → My Products → DNS → Manage DNS for `dumpsterduffs.com`

#### A. SPF Record (Allows Resend to Send on Your Behalf)

**If you already have an SPF record:**
- Find the existing TXT record that starts with `v=spf1`
- Edit it to include Resend: `v=spf1 include:_spf.mx.cloudflare.net include:_spf.google.com include:eu.sparkpostmail.com ~all`
- Replace with actual domains you use. If none exist yet: `v=spf1 include:eu.sparkpostmail.com ~all`

**If you DON'T have an SPF record:**
```
Type: TXT
Name: @ (or leave blank)
Value: v=spf1 include:eu.sparkpostmail.com ~all
TTL: 3600
```

**⚠️ IMPORTANT:** Only ONE SPF record per domain. If you have existing includes, merge them.

#### B. DKIM Records (Authenticates Resend Emails)

Resend will give you 3 DKIM records. Add all three:

```
Type: TXT
Name: resend._domainkey (exact name shown in Resend dashboard)
Value: (long string from Resend - copy exactly)
TTL: 3600
```

Repeat for all DKIM records Resend shows (usually 3 total).

#### C. DMARC Record (Optional but Recommended)

```
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dustin@dumpsterduffs.com
TTL: 3600
```

This sends reports to your forwarding address if someone spoofs your domain.

---

## Step 4: Wait for DNS Propagation

- DNS changes take 15 minutes to 48 hours (usually ~1 hour)
- Check status in Resend Dashboard → Domains
- When verified, you'll see a green checkmark

---

## Step 5: Get Your Resend API Key

1. In Resend Dashboard, go to **API Keys**
2. Click **Create API Key**
3. Name it: `DumpsterDuffs Production`
4. Permissions: **Sending access**
5. Copy the API key (starts with `re_`)

---

## Step 6: Configure Vercel Environment Variables

1. Go to [vercel.com](https://vercel.com/mattmillard/dumpsterduffs) → Your Project → Settings → Environment Variables

2. Add two variables:

**Variable 1:**
```
Name: RESEND_API_KEY
Value: re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (your actual key)
Environment: Production, Preview, Development
```

**Variable 2:**
```
Name: BOOKING_FROM_EMAIL
Value: bookings@dumpsterduffs.com
Environment: Production, Preview, Development
```

3. Click **Save**

---

## Step 7: Add to Local Environment

Create or update `/Users/Matt/Documents/DumpsterDuffsV2/.env.local`:

```bash
# Resend API for booking confirmation emails
RESEND_API_KEY=re_your_actual_api_key_here
BOOKING_FROM_EMAIL=bookings@dumpsterduffs.com
```

**⚠️ Security:** Never commit `.env.local` to git (already in `.gitignore`)

---

## Step 8: Redeploy Your Site

After adding environment variables to Vercel:

1. Go to Vercel Dashboard → Deployments
2. Click the three dots (•••) on your latest deployment
3. Click **Redeploy**
4. Or push any change to trigger a deployment

---

## Step 9: Test Email Sending

### Test 1: Send Test Email in Resend Dashboard
1. Go to Resend → Logs → Send Test Email
2. Send to your personal email
3. Confirm it arrives and isn't in spam

### Test 2: Make a Real Test Booking
1. Go to `https://dumpsterduffs.com/booking`
2. Complete a booking with YOUR email address
3. Check for confirmation email
4. If it doesn't arrive, check spam folder

### Debug if Emails Don't Send

Check Vercel logs:
1. Vercel Dashboard → Deployments → Latest → Logs
2. Search for "Email" or "Resend"
3. Look for errors or "Email sent successfully"

---

## DNS Record Summary

Here's exactly what you should have in GoDaddy DNS:

### Existing (Already There - Don't Touch)
```
Type: MX
Name: @ 
Value: mailstore1.secureserver.net (priority 10)

Type: MX
Name: @
Value: smtp.secureserver.net (priority 0)
```

### New Records to Add
```
Type: TXT
Name: @
Value: v=spf1 include:eu.sparkpostmail.com ~all

Type: TXT
Name: resend._domainkey
Value: [Copy from Resend dashboard - starts with p=MII...]

Type: TXT
Name: resend2._domainkey
Value: [Copy from Resend dashboard - starts with p=MII...]

Type: TXT
Name: resend3._domainkey
Value: [Copy from Resend dashboard - starts with p=MII...]

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:dustin@dumpsterduffs.com
```

---

## What Happens When Someone Books

1. Customer fills out booking form
2. Booking creates database record (in Supabase)
3. Server tries to send email via Resend:
   - **Success:** Customer gets confirmation email from `bookings@dumpsterduffs.com`
   - **Failure:** Booking still succeeds, email just isn't sent (graceful fallback)
4. Confirmation page shows booking number either way

See the code: [app/api/public/bookings/route.ts](app/api/public/bookings/route.ts#L120-L185)

---

## Troubleshooting

### Email Goes to Spam
- **Cause:** Domain not fully verified, missing DKIM/SPF
- **Fix:** Wait for DNS propagation, verify all records in Resend dashboard

### "Email skipped - missing config" in Logs
- **Cause:** Environment variables not set in Vercel
- **Fix:** Double-check Step 6, then redeploy

### GoDaddy Email Forwarding Stops Working
- **Cause:** Accidentally changed MX records
- **Fix:** Restore MX records:
  ```
  Type: MX, Name: @, Value: mailstore1.secureserver.net, Priority: 10
  Type: MX, Name: @, Value: smtp.secureserver.net, Priority: 0
  ```

### Multiple SPF Records Error
- **Cause:** Added second SPF TXT record instead of merging
- **Fix:** Delete duplicate, keep only ONE with all includes:
  ```
  v=spf1 include:_spf.secureserver.net include:eu.sparkpostmail.com ~all
  ```

---

## Email Addresses Breakdown

| Address | Purpose | Service | Receives | Sends |
|---------|---------|---------|----------|-------|
| `dustin@dumpsterduffs.com` | Your operational email | GoDaddy Forwarding | ✅ | ❌ |
| `bookings@dumpsterduffs.com` | Automated confirmations | Resend | ❌ | ✅ |

**Note:** You can reply to customer emails from your personal inbox. They won't see the `@dumpsterduffs` address unless you set up a full mailbox (not just forwarding).

---

## Advanced: Reply-To Configuration

If you want customers to reply to your operational email, edit [app/api/public/bookings/route.ts](app/api/public/bookings/route.ts#L163):

```typescript
const response = await resend.emails.send({
  from: fromEmail, // bookings@dumpsterduffs.com
  to: payload.customer_email,
  replyTo: 'dustin@dumpsterduffs.com', // Add this line
  subject: `Booking Confirmed: ${bookingNumber}`,
  html: emailHtml,
});
```

This way, when customers hit reply, it goes to your GoDaddy forwarding address.

---

## Cost Breakdown

- **Resend Free Tier:** 3,000 emails/month = 100 bookings/day
- **Resend Paid:** $20/month for 50,000 emails = ~1,600 bookings/day
- **GoDaddy Forwarding:** Usually included with domain registration

---

## Next Steps

1. ✅ Sign up for Resend
2. ✅ Add domain to Resend
3. ✅ Add DNS records to GoDaddy (don't touch existing MX records)
4. ⏱️ Wait for DNS propagation (15-60 minutes)
5. ✅ Copy API key from Resend
6. ✅ Add environment variables to Vercel
7. ✅ Add to local `.env.local`
8. ✅ Redeploy site
9. ✅ Test with real booking

---

## Questions?

If something breaks or you need help:
1. Check Resend Dashboard → Logs for errors
2. Check Vercel → Logs for "Email" or "Resend"
3. Verify DNS records are correct in GoDaddy
4. Make sure environment variables are set in Vercel

Your code is already set up correctly. You just need the infrastructure (Resend account + DNS records).
