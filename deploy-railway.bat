@echo off
echo 🚂 Railway Deployment Helper
echo ========================

echo.
echo ✅ Pre-deployment checks:
echo - Django backend configured
echo - Requirements.txt updated  
echo - Railway.json configured
echo - Environment variables template ready

echo.
echo 🔧 Next steps:
echo 1. Go to https://railway.app
echo 2. Create new project from GitHub repo: bassy1992/kim-store
echo 3. Set root directory to: back
echo 4. Add PostgreSQL database
echo 5. Copy environment variables from back/.env.railway

echo.
echo 📋 Environment Variables to set in Railway:
type back\.env.railway

echo.
echo 🎯 After deployment:
echo - Update Vercel VITE_API_URL with Railway backend URL
echo - Update Railway CORS_ALLOWED_ORIGINS with Vercel frontend URL
echo - Create admin user: railway run python manage.py createsuperuser

echo.
echo 📚 Full checklist: See RAILWAY_DEPLOY_CHECKLIST.md
echo.
pause