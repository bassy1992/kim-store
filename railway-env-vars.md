# Railway Environment Variables Configuration

Set these environment variables in your Railway project dashboard:

## Required Variables

### Django Configuration
```
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=*.railway.app,*.up.railway.app
```

### CORS Configuration
```
CORS_ALLOW_ALL_ORIGINS=True
CORS_ALLOWED_ORIGINS=https://front-pi-nine.vercel.app,https://localhost:3000,https://localhost:5173
CSRF_TRUSTED_ORIGINS=https://*.railway.app,https://*.up.railway.app,https://front-pi-nine.vercel.app,https://*.vercel.app,https://kim-store-production.up.railway.app
```

### Superuser Creation
```
DJANGO_SUPERUSER_USERNAME=admin
DJANGO_SUPERUSER_EMAIL=admin@yourdomain.com
DJANGO_SUPERUSER_PASSWORD=your-secure-password
```

## Optional Variables

### Database (Railway provides DATABASE_URL automatically)
```
# Railway automatically provides:
# DATABASE_URL=postgresql://...
```

### Additional Security
```
SESSION_COOKIE_SECURE=True
CSRF_COOKIE_SECURE=True
```

## How to Set Variables in Railway

1. Go to your Railway dashboard
2. Select your project
3. Click on your service
4. Go to "Variables" tab
5. Add each variable with its value
6. Deploy your changes

## Testing Your Configuration

After setting variables and deploying:

1. Visit your Railway app URL
2. Check `/health/` endpoint
3. Check `/api/status/` endpoint
4. Test CORS by making requests from your Vercel frontend

## Frontend Integration

In your Vercel frontend, use your Railway URL:
```javascript
const API_BASE_URL = 'https://your-app-name.railway.app';
```

Make sure to replace `your-app-name` with your actual Railway app URL.