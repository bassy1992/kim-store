# Fix Railway Admin Login Issues

## Diagnostic Steps

### 1. Check Superuser Exists
```bash
railway run python test_admin_login.py
```

This will show:
- Superuser details
- Settings configuration
- Admin URL

### 2. Common Login Issues & Fixes

#### Issue 1: CSRF Token Error
**Symptoms**: "CSRF verification failed" or "Forbidden (403)"

**Fix**: Add to Railway environment variables:
```
CSRF_TRUSTED_ORIGINS=https://kim-store-production.up.railway.app,https://*.railway.app,https://*.up.railway.app
```

#### Issue 2: Session Cookie Issues
**Symptoms**: Login appears to work but immediately logs out

**Fix**: Check if these are set in Railway:
```
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
```

#### Issue 3: Wrong Password
**Symptoms**: "Please enter the correct username and password"

**Fix**: Reset password:
```bash
railway run python manage.py changepassword kim
```

#### Issue 4: User Not Active
**Symptoms**: Login fails silently

**Fix**: Activate user in Railway shell:
```bash
railway run python manage.py shell
```
Then:
```python
from django.contrib.auth.models import User
user = User.objects.get(username='kim')
user.is_active = True
user.is_staff = True
user.is_superuser = True
user.save()
exit()
```

#### Issue 5: Database Not Synced
**Symptoms**: "no such table: auth_user"

**Fix**: Run migrations:
```bash
railway run python manage.py migrate
```

## Quick Fix Commands

### Reset Everything
```bash
# 1. Run migrations
railway run python manage.py migrate

# 2. Check superuser
railway run python test_admin_login.py

# 3. If needed, create new superuser
railway run python manage.py createsuperuser

# 4. Or reset password
railway run python manage.py changepassword kim
```

## Test Login

### Method 1: Direct Admin URL
Go to: `https://kim-store-production.up.railway.app/admin/`

### Method 2: API Login Test
```bash
curl -X POST https://kim-store-production.up.railway.app/admin/login/ \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=kim&password=yourpassword"
```

## Environment Variables Checklist

Make sure these are set in Railway:

```
SECRET_KEY=your-secret-key
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app
CSRF_TRUSTED_ORIGINS=https://kim-store-production.up.railway.app,https://*.railway.app
SESSION_COOKIE_SECURE=False
CSRF_COOKIE_SECURE=False
DATABASE_URL=postgresql://... (auto-created)
```

## Still Not Working?

### Check Railway Logs
1. Railway Dashboard → Your Service
2. Click "Deployments"
3. Click latest deployment
4. Check logs for errors

### Enable DEBUG Temporarily
In Railway variables:
```
DEBUG=True
```

Then try logging in and check the error message.

**Remember to set DEBUG=False after fixing!**

## Alternative: Create New Superuser

If all else fails:
```bash
railway run python manage.py createsuperuser --username admin --email admin@example.com
```

Then use the new credentials.
