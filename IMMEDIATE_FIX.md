# ⚡ Immediate Fix for CORS Error

## 🔴 Problem
Your frontend at `https://kinf.vercel.app` can't connect to `localhost:8000` because:
1. Localhost is not accessible from the internet
2. You need a deployed backend

---

## ✅ What I Fixed
- Added `https://kinf.vercel.app` to Django CORS allowed origins
- Backend will now accept requests from your Vercel domain

---

## 🚀 Two Options to Fix Completely

### Option 1: Deploy Backend (Recommended)

**Fastest: Railway (5 minutes)**

1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select your repository
4. Click "Add variables" and add:
   ```
   SECRET_KEY=your-secret-key-change-this
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app
   USE_POSTGRES=True
   CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
   ```
5. Railway will auto-deploy your Django backend
6. Copy your Railway URL (e.g., `https://your-app.railway.app`)
7. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
8. Update or add:
   - Name: `VITE_API_URL`
   - Value: `https://your-app.railway.app/api`
9. Redeploy frontend (Deployments → Redeploy)

**Done!** Your site will work in ~5 minutes.

---

### Option 2: Test with Local Backend (Temporary)

**Use ngrok to expose your local backend:**

1. **Install ngrok:** https://ngrok.com/download

2. **Start Django:**
   ```bash
   cd back
   python manage.py runserver
   ```

3. **In another terminal, run ngrok:**
   ```bash
   ngrok http 8000
   ```

4. **Copy the ngrok URL** (e.g., `https://abc123.ngrok.io`)

5. **Update Django CORS** in `back/.env`:
   ```
   CORS_ALLOWED_ORIGINS=http://localhost:5173,https://kinf.vercel.app,https://abc123.ngrok.io
   ```

6. **Restart Django server**

7. **Update Vercel Environment Variable:**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Update `VITE_API_URL` to: `https://abc123.ngrok.io/api`

8. **Redeploy frontend**

**Note:** ngrok URLs change each time you restart, so this is only for testing.

---

## 🎯 Recommended: Deploy to Railway

Railway is the easiest and fastest option:
- ✅ Auto-detects Django
- ✅ Free PostgreSQL included
- ✅ Free tier available
- ✅ Takes ~5 minutes
- ✅ Permanent URL

**Start here:** https://railway.app/new

---

## 📝 Current Status

✅ **Frontend:** Deployed at https://kinf.vercel.app  
✅ **Backend CORS:** Configured to allow Vercel  
❌ **Backend:** Not deployed (still on localhost)  
❌ **API Connection:** Frontend needs backend URL  

---

## 🔧 Files Updated

- `back/.env` - Added Vercel domain to CORS
- `back/.env.example` - Updated with production example

---

## 💡 Next Step

**Deploy your backend to Railway** (5 minutes):
1. https://railway.app/new
2. Import from GitHub
3. Add environment variables
4. Deploy
5. Update Vercel with Railway URL
6. Done!

Full guide: `CORS_FIX_GUIDE.md`
