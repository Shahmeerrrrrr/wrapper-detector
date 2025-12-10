# Railway Root Directory Fix - CRITICAL STEP

## The Problem
Railway is analyzing the **root directory** (which has both `back/` and `web/`) instead of the `back/` directory where your Node.js app is.

## The Solution: Set Root Directory in Railway

### ⚠️ THIS IS THE MOST IMPORTANT STEP ⚠️

You **MUST** set the Root Directory in Railway dashboard:

### Step-by-Step:

1. **Go to Railway Dashboard**
   - Open your Railway project
   - Click on your service (the one showing the error)

2. **Go to Settings**
   - Click the **"Settings"** tab at the top

3. **Find "Root Directory"**
   - Scroll down to find **"Root Directory"** section
   - It might show: `./` or be empty

4. **Set Root Directory**
   - Click **"Edit"** or **"Change"** button
   - Enter: `back` (without quotes, without trailing slash)
   - Click **"Save"**

5. **Redeploy**
   - Railway will automatically trigger a new deployment
   - Or click **"Redeploy"** button manually

### What This Does

When Root Directory is set to `back`:
- ✅ Railway will only look at the `back/` folder
- ✅ It will find `package.json` in `back/`
- ✅ It will detect Node.js automatically
- ✅ It will run `npm install` in `back/`
- ✅ It will start with `node index.js`

### Verification

After setting Root Directory and redeploying, you should see:
- ✅ "Using Nixpacks" (not Railpack error)
- ✅ "Detected Node.js"
- ✅ Build completes successfully
- ✅ Service starts

### If You Don't See "Root Directory" Option

1. **Delete the service** in Railway
2. **Create a new service** from GitHub
3. **Before deploying**, go to Settings → Root Directory
4. **Set it to `back`** immediately
5. **Then add environment variables** (`AI_API_KEY`)
6. **Deploy**

### Alternative: Use Railway CLI

If dashboard doesn't work, you can use Railway CLI:

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Link to your project
railway link

# Set root directory
railway variables set RAILWAY_ROOT_DIRECTORY=back
```

## Files Added

I've also created:
- `back/nixpacks.toml` - Explicit Nixpacks configuration
- `back/.railwayignore` - Ignores Dockerfile
- `back/railway.json` - Railway configuration

But **the Root Directory setting is the most important!**

## Still Not Working?

1. **Double-check Root Directory** is set to `back` (not `back/`)
2. **Check Railway logs** for specific errors
3. **Verify files exist**:
   - `back/package.json` ✅
   - `back/index.js` ✅
   - `back/prompt.txt` ✅
4. **Try deleting and recreating** the service

