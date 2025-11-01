# 🚂 Railway Deployment Guide - Django Backend

## ✅ Status: READY FOR RAILWAY DEPLOYMENT

Your Django backend is fully configured for Railway deployment!

---

## 🚀 Deploy to Railway (5 Minutes)

### Step 1: Create Railway Account
1. Go to **https://railway.app**
2. Sign up with GitHub (recommended)
3. Verify your email

### Step 2: Create New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose **bassy1992/kim-store**
4. Railway will auto-detect Django

### Step 3: Add PostgreSQL Database
1. In your project, click **"New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway automatically connects it to your app

### Step 4: Configure Environment Variables

Go to your Django service → **Variables** tab and add:

```env
# Required Variables
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=.railway.app
USE_POSTGRES=True

# CORS (Add your Vercel frontend URL after deployment)
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app

# Railway provides DATABASE_URL automatically - no need to set it!
```

**Generate a secure SECRET_KEY:**
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Configure Root Directory

⚠️ **IMPORTANT:** Set the root directory to `back`

1. Go to **Settings** tab
2. Find **"Root Directory"**
3. Set to: `back`
4. Click **"Save"**

### Step 6: Deploy

1. Railway will automatically deploy
2. Wait for build to complete (~2-3 minutes)
3. Check deployment logs for any errors

---

## 📋 Configuration Files Created

| File | Purpose |
|------|---------|
| `railway.json` | Railway-specific configuration |
| `Procfile` | Process commands for web and release |
| `runtime.txt` | Python version specification |
| `.env.example` | Environment variables template |
| `requirements.txt` | Updated with Railway dependencies |

---

## 🔧 What Was Configured

### ✅ Database Configuration
- **dj-database-url** for Railway's DATABASE_URL
- Automatic PostgreSQL connection
- Connection pooling enabled
- Health checks configured

### ✅ Static Files
- **WhiteNoise** for serving static files
- Compressed static files storage
- Automatic collectstatic on deploy

### ✅ Security
- DEBUG=False for production
- Secure SECRET_KEY configuration
- ALLOWED_HOSTS configured
- CORS properly set up

### ✅ WSGI Server
- **Gunicorn** configured
- Proper binding to Railway's PORT
- Auto-restart on failure

---

## 🌐 Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_KEY` | Django secret key | `django-insecure-...` |
| `DEBUG` | Debug mode (False for production) | `False` |
| `ALLOWED_HOSTS` | Allowed hostnames | `.railway.app` |
| `USE_POSTGRES` | Use PostgreSQL | `True` |
| `CORS_ALLOWED_ORIGINS` | Frontend URLs | `https://your-app.vercel.app` |

### Auto-Provided by Railway

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `PORT` | Port to bind the application |
| `RAILWAY_ENVIRONMENT` | Current environment |

---

## 🔗 After Deployment

### 1. Get Your Backend URL
After deployment, Railway provides a URL like:
```
https://your-app.up.railway.app
```

### 2. Update Frontend Environment Variable
In Vercel, update `VITE_API_URL`:
```
VITE_API_URL=https://your-app.up.railway.app/api
```

### 3. Update CORS Settings
In Railway, update `CORS_ALLOWED_ORIGINS`:
```
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### 4. Run Migrations
Railway automatically runs migrations via the Procfile `release` command.

To manually run migrations:
1. Go to your service
2. Click **"Deploy Logs"**
3. Verify migrations ran successfully

### 5. Create Superuser
To create an admin user:

1. Go to your service → **Settings**
2. Click **"Deploy"** → **"Custom Start Command"**
3. Temporarily change to: `python manage.py createsuperuser --noinput`
4. Or use Railway CLI:
```bash
railway run python manage.py createsuperuser
```

---

## 🧪 Testing Your Deployment

### Test API Endpoints

```bash
# Health check
curl https://your-app.up.railway.app/api/

# Products endpoint
curl https://your-app.up.railway.app/api/products/

# Admin panel
https://your-app.up.railway.app/admin/
```

### Check Logs

1. Go to your service
2. Click **"Deployments"**
3. Click on latest deployment
4. View **"Deploy Logs"** and **"Build Logs"**

---

## 🐛 Troubleshooting

### Build Fails

**Issue:** Build fails with dependency errors

**Solution:**
```bash
# Test locally first
cd back
pip install -r requirements.txt
python manage.py check
```

### Database Connection Fails

**Issue:** Can't connect to PostgreSQL

**Solution:**
- Verify PostgreSQL service is running
- Check `DATABASE_URL` is set (Railway does this automatically)
- Ensure `USE_POSTGRES=True` is set

### Static Files Not Loading

**Issue:** Admin panel has no CSS

**Solution:**
- Verify WhiteNoise is in MIDDLEWARE
- Check `STATIC_ROOT` is set correctly
- Run: `python manage.py collectstatic --noinput`

### CORS Errors

**Issue:** Frontend can't connect to backend

**Solution:**
- Update `CORS_ALLOWED_ORIGINS` with your Vercel URL
- Ensure no trailing slashes in URLs
- Check browser console for exact error

### 500 Internal Server Error

**Issue:** API returns 500 errors

**Solution:**
1. Check Railway logs for detailed error
2. Verify all environment variables are set
3. Check `DEBUG=False` is set
4. Ensure migrations ran successfully

---

## 📊 Railway Features

### Automatic Deployments
- Push to GitHub → Auto-deploy
- Pull requests → Preview deployments
- Rollback to previous deployments

### Monitoring
- View logs in real-time
- Monitor resource usage
- Set up alerts

### Scaling
- Vertical scaling (more CPU/RAM)
- Horizontal scaling (multiple instances)
- Auto-scaling based on load

---

## 💰 Pricing

### Free Tier
- $5 free credit per month
- Enough for small projects
- Includes PostgreSQL database

### Pro Plan
- $20/month
- More resources
- Priority support

---

## 🔒 Security Best Practices

### ✅ Implemented
- [x] DEBUG=False in production
- [x] Secure SECRET_KEY
- [x] ALLOWED_HOSTS configured
- [x] CORS properly set up
- [x] Database connection pooling
- [x] Static files served securely

### 📝 Recommended
- [ ] Set up custom domain with SSL
- [ ] Enable Railway's built-in monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Regular database backups
- [ ] Environment-specific settings

---

## 🚀 Next Steps

1. ✅ **Backend Deployed** (You are here!)
2. 🔄 **Update Frontend** - Add backend URL to Vercel
3. 🧪 **Test Integration** - Verify frontend connects to backend
4. 👤 **Create Admin User** - Access Django admin
5. 📦 **Add Products** - Populate your store
6. 🌐 **Custom Domain** (Optional) - Add your own domain
7. 🎉 **Go Live!**

---

## 📚 Additional Resources

- [Railway Documentation](https://docs.railway.app/)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/stable/howto/deployment/checklist/)
- [Gunicorn Documentation](https://docs.gunicorn.org/)
- [WhiteNoise Documentation](http://whitenoise.evans.io/)

---

## 🎯 Quick Commands

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project
railway link

# View logs
railway logs

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser

# Open in browser
railway open
```

---

**Deployment Status:** 🟢 READY  
**Configuration:** ✅ COMPLETE  
**Action Required:** Deploy to Railway! 🚂
