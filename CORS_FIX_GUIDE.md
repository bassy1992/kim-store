# 🔧 CORS & API Connection Fix Guide

## ✅ Issue Identified

Your frontend is deployed at `https://kinf.vercel.app` but:
1. ❌ Django backend is not allowing requests from Vercel (CORS error)
2. ❌ Frontend is pointing to `localhost:8000` (needs production backend URL)

---

## 🛠️ Fix Applied (Backend CORS)

✅ **Updated:** `back/.env`
- Added `https://kinf.vercel.app` to `CORS_ALLOWED_ORIGINS`

**If your backend is running locally:**
```bash
# Restart Django server to apply changes
cd back
python manage.py runserver
```

---

## 🚀 Next Steps: Deploy Your Backend

Your Django backend needs to be deployed to production. Here are your options:

### Option 1: Railway (Recommended - Easiest)

1. **Sign up:** https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add PostgreSQL Database** (Railway provides this automatically)
4. **Set Environment Variables:**
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=your-app.railway.app
   USE_POSTGRES=True
   CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
   ```
5. **Deploy** - Railway auto-detects Django

**After deployment, you'll get a URL like:**
`https://your-app.railway.app`

### Option 2: Render

1. **Sign up:** https://render.com
2. **New Web Service** → Connect GitHub
3. **Configure:**
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `gunicorn config.wsgi:application`
4. **Add PostgreSQL Database**
5. **Set Environment Variables** (same as above)

### Option 3: Vercel (Backend as Serverless)

You can also deploy Django to Vercel, but it requires additional configuration:
- Install `vercel` package
- Create `vercel.json` for Django
- Configure serverless functions

---

## 🔗 Connect Frontend to Backend

After deploying your backend:

### Step 1: Update Vercel Environment Variable

1. Go to: https://vercel.com/dashboard
2. Select your project (`kinf`)
3. Go to **Settings** → **Environment Variables**
4. Find `VITE_API_URL` or add it:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend.railway.app/api`
   - **Environment:** Production
5. Click **Save**

### Step 2: Redeploy Frontend

After updating the environment variable:
```bash
# Trigger a redeployment
git commit --allow-empty -m "Update API URL"
git push origin main
```

Or in Vercel Dashboard:
- Go to **Deployments**
- Click **Redeploy** on the latest deployment

---

## 🧪 Testing Locally with Deployed Frontend

If you want to test with your local backend temporarily:

### Option A: Use ngrok (Expose Local Backend)

1. **Install ngrok:** https://ngrok.com/download
2. **Start Django:**
   ```bash
   cd back
   python manage.py runserver
   ```
3. **Expose with ngrok:**
   ```bash
   ngrok http 8000
   ```
4. **Update Vercel Environment Variable:**
   - `VITE_API_URL` = `https://your-ngrok-url.ngrok.io/api`
5. **Update Django CORS:**
   ```
   CORS_ALLOWED_ORIGINS=...,https://your-ngrok-url.ngrok.io
   ```

### Option B: Allow All Origins (Development Only)

⚠️ **NOT RECOMMENDED FOR PRODUCTION**

In `back/config/settings.py`:
```python
CORS_ALLOW_ALL_ORIGINS = True  # Only for testing!
```

---

## 📋 Quick Checklist

- [x] Backend CORS updated to allow `https://kinf.vercel.app`
- [ ] Backend deployed to production (Railway/Render/Vercel)
- [ ] Backend URL obtained (e.g., `https://your-app.railway.app`)
- [ ] Vercel environment variable `VITE_API_URL` updated
- [ ] Frontend redeployed on Vercel
- [ ] Test API calls work from deployed frontend

---

## 🔍 Verify It's Working

After completing the steps:

1. **Open your site:** https://kinf.vercel.app
2. **Open Browser Console** (F12)
3. **Check Network Tab:**
   - Should see requests to your backend URL (not localhost)
   - Should get 200 responses (not CORS errors)
4. **Check Products Load:**
   - Homepage should display products
   - No CORS errors in console

---

## 🐛 Troubleshooting

### Still Getting CORS Errors?

1. **Check Backend CORS Settings:**
   ```bash
   cd back
   cat .env | grep CORS
   ```
   Should include: `https://kinf.vercel.app`

2. **Restart Backend:**
   ```bash
   # If running locally
   python manage.py runserver
   
   # If on Railway/Render
   Redeploy from dashboard
   ```

3. **Check Django Logs:**
   - Look for CORS-related errors
   - Verify requests are reaching the backend

### Frontend Still Using localhost?

1. **Check Vercel Environment Variable:**
   - Go to Settings → Environment Variables
   - Verify `VITE_API_URL` is set correctly
   - Make sure it's set for "Production" environment

2. **Redeploy Frontend:**
   - Environment variables only apply to new deployments
   - Trigger a new deployment

3. **Clear Browser Cache:**
   - Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

---

## 📚 Recommended: Deploy Backend to Railway

Railway is the easiest option for Django:

1. **Quick Setup:** Auto-detects Django
2. **Free PostgreSQL:** Included
3. **Easy Environment Variables:** Web interface
4. **Auto-deploys:** On Git push
5. **Free Tier:** Good for testing

**Start here:** https://railway.app

---

## 🎯 Summary

**Current Status:**
- ✅ Frontend deployed: https://kinf.vercel.app
- ✅ Backend CORS configured for Vercel
- ⏳ Backend needs production deployment
- ⏳ Frontend needs backend URL update

**Next Action:**
1. Deploy backend to Railway/Render
2. Update `VITE_API_URL` in Vercel
3. Redeploy frontend
4. Test!

---

## 💡 Quick Win: Railway Deployment

```bash
# 1. Push your code to GitHub (if not already)
git add .
git commit -m "Ready for Railway deployment"
git push origin main

# 2. Go to Railway
# https://railway.app/new

# 3. Import from GitHub
# Select your repository

# 4. Add PostgreSQL
# Click "New" → "Database" → "PostgreSQL"

# 5. Set Environment Variables
# In Railway dashboard, add the variables listed above

# 6. Deploy!
# Railway will automatically deploy

# 7. Get your URL
# Copy the URL from Railway dashboard

# 8. Update Vercel
# Add VITE_API_URL with your Railway URL
```

---

Need help? Check the backend deployment guide in `back/DEPLOYMENT.md`
