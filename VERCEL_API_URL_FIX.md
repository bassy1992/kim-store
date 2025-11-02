# Fix "No Products Found" - Set Vercel Environment Variable

## The Issue
Your frontend can't reach the backend API because `VITE_API_URL` is not set in Vercel.

## Quick Fix (2 minutes)

### Step 1: Go to Vercel Project Settings
1. Open https://vercel.com/dashboard
2. Select your project: **front**
3. Go to **Settings** → **Environment Variables**

### Step 2: Add API URL Variable

**Variable Name:** `VITE_API_URL`  
**Value:** `https://kim-store-production.up.railway.app/api`

**Important:**
- Include `/api` at the end
- Use `https://` protocol
- No trailing slash after `/api`

### Step 3: Redeploy

After adding the variable:
1. Go to **Deployments** tab
2. Click the three dots (...) on the latest deployment
3. Click **Redeploy**
4. Wait ~1-2 minutes

## Verify It Works

After redeployment:
1. Open https://front-pi-nine.vercel.app
2. Open browser console (F12)
3. Check Network tab
4. Should see API calls to: `https://kim-store-production.up.railway.app/api/products/`
5. Products should load successfully

## Current Status Checklist

### Railway Backend ✅
- [x] Deployed successfully
- [x] URL: https://kim-store-production.up.railway.app
- [ ] CORS configured (needs `CORS_ALLOWED_ORIGINS` or `CORS_ALLOW_ALL_ORIGINS=True`)

### Vercel Frontend
- [x] Deployed successfully  
- [x] URL: https://front-pi-nine.vercel.app
- [ ] `VITE_API_URL` environment variable (ADD THIS NOW)

## Test Backend Directly

Verify your backend is working:
```bash
curl https://kim-store-production.up.railway.app/api/products/
```

Should return JSON with products.

## If Still Not Working After Setting VITE_API_URL

1. **Check Railway CORS**: Make sure you set `CORS_ALLOW_ALL_ORIGINS=True` in Railway
2. **Check browser console**: Look for CORS or network errors
3. **Verify Railway is running**: Check deployment status
4. **Force redeploy both**: Redeploy Railway, then Vercel

## Environment Variables Summary

### Vercel (Frontend)
```
VITE_API_URL=https://kim-store-production.up.railway.app/api
```

### Railway (Backend)
```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
CORS_ALLOW_ALL_ORIGINS=True
DATABASE_URL=postgresql://... (auto-created)
```

Once both are set, your app will work perfectly! 🚀
