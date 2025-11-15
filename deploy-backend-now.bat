@echo off
echo 🚀 DEPLOY BACKEND TO RAILWAY - QUICK GUIDE
echo.
echo 1. Go to: https://railway.app/new
echo 2. Click "Deploy from GitHub repo"
echo 3. Select: bassy1992/kim-store
echo 4. Set Root Directory: back
echo 5. Add PostgreSQL database
echo.
echo 6. Add Environment Variables (copy from RAILWAY_ENV_QUICK_SETUP.txt):
echo    - SECRET_KEY (generate new one)
echo    - DEBUG=False
echo    - ALLOWED_HOSTS=.railway.app,.up.railway.app
echo    - USE_POSTGRES=True
echo    - CORS_ALLOWED_ORIGINS=https://kimmy-beta.vercel.app
echo.
echo 7. Deploy and wait for completion
echo 8. Get your Railway URL (e.g., https://your-app.up.railway.app)
echo 9. Update Vercel VITE_API_URL with your Railway URL
echo.
echo 📝 Files created:
echo    - RAILWAY_ENV_QUICK_SETUP.txt (environment variables)
echo.
echo ⏱️  Total time: ~5 minutes
echo.
pause