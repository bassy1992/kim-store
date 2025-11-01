# 🚀 Deploy Backend to Fix CORS Error

## 🔴 Current Problem

Your frontend (`https://kinf.vercel.app`) can't connect to `localhost:8000` because localhost is not accessible from the internet.

**You need to deploy your Django backend!**

---

## ⚡ Fastest Solution: Deploy to Vercel (5 minutes)

Since your frontend is already on Vercel, deploy the backend there too:

### Step 1: Push Backend Files

```bash
git add back/vercel.json back/build.sh
git commit -m "Add Vercel config for backend"
git push origin main
```

### Step 2: Deploy Backend on Vercel

1. Go to: https://vercel.com/new
2. Click "Import Git Repository"
3. Select your repository
4. **IMPORTANT:** Set **Root Directory** to `back`
5. Add Environment Variables:
   ```
   SECRET_KEY=your-secret-key-change-this-to-something-random
   DEBUG=False
   ALLOWED_HOSTS=.vercel.app
   CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
   ```
6. Click "Deploy"

### Step 3: Update Frontend Environment Variable

After backend deploys, you'll get a URL like: `https://your-backend.vercel.app`

1. Go to your frontend project in Vercel
2. Settings → Environment Variables
3. Update or add:
   - **Name:** `VITE_API_URL`
   - **Value:** `https://your-backend.vercel.app/api`
4. Save

### Step 4: Redeploy Frontend

1. Go to Deployments tab
2. Click "Redeploy" on latest deployment
3. Wait for deployment to complete

**Done!** Your site should work now.

---

## 🎯 Alternative: Railway (Also Easy)

If Vercel doesn't work for Django, use Railway:

### Step 1: Deploy to Railway

1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your repository
4. Railway will auto-detect Django
5. Add PostgreSQL database (click "New" → "Database" → "PostgreSQL")

### Step 2: Set Environment Variables

In Railway dashboard, add:
```
SECRET_KEY=your-secret-key-change-this
DEBUG=False
ALLOWED_HOSTS=*.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
```

Railway will auto-provide database variables:
- `DATABASE_URL` (automatically set)

### Step 3: Deploy

Railway will automatically deploy. You'll get a URL like:
`https://your-app.railway.app`

### Step 4: Update Frontend

1. Go to Vercel → Your frontend project
2. Settings → Environment Variables
3. Update `VITE_API_URL` to: `https://your-app.railway.app/api`
4. Redeploy frontend

---

## 🧪 Temporary Solution: Use ngrok (Testing Only)

If you want to test with your local backend right now:

### Step 1: Install ngrok

Download from: https://ngrok.com/download

### Step 2: Start Django

```bash
cd back
python manage.py runserver
```

### Step 3: Expose with ngrok

In another terminal:
```bash
ngrok http 8000
```

You'll get a URL like: `https://abc123.ngrok.io`

### Step 4: Update Vercel Environment Variable

1. Go to Vercel → Your project → Settings → Environment Variables
2. Update `VITE_API_URL` to: `https://abc123.ngrok.io/api`
3. Redeploy frontend

### Step 5: Update Django CORS

In `back/.env`:
```
CORS_ALLOWED_ORIGINS=http://localhost:5173,https://kinf.vercel.app,https://abc123.ngrok.io
```

Restart Django server.

**Note:** ngrok URL changes every time you restart, so this is only for testing.

---

## 📋 What I've Prepared

✅ Created `back/vercel.json` - Vercel configuration for Django
✅ Created `back/build.sh` - Build script for deployment
✅ Updated `back/.env` - Added Vercel domain to CORS
✅ Backend is ready to deploy

---

## 🎯 Recommended: Railway

Railway is the easiest for Django:
- ✅ Auto-detects Django
- ✅ Free PostgreSQL included
- ✅ Easy environment variables
- ✅ Takes 5 minutes
- ✅ Free tier available

**Start here:** https://railway.app/new

---

## 🔍 After Deployment - Verify It Works

1. Open: https://kinf.vercel.app
2. Open browser console (F12)
3. Check Network tab
4. Should see requests to your backend URL (not localhost)
5. Products should load
6. No CORS errors

---

## 📚 Summary

**Current Status:**
- ✅ Frontend deployed: https://kinf.vercel.app
- ✅ Backend CORS configured
- ✅ Backend ready for deployment
- ❌ Backend not deployed yet
- ❌ Frontend needs backend URL

**Next Action:**
1. Deploy backend (Railway or Vercel)
2. Update frontend environment variable
3. Redeploy frontend
4. Test!

---

## 💡 Quick Decision Guide

**Choose Railway if:**
- You want the easiest setup
- You need PostgreSQL
- You want auto-deployments

**Choose Vercel if:**
- Your frontend is already on Vercel
- You want everything in one place
- You're okay with serverless Django

**Choose ngrok if:**
- You just want to test quickly
- You're not ready to deploy yet
- You understand it's temporary

---

**Ready to deploy? Pick an option above and follow the steps!**
