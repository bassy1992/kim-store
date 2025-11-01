# ⚡ Quick Commands to Fix Your Site

## 🎯 Choose Your Path

---

## Path 1: Deploy to Railway (Recommended)

### Commands to Run:
```bash
# 1. Commit the new files
git add .
git commit -m "Prepare backend for deployment"
git push origin main
```

### Then in Browser:
1. Go to: **https://railway.app/new**
2. Click "Deploy from GitHub repo"
3. Select your repository
4. Click "Add variables" and paste:
   ```
   SECRET_KEY=django-insecure-change-this-to-random-string-12345
   DEBUG=False
   ALLOWED_HOSTS=*.railway.app
   USE_POSTGRES=True
   CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
   ```
5. Click "Deploy"
6. Wait for deployment (~2 minutes)
7. Copy your Railway URL (e.g., `https://your-app.railway.app`)

### Update Frontend:
1. Go to: **https://vercel.com/dashboard**
2. Click on your `kinf` project
3. Go to **Settings** → **Environment Variables**
4. Find or add `VITE_API_URL`
5. Set value to: `https://your-app.railway.app/api` (use your actual Railway URL)
6. Go to **Deployments** tab
7. Click **Redeploy** on the latest deployment

**Done!** Wait 1-2 minutes and check https://kinf.vercel.app

---

## Path 2: Quick Test with ngrok (Temporary)

### Commands to Run:

```bash
# 1. Install ngrok (if not installed)
# Download from: https://ngrok.com/download
# Or use: choco install ngrok (Windows with Chocolatey)

# 2. Start Django (in one terminal)
cd back
python manage.py runserver

# 3. Start ngrok (in another terminal)
ngrok http 8000
```

### Copy the ngrok URL
You'll see something like:
```
Forwarding  https://abc123.ngrok.io -> http://localhost:8000
```

Copy the `https://abc123.ngrok.io` URL

### Update Vercel:
1. Go to: **https://vercel.com/dashboard**
2. Click on your `kinf` project
3. Settings → Environment Variables
4. Update `VITE_API_URL` to: `https://abc123.ngrok.io/api`
5. Deployments → Redeploy

**Note:** ngrok URL changes every time you restart!

---

## Path 3: Deploy Backend to Vercel

### Commands to Run:
```bash
# 1. Commit the new files
git add .
git commit -m "Add Vercel config for backend"
git push origin main
```

### Then in Browser:
1. Go to: **https://vercel.com/new**
2. Import your repository
3. **Set Root Directory to:** `back`
4. Add Environment Variables:
   ```
   SECRET_KEY=your-secret-key-here
   DEBUG=False
   ALLOWED_HOSTS=.vercel.app
   CORS_ALLOWED_ORIGINS=https://kinf.vercel.app
   ```
5. Deploy
6. Copy backend URL

### Update Frontend:
1. Go to frontend project in Vercel
2. Settings → Environment Variables
3. Update `VITE_API_URL` to your backend URL + `/api`
4. Redeploy

---

## 🔍 Verify It's Working

After deployment:

```bash
# Test backend is accessible
curl https://your-backend-url.com/api/products/

# Should return JSON data, not an error
```

Then open: **https://kinf.vercel.app**
- Open browser console (F12)
- Should see no CORS errors
- Products should load

---

## 📋 Current Files Ready

✅ `back/vercel.json` - Vercel config
✅ `back/build.sh` - Build script
✅ `back/.env` - CORS configured
✅ `back/requirements.txt` - Dependencies ready

---

## 🎯 My Recommendation

**Use Railway** - It's the easiest:
1. Takes 5 minutes
2. Auto-detects Django
3. Free PostgreSQL included
4. No complex configuration needed

Start here: https://railway.app/new

---

## 💡 Quick Checklist

- [ ] Backend deployed (Railway/Vercel/ngrok)
- [ ] Backend URL obtained
- [ ] Vercel environment variable updated
- [ ] Frontend redeployed
- [ ] Site tested and working

---

## 🆘 Need Help?

Check these guides:
- `DEPLOY_BACKEND_NOW.md` - Detailed deployment steps
- `ACTION_REQUIRED.txt` - Visual summary
- `CORS_FIX_GUIDE.md` - Complete troubleshooting

---

**Ready? Pick a path above and follow the steps!**
