# 🚂 Railway Deployment Checklist

## ✅ Pre-Deployment Setup (Complete)

- [x] **Django Backend Configuration**
  - [x] `railway.json` configured
  - [x] `Procfile` with proper commands
  - [x] `requirements.txt` with all dependencies
  - [x] Production settings configured
  - [x] WhiteNoise for static files
  - [x] Gunicorn WSGI server
  - [x] Database configuration with dj-database-url

- [x] **Security Settings**
  - [x] DEBUG=False for production
  - [x] ALLOWED_HOSTS configured for Railway
  - [x] CORS settings configured
  - [x] CSRF protection configured
  - [x] Secure cookie settings

- [x] **Paystack Integration**
  - [x] Django backend API endpoints
  - [x] Frontend updated to use Django backend
  - [x] Environment variables configured

## 🚀 Railway Deployment Steps

### 1. Create Railway Project
1. Go to [railway.app](https://railway.app)
2. Sign up/login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select `bassy1992/kim-store` repository

### 2. Configure Service Settings
1. **Set Root Directory**: Go to Settings → Root Directory → Set to `back`
2. **Add PostgreSQL Database**: Click "New" → "Database" → "PostgreSQL"

### 3. Environment Variables
Copy from `back/.env.railway` to Railway Variables tab:

```env
SECRET_KEY=your-generated-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
PAYSTACK_SECRET_KEY=sk_test_121d481be91d552a5d6ca84baa84003543bef5b2
```

**Generate SECRET_KEY:**
```bash
cd back
python manage.py shell -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### 4. Deploy
Railway will automatically:
- Build the application
- Run migrations
- Collect static files
- Start the server

## 📋 Post-Deployment Tasks

### 1. Get Backend URL
After deployment, note your Railway URL:
```
https://your-project-name.up.railway.app
```

### 2. Update Frontend (Vercel)
Update your Vercel environment variable:
```env
VITE_API_URL=https://your-project-name.up.railway.app/api
```

### 3. Update CORS Settings
In Railway, update CORS_ALLOWED_ORIGINS with your Vercel URL:
```env
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### 4. Create Admin User
Using Railway CLI:
```bash
railway login
railway link
railway run python manage.py createsuperuser
```

Or temporarily change start command to create superuser.

### 5. Test Deployment
- [ ] Backend API: `https://your-app.up.railway.app/api/`
- [ ] Admin panel: `https://your-app.up.railway.app/admin/`
- [ ] Products endpoint: `https://your-app.up.railway.app/api/products/`
- [ ] Paystack endpoints: `https://your-app.up.railway.app/api/paystack/initialize/`

## 🔧 Troubleshooting

### Build Issues
- Check Railway build logs
- Verify `requirements.txt` has all dependencies
- Ensure Python version compatibility

### Database Issues
- Verify PostgreSQL service is running
- Check DATABASE_URL is automatically set
- Ensure migrations ran successfully

### Static Files Issues
- Verify WhiteNoise is configured
- Check STATIC_ROOT setting
- Ensure collectstatic ran during deployment

### CORS Issues
- Update CORS_ALLOWED_ORIGINS with exact Vercel URL
- No trailing slashes in URLs
- Check browser console for specific errors

## 📊 Monitoring

### Railway Dashboard
- View deployment logs
- Monitor resource usage
- Check service health

### Key Metrics to Watch
- Response times
- Error rates
- Database connections
- Memory usage

## 🎯 Next Steps After Deployment

1. **Test Full Integration**
   - Frontend → Backend API calls
   - Paystack payment flow
   - Admin panel functionality

2. **Production Data**
   - Run data population scripts
   - Create product catalog
   - Set up admin users

3. **Domain Setup** (Optional)
   - Configure custom domain
   - Set up SSL certificate
   - Update CORS and CSRF settings

4. **Monitoring & Alerts**
   - Set up error tracking
   - Configure uptime monitoring
   - Enable Railway alerts

## 🚀 Deployment Status

- ✅ **Configuration**: Complete
- ✅ **Files**: Ready
- ✅ **Dependencies**: Installed
- 🔄 **Action**: Deploy to Railway
- ⏳ **Next**: Update frontend with backend URL

**Ready for Railway deployment! 🚂**