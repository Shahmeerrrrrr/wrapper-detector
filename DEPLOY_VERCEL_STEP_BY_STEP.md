# 🚀 Deploy to Vercel - Step by Step Guide

## Overview
- **Frontend**: Deploy to Vercel (Free) ✅
- **Backend**: Deploy to Railway (Free tier) ✅
- **Domain**: Your custom domain (optional)

---

## Part 1: Deploy Backend First (Railway)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click **"Start a New Project"** or **"Login"**
3. Sign up with **GitHub** (recommended)

### Step 2: Deploy Backend from GitHub
1. In Railway dashboard, click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub if prompted
4. Find and select your repository: **`wrapper-detector`**
5. Click on it to deploy

### Step 3: Configure Backend Service
1. Railway will create a service automatically
2. Click on the service to open settings
3. Go to **"Settings"** tab
4. Find **"Root Directory"** section
5. Click **"Edit"** and set to: `back`
6. Click **"Save"**

### Step 4: Add Environment Variables
1. Still in **"Settings"** tab
2. Scroll to **"Variables"** section
3. Click **"New Variable"**
4. Add:
   - **Name**: `AI_API_KEY`
   - **Value**: Your Groq API key (get it from [console.groq.com](https://console.groq.com))
5. Click **"Add"**
6. Railway will automatically redeploy

### Step 5: Get Backend URL
1. Go to **"Settings"** → **"Domains"** tab
2. Railway provides a free domain like: `your-app.up.railway.app`
3. **Copy this URL** - you'll need it for frontend!
4. Test it: Open `https://your-app.up.railway.app/` in browser
   - Should see: `{"message":"WrapperDetector API is running"}`

✅ **Backend is now live!**

---

## Part 2: Deploy Frontend (Vercel)

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"**
3. Sign up with **GitHub** (recommended)
4. Authorize Vercel to access your repositories

### Step 2: Import Your Repository
1. In Vercel dashboard, click **"Add New"** → **"Project"**
2. You'll see your GitHub repositories
3. Find **`wrapper-detector`** and click **"Import"**

### Step 3: Configure Project Settings
1. **Project Name**: `wrapper-detector` (or keep default)
2. **Root Directory**: Click **"Edit"** → Set to `web`
   - This tells Vercel where your frontend code is
3. **Framework Preset**: Should auto-detect as **Vite** ✅
4. **Build Command**: Should be `npm run build` ✅
5. **Output Directory**: Should be `dist` ✅
6. **Install Command**: Should be `npm install` ✅

### Step 4: Add Environment Variable
1. Scroll down to **"Environment Variables"** section
2. Click **"Add"** or the **"+"** button
3. Add new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-app.up.railway.app`
     - Replace `your-app.up.railway.app` with your actual Railway backend URL from Part 1, Step 5
   - **Environments**: Check all three:
     - ✅ Production
     - ✅ Preview
     - ✅ Development
4. Click **"Save"**

### Step 5: Deploy!
1. Click **"Deploy"** button at the bottom
2. Wait for build to complete (1-2 minutes)
3. You'll see build logs in real-time
4. When done, you'll see: **"Congratulations! Your project has been deployed."**

### Step 6: Get Your Frontend URL
1. After deployment, Vercel provides a URL like:
   - `https://wrapper-detector.vercel.app`
2. **Copy this URL** and test it!
3. Open in browser and test the URL checker

✅ **Frontend is now live!**

---

## Part 3: Add Your Custom Domain (Optional)

### Step 1: Add Domain in Vercel
1. In Vercel project dashboard, go to **"Settings"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain: `yourdomain.com` or `www.yourdomain.com`
4. Click **"Add"**

### Step 2: Configure DNS
Vercel will show you exactly what DNS records to add:

**For Root Domain (yourdomain.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW (www.yourdomain.com):**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### Step 3: Add DNS Records
1. Go to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find **DNS Management** or **DNS Settings**
3. Add the records Vercel showed you
4. Save changes

### Step 4: Wait for DNS Propagation
1. Go back to Vercel **"Domains"** page
2. Wait 5-60 minutes (can take up to 48 hours)
3. Vercel will show **"Valid Configuration"** when ready
4. Your site will be live at `https://yourdomain.com`!

---

## ✅ Testing Your Deployment

### Test Backend
```bash
# Health check
curl https://your-app.up.railway.app/

# Should return: {"message":"WrapperDetector API is running"}
```

### Test Frontend
1. Visit: `https://wrapper-detector.vercel.app`
2. Test URL checker with: `https://example.com`
3. Verify AI analysis appears
4. Check browser console (F12) for any errors

### Test Integration
1. Enter a URL in the frontend
2. Click "Check Website"
3. Should connect to backend and show AI analysis
4. If errors, check `VITE_API_URL` in Vercel environment variables

---

## 🔄 Updating Your App

### Automatic Deployments
Both Vercel and Railway auto-deploy when you push to GitHub:

```bash
# Make changes locally
git add .
git commit -m "Update feature"
git push origin main

# Vercel and Railway will automatically:
# 1. Detect the push
# 2. Build your app
# 3. Deploy the new version
```

### Manual Redeploy
- **Vercel**: Dashboard → Deployments → Click "..." → "Redeploy"
- **Railway**: Dashboard → Service → Click "Redeploy"

---

## 🐛 Troubleshooting

### Frontend Issues

**Build Fails**
- Check build logs in Vercel
- Verify `Root Directory` is set to `web`
- Check for TypeScript errors locally first

**API Calls Fail (CORS or Connection)**
- Verify `VITE_API_URL` is set correctly in Vercel
- Make sure it's `https://` not `http://`
- Check backend is running (test Railway URL)
- Check browser console for specific errors

**Domain Not Working**
- Wait longer for DNS propagation (up to 48 hours)
- Verify DNS records are correct
- Check domain is added in Vercel dashboard

### Backend Issues

**Deployment Fails**
- Check Railway logs
- Verify `AI_API_KEY` is set
- Check `prompt.txt` exists in `back/` directory

**API Not Responding**
- Check Railway service status
- Verify environment variables
- Test backend URL directly: `curl https://your-app.up.railway.app/`

**CORS Errors**
- Backend already has CORS enabled for all origins
- Verify frontend URL is correct
- Check browser console for specific CORS messages

---

## 📊 Monitoring

### Vercel Analytics
- Go to **"Analytics"** tab in Vercel
- View traffic, performance metrics
- Monitor errors and deployments

### Railway Logs
- Go to your service → **"Deployments"** → **"View Logs"**
- Monitor API requests
- Check for errors

---

## 💰 Free Tier Limits

### Vercel (Frontend)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates (automatic)
- ✅ Preview deployments for every PR

### Railway (Backend)
- ⚠️ $5/month free credit (500 hours)
- ⚠️ After free credit, pay-as-you-go (~$0.01/hour)
- ✅ Custom domains
- ✅ SSL certificates (automatic)

**Tip**: Railway free credit is usually enough for development/testing. For production, consider upgrading or using Render (has a free tier with limitations).

---

## 🎉 You're Done!

Your app is now live on the internet:
- **Frontend**: `https://wrapper-detector.vercel.app` (or your custom domain)
- **Backend**: `https://your-app.up.railway.app`

**Next Steps:**
1. Test everything thoroughly
2. Share your app with others!
3. Monitor usage and performance
4. Set up custom domain if you haven't already

---

## 📚 Quick Reference

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Railway Dashboard**: https://railway.app/dashboard
- **GitHub Repo**: https://github.com/Shahmeerrrrrr/wrapper-detector

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Check build logs** in both platforms for specific errors

