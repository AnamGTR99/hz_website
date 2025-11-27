# Vercel Analytics & Speed Insights Troubleshooting Guide

## Current Status
✅ **Code Implementation**: Correctly set up in `main.jsx`
✅ **Packages Installed**: Both `@vercel/analytics` and `@vercel/speed-insights` are installed
✅ **Import Paths**: Using correct `/react` subpath for Vite (not Next.js)

## Critical Requirements (From Official Vercel Documentation)

### 1. **ENABLE IN VERCEL DASHBOARD FIRST** ⚠️
This is the **#1 reason** analytics don't work. You MUST enable both features in your Vercel dashboard:

#### For Web Analytics:
1. Go to https://vercel.com/dashboard
2. Select your project (likely "hugo_website" or "hugozbor")
3. Click the **"Analytics"** tab
4. Click **"Enable"** button

#### For Speed Insights:
1. Go to https://vercel.com/dashboard
2. Select your project
3. Click the **"Speed Insights"** tab
4. Click **"Enable"** button

**Why this matters**: Enabling these features adds special routes (`/_vercel/insights/*` and `/_vercel/speed-insights/*`) to your deployment. Without enabling them in the dashboard, the tracking scripts have nowhere to send data.

### 2. **Deploy to Vercel**
Analytics only work on **deployed** sites, not localhost. After enabling in dashboard:
```bash
git add .
git commit -m "Add Vercel Analytics"
git push origin main
```
Or use Vercel CLI:
```bash
vercel deploy --prod
```

### 3. **Verify It's Working**
After deployment, visit your live site and:
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Filter by **Fetch/XHR**
4. Look for requests to:
   - `/_vercel/insights/view` (Web Analytics)
   - `/_vercel/speed-insights/vitals` (Speed Insights)

If you see these requests = ✅ Working!
If you don't see them = ❌ Not enabled in dashboard or not deployed

### 4. **Wait for Data**
- **Web Analytics**: Data appears within minutes of visitors
- **Speed Insights**: Requires real user visits (not just you). May take hours/days to show meaningful data

## Common Issues & Solutions

### Issue: "I don't see any data in the dashboard"
**Solutions**:
1. ✅ Enabled in Vercel dashboard? (See step 1 above)
2. ✅ Deployed to production? (Not just localhost)
3. ✅ Waited a few minutes after deployment?
4. ✅ Actually visited the live site?
5. ✅ Check browser Network tab for `/_vercel/insights/*` requests

### Issue: "Analytics work locally but not on Vercel"
**Solution**: Analytics are **designed to NOT work locally**. They only work on Vercel-deployed sites.

### Issue: "Speed Insights shows no data"
**Solution**: Speed Insights requires:
- Real user visits (not just you)
- Multiple page loads
- Time to collect data (can take 24-48 hours for meaningful metrics)

### Issue: "Network requests are blocked"
**Solution**: Check if:
- Ad blockers are enabled (disable for testing)
- Corporate firewall blocking Vercel domains
- Browser privacy settings blocking analytics

## Your Current Implementation (Correct ✅)

### `/src/wikipedia_content/main.jsx`
```javascript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    {/* Vercel Tracking - Global Scope */}
    <Analytics />
    <SpeedInsights />
  </React.StrictMode>,
)
```

This is the **correct** implementation for Vite + React.

## Next Steps (Action Items)

### ✅ Step 1: Enable in Vercel Dashboard
- [ ] Go to Vercel dashboard
- [ ] Enable Web Analytics for your project
- [ ] Enable Speed Insights for your project

### ✅ Step 2: Deploy
- [ ] Commit and push your code
- [ ] Wait for Vercel deployment to complete
- [ ] Note the production URL

### ✅ Step 3: Verify
- [ ] Visit your production site
- [ ] Open DevTools → Network tab
- [ ] Look for `/_vercel/insights/view` requests
- [ ] Look for `/_vercel/speed-insights/vitals` requests

### ✅ Step 4: Monitor Dashboard
- [ ] Wait 5-10 minutes
- [ ] Check Vercel Analytics dashboard
- [ ] Check Vercel Speed Insights dashboard

## Official Documentation Links
- Web Analytics: https://vercel.com/docs/analytics/quickstart
- Speed Insights: https://vercel.com/docs/speed-insights/quickstart
- Package Docs: https://www.npmjs.com/package/@vercel/analytics

## Summary
Your code is **100% correct**. The most likely issue is that you haven't **enabled Analytics and Speed Insights in the Vercel dashboard**. This is a required step that happens outside of code.
