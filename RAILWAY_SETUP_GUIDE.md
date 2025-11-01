# 🚂 Railway Setup Guide - CRITICAL INSTRUCTIONS

## ⚠️ IMPORTANT: Root Directory Configuration

Railway needs to know your Django app is in the `back/` directory, not the root.

---

## 🚀 Correct Deployment Steps

### Step 1: Create New Project on Railway

1. Go to: **https://railway.app/new**
2. Click **"Deploy from GitHub repo"**
3. Authorize Railway to access your GitHub
4. Select repository: **bassy1992/kim-store**

### Step 2: Configure Root Directory (CRITICAL!)

⚠️ **This is the most important step!**

After Railway creates the service:

1. Click on your service (it will show a build error initially - this is expected)
2. Go to **"Settings"** tab
3. Scroll down to **"Service Settings"**
4. Find **"Root Directory"**
5. Enter: `back`
6. Click **"Update"** or press Enter

**Without this step, Railway won't find your Django app!**

### Step 3: Add PostgreSQL Database

1. In your Railway project, click **"New"**
2. Select **"Database"**
3. Choose **"PostgreSQL"**
4. Railway will automatically:
   - Create the database
   - Set the `DATABASE_URL` environment variable
   - Connect it to your Django service

### Step 4: Set Environment Variables

Click on your Django service → **"Variables"** tab

Add these variables:

```env
SECRET_KEY=<generate-a-secure-key>
DEBUG=False
ALLOWED_HOSTS=.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

**Generate a secure SECRET_KEY:**
```bash
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### Step 5: Trigger Redeploy

After setting the root directory and environment variables:

1. Go to **"Deployments"** tab
2. Click **"Deploy"** button (top right)
3. Or push a new commit to trigger auto-deploy

---

## 📋 Environment Variables Reference

### Required Variables

| Variable | Example Value | Description |
|----------|---------------|-------------|
| `SECRET_KEY` | `django-insecure-abc123...` | Django secret key (generate new!) |
| `DEBUG` | `False` | Must be False for production |
| `ALLOWED_HOSTS` | `.railway.app` | Allows Railway domains |
| `USE_POSTGRES` | `True` | Enable PostgreSQL |
| `CORS_ALLOWED_ORIGINS` | `https://your-app.vercel.app` | Your frontend URL |

### Auto-Provided by Railway

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection (automatic) |
| `PORT` | Application port (automatic) |
| `RAILWAY_ENVIRONMENT` | Current environment |

---

## 🔍 Verify Configuration

### Check Root Directory
1. Go to service **Settings**
2. Scroll to **"Service Settings"**
3. Verify **"Root Directory"** shows: `back`

### Check Environment Variables
1. Go to **"Variables"** tab
2. Verify all required variables are set
3. Check `DATABASE_URL` exists (added by PostgreSQL service)

### Check Build Logs
1. Go to **"Deployments"** tab
2. Click on latest deployment
3. View **"Build Logs"**
4. Should see:
   ```
   Installing dependencies from requirements.txt
   Collecting static files
   Build successful
   ```

---

## 🐛 Troubleshooting

### Error: "Railpack could not determine how to build the app"

**Cause:** Root directory not set to `back`

**Solution:**
1. Go to service Settings
2. Set Root Directory to `back`
3. Redeploy

### Error: "No module named 'config'"

**Cause:** Root directory not set correctly

**Solution:**
1. Verify Root Directory is exactly `back` (no leading/trailing slashes)
2. Check the directory structure in your repo
3. Redeploy

### Error: "Database connection failed"

**Cause:** PostgreSQL not connected or DATABASE_URL not set

**Solution:**
1. Verify PostgreSQL service is running
2. Check `DATABASE_URL` variable exists
3. Ensure `USE_POSTGRES=True` is set

### Error: "Static files not found"

**Cause:** collectstatic didn't run or failed

**Solution:**
1. Check build logs for collectstatic errors
2. Verify WhiteNoise is in MIDDLEWARE
3. Manually run: `railway run python manage.py collectstatic --noinput`

---

## 📊 Expected Build Output

When configured correctly, you should see:

```
╭────────────────╮
│ Nixpacks       │
╰────────────────╯

Detected Python application
Installing Python 3.11
Installing dependencies from requirements.txt
Collecting Django==5.0.1
Collecting djangorestframework==3.14.0
...
Successfully installed all packages

Running collectstatic...
Copying static files...
X static files copied

Build complete!
Starting application with gunicorn...
```

---

## 🎯 Post-Deployment Steps

### 1. Get Your Railway URL

After successful deployment, Railway provides a URL:
```
https://your-app-name.up.railway.app
```

### 2. Test the API

```bash
# Health check
curl https://your-app.up.railway.app/api/

# Should return: {"message": "API is running"}
```

### 3. Access Admin Panel

```
https://your-app.up.railway.app/admin/
```

### 4. Create Superuser

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Create superuser
railway run python manage.py createsuperuser
```

### 5. Update Frontend

In Vercel, update environment variable:
```
VITE_API_URL=https://your-app.up.railway.app/api
```

### 6. Update CORS

In Railway, update:
```
CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
```

---

## 🔄 Continuous Deployment

Once configured:

1. **Push to GitHub** → Railway auto-deploys
2. **Pull Requests** → Preview deployments
3. **Rollback** → Click on previous deployment

---

## 📝 Configuration Files

Your backend includes:

| File | Purpose |
|------|---------|
| `nixpacks.toml` | Nixpacks build configuration |
| `railway.json` | Railway service configuration |
| `Procfile` | Process commands |
| `runtime.txt` | Python version |
| `requirements.txt` | Python dependencies |

---

## 🎓 Railway CLI Commands

```bash
# Install CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# View logs
railway logs

# Run commands
railway run python manage.py migrate
railway run python manage.py createsuperuser
railway run python manage.py shell

# Open in browser
railway open

# Check status
railway status
```

---

## 💡 Pro Tips

1. **Always set Root Directory first** - This is the most common issue
2. **Check build logs** - They show exactly what's happening
3. **Use Railway CLI** - Easier for running management commands
4. **Monitor logs** - Keep an eye on deployment logs
5. **Test locally first** - Run `python manage.py check --deploy`

---

## 🆘 Still Having Issues?

### Check These:

1. ✅ Root Directory set to `back`
2. ✅ PostgreSQL service running
3. ✅ All environment variables set
4. ✅ `DATABASE_URL` exists
5. ✅ Build logs show no errors
6. ✅ Deployment status is "Active"

### Get Help:

- **Railway Discord:** https://discord.gg/railway
- **Railway Docs:** https://docs.railway.app
- **Django Deployment:** https://docs.djangoproject.com/en/stable/howto/deployment/

---

## ✅ Success Checklist

After deployment:

- [ ] Service shows "Active" status
- [ ] Build completed successfully
- [ ] API endpoint responds: `/api/`
- [ ] Admin panel loads: `/admin/`
- [ ] Database connected (no errors in logs)
- [ ] Static files load correctly
- [ ] Environment variables all set
- [ ] Superuser created
- [ ] Frontend can connect to backend

---

## 🎉 You're Ready!

Follow the steps above carefully, especially setting the Root Directory to `back`.

**Quick Start:**
1. Create project on Railway
2. Set Root Directory to `back`
3. Add PostgreSQL
4. Set environment variables
5. Deploy!

---

**Most Important:** Set Root Directory to `back` before deploying! 🚂
