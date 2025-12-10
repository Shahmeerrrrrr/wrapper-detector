# Railway Build Fix - Use Nixpacks Instead of Dockerfile

## Problem
Railway is trying to use Dockerfile which doesn't have Node.js installed, causing `npm: command not found` error.

## Solution: Force Railway to Use Nixpacks

### Option 1: In Railway Dashboard (Easiest)

1. Go to your Railway service
2. Click **"Settings"** tab
3. Find **"Build"** section
4. Look for **"Builder"** or **"Build Command"**
5. **Disable Dockerfile detection** or set builder to **"Nixpacks"**
6. Make sure **Root Directory** is set to `back`
7. Click **"Redeploy"**

### Option 2: Remove Dockerfile from Detection

The `.railwayignore` file in `back/` directory will tell Railway to ignore the Dockerfile and use Nixpacks instead.

### Option 3: Manual Configuration

In Railway dashboard:
1. Go to **Settings** → **Build**
2. Set **Build Command**: `npm install`
3. Set **Start Command**: `node index.js`
4. Set **Root Directory**: `back`
5. Make sure **Builder** is set to **Nixpacks** (not Docker)

## What Nixpacks Does

Nixpacks will:
- ✅ Auto-detect Node.js from `package.json`
- ✅ Install Node.js automatically
- ✅ Run `npm install`
- ✅ Start with `node index.js`

## Verification

After fixing:
1. Railway should show: "Using Nixpacks" (not Dockerfile)
2. Build should complete successfully
3. Service should start and be healthy

## If Still Not Working

1. **Delete and recreate the service** in Railway:
   - Delete current service
   - Add new service from GitHub
   - Set Root Directory to `back` immediately
   - Add environment variables
   - Deploy

2. **Check Railway logs** for specific errors

3. **Verify files exist**:
   - `back/package.json` ✅
   - `back/index.js` ✅
   - `back/prompt.txt` ✅

