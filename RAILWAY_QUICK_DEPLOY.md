# Quick Railway Deployment

## 🚀 Fast Track (5 minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Railway deployment ready"
git push
```

### 2. Deploy on Railway
1. Go to https://railway.app/new
2. Click "Deploy from GitHub repo"
3. Select this repository
4. Click "Add variables" and set:
   - `SECRET_KEY` = (generate with command below)
   - `DEBUG` = `False`
   - `ALLOWED_HOSTS` = `.railway.app,.up.railway.app`
   - `CORS_ALLOWED_ORIGINS` = `https://your-frontend.vercel.app`

### 3. Add PostgreSQL
1. Click "New" → "Database" → "PostgreSQL"
2. Railway auto-creates `DATABASE_URL`

### 4. Generate Domain
1. Settings → Networking → Generate Domain
2. Copy your URL: `https://your-app.up.railway.app`

## Generate SECRET_KEY
```bash
cd back
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Environment Variables Checklist
- ✅ SECRET_KEY (required)
- ✅ DEBUG=False (required)
- ✅ ALLOWED_HOSTS (required)
- ✅ CORS_ALLOWED_ORIGINS (required)
- ✅ DATABASE_URL (auto-created by Railway)

## After Deployment

### Create Admin User
Railway Dashboard → Service → Shell:
```bash
cd back
python manage.py createsuperuser
```

### Test API
```bash
curl https://your-app.up.railway.app/api/
```

## Files Created for Railway
- ✅ `Procfile` - Deployment commands
- ✅ `railway.json` - Railway configuration
- ✅ `nixpacks.toml` - Build configuration
- ✅ `back/requirements.txt` - Python dependencies
- ✅ `back/runtime.txt` - Python version

Your backend is Railway-ready! 🎉
