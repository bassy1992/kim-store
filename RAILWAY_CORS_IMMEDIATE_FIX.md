# Immediate CORS Fix for Railway

## Quick Fix (Choose One)

### Option 1: Temporarily Allow All Origins (Fast - 2 minutes)

**In Railway Dashboard → Variables:**

Add this variable:
```
CORS_ALLOW_ALL_ORIGINS=True
```

This will allow all origins temporarily while you test. **Not recommended for production long-term.**

### Option 2: Set Specific Origins (Recommended - 2 minutes)

**In Railway Dashboard → Variables:**

Make sure this variable exists and is correct:
```
Variable: CORS_ALLOWED_ORIGINS
Value: https://front-pi-nine.vercel.app,https://front-3jbu3b90f-bassys-projects-fca17413.vercel.app
```

**Important:**
- NO spaces after commas
- Include `https://` protocol
- NO trailing slashes

## After Setting Variables

1. Railway will auto-redeploy (watch the deployment logs)
2. Wait 1-2 minutes for deployment to complete
3. Refresh your frontend: https://front-pi-nine.vercel.app
4. Check browser console - CORS errors should be gone

## Verify Railway Variables Are Set

In Railway Dashboard → Your Service → Variables tab, you should see:

```
SECRET_KEY = your-secret-key
DEBUG = False
ALLOWED_HOSTS = .railway.app,.up.railway.app
CORS_ALLOWED_ORIGINS = https://front-pi-nine.vercel.app,https://front-3jbu3b90f-bassys-projects-fca17413.vercel.app
DATABASE_URL = postgresql://... (auto-created)
```

## Check Railway Deployment Logs

1. Go to Railway Dashboard
2. Click on your service
3. Click "Deployments" tab
4. Click on the latest deployment
5. Check logs for any errors

Look for lines like:
```
CORS_ALLOWED_ORIGINS: ['https://front-pi-nine.vercel.app', ...]
```

## Test Backend Directly

Test if your backend is running:
```bash
curl https://kim-store-production.up.railway.app/api/products/
```

Should return JSON data.

## If Still Not Working

1. **Check if Railway redeployed:** Look for "Success" status in Deployments
2. **Check environment variables:** Make sure they're saved (not just typed)
3. **Force redeploy:** In Railway, click "Deploy" → "Redeploy"
4. **Check logs:** Look for Python errors in deployment logs

## After It Works

Once CORS is working with `CORS_ALLOW_ALL_ORIGINS=True`, switch back to specific origins:

1. Remove `CORS_ALLOW_ALL_ORIGINS` variable (or set to `False`)
2. Ensure `CORS_ALLOWED_ORIGINS` has your Vercel URLs
3. Redeploy

This is more secure for production.
