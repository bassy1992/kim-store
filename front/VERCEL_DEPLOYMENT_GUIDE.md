# 🚀 Vercel Deployment Guide - Kimmy's Fragrance

## ✅ Status: READY TO DEPLOY

Your frontend is optimized for Vercel deployment as a static site.

---

## 🎯 Quick Deploy (5 Minutes)

### Option 1: Vercel Dashboard (Recommended)

1. **Push your code to Git:**
   ```bash
   git add .
   git commit -m "Deploy to Vercel"
   git push origin main
   ```

2. **Deploy on Vercel:**
   - Go to: https://vercel.com/new
   - Click "Import Git Repository"
   - Select your repository
   - **⚠️ CRITICAL: Set Root Directory to `front`**
   - Click "Deploy"

3. **Add Environment Variable:**
   - After deployment, go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-django-backend.railway.app/api`
   - Click "Save" and redeploy

### Option 2: Vercel CLI

```bash
cd front
npm install -g vercel
vercel login
vercel --prod
```

---

## ⚙️ Vercel Configuration

Your `vercel.json` is configured with:

- **Build Command:** `npm run build:client`
- **Output Directory:** `dist/spa`
- **Framework:** Vite (auto-detected)
- **SPA Routing:** All routes redirect to `index.html`
- **Asset Caching:** 1 year cache for static assets

---

## 🔧 Required Settings in Vercel Dashboard

| Setting | Value | Required |
|---------|-------|----------|
| **Root Directory** | `front` | ✅ YES |
| **Build Command** | `npm run build:client` | Auto-detected |
| **Output Directory** | `dist/spa` | Auto-detected |
| **Framework** | Vite | Auto-detected |
| **Node Version** | 20.x | Auto-detected |

---

## 🌐 Environment Variables

Add these in Vercel Dashboard after deployment:

### Production
```
VITE_API_URL=https://your-backend.railway.app/api
```

### How to Add:
1. Go to your project in Vercel
2. Settings → Environment Variables
3. Add variable name and value
4. Select "Production" environment
5. Click "Save"
6. Redeploy to apply changes

---

## 🔗 Backend Connection

Your Django backend should be deployed separately:

### Railway (Recommended)
1. Deploy backend to Railway: https://railway.app
2. Get your Railway URL (e.g., `https://your-app.railway.app`)
3. Update `VITE_API_URL` in Vercel with Railway URL
4. Configure CORS in Django:

```python
# back/config/settings.py
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-app.vercel.app",
]
```

---

## 📋 Post-Deployment Checklist

After deployment, verify:

- [ ] Site loads at your Vercel URL
- [ ] All routes work (Shop, About, Contact)
- [ ] Images load correctly
- [ ] Mobile responsive design works
- [ ] No console errors
- [ ] SSL certificate active (https)
- [ ] API calls work (after backend connected)

---

## 🐛 Troubleshooting

### Build Fails
- Check Vercel build logs
- Verify Root Directory is set to `front`
- Ensure all dependencies are in `package.json`

### 404 on Routes
- Verify `vercel.json` exists with rewrites
- Check build output directory is `dist/spa`

### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Redeploy after adding variables
- Check they're set for "Production" environment

### API Calls Fail
- Update `VITE_API_URL` with correct backend URL
- Configure CORS in Django backend
- Check browser console for errors

---

## 🎨 Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain (e.g., `kimmysfragrance.com`)
3. Update DNS records as instructed by Vercel
4. SSL certificate auto-generated
5. Update CORS in Django with new domain

---

## 📊 Expected Results

After successful deployment:

✅ **Live URL:** `https://your-project.vercel.app`  
✅ **SSL Certificate:** Automatic HTTPS  
✅ **Global CDN:** Edge network deployment  
✅ **Auto-Deploy:** On git push to main  
✅ **Preview URLs:** For pull requests  
✅ **Build Time:** ~30-60 seconds  
✅ **Bundle Size:** ~460 KB (gzipped: ~133 KB)  

---

## 🚀 Deployment Commands

```bash
# Test build locally
npm run build:client

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Check environment variables
vercel env ls
```

---

## 📱 Continuous Deployment

Once connected to Git:

- **Push to main** → Auto-deploys to production
- **Push to branch** → Creates preview deployment
- **Open PR** → Preview URL in PR comments

---

## ✅ What's Configured

- [x] `vercel.json` - Optimized configuration
- [x] `.vercelignore` - Excludes unnecessary files
- [x] `.env.production` - Environment template
- [x] `package.json` - Build scripts
- [x] `vite.config.ts` - Output directory
- [x] Asset caching headers
- [x] SPA routing rewrites

---

## 🎯 Next Steps

1. ✅ Deploy frontend to Vercel
2. 🔄 Ensure Django backend is on Railway
3. 🔗 Update `VITE_API_URL` with backend URL
4. 🧪 Test all functionality
5. 🌐 Add custom domain (optional)
6. 🚀 Launch!

---

**Ready to deploy!** Follow the Quick Deploy steps above to go live in 5 minutes.
