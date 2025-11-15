# 🚨 IMMEDIATE FIX - API 404 ERRORS

## Problem
Your Railway backend is down, causing all API calls to return 404 errors.

## Solution (15 minutes total)

### Step 1: Deploy Backend to Railway (10 minutes)

1. **Go to Railway**: https://railway.app/new
2. **Deploy from GitHub**: 
   - Click "Deploy from GitHub repo"
   - Select: `bassy1992/kim-store`
   - **IMPORTANT**: Set Root Directory to `back`
3. **Add PostgreSQL**: Click "Add PostgreSQL"
4. **Add Environment Variables**:
   ```
   SECRET_KEY=django-insecure-CHANGE-THIS-TO-RANDOM-STRING-12345
   DEBUG=False
   ALLOWED_HOSTS=.railway.app,.up.railway.app
   USE_POSTGRES=True
   CORS_ALLOWED_ORIGINS=https://kimmy-beta.vercel.app
   DJANGO_SETTINGS_MODULE=config.settings
   ```
5. **Generate SECRET_KEY**: Run this command locally and replace above:
   ```bash
   python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
   ```
6. **Deploy and wait** for completion (~5 minutes)
7. **Get your Railway URL** (e.g., `https://your-app.up.railway.app`)

### Step 2: Update Vercel Environment Variable (2 minutes)

1. **Go to Vercel Dashboard**: https://vercel.com/dashboard
2. **Select your project**: `kimmy-beta`
3. **Settings → Environment Variables**
4. **Update VITE_API_URL**:
   - Delete old value
   - Add new value: `https://your-new-railway-url.up.railway.app/api`
5. **Save**

### Step 3: Redeploy Frontend (3 minutes)

1. **In Vercel Dashboard**:
   - Go to **Deployments** tab
   - Click **"Redeploy"** on latest deployment
2. **Or push a commit**:
   ```bash
   git add .
   git commit -m "Update Railway URL"
   git push
   ```

## Alternative: Quick Local Test

If you want to test immediately while Railway deploys:

1. **Start local Django backend**:
   ```bash
   cd back
   python manage.py runserver
   ```

2. **In Vercel, set VITE_API_URL to**: `http://localhost:8000/api`

3. **Redeploy frontend**

## Verification

After deployment, test these URLs:
- **Backend API**: `https://your-railway-url.up.railway.app/api/`
- **Products**: `https://your-railway-url.up.railway.app/api/products/`
- **Frontend**: `https://kimmy-beta.vercel.app`

## Files Created
- `RAILWAY_ENV_QUICK_SETUP.txt` - Environment variables to copy
- `deploy-backend-now.bat` - Step-by-step guide

## Expected Result
✅ No more 404 errors  
✅ Products load correctly  
✅ Cart functionality works  
✅ API calls succeed  

## Need Help?
The proxy configuration is already fixed. You just need a working backend URL.