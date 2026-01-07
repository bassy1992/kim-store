# Railway Environment Variables Setup

## Quick Setup Guide

### Step 1: Access Railway Dashboard

1. Go to [railway.app](https://railway.app)
2. Log in to your account
3. Select your project
4. Click on your backend service

### Step 2: Navigate to Variables

1. Click on the **"Variables"** tab
2. You'll see a list of environment variables

### Step 3: Add Required Variables

#### Minimum Required (for basic deployment)

```
SECRET_KEY = your-secret-key-here
DEBUG = False
```

#### For S3 Bucket (Media Upload)

```
USE_S3 = true
AWS_ACCESS_KEY_ID = your-access-key
AWS_SECRET_ACCESS_KEY = your-secret-key
AWS_STORAGE_BUCKET_NAME = your-bucket-name
AWS_S3_ENDPOINT_URL = https://your-bucket-endpoint.railway.app
AWS_S3_REGION_NAME = us-east-1
```

#### For External Database (if not using Railwayy's)

```
USE_POSTGRES = true
DB_NAME = your-database-name
DB_USER = your-database-user
DB_PASSWORD = your-database-password
DB_HOST = your-database-host
DB_PORT = 5432
```

#### For CORS (if needed)

```
CORS_ALLOWED_ORIGINS = https://your-frontend.vercel.app,https://another-domain.com
CSRF_TRUSTED_ORIGINS = https://your-frontend.vercel.app,https://another-domain.com
```

## Step-by-Step: Adding Variables via CLI

### Install Railway CLI

```bash
npm install -g @railway/cli
```

### Login to Railway

```bash
railway login
```

### Link to Your Project

```bash
railway link
```

### Set Variables

```bash
# Set SECRET_KEY
railway variables set SECRET_KEY=your-secret-key-here

# Set DEBUG
railway variables set DEBUG=False

# Set S3 variables
railway variables set USE_S3=true
railway variables set AWS_ACCESS_KEY_ID=your-key
railway variables set AWS_SECRET_ACCESS_KEY=your-secret
railway variables set AWS_STORAGE_BUCKET_NAME=your-bucket
railway variables set AWS_S3_ENDPOINT_URL=https://your-endpoint
railway variables set AWS_S3_REGION_NAME=us-east-1
```

### View All Variables

```bash
railway variables
```

### Remove a Variable

```bash
railway variables unset VARIABLE_NAME
```

## Step-by-Step: Adding Variables via Dashboard

### For Each Variable:

1. Click **"+ New Variable"** button
2. Enter the variable name (e.g., `SECRET_KEY`)
3. Enter the variable value
4. Press Enter or click Save
5. Repeat for each variable

## Important Notes

### SECRET_KEY
- Generate a strong secret key
- Keep it secret (never commit to git)
- Use a random string generator

```bash
# Generate a secure key
python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
```

### DEBUG
- Set to `False` in production
- Set to `True` only for development
- Never leave as `True` in production

### AWS Credentials
- Get from Railway bucket settings
- Keep secret (never commit to git)
- Rotate regularly for security

### DATABASE_URL
- Railway provides this automatically
- Don't set manually unless using external database
- Format: `postgresql://user:password@host:port/database`

## Verify Variables Are Set

```bash
# View all variables
railway variables

# Output should show:
# SECRET_KEY = ***
# DEBUG = False
# USE_S3 = true
# etc.
```

## After Setting Variables

### Restart the Service

```bash
railway restart
```

Or via dashboard:
1. Click on your service
2. Click the **"Restart"** button

### Check Logs

```bash
railway logs
```

Or via dashboard:
1. Click on your service
2. Click the **"Logs"** tab

### Run Migrations

```bash
railway run python back/manage.py migrate
```

## Common Issues

### Variables Not Taking Effect
- Restart the service: `railway restart`
- Check logs: `railway logs`
- Verify variable names are correct

### Database Connection Error
- Verify DATABASE_URL is set
- Check database is running
- Run migrations: `railway run python back/manage.py migrate`

### S3 Upload Not Working
- Verify USE_S3=true
- Check all AWS credentials
- Verify bucket endpoint URL
- Check bucket permissions

### Static Files Not Loading
- Run collectstatic: `railway run python back/manage.py collectstatic --noinput`
- Check STATIC_URL and STATIC_ROOT in settings
- Verify WhiteNoise is installed

## Example Complete Setup

```bash
# 1. Login
railway login

# 2. Link project
railway link

# 3. Set all variables
railway variables set SECRET_KEY=your-secret-key
railway variables set DEBUG=False
railway variables set USE_S3=true
railway variables set AWS_ACCESS_KEY_ID=your-key
railway variables set AWS_SECRET_ACCESS_KEY=your-secret
railway variables set AWS_STORAGE_BUCKET_NAME=your-bucket
railway variables set AWS_S3_ENDPOINT_URL=https://your-endpoint

# 4. Verify
railway variables

# 5. Restart
railway restart

# 6. Check logs
railway logs

# 7. Run migrations
railway run python back/manage.py migrate

# 8. Test
curl https://your-app.up.railway.app/api/products/
```

## Security Best Practices

1. ✅ Never commit `.env` files to git
2. ✅ Use strong, random SECRET_KEY
3. ✅ Set DEBUG=False in production
4. ✅ Rotate AWS credentials regularly
5. ✅ Use HTTPS for all connections
6. ✅ Keep credentials in Railway dashboard, not in code
7. ✅ Review logs regularly for errors
8. ✅ Use environment-specific variables

## Reference

- [Railway Documentation](https://docs.railway.app)
- [Django Settings](https://docs.djangoproject.com/en/5.0/ref/settings/)
- [AWS S3 Configuration](https://docs.aws.amazon.com/s3/)
