# ✅ Railway Deployment - Ready to Deploy!

## 🎯 Status: PRODUCTION READY

Your Django backend is fully configured for Railway deployment!

---

## 🚀 Deploy Now (3 Simple Steps)

### Step 1: Create Project on Railway
1. Go to: **https://railway.app/new**
2. Click **"Deploy from GitHub repo"**
3. Select **bassy1992/kim-store**
4. ⚠️ **Set Root Directory to:** `back`

### Step 2: Add PostgreSQL Database
1. In your project, click **"New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway auto-connects it (DATABASE_URL provided automatically)

### Step 3: Set Environment Variables
Go to your service → **Variables** tab:

```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

**Generate SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

**Done!** Railway will automatically deploy.

---

## ✅ Pre-Flight Verification

### Configuration Files ✓
- [x] `railway.json` - Railway configuration
- [x] `Procfile` - Process commands
- [x] `runtime.txt` - Python 3.11.7
- [x] `requirements.txt` - Updated with Railway deps
- [x] `.env.example` - Environment template

### Django Settings ✓
- [x] DATABASE_URL support (dj-database-url)
- [x] WhiteNoise for static files
- [x] Gunicorn WSGI server
- [x] CORS configured
- [x] Security settings ready

### Dependencies Added ✓
- [x] `dj-database-url==2.1.0` - Database URL parsing
- [x] `whitenoise==6.6.0` - Static file serving
- [x] `gunicorn==21.2.0` - WSGI server
- [x] `psycopg2-binary==2.9.9` - PostgreSQL adapter

---

## 🔧 Railway Configuration

### Build Settings
```json
{
  "builder": "NIXPACKS",
  "buildCommand": "pip install -r requirements.txt && python manage.py collectstatic --noinput"
}
```

### Deploy Settings
```json
{
  "startCommand": "gunicorn config.wsgi:application --bind 0.0.0.0:$PORT",
  "restartPolicyType": "ON_FAILURE"
}
```

### Root Directory
⚠️ **CRITICAL:** Must be set to `back`

---

## 🌐 Environment Variables

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `SECRET_KEY` | Generate new | Django secret key |
| `DEBUG` | `False` | Production mode |
| `ALLOWED_HOSTS` | `.railway.app` | Allowed domains |
| `USE_POSTGRES` | `True` | Use PostgreSQL |
| `CORS_ALLOWED_ORIGINS` | Your Vercel URL | Frontend URL |

### Auto-Provided by Railway

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection (automatic) |
| `PORT` | Application port (automatic) |

---

## 📋 Post-Deployment Checklist

After deployment completes:

- [ ] Verify deployment succeeded (check logs)
- [ ] Test API endpoint: `https://your-app.up.railway.app/api/`
- [ ] Check admin panel: `https://your-app.up.railway.app/admin/`
- [ ] Create superuser (see guide below)
- [ ] Update Vercel with backend URL
- [ ] Update CORS with Vercel URL
- [ ] Test frontend-backend integration

---

## 👤 Create Admin User

### Option 1: Railway CLI
```bash
railway login
railway link
railway run python manage.py createsuperuser
```

### Option 2: Django Shell
```bash
railway run python manage.py shell
```
Then:
```python
from django.contrib.auth import get_user_model
User = get_user_model()
User.objects.create_superuser('admin', 'admin@example.com', 'your-password')
```

---

## 🔗 Connect Frontend to Backend

### 1. Get Your Railway URL
After deployment: `https://your-app.up.railway.app`

### 2. Update Vercel Environment Variable
In Vercel project settings:
```
VITE_API_URL=https://your-app.up.railway.app/api
```

### 3. Update Railway CORS
In Railway environment variables:
```
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

### 4. Redeploy Both
- Vercel: Automatic on env var change
- Railway: Automatic on git push

---

## 🧪 Test Your Deployment

```bash
# Health check
curl https://your-app.up.railway.app/api/

# Products endpoint
curl https://your-app.up.railway.app/api/products/

# API documentation
https://your-app.up.railway.app/api/schema/swagger-ui/
```

---

## 🐛 Common Issues & Solutions

### Build Fails
**Solution:** Check Railway logs for specific error
```bash
railway logs
```

### Database Connection Error
**Solution:** Verify PostgreSQL service is running and DATABASE_URL is set

### Static Files Not Loading
**Solution:** Check WhiteNoise is in MIDDLEWARE and collectstatic ran

### CORS Errors
**Solution:** Update CORS_ALLOWED_ORIGINS with exact Vercel URL (no trailing slash)

---

## 📊 Expected Results

After successful deployment:

✅ **Backend URL:** `https://your-app.up.railway.app`  
✅ **API Endpoint:** `https://your-app.up.railway.app/api/`  
✅ **Admin Panel:** `https://your-app.up.railway.app/admin/`  
✅ **Database:** PostgreSQL (managed by Railway)  
✅ **SSL:** Automatic HTTPS  
✅ **Auto-Deploy:** On git push  

---

## 💡 Pro Tips

1. **Monitor Logs:** Keep Railway logs open during first deployment
2. **Test Locally:** Run `python manage.py check --deploy` before deploying
3. **Backup Database:** Railway provides automatic backups on paid plans
4. **Custom Domain:** Add your own domain in Railway settings
5. **Environment Branches:** Use Railway environments for staging/production

---

## 📚 Full Documentation

- **Detailed Guide:** `RAILWAY_DEPLOYMENT.md`
- **Django Settings:** `config/settings.py`
- **Environment Template:** `.env.example`

---

## 🎉 Ready to Deploy!

Your Django backend is production-ready. Follow the 3 steps above to deploy to Railway!

**Next Action:** Go to https://railway.app/new and deploy! 🚂

---

**Prepared:** November 1, 2025  
**Status:** 🟢 PRODUCTION READY  
**Action Required:** Deploy to Railway 🚀
