# Deployment Guide - WrapperDetector

## Architecture Overview
- **Frontend**: React + Vite (Static site)
- **Backend**: Node.js + Express (API server)
- **AI Service**: Groq API

## Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) ⭐ Recommended

#### Frontend - Vercel
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Set build settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `web`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL (e.g., `https://your-app.railway.app`)
6. Deploy

#### Backend - Railway
1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your repository
4. Set root directory to `back`
5. Add Environment Variables:
   - `AI_API_KEY` = Your Groq API key
   - `PORT` = Railway will auto-assign (or use 8000)
6. Deploy

**Update Frontend**: After backend deploys, update `VITE_API_URL` in Vercel with the Railway URL.

---

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend - Netlify
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. New site from Git → Select repository
4. Build settings:
   - **Base directory**: `web`
   - **Build command**: `npm run build`
   - **Publish directory**: `web/dist`
5. Add Environment Variable:
   - `VITE_API_URL` = Your backend URL
6. Deploy

#### Backend - Render
1. Go to [render.com](https://render.com)
2. New → Web Service
3. Connect GitHub repository
4. Settings:
   - **Root Directory**: `back`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add Environment Variables:
   - `AI_API_KEY` = Your Groq API key
   - `PORT` = 8000 (or leave default)
6. Deploy

---

### Option 3: Full Stack on Railway

1. Go to [railway.app](https://railway.app)
2. New Project → Deploy from GitHub
3. Add two services:
   - **Service 1 (Backend)**:
     - Root: `back`
     - Start: `npm start`
     - Env: `AI_API_KEY`, `PORT`
   - **Service 2 (Frontend)**:
     - Root: `web`
     - Build: `npm run build`
     - Start: `npm run preview` (or serve static files)
     - Env: `VITE_API_URL` = Backend service URL

---

## Environment Variables

### Backend (`back/.env`)
```env
AI_API_KEY=your_groq_api_key_here
PORT=8000
```

### Frontend (`web/.env` or Platform Settings)
```env
VITE_API_URL=https://your-backend-url.com
```

**Note**: For local development, frontend defaults to `http://localhost:8000` if `VITE_API_URL` is not set.

---

## Deployment Checklist

### Backend
- [ ] `prompt.txt` file is included in deployment
- [ ] Environment variables are set in hosting platform
- [ ] Port is configured (use platform's PORT or set to 8000)
- [ ] CORS is enabled (already configured for all origins)
- [ ] Health check endpoint works: `GET /`
- [ ] Analyze endpoint works: `POST /analyze`

### Frontend
- [ ] `VITE_API_URL` environment variable is set
- [ ] Build succeeds: `npm run build`
- [ ] Production preview works: `npm run preview`
- [ ] All assets load correctly
- [ ] API calls point to correct backend URL

---

## Post-Deployment Testing

1. **Backend Health Check**
   ```bash
   curl https://your-backend-url.com/
   ```

2. **Backend Analyze Test**
   ```bash
   curl -X POST https://your-backend-url.com/analyze \
     -H "Content-Type: application/json" \
     -d '{"url":"https://example.com"}'
   ```

3. **Frontend Test**
   - Visit your frontend URL
   - Test URL checker with a few URLs
   - Verify API calls work
   - Check browser console for errors

---

## Troubleshooting

### Backend Issues

**Port Error**
- Railway/Render auto-assigns PORT
- Use `process.env.PORT || 8000` in code (already done)

**Module Not Found**
- Ensure `package.json` has all dependencies
- Run `npm install` in deployment logs

**Prompt File Not Found**
- Ensure `prompt.txt` is in `back/` directory
- Check file is committed to Git

**API Key Error**
- Verify `AI_API_KEY` is set in environment variables
- Check Groq API key is valid

### Frontend Issues

**API Calls Fail**
- Check `VITE_API_URL` is set correctly
- Verify backend URL is accessible
- Check CORS settings (backend allows all origins)

**Build Fails**
- Check Node.js version (should be 18+)
- Verify all dependencies are in `package.json`
- Check for TypeScript errors

**Assets Not Loading**
- Verify build output directory is correct
- Check base path in `vite.config.ts` if needed

---

## Recommended: Vercel + Railway Setup

### Step-by-Step

1. **Deploy Backend (Railway)**
   ```bash
   # In Railway dashboard:
   # 1. New Project → GitHub
   # 2. Select repository
   # 3. Root Directory: back
   # 4. Add Env: AI_API_KEY=your_key
   # 5. Deploy
   ```

2. **Get Backend URL**
   - Railway provides URL like: `https://your-app.up.railway.app`
   - Test it: `curl https://your-app.up.railway.app/`

3. **Deploy Frontend (Vercel)**
   ```bash
   # In Vercel dashboard:
   # 1. Import Git Repository
   # 2. Root Directory: web
   # 3. Framework: Vite
   # 4. Add Env: VITE_API_URL=https://your-app.up.railway.app
   # 5. Deploy
   ```

4. **Test Everything**
   - Visit Vercel URL
   - Test URL checker
   - Verify it works end-to-end

---

## Cost Estimates

- **Vercel**: Free tier (generous limits)
- **Railway**: $5/month (or free trial)
- **Render**: Free tier available
- **Groq API**: Free tier (check current limits)

---

## Security Notes

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Use environment variables** in hosting platforms
3. **CORS**: Backend allows all origins (fine for public API, restrict if needed)
4. **API Key**: Keep Groq API key secure, rotate if exposed

---

## Monitoring

After deployment, monitor:
- Backend response times
- API error rates
- Groq API quota usage
- Frontend build status

