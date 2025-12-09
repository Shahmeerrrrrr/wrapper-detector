# Deploy WrapperDetector to Internet - Step by Step Guide

## 🎯 Deployment Strategy

- **Frontend**: Vercel (Free tier) ✅
- **Backend**: Railway or Render (Free tier) ✅
- **Domain**: Your custom domain

---

## 📋 Prerequisites

- [ ] GitHub account
- [ ] Vercel account (free)
- [ ] Railway or Render account (free)
- [ ] Domain name (you mentioned you have one)
- [ ] Groq API key

---

## 🚀 Step 1: Prepare Your Code

### 1.1 Push to GitHub

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - WrapperDetector"

# Create repository on GitHub, then:
git remote add origin https://github.com/yourusername/67-wrappers.git
git branch -M main
git push -u origin main
```

---

## 🔧 Step 2: Deploy Backend (Railway - Recommended)

### 2.1 Create Railway Account

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project"

### 2.2 Deploy Backend

1. **Select Repository**
   - Choose "Deploy from GitHub repo"
   - Select your `67-wrappers` repository

2. **Configure Service**
   - Click "Add Service" → "GitHub Repo"
   - Select your repository
   - **Root Directory**: `back`
   - Railway will auto-detect Node.js

3. **Set Environment Variables**
   - Click on your service → "Variables" tab
   - Add:
     ```
     AI_API_KEY=your_groq_api_key_here
     PORT=8000
     ```
   - Railway will auto-assign PORT, but we set it for consistency

4. **Deploy**
   - Railway will automatically build and deploy
   - Wait for deployment to complete (2-3 minutes)

5. **Get Backend URL**
   - Click on your service
   - Go to "Settings" → "Domains"
   - Railway provides a free domain: `your-app.up.railway.app`
   - **Copy this URL** - you'll need it for frontend

### 2.3 Test Backend

```bash
# Test health check
curl https://your-app.up.railway.app/

# Should return: {"message":"WrapperDetector API is running"}
```

---

## 🌐 Step 3: Deploy Frontend (Vercel)

### 3.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

### 3.2 Configure Frontend Deployment

1. **Import Project**
   - Click "Add New" → "Project"
   - Import your GitHub repository

2. **Configure Project Settings**
   - **Framework Preset**: Vite
   - **Root Directory**: `web` (click "Edit" and set to `web`)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

3. **Set Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     ```
     VITE_API_URL=https://your-app.up.railway.app
     ```
   - Replace with your actual Railway backend URL
   - Select "Production", "Preview", and "Development"

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (1-2 minutes)

5. **Get Frontend URL**
   - Vercel provides: `your-project.vercel.app`
   - **Copy this URL**

### 3.3 Test Frontend

- Visit: `https://your-project.vercel.app`
- Test URL checker with a few URLs
- Verify it connects to backend

---

## 🌍 Step 4: Configure Custom Domain

### 4.1 Add Domain to Vercel (Frontend)

1. **In Vercel Dashboard**
   - Go to your project → "Settings" → "Domains"
   - Click "Add Domain"
   - Enter your domain: `yourdomain.com` or `www.yourdomain.com`

2. **Configure DNS**
   - Vercel will show DNS records to add
   - You need to add these to your domain registrar:

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

3. **Wait for DNS Propagation**
   - Can take 5 minutes to 48 hours
   - Vercel will show "Valid Configuration" when ready

### 4.2 Add Domain to Railway (Backend) - Optional

If you want a custom domain for backend too:

1. **In Railway Dashboard**
   - Go to your service → "Settings" → "Domains"
   - Click "Custom Domain"
   - Enter: `api.yourdomain.com`

2. **Configure DNS**
   - Add CNAME record:
   ```
   Type: CNAME
   Name: api
   Value: your-app.up.railway.app
   ```

3. **Update Frontend Environment Variable**
   - In Vercel, update `VITE_API_URL` to `https://api.yourdomain.com`
   - Redeploy frontend

---

## 🔄 Step 5: Update Environment Variables

### 5.1 Update Frontend API URL

After setting up domains:

1. **In Vercel**
   - Go to "Settings" → "Environment Variables"
   - Update `VITE_API_URL`:
     - If using Railway domain: `https://your-app.up.railway.app`
     - If using custom backend domain: `https://api.yourdomain.com`
   - Click "Save"
   - **Redeploy** (Vercel will auto-redeploy or click "Redeploy")

### 5.2 Verify CORS

The backend already has CORS enabled for all origins, so it should work. If you get CORS errors:

1. Check backend is running
2. Verify `VITE_API_URL` is correct
3. Check browser console for errors

---

## ✅ Step 6: Final Testing

### 6.1 Test Frontend
- Visit your domain: `https://yourdomain.com`
- Test URL checker
- Verify all features work

### 6.2 Test Backend
```bash
# Health check
curl https://your-app.up.railway.app/

# Analyze endpoint
curl -X POST https://your-app.up.railway.app/analyze \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```

### 6.3 Test Integration
- Use frontend to check a URL
- Verify AI analysis appears
- Check browser console for errors

---

## 🆓 Free Tier Limits

### Vercel (Frontend)
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ Custom domains
- ✅ SSL certificates (automatic)

### Railway (Backend)
- ⚠️ $5/month free credit (500 hours)
- ⚠️ After free credit, pay-as-you-go
- ✅ Custom domains
- ✅ SSL certificates (automatic)

### Alternative: Render (Backend)
- ✅ Free tier available (with limitations)
- ⚠️ Spins down after 15 min inactivity
- ✅ Custom domains
- ✅ SSL certificates

---

## 🔧 Troubleshooting

### Frontend Issues

**Build Fails**
- Check build logs in Vercel
- Verify `Root Directory` is set to `web`
- Check for TypeScript errors

**API Calls Fail**
- Verify `VITE_API_URL` is set correctly
- Check backend is running
- Verify CORS is enabled (already done)

**Domain Not Working**
- Wait for DNS propagation (up to 48 hours)
- Check DNS records are correct
- Verify domain is added in Vercel

### Backend Issues

**Deployment Fails**
- Check Railway logs
- Verify `AI_API_KEY` is set
- Check `prompt.txt` exists in `back/` directory

**API Not Responding**
- Check Railway service status
- Verify environment variables
- Check logs in Railway dashboard

**CORS Errors**
- Backend already has CORS enabled
- Verify frontend URL is correct
- Check browser console for specific errors

---

## 📊 Monitoring

### Vercel Analytics
- Go to "Analytics" tab
- View traffic, performance metrics
- Monitor errors

### Railway Logs
- Go to your service → "Deployments" → "View Logs"
- Monitor API requests
- Check for errors

---

## 🔐 Security Checklist

- [ ] Environment variables are set (not in code)
- [ ] `.env` files are in `.gitignore`
- [ ] API keys are secure
- [ ] HTTPS is enabled (automatic on Vercel/Railway)
- [ ] CORS is configured correctly
- [ ] Domain DNS is properly configured

---

## 🚀 Quick Deploy Commands

### Update Backend
```bash
git add .
git commit -m "Update backend"
git push
# Railway auto-deploys
```

### Update Frontend
```bash
git add .
git commit -m "Update frontend"
git push
# Vercel auto-deploys
```

### Force Redeploy
- **Vercel**: Dashboard → Project → Deployments → "Redeploy"
- **Railway**: Dashboard → Service → "Redeploy"

---

## 📝 Summary

After completing these steps:

1. ✅ Backend running on Railway: `https://your-app.up.railway.app`
2. ✅ Frontend running on Vercel: `https://your-project.vercel.app`
3. ✅ Custom domain configured: `https://yourdomain.com`
4. ✅ Environment variables set
5. ✅ Everything tested and working

**Your app is now live on the internet! 🎉**

---

## 🆘 Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs

---

## 💡 Pro Tips

1. **Use Preview Deployments**: Vercel creates preview URLs for every PR
2. **Monitor Usage**: Check Railway usage to stay within free tier
3. **Set Up Alerts**: Configure email alerts for deployment failures
4. **Use Environment Variables**: Never commit API keys
5. **Test Before Production**: Use preview deployments to test changes

