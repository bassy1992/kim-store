# 🚂 Django Backend Prepared for Railway

## ✅ Status: PRODUCTION READY

Your Django backend is fully configured and ready for Railway deployment!

---

## 📦 What Was Prepared

### Configuration Files Created
1. **railway.json** - Railway-specific build and deploy configuration
2. **Procfile** - Process commands for web server and migrations
3. **runtime.txt** - Python version specification (3.11.7)
4. **.env.example** - Environment variables template
5. **RAILWAY_DEPLOYMENT.md** - Comprehensive deployment guide
6. **RAILWAY_READY.md** - Quick deployment checklist
7. **deploy-backend.bat** - Automated deployment helper script

### Django Settings Updated
- ✅ **Database:** Added dj-database-url for Railway's DATABASE_URL
- ✅ **Static Files:** Configured WhiteNoise for serving static files
- ✅ **WSGI Server:** Gunicorn configured for production
- ✅ **Security:** Production-ready security settings
- ✅ **CORS:** Properly configured for frontend integration

### Dependencies Added
```
dj-database-url==2.1.0  # Parse Railway's DATABASE_URL
whitenoise==6.6.0       # Serve static files efficiently
gunicorn==21.2.0        # Production WSGI server
psycopg2-binary==2.9.9  # PostgreSQL adapter
```

---

## 🚀 Quick Deploy (3 Steps)

### Step 1: Deploy to Railway
```
1. Go to: https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select: bassy1992/kim-store
4. Set Root Directory to: back
```

### Step 2: Add PostgreSQL
```
1. Click "New" → "Database" → "PostgreSQL"
2. Railway auto-connects it (DATABASE_URL provided)
```

### Step 3: Set Environment Variables
```env
SECRET_KEY=<generate-new-secret-key>
DEBUG=False
ALLOWED_HOSTS=.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

---

## 🔧 Railway Configuration

### Build Command
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput
```

### Start Command
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT
```

### Release Command (Automatic Migrations)
```bash
python manage.py migrate --noinput
```

### Root Directory
⚠️ **CRITICAL:** Must be set to `back` in Railway settings

---

## 🌐 Environment Variables

### Required (Set in Railway)

| Variable | Value | Description |
|----------|-------|-------------|
| `SECRET_KEY` | Generate new | Django secret key for security |
| `DEBUG` | `False` | Disable debug mode in production |
| `ALLOWED_HOSTS` | `.railway.app` | Allowed hostnames |
| `USE_POSTGRES` | `True` | Enable PostgreSQL |
| `CORS_ALLOWED_ORIGINS` | Vercel URL | Frontend URL for CORS |

### Auto-Provided by Railway

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string (automatic) |
| `PORT` | Application port (automatic) |
| `RAILWAY_ENVIRONMENT` | Current environment |

---

## 📋 Post-Deployment Steps

### 1. Verify Deployment
```bash
# Check API is live
curl https://your-app.up.railway.app/api/

# Check admin panel
https://your-app.up.railway.app/admin/
```

### 2. Create Admin User
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and link
railway login
railway link

# Create superuser
railway run python manage.py createsuperuser
```

### 3. Update Frontend
In Vercel, set environment variable:
```
VITE_API_URL=https://your-app.up.railway.app/api
```

### 4. Update CORS
In Railway, update:
```
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

---

## 🧪 Testing Checklist

After deployment:

- [ ] API endpoint responds: `/api/`
- [ ] Admin panel loads: `/admin/`
- [ ] Database migrations ran successfully
- [ ] Static files load correctly
- [ ] CORS allows frontend requests
- [ ] Products API works: `/api/products/`
- [ ] Orders API works: `/api/orders/`
- [ ] Can create admin user
- [ ] Frontend connects successfully

---

## 🐛 Troubleshooting

### Build Fails
**Check:** Railway build logs for specific errors
**Solution:** Verify all dependencies in requirements.txt

### Database Connection Error
**Check:** PostgreSQL service is running
**Solution:** Verify DATABASE_URL is set (Railway does this automatically)

### Static Files Not Loading
**Check:** WhiteNoise middleware is configured
**Solution:** Run `python manage.py collectstatic --noinput`

### CORS Errors
**Check:** Browser console for exact error
**Solution:** Update CORS_ALLOWED_ORIGINS with exact Vercel URL (no trailing slash)

### 500 Internal Server Error
**Check:** Railway deployment logs
**Solution:** Verify all environment variables are set correctly

---

## 📊 Expected Results

After successful deployment:

✅ **Backend URL:** `https://your-app.up.railway.app`  
✅ **API Base:** `https://your-app.up.railway.app/api/`  
✅ **Admin Panel:** `https://your-app.up.railway.app/admin/`  
✅ **API Docs:** `https://your-app.up.railway.app/api/schema/swagger-ui/`  
✅ **Database:** PostgreSQL (managed by Railway)  
✅ **SSL:** Automatic HTTPS  
✅ **Auto-Deploy:** On git push to main  
✅ **Migrations:** Run automatically on deploy  

---

## 🔗 Integration with Frontend

### Complete Flow

1. **Backend on Railway:** `https://your-backend.up.railway.app`
2. **Frontend on Vercel:** `https://your-frontend.vercel.app`
3. **Frontend calls Backend:** Via VITE_API_URL
4. **CORS allows requests:** Via CORS_ALLOWED_ORIGINS

### Configuration

**In Vercel (Frontend):**
```env
VITE_API_URL=https://your-backend.up.railway.app/api
```

**In Railway (Backend):**
```env
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

---

## 💰 Railway Pricing

### Hobby Plan (Free)
- $5 free credit per month
- Enough for development/small projects
- Includes PostgreSQL database
- 500 MB RAM, 1 vCPU

### Pro Plan ($20/month)
- More resources
- Priority support
- Better performance
- Team collaboration

---

## 🔒 Security Checklist

### ✅ Implemented
- [x] DEBUG=False in production
- [x] Secure SECRET_KEY
- [x] ALLOWED_HOSTS configured
- [x] CORS properly set up
- [x] Database connection pooling
- [x] Static files served securely via WhiteNoise
- [x] HTTPS enforced (Railway default)

### 📝 Recommended Next Steps
- [ ] Set up custom domain with SSL
- [ ] Enable Railway monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure database backups
- [ ] Set up CI/CD pipeline
- [ ] Add rate limiting
- [ ] Configure logging

---

## 📚 Documentation Reference

### Quick Guides
- **RAILWAY_READY.md** - Quick deployment checklist
- **RAILWAY_DEPLOYMENT.md** - Comprehensive deployment guide
- **.env.example** - Environment variables template

### Helper Scripts
- **deploy-backend.bat** - Automated deployment helper

### Django Files
- **config/settings.py** - Updated with Railway configuration
- **config/wsgi.py** - WSGI application
- **requirements.txt** - All dependencies
- **Procfile** - Process commands
- **railway.json** - Railway configuration

---

## 🎯 Quick Commands

```bash
# Test Django configuration
python manage.py check --deploy

# Collect static files
python manage.py collectstatic --noinput

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Install Railway CLI
npm install -g @railway/cli

# Deploy via CLI
railway up

# View logs
railway logs

# Run commands on Railway
railway run python manage.py migrate
```

---

## 🎉 You're Ready!

Your Django backend is production-ready and configured for Railway deployment.

### Next Actions:
1. ✅ **Backend Prepared** (You are here!)
2. 🚂 **Deploy to Railway** (5 minutes)
3. 🔗 **Connect to Frontend** (Update Vercel env vars)
4. 👤 **Create Admin User** (Access Django admin)
5. 📦 **Add Products** (Populate your store)
6. 🧪 **Test Integration** (Verify everything works)
7. 🎉 **Go Live!**

---

**Deployment Status:** 🟢 READY  
**Configuration:** ✅ COMPLETE  
**Action Required:** Deploy to Railway! 🚂

**Quick Start:** Run `deploy-backend.bat` or visit https://railway.app/new
