# 🚀 Deploy Frontend to Vercel - Quick Start

## ✅ Status: READY TO DEPLOY

Your frontend is fully configured and tested. Build successful! ✓

---

## 🎯 Deploy in 5 Minutes

### Option 1: Vercel Dashboard (Easiest) ⭐

1. **Push to GitHub** (if not done)
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to: **https://vercel.com/new**
   - Click **"Import Git Repository"**
   - Select your repository
   - ⚠️ **Set Root Directory to:** `front`
   - Click **"Deploy"**

3. **Add Environment Variable**
   - Go to: **Project Settings → Environment Variables**
   - Add: `VITE_API_URL` = `http://localhost:8000/api`
   - Click **"Save"**

**Done!** Your site is live at `https://your-project.vercel.app`

---

### Option 2: Vercel CLI (For Developers)

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd front
vercel --prod
```

---

## 📋 Quick Checklist

- [x] Build tested and working ✓
- [x] `vercel.json` configured ✓
- [x] Environment variables ready ✓
- [ ] Push to Git
- [ ] Deploy on Vercel
- [ ] Add `VITE_API_URL` variable
- [ ] Test live site

---

## ⚠️ Important Settings

When deploying via Vercel Dashboard:

| Setting | Value |
|---------|-------|
| **Root Directory** | `front` ⚠️ CRITICAL |
| **Build Command** | `npm run build:client` |
| **Output Directory** | `dist/spa` |
| **Framework** | Vite |

---

## 🔗 After Deployment

1. **Deploy Backend** (Django)
   - Use Railway: https://railway.app
   - Or Render: https://render.com

2. **Update Environment Variable**
   - Change `VITE_API_URL` to your backend URL
   - Example: `https://your-backend.railway.app/api`

3. **Configure CORS in Django**
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://your-vercel-app.vercel.app",
   ]
   ```

---

## 🎉 Success!

Your e-commerce site will be live with:
- ✅ Automatic HTTPS
- ✅ Global CDN
- ✅ Auto-deployments on push
- ✅ Preview deployments for PRs

---

## 📚 Full Documentation

- Detailed guide: `front/VERCEL_DEPLOY_CHECKLIST.md`
- Deployment guide: `VERCEL_DEPLOYMENT.md`
- Backend guide: `back/DEPLOYMENT.md`

---

## 🐛 Need Help?

**Build fails?**
```bash
cd front
npm run build:client
```

**Routes not working?**
- Check `vercel.json` exists in `front` folder

**API calls fail?**
- Update `VITE_API_URL` in Vercel
- Configure CORS in Django backend

---

**Ready to deploy?** Run: `deploy-frontend.bat` or follow Option 1 above! 🚀
