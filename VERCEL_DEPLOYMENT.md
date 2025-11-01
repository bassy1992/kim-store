# 🚀 Vercel Deployment Guide

This guide will help you deploy your Kimmy's Fragrance e-commerce application to Vercel.

## 📋 Prerequisites

1. **Vercel Account** - Sign up at [vercel.com](https://vercel.com)
2. **Git Repository** - Push your code to GitHub, GitLab, or Bitbucket
3. **Django Backend** - Deploy separately (see Backend Deployment section)

## 🎯 Frontend Deployment (Vercel)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push to Git**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Project"
   - Select your Git repository
   - Vercel will auto-detect the configuration

3. **Configure Build Settings**
   - **Framework Preset:** Vite
   - **Root Directory:** `front` ⚠️ IMPORTANT: Set this to `front`
   - **Build Command:** `npm run build:client`
   - **Output Directory:** `dist/spa`
   - **Install Command:** `npm install`
   
   **Note:** Make sure to set the Root Directory to `front` in the Vercel dashboard!

4. **Environment Variables**
   Add these in Vercel Dashboard → Settings → Environment Variables:
   ```
   VITE_API_URL=https://your-django-backend.com
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from Frontend Directory**
   ```bash
   cd front
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? `kimmys-fragrance`
   - Directory? `./` (already in front folder)
   - Override settings? **N**

5. **Set Environment Variables**
   ```bash
   vercel env add VITE_API_URL
   ```
   Enter: `https://your-django-backend.com`

6. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## 🐍 Backend Deployment (Django)

Your Django backend needs to be deployed separately. Here are recommended options:

### Option 1: Railway (Recommended for Django)

1. **Sign up at [railway.app](https://railway.app)**
2. **Create New Project** → Deploy from GitHub
3. **Add PostgreSQL Database** (Railway provides this)
4. **Set Environment Variables:**
   ```
   DEBUG=False
   SECRET_KEY=your-secret-key
   ALLOWED_HOSTS=your-domain.railway.app
   DATABASE_URL=postgresql://... (auto-provided by Railway)
   CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
   ```
5. **Deploy** - Railway auto-detects Django and deploys

### Option 2: Render

1. **Sign up at [render.com](https://render.com)**
2. **New Web Service** → Connect GitHub
3. **Configure:**
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `gunicorn config.wsgi:application`
4. **Add PostgreSQL Database**
5. **Set Environment Variables** (same as above)

### Option 3: PythonAnywhere

1. **Sign up at [pythonanywhere.com](https://www.pythonanywhere.com)**
2. **Upload code** via Git or file upload
3. **Configure WSGI file**
4. **Set up database** (MySQL or PostgreSQL)
5. **Configure static files**

## 🔗 Connect Frontend to Backend

After deploying both:

1. **Update Frontend Environment Variable**
   ```bash
   vercel env add VITE_API_URL production
   ```
   Enter your Django backend URL: `https://your-backend.railway.app`

2. **Update Django CORS Settings**
   In `back/config/settings.py`:
   ```python
   CORS_ALLOWED_ORIGINS = [
       "https://your-vercel-app.vercel.app",
   ]
   ```

3. **Redeploy Both**
   - Push changes to trigger redeployment
   - Or use `vercel --prod` for frontend

## 📝 Post-Deployment Checklist

- [ ] Frontend loads correctly
- [ ] API calls work (check browser console)
- [ ] Products display from Django backend
- [ ] Cart functionality works
- [ ] Checkout redirects to Paystack
- [ ] Images load properly
- [ ] Mobile responsive on real devices
- [ ] SSL certificate active (https://)
- [ ] Custom domain configured (optional)

## 🔧 Troubleshooting

### Frontend Issues

**Build Fails:**
```bash
# Check build locally first
cd front
npm run build:client
```

**API Calls Fail:**
- Check CORS settings in Django
- Verify VITE_API_URL is correct
- Check browser console for errors

### Backend Issues

**500 Errors:**
- Check Django logs
- Verify DATABASE_URL is set
- Run migrations: `python manage.py migrate`

**Static Files Not Loading:**
```python
# In settings.py
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
STATIC_URL = '/static/'
```
Run: `python manage.py collectstatic`

## 🌐 Custom Domain

### Add Custom Domain to Vercel

1. Go to Project Settings → Domains
2. Add your domain (e.g., `kimmysfragrance.com`)
3. Update DNS records as instructed
4. Wait for SSL certificate (automatic)

### Add Custom Domain to Backend

1. Configure in your hosting provider
2. Update `ALLOWED_HOSTS` in Django settings
3. Update `CORS_ALLOWED_ORIGINS`
4. Update `VITE_API_URL` in Vercel

## 📊 Monitoring

- **Vercel Analytics:** Enable in project settings
- **Django Logs:** Check your hosting provider's logs
- **Error Tracking:** Consider Sentry for production

## 🎉 Success!

Your e-commerce site is now live! Share your URL:
- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-backend.railway.app`

## 💡 Tips

1. **Use Environment Variables** for all sensitive data
2. **Enable Caching** in Vercel for better performance
3. **Set up CI/CD** for automatic deployments
4. **Monitor Performance** with Vercel Analytics
5. **Backup Database** regularly

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Railway Documentation](https://docs.railway.app)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)

---

Need help? Check the troubleshooting section or contact support!
