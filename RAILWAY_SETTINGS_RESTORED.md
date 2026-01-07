# Railway Settings - Restored ✅

Your Railway configuration has been restored and verified. Here's what's in place:

## Configuration Files Status

### ✅ Procfile
- **Location:** `/Procfile`
- **Status:** Present and configured
- **Purpose:** Tells Railway how to start your Django app
- **Command:** Runs migrations, collects static files, and starts Gunicorn

### ✅ nixpacks.toml
- **Location:** `/nixpacks.toml`
- **Status:** Present and configured
- **Purpose:** Defines build environment and dependencies
- **Includes:** Python 3.11, pip, virtualenv setup

### ✅ runtime.txt
- **Location:** `/runtime.txt`
- **Status:** Present and configured
- **Purpose:** Specifies Python version
- **Version:** Python 3.11.7

### ✅ Django Settings
- **Location:** `/back/config/settings.py`
- **Status:** Complete with Railway support
- **Includes:** 
  - Database URL configuration
  - S3 bucket support
  - CORS settings for Railway
  - Session and cookie settings

## What's Configured

### Database
```python
# Automatically uses Railway's DATABASE_URL
# Falls back to SQLite for local development
```

### S3 Bucket (Media Upload)
```python
USE_S3 = config('USE_S3', default=False, cast=bool)
# When USE_S3=true, uses Railway bucket for file uploads
```

### CORS & Security
```python
CSRF_TRUSTED_ORIGINS = [
    'https://*.railway.app',
    'https://*.up.railway.app',
    'https://*.vercel.app'
]
```

### Session & Cookies
```python
SESSION_COOKIE_SECURE = not DEBUG
CSRF_COOKIE_SECURE = not DEBUG
# Automatically uses HTTPS in production
```

## Environment Variables Needed on Railway

### Required
```bash
SECRET_KEY=your-secret-key
DEBUG=False  # Set to False in production
```

### Optional (for S3 bucket)
```bash
USE_S3=true
AWS_ACCESS_KEY_ID=your-key
AWS_SECRET_ACCESS_KEY=your-secret
AWS_STORAGE_BUCKET_NAME=your-bucket
AWS_S3_ENDPOINT_URL=your-endpoint
AWS_S3_REGION_NAME=us-east-1
```

### Optional (for database)
```bash
# Railway provides DATABASE_URL automatically
# Only set these if using external PostgreSQL
DB_NAME=your-db
DB_USER=your-user
DB_PASSWORD=your-password
DB_HOST=your-host
DB_PORT=5432
```

## Deployment Checklist

- [x] Procfile configured
- [x] nixpacks.toml configured
- [x] runtime.txt set to Python 3.11.7
- [x] Django settings support Railway
- [x] S3 bucket configuration ready
- [x] CORS settings for Railway domains
- [ ] Set environment variables in Railway dashboard
- [ ] Deploy to Railway
- [ ] Run migrations
- [ ] Test API endpoints

## How to Deploy

### Option 1: Git Push (Recommended)
```bash
git add .
git commit -m "Restore Railway configuration"
git push
# Railway auto-deploys on push
```

### Option 2: Railway CLI
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up
```

## Verify Deployment

After deploying to Railway:

```bash
# Check logs
railway logs

# Check environment variables
railway variables

# Run migrations
railway run python back/manage.py migrate

# Create superuser (if needed)
railway run python back/manage.py createsuperuser

# Test API
curl https://your-railway-app.up.railway.app/api/products/
```

## Quick Commands

```bash
# View Railway logs
railway logs

# SSH into Railway container
railway shell

# Run Django command
railway run python back/manage.py <command>

# Set environment variable
railway variables set KEY=value

# View all variables
railway variables

# Restart service
railway restart

# View service status
railway status
```

## Troubleshooting

### App won't start
1. Check logs: `railway logs`
2. Verify Procfile syntax
3. Check Python version compatibility
4. Ensure all dependencies in requirements.txt

### Database connection error
1. Verify DATABASE_URL is set
2. Check database is running
3. Run migrations: `railway run python back/manage.py migrate`

### Static files not loading
1. Check collectstatic ran: `railway logs`
2. Verify STATIC_ROOT and STATIC_URL
3. Ensure WhiteNoise middleware is installed

### S3 bucket not working
1. Verify USE_S3=true
2. Check all AWS credentials
3. Verify bucket endpoint URL
4. Check bucket permissions

## Files to Keep Safe

These files are critical for Railway deployment:
- ✅ `Procfile` - Deployment configuration
- ✅ `nixpacks.toml` - Build configuration
- ✅ `runtime.txt` - Python version
- ✅ `requirements.txt` - Dependencies
- ✅ `back/config/settings.py` - Django settings
- ✅ `.gitignore` - Excludes sensitive files

## Next Steps

1. Verify all environment variables are set in Railway
2. Deploy the latest code
3. Run migrations on Railway
4. Test API endpoints
5. Monitor logs for any issues

Your Railway setup is ready to go! 🚀
