# Railway Deployment Checklist ✅

## Pre-Deployment (Local)

- [x] **Dependencies installed** - `requirements.txt` includes all packages
- [x] **Runtime specified** - `runtime.txt` has Python 3.11.7
- [x] **Database config** - Settings use `dj-database-url` for PostgreSQL
- [x] **Static files** - WhiteNoise configured for serving static files
- [x] **WSGI server** - Gunicorn installed and configured
- [x] **CORS setup** - django-cors-headers installed
- [x] **Procfile created** - Deployment commands defined
- [x] **railway.json created** - Build configuration set
- [x] **nixpacks.toml created** - Nixpacks builder configured
- [x] **.gitignore updated** - Sensitive files excluded

## Railway Setup

### Step 1: Create Project
- [ ] Sign up/login to https://railway.app
- [ ] Click "New Project"
- [ ] Select "Deploy from GitHub repo"
- [ ] Choose your repository

### Step 2: Add Database
- [ ] Click "New" in your project
- [ ] Select "Database" → "Add PostgreSQL"
- [ ] Verify `DATABASE_URL` variable is created

### Step 3: Configure Environment Variables
Go to your service → Variables tab:

- [ ] `SECRET_KEY` - Generate using command below
- [ ] `DEBUG` - Set to `False`
- [ ] `ALLOWED_HOSTS` - Set to `.railway.app,.up.railway.app`
- [ ] `CORS_ALLOWED_ORIGINS` - Add your frontend URL
- [ ] `DJANGO_SETTINGS_MODULE` - Set to `config.settings`

**Generate SECRET_KEY:**
```bash
cd back
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 4: Deploy
- [ ] Push code to GitHub
- [ ] Railway auto-deploys
- [ ] Check deployment logs for errors
- [ ] Wait for "Success" status

### Step 5: Generate Domain
- [ ] Go to Settings → Networking
- [ ] Click "Generate Domain"
- [ ] Copy your Railway URL
- [ ] Test: `https://your-app.up.railway.app/api/`

### Step 6: Create Admin User
Railway Dashboard → Service → Shell:
```bash
cd back
python manage.py createsuperuser
```

## Post-Deployment

- [ ] Test API endpoints
- [ ] Access admin panel: `https://your-app.up.railway.app/admin/`
- [ ] Update frontend with Railway backend URL
- [ ] Test CORS from frontend
- [ ] Verify database connections
- [ ] Check static files loading

## Troubleshooting

### View Logs
Railway Dashboard → Deployments → Latest → View Logs

### Common Issues

**Build Fails:**
- Check `requirements.txt` syntax
- Verify Python version in `runtime.txt`

**500 Error:**
- Verify all environment variables are set
- Check `SECRET_KEY` is configured
- Ensure `ALLOWED_HOSTS` includes Railway domain

**Database Error:**
- Confirm PostgreSQL is added
- Check `DATABASE_URL` exists
- Run migrations in Railway shell

**CORS Error:**
- Add frontend URL to `CORS_ALLOWED_ORIGINS`
- Include protocol (https://)
- No trailing slash

**Static Files Not Loading:**
- Run `python manage.py collectstatic` in shell
- Verify WhiteNoise in middleware
- Check `STATIC_ROOT` setting

## Quick Commands

### Railway Shell Commands
```bash
# Check migrations
cd back && python manage.py showmigrations

# Run migrations
cd back && python manage.py migrate

# Create superuser
cd back && python manage.py createsuperuser

# Collect static files
cd back && python manage.py collectstatic --noinput

# Check Django version
cd back && python -m django --version
```

## Files Created

✅ `Procfile` - Railway deployment commands
✅ `railway.json` - Railway build configuration  
✅ `nixpacks.toml` - Nixpacks builder settings
✅ `.gitignore` - Exclude sensitive files
✅ `RAILWAY_ENV_TEMPLATE.txt` - Environment variables template
✅ `RAILWAY_DEPLOYMENT_GUIDE.md` - Detailed guide
✅ `RAILWAY_QUICK_DEPLOY.md` - Quick reference

## Your Backend is Ready! 🚀

All configuration files are in place. Just push to GitHub and deploy on Railway!
