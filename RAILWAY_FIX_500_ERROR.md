# Railway Internal Server Error (500) - Fix Guide

## Step 1: Check Railway Logs
1. Go to your Railway project dashboard
2. Click on your backend service
3. Click "Deployments" tab
4. Click on the latest deployment
5. Check the logs for specific error messages

## Step 2: Set Required Environment Variables

In Railway dashboard, go to your service → Variables tab and add:

```
SECRET_KEY=your-long-random-secret-key-here-change-this
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app,localhost
DATABASE_URL=(auto-provided by Railway PostgreSQL)
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## Step 3: Add PostgreSQL Database
1. In Railway project, click "+ New"
2. Select "Database" → "PostgreSQL"
3. Railway will automatically set DATABASE_URL

## Step 4: Common Error Fixes

### Error: "No module named 'apps'"
- Check that all app directories have `__init__.py`
- Verify INSTALLED_APPS in settings.py

### Error: "collectstatic failed"
- Check STATIC_ROOT is set correctly
- Ensure WhiteNoise is in MIDDLEWARE

### Error: "relation does not exist"
- Database migrations haven't run
- Check Procfile has: `release: python manage.py migrate --noinput`

### Error: "ALLOWED_HOSTS"
- Add Railway domain to ALLOWED_HOSTS
- Use: `.railway.app,.up.railway.app`

## Step 5: Redeploy
After setting environment variables:
1. Click "Deploy" in Railway
2. Or push a new commit to trigger deployment

## Quick Test Command
To test locally with production settings:
```bash
cd back
set DEBUG=False
set ALLOWED_HOSTS=localhost,127.0.0.1
python manage.py check --deploy
```

## Get Specific Error
If you share the specific error from Railway logs, I can provide a more targeted fix.
