# Fix CORS Error - Add Vercel Frontend URL

## The Issue
Your frontend at `https://front-pi-nine.vercel.app` is blocked by CORS because it's not in the allowed origins list.

## Quick Fix (2 minutes)

### Step 1: Go to Railway Environment Variables
1. Open Railway Dashboard: https://railway.app/dashboard
2. Click on your service: **kim-store-production**
3. Go to **Variables** tab

### Step 2: Update CORS_ALLOWED_ORIGINS

Find the `CORS_ALLOWED_ORIGINS` variable and update it to:

```
https://front-pi-nine.vercel.app,http://localhost:5173,http://localhost:3000
```

**Important:** 
- No spaces after commas
- Include `https://` protocol
- No trailing slash

### Step 3: Redeploy (Automatic)
Railway will automatically redeploy with the new environment variable.

## Alternative: Add Variable if Not Exists

If `CORS_ALLOWED_ORIGINS` doesn't exist, add it:

**Variable Name:** `CORS_ALLOWED_ORIGINS`  
**Value:** `https://front-pi-nine.vercel.app,http://localhost:5173,http://localhost:3000`

## Verify the Fix

After Railway redeploys (takes ~1-2 minutes):

1. Open your frontend: https://front-pi-nine.vercel.app
2. Check browser console - CORS errors should be gone
3. Products should load successfully

## Current Environment Variables Checklist

Make sure you have all these set in Railway:

- ✅ `SECRET_KEY` - Your Django secret key
- ✅ `DEBUG` - Set to `False`
- ✅ `ALLOWED_HOSTS` - `.railway.app,.up.railway.app`
- ✅ `CORS_ALLOWED_ORIGINS` - `https://front-pi-nine.vercel.app,http://localhost:5173,http://localhost:3000`
- ✅ `DATABASE_URL` - Auto-created by Railway PostgreSQL
- ✅ `DJANGO_SETTINGS_MODULE` - `config.settings`

## Test Your API

Once deployed, test directly:
```bash
curl https://kim-store-production.up.railway.app/api/products/
```

Should return JSON data without errors.
