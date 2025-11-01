@echo off
echo ========================================
echo   Django Backend - Railway Deployment
echo ========================================
echo.

echo [1/4] Checking Django configuration...
cd back
python manage.py check --deploy
if %errorlevel% neq 0 (
    echo.
    echo ❌ Django check failed! Fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo ✅ Django configuration looks good!
echo.

echo [2/4] Testing database connection...
python manage.py migrate --check
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Warning: Migration check failed. This is normal if using SQLite locally.
    echo    Railway will use PostgreSQL in production.
)

echo.
echo [3/4] Collecting static files...
python manage.py collectstatic --noinput --clear
if %errorlevel% neq 0 (
    echo.
    echo ❌ Static files collection failed!
    pause
    exit /b 1
)

echo.
echo ✅ Static files collected successfully!
echo.

echo [4/4] Ready to deploy to Railway!
echo.
echo 📋 Deployment Steps:
echo.
echo 1. Go to: https://railway.app/new
echo 2. Click "Deploy from GitHub repo"
echo 3. Select: bassy1992/kim-store
echo 4. Set Root Directory to: back
echo 5. Add PostgreSQL database
echo 6. Set environment variables:
echo    - SECRET_KEY (generate new)
echo    - DEBUG=False
echo    - ALLOWED_HOSTS=.railway.app
echo    - USE_POSTGRES=True
echo    - CORS_ALLOWED_ORIGINS=https://your-vercel-app.vercel.app
echo.
echo 💡 Generate SECRET_KEY:
echo    python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"
echo.
echo Opening Railway in browser...
start https://railway.app/new

echo.
echo ========================================
echo   Pre-Deployment Check Complete! ✅
echo ========================================
echo.
echo Your Django backend is ready for Railway deployment.
echo Follow the steps above to deploy.
echo.
echo 📚 Documentation:
echo    - Quick Guide: back\RAILWAY_READY.md
echo    - Full Guide: back\RAILWAY_DEPLOYMENT.md
echo.
pause
