# Design Document: Railway Deployment Fix

## Overview

This document outlines the technical approach to diagnose and fix the Railway deployment failure for the Django e-commerce backend. The solution involves verifying environment variables, checking build logs, ensuring proper database configuration, and validating the health check endpoint.

## Architecture

### Deployment Flow

```
Code Push → Railway Build → Install Dependencies → Collect Static Files → 
Run Migrations → Start Gunicorn → Health Check → Deployment Success/Failure
```

### Key Components

1. **Railway Configuration Files**
   - `railway.json`: Defines build and deploy commands
   - `nixpacks.toml`: Specifies system packages and build phases
   - `Procfile`: Defines web and release commands
   - `requirements.txt`: Python dependencies

2. **Environment Configuration**
   - Railway dashboard environment variables
   - `.env` file (local development only)
   - Django settings.py configuration

3. **Health Check Endpoint**
   - Path: `/api/` (configured in railway.json)
   - Timeout: 100 seconds
   - Expected: 200 OK response

## Components and Interfaces

### 1. Environment Variables Setup

**Required Variables on Railway:**

```
SECRET_KEY=<generate-secure-random-key>
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app,localhost
CORS_ALLOWED_ORIGINS=https://your-frontend.vercel.app,http://localhost:5173
```

**Auto-Provided by Railway:**
- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Port number for the application to bind to

**Implementation:**
- Access Railway dashboard → Project → Variables tab
- Add each required variable
- Railway automatically injects DATABASE_URL when PostgreSQL service is added

### 2. Build Process Verification

**Build Command (from railway.json):**
```bash
pip install -r requirements.txt && python manage.py collectstatic --noinput
```

**Potential Issues:**
- Missing dependencies in requirements.txt
- collectstatic failing due to missing STATIC_ROOT configuration
- Python version mismatch

**Verification Steps:**
1. Check build logs in Railway dashboard
2. Verify all dependencies install successfully
3. Confirm collectstatic completes without errors
4. Check for any missing system packages

### 3. Database Migration Strategy

**Migration Command (from Procfile):**
```
release: python manage.py migrate --noinput
```

**How It Works:**
- Railway runs the `release` command before starting the web process
- Migrations execute against the DATABASE_URL PostgreSQL database
- If migrations fail, deployment stops

**Potential Issues:**
- Database connection timeout
- Missing DATABASE_URL variable
- Migration conflicts or errors
- Database permissions issues

**Verification:**
1. Check deployment logs for migration output
2. Verify DATABASE_URL is set correctly
3. Test database connectivity
4. Review migration files for errors

### 4. Application Startup Configuration

**Start Command (from railway.json):**
```bash
gunicorn config.wsgi:application --bind 0.0.0.0:$PORT --workers 4 --timeout 120
```

**Configuration Details:**
- **Bind address**: `0.0.0.0:$PORT` (Railway provides PORT)
- **Workers**: 4 (adjust based on Railway plan)
- **Timeout**: 120 seconds (for slow requests)
- **WSGI module**: `config.wsgi:application`

**Potential Issues:**
- Not binding to Railway's PORT variable
- WSGI module path incorrect
- Import errors in Django code
- Middleware or app configuration errors

### 5. Health Check Implementation

**Current Configuration:**
```json
{
  "healthcheckPath": "/api/",
  "healthcheckTimeout": 100
}
```

**Health Check Behavior:**
- Railway sends GET request to `/api/`
- Expects 200 OK response within 100 seconds
- If health check fails, deployment marked as failed

**Potential Issues:**
- `/api/` endpoint doesn't exist or returns error
- Health check timeout too short
- Application not fully started when health check runs
- Database connection issues preventing response

**Solution Options:**

**Option 1: Create dedicated health check endpoint**
```python
# config/urls.py
from django.http import JsonResponse

def health_check(request):
    return JsonResponse({'status': 'healthy'})

urlpatterns = [
    path('health/', health_check),
    # ... other patterns
]
```

**Option 2: Use existing API root**
- Ensure `/api/` returns 200 OK
- Verify no authentication required
- Check response time is fast

**Option 3: Disable health check temporarily**
```json
{
  "healthcheckPath": null
}
```

## Data Models

No new data models required. This is a deployment configuration fix.

## Error Handling

### Common Deployment Errors

**1. Build Failure**
- **Symptom**: Build logs show errors during pip install or collectstatic
- **Diagnosis**: Check build logs for specific error messages
- **Solution**: Fix dependency issues or static file configuration

**2. Migration Failure**
- **Symptom**: Deployment logs show migration errors
- **Diagnosis**: Check for database connection issues or migration conflicts
- **Solution**: Fix migrations or database configuration

**3. Health Check Failure**
- **Symptom**: "Deploy failed" with health check timeout
- **Diagnosis**: Application not responding at health check path
- **Solution**: Fix health check endpoint or increase timeout

**4. Application Crash**
- **Symptom**: Application starts but immediately crashes
- **Diagnosis**: Check deployment logs for Python errors
- **Solution**: Fix code errors or configuration issues

### Diagnostic Approach

```
1. Check Build Logs
   ↓
2. Check Deployment Logs
   ↓
3. Check Environment Variables
   ↓
4. Test Health Check Endpoint
   ↓
5. Review Django Settings
   ↓
6. Test Database Connection
```

## Testing Strategy

### Manual Testing Steps

1. **Verify Environment Variables**
   - Check all required variables are set in Railway dashboard
   - Verify DATABASE_URL is auto-provided
   - Confirm ALLOWED_HOSTS includes Railway domain

2. **Test Build Locally**
   ```bash
   cd back
   pip install -r requirements.txt
   python manage.py collectstatic --noinput
   ```

3. **Test Migrations Locally**
   ```bash
   python manage.py migrate --noinput
   ```

4. **Test Gunicorn Startup**
   ```bash
   gunicorn config.wsgi:application --bind 0.0.0.0:8000
   ```

5. **Test Health Check Endpoint**
   ```bash
   curl http://localhost:8000/api/
   ```

### Deployment Testing

1. Push code to Railway
2. Monitor build logs in real-time
3. Check for build errors
4. Monitor deployment logs
5. Check health check status
6. Test deployed application URL

## Security Considerations

### Production Settings

- **DEBUG=False**: Prevent sensitive information leakage
- **SECRET_KEY**: Use cryptographically secure random key
- **ALLOWED_HOSTS**: Restrict to Railway and frontend domains
- **CORS_ALLOWED_ORIGINS**: Restrict to frontend domain only

### Database Security

- Railway provides secure DATABASE_URL
- Connection uses SSL by default
- Database credentials managed by Railway

## Performance Optimization

### Gunicorn Configuration

- **Workers**: 4 (adjust based on Railway plan CPU)
- **Timeout**: 120 seconds (for slow API requests)
- **Worker class**: sync (default, suitable for Django)

### Static Files

- WhiteNoise serves static files efficiently
- Compressed manifest storage for faster loading
- collectstatic runs during build, not runtime

## Deployment Checklist

### Pre-Deployment

- [ ] All environment variables configured on Railway
- [ ] SECRET_KEY is secure and unique
- [ ] ALLOWED_HOSTS includes .railway.app
- [ ] CORS_ALLOWED_ORIGINS includes frontend URL
- [ ] PostgreSQL service added to Railway project
- [ ] All code changes committed and pushed

### During Deployment

- [ ] Monitor build logs for errors
- [ ] Verify dependencies install successfully
- [ ] Confirm collectstatic completes
- [ ] Check migration execution
- [ ] Monitor health check status

### Post-Deployment

- [ ] Test deployed application URL
- [ ] Verify API endpoints respond correctly
- [ ] Test database connectivity
- [ ] Check CORS headers with frontend
- [ ] Monitor application logs for errors

## Troubleshooting Guide

### If Build Fails

1. Check build logs for specific error
2. Verify requirements.txt is correct
3. Test build locally
4. Check Python version compatibility

### If Migrations Fail

1. Check DATABASE_URL is set
2. Verify database service is running
3. Test migrations locally with PostgreSQL
4. Check for migration conflicts

### If Health Check Fails

1. Check deployment logs for startup errors
2. Verify application is binding to $PORT
3. Test health check endpoint locally
4. Consider increasing health check timeout
5. Create dedicated health check endpoint

### If Application Crashes

1. Check deployment logs for Python errors
2. Verify all imports are correct
3. Check Django settings configuration
4. Test application locally with production settings
5. Verify all required apps are in INSTALLED_APPS

## Next Steps

After fixing the deployment:

1. Set up continuous deployment from Git
2. Configure custom domain (optional)
3. Set up monitoring and logging
4. Configure backup strategy for database
5. Document deployment process for team
