# Fix CSRF 403 Error on Railway

## The Issue
Django is blocking requests because it doesn't trust the Railway domain.

## Quick Fix

### Option 1: Push Code Changes (Recommended)
I've already added CSRF trusted origins to the code. Just push:

```bash
git add .
git commit -m "Fix CSRF trusted origins for Railway"
git push
```

Railway will auto-deploy and the error will be fixed!

### Option 2: Set Environment Variable (Alternative)
If you want to control it via environment variables:

**In Railway Dashboard → Variables:**

Add:
```
CSRF_TRUSTED_ORIGINS=https://kim-store-production.up.railway.app,https://*.railway.app,https://*.up.railway.app
```

## What Was Fixed

Added to `back/config/settings.py`:
```python
CSRF_TRUSTED_ORIGINS = [
    'https://*.railway.app',
    'https://*.up.railway.app',
    'https://kim-store-production.up.railway.app'
]
```

This tells Django to trust requests from Railway domains.

## Complete Railway Environment Variables

Make sure you have all these set:

```
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
CORS_ALLOW_ALL_ORIGINS=True
CSRF_TRUSTED_ORIGINS=https://*.railway.app,https://*.up.railway.app
DATABASE_URL=postgresql://... (auto-created)
```

## After Deployment

1. Wait for Railway to redeploy (~2 minutes)
2. Test your API: https://kim-store-production.up.railway.app/api/products/
3. CSRF error should be gone ✅

## If Still Getting CSRF Error

1. **Check DEBUG setting**: Set `DEBUG=False` in Railway
2. **Verify deployment**: Make sure latest code is deployed
3. **Check logs**: Look for CSRF errors in Railway logs
4. **Clear browser cache**: Sometimes old CSRF tokens are cached

Your CSRF issue will be fixed after pushing! 🚀
