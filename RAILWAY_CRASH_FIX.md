# 🚨 RAILWAY DEPLOYMENT CRASH FIX

## Current Issue
Railway deployment is crashing because it's still trying to run the old startup command with `create_superuser_auto`.

## ✅ IMMEDIATE FIX

### Option 1: Set Environment Variables in Railway Dashboard
1. Go to Railway Dashboard → Your Service → Variables
2. Add these environment variables:

```
SECRET_KEY=bqle6jsw525f5y&b2zr_43q2-n2!fbhiy$cbr4f0)1^6@r*-@m
DEBUG=False
ALLOWED_HOSTS=.railway.app,.up.railway.app,web-production-0b12.up.railway.app
USE_POSTGRES=True
CORS_ALLOWED_ORIGINS=https://kimmy-beta.vercel.app
DJANGO_SETTINGS_MODULE=config.settings
```

3. **IMPORTANT**: Also set the start command in Railway:
   - Go to Settings → Deploy
   - Set Custom Start Command to:
   ```
   cd back && python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi --bind 0.0.0.0:$PORT
   ```

### Option 2: Quick Deploy Fix
1. Push the updated `railway.json` to git:
   ```bash
   git add railway.json
   git commit -m "Fix Railway startup command"
   git push
   ```

2. In Railway Dashboard:
   - Go to Deployments
   - Click "Redeploy" on the latest deployment

## 🧪 Test After Fix
```bash
node test-railway-quick.js
```

## Expected Result
✅ Railway deployment succeeds  
✅ API responds with JSON  
✅ No more 502 errors  

## If Still Crashing
1. Check Railway logs for specific error messages
2. Verify all environment variables are set correctly
3. Ensure PostgreSQL service is running
4. Try manual deployment with Railway CLI:
   ```bash
   railway up
   ```

## Next Steps After Backend Works
1. Update Vercel `VITE_API_URL` to: `https://web-production-0b12.up.railway.app/api`
2. Redeploy frontend
3. Test your website - no more 404 errors!

## Files Updated
- `railway.json` - Fixed startup command (removed problematic commands)
- `back/start.sh` - Alternative startup script (if needed)