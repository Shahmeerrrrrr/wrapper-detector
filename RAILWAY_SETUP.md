# Railway Setup Guide - Fix Railpack Detection

## Problem
Railway's Railpack can't auto-detect your project because the repository has both `back/` and `web/` directories.

## Solution: Set Root Directory in Railway

### Step 1: In Railway Dashboard
1. Go to your Railway project
2. Click on your service (the one that failed)
3. Go to **"Settings"** tab
4. Scroll to **"Root Directory"** section
5. Click **"Edit"** or **"Change"**
6. Enter: `back`
7. Click **"Save"**

### Step 2: Railway will automatically:
- Detect Node.js in the `back/` directory
- Install dependencies (`npm install`)
- Start the server (`node index.js`)

### Step 3: Add Environment Variables
1. Still in **"Settings"** tab
2. Go to **"Variables"** section
3. Add:
   - **Name**: `AI_API_KEY`
   - **Value**: Your Groq API key
4. Click **"Add"**

### Step 4: Redeploy
1. Railway will automatically redeploy after setting root directory
2. Or manually click **"Redeploy"** button
3. Wait for deployment to complete

## Alternative: Using railway.json

If you prefer, we've created `back/railway.json` that Railway will automatically detect if you set the root directory to `back`.

## Verification

After deployment:
1. Go to **"Settings"** → **"Domains"**
2. Copy your Railway URL (e.g., `your-app.up.railway.app`)
3. Test: `curl https://your-app.up.railway.app/`
4. Should return: `{"message":"WrapperDetector API is running"}`

## Troubleshooting

**Still not working?**
- Make sure root directory is set to `back` (not `back/` with trailing slash)
- Check that `back/package.json` exists
- Verify `back/index.js` exists
- Check Railway logs for specific errors

**Build fails?**
- Check Railway logs
- Verify `AI_API_KEY` is set
- Make sure `prompt.txt` exists in `back/` directory

