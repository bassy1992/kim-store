# Railway Deployment Guide

## Prerequisites
- Railway account (sign up at https://railway.app)
- GitHub repository with your code

## Step 1: Create New Project on Railway

1. Go to https://railway.app/dashboard
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Authorize Railway to access your GitHub
5. Select this repository

## Step 2: Add PostgreSQL Database

1. In your Railway project, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create a `DATABASE_URL` environment variable

## Step 3: Configure Environment Variables

Go to your service → Variables tab and add:

```
SECRET_KEY=your-super-secret-key-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
CORS_ALLOWED_ORIGINS=https://your-frontend-url.vercel.app
DJANGO_SETTINGS_MODULE=config.settings
```

**Important:** Generate a secure SECRET_KEY using:
```python
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

## Step 4: Deploy

Railway will automatically:
- Detect Python project
- Install dependencies from `requirements.txt`
- Run migrations
- Collect static files
- Start gunicorn server

## Step 5: Get Your Backend URL

1. Go to Settings tab
2. Under "Networking" → "Public Networking"
3. Click "Generate Domain"
4. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

## Step 6: Update Frontend

Update your frontend's API URL to point to your Railway backend URL.

## Troubleshooting

### Check Logs
- Go to your service in Railway
- Click "Deployments" tab
- Click on the latest deployment
- View build and deploy logs

### Common Issues

1. **500 Error**: Check that all environment variables are set correctly
2. **Database Connection**: Ensure PostgreSQL is added and DATABASE_URL is available
3. **Static Files**: Verify STATIC_ROOT and WhiteNoise are configured
4. **CORS Errors**: Add your frontend URL to CORS_ALLOWED_ORIGINS

### Useful Commands (Run in Railway Shell)

```bash
# Create superuser
python back/manage.py createsuperuser

# Check migrations
python back/manage.py showmigrations

# Run migrations manually
python back/manage.py migrate
```

## Project Structure

Your project is configured with:
- ✅ Procfile for Railway deployment
- ✅ railway.json for build configuration
- ✅ nixpacks.toml for Nixpacks builder
- ✅ requirements.txt with all dependencies
- ✅ runtime.txt specifying Python 3.11.7
- ✅ PostgreSQL database support via dj-database-url
- ✅ Static files handling with WhiteNoise
- ✅ CORS configured for frontend integration
- ✅ Gunicorn as production WSGI server

## Next Steps

1. Push these changes to GitHub
2. Railway will auto-deploy
3. Create a superuser via Railway shell
4. Test your API endpoints
5. Update frontend with Railway backend URL
