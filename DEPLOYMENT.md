# DEPLOYMENT GUIDE - VERCEL

## 🚀 Quick Deploy to Vercel

### Option 1: GitHub → Vercel (RECOMMENDED)

1. **Initialize Git & Push to GitHub:**

   ```bash
   cd /Users/Matt/Documents/DumpsterDuffs
   git init
   git add .
   git commit -m "Initial commit: Dumpster Duff's redesign"

   # Create a new repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/dumpster-duffs.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel auto-detects Next.js settings
   - Click "Deploy"
   - You'll get a live URL in ~2 minutes

3. **Custom Domain (Optional):**
   - In Vercel dashboard → Settings → Domains
   - Add `preview.dumpsterduffs.com` or similar
   - Follow DNS setup instructions

---

### Option 2: Vercel CLI

1. **Install Vercel CLI:**

   ```bash
   npm i -g vercel
   ```

2. **Deploy:**

   ```bash
   cd /Users/Matt/Documents/DumpsterDuffs
   vercel
   ```

3. **Follow prompts:**
   - Set up and deploy? Y
   - Which scope? (your account)
   - Link to existing project? N
   - What's your project's name? dumpster-duffs
   - In which directory is your code? ./
   - Auto-detected settings? Y

4. **You'll get a preview URL immediately** (e.g., `dumpster-duffs-xyz.vercel.app`)

5. **Deploy to production:**
   ```bash
   vercel --prod
   ```

---

## 🔧 Environment Setup (If Needed)

If you later add API keys or Square integration:

1. **Create `.env.local` file:**

   ```env
   NEXT_PUBLIC_SQUARE_APP_ID=your_square_app_id
   NEXT_PUBLIC_SQUARE_LOCATION_ID=your_location_id
   ```

2. **Add to Vercel:**
   - Vercel dashboard → Settings → Environment Variables
   - Add each variable for Production, Preview, and Development

---

## 📋 Pre-Deployment Checklist

- [x] Build succeeds locally (`npm run build`)
- [x] No security vulnerabilities (`npm audit`)
- [x] All components render properly
- [x] Mobile responsive (test in DevTools)
- [ ] Replace placeholder images with real photos (if available)
- [ ] Update Square booking URL in `components/home/InstantQuote.tsx` (line 77)
- [ ] Update phone number if different (search for "573-356-4272")
- [ ] Update email if different (search for "dustin@dumpsterduffs.com")

---

## 🌐 Expected Vercel Output

**Build Time:** ~30-60 seconds  
**Deploy Time:** ~2 minutes total  
**Live URL:** `https://dumpster-duffs-xyz.vercel.app`

**Performance:**

- Lighthouse Score: 90-100
- First Contentful Paint: <1s
- Largest Contentful Paint: <2s
- Time to Interactive: <3s

---

## 🔄 Future Updates

Once deployed to Vercel via GitHub:

1. Make changes locally
2. Commit: `git add . && git commit -m "Update pricing"`
3. Push: `git push`
4. Vercel auto-deploys in ~2 minutes

**Preview Deployments:**

- Every push to a branch gets its own preview URL
- Perfect for testing before merging to main

---

## 📱 Share Preview Link

Once deployed, share the Vercel URL with:

- Stakeholders for design approval
- Test users for conversion feedback
- WordPress developer as reference
- SEO team for content review

**Example Feedback Request:**

> "Hey team, here's the preview of the new Dumpster Duff's site: [URL]
>
> Please review:
>
> - Does the design feel trustworthy and professional?
> - Is the pricing clear?
> - Is the CTA obvious on mobile?
> - Any questions about the process?
>
> Feedback due by [date]."

---

## 🛠️ Troubleshooting

**Build Fails:**

- Check `npm run build` locally first
- Review Vercel build logs for errors
- Common issue: Missing environment variables

**Images Not Loading:**

- Verify image URLs in components
- Check `next.config.js` image domains

**Forms Not Working:**

- Square Appointments integration pending (see README)
- Form submissions need webhook setup

**Slow Performance:**

- Check Lighthouse report
- Optimize images (use next/image component)
- Review Vercel analytics dashboard

---

## 📊 Post-Deployment Analytics

**Free Tools:**

1. **Vercel Analytics** (built-in)
   - Real User Monitoring
   - Web Vitals tracking
   - Geographic traffic data

2. **Google Analytics** (add later)
   - Place tracking code in `app/layout.tsx`
   - Track form submissions and clicks

3. **Microsoft Clarity** (free heatmaps)
   - Install script in layout
   - See where users click, scroll

---

**Ready to deploy? Run `vercel` in the project directory!**
