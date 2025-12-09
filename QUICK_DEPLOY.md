# 🚀 Quick Deploy Guide - 5 Minutes

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- Railway account (sign up at railway.app) - OR Render.com
- Your domain name
- Groq API key

---

## Step 1: Push to GitHub (2 min)

```bash
git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/YOUR_USERNAME/67-wrappers.git
git push -u origin main
```

---

## Step 2: Deploy Backend - Railway (3 min)

1. Go to [railway.app](https://railway.app) → Sign up with GitHub
2. **New Project** → **Deploy from GitHub repo**
3. Select your repository
4. Click **Add Service** → **GitHub Repo** → Select repo
5. **Settings** → **Root Directory**: Set to `back`
6. **Variables** tab → Add:
   ```
   AI_API_KEY=your_groq_api_key_here
   ```
7. Wait for deployment (2 min)
8. **Settings** → **Domains** → Copy the URL (e.g., `your-app.up.railway.app`)

✅ **Backend URL**: `https://your-app.up.railway.app`

---

## Step 3: Deploy Frontend - Vercel (2 min)

1. Go to [vercel.com](https://vercel.com) → Sign up with GitHub
2. **Add New** → **Project** → Import your GitHub repo
3. **Configure Project**:
   - **Root Directory**: Click "Edit" → Set to `web`
   - **Framework Preset**: Vite (auto-detected)
4. **Environment Variables** → Add:
   ```
   VITE_API_URL=https://your-app.up.railway.app
   ```
   (Use your Railway backend URL from Step 2)
5. Click **Deploy**
6. Wait for deployment (1-2 min)

✅ **Frontend URL**: `https://your-project.vercel.app`

---

## Step 4: Add Your Domain (5 min)

### In Vercel:
1. Project → **Settings** → **Domains**
2. **Add Domain** → Enter: `yourdomain.com`
3. Vercel shows DNS records to add

### In Your Domain Registrar (GoDaddy, Namecheap, etc.):
Add these DNS records:

**For Root Domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For WWW:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

4. Wait 5-60 minutes for DNS to propagate
5. Vercel will show "Valid Configuration" when ready

✅ **Your site**: `https://yourdomain.com`

---

## Step 5: Test Everything

1. Visit your domain: `https://yourdomain.com`
2. Test URL checker with: `https://example.com`
3. Verify AI analysis appears
4. Check browser console (F12) for errors

---

## ✅ Done!

Your app is now live on the internet! 🎉

**Frontend**: `https://yourdomain.com`  
**Backend**: `https://your-app.up.railway.app`

---

## 🔄 Updating Your App

Just push to GitHub:
```bash
git add .
git commit -m "Update"
git push
```

- Vercel auto-deploys frontend
- Railway auto-deploys backend

---

## 🆘 Troubleshooting

**Frontend not connecting to backend?**
- Check `VITE_API_URL` in Vercel environment variables
- Make sure it's `https://your-app.up.railway.app` (not `http://`)

**Domain not working?**
- Wait longer for DNS (can take up to 48 hours)
- Check DNS records are correct
- Verify domain is added in Vercel

**Backend not working?**
- Check Railway logs
- Verify `AI_API_KEY` is set
- Test backend URL: `curl https://your-app.up.railway.app/`

---

## 📚 Full Guide

See [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md) for detailed instructions.

