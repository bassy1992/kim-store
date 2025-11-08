@echo off
echo ========================================
echo Vercel Deployment Script
echo ========================================
echo.

echo Step 1: Installing Vercel CLI...
call npm install -g vercel
echo.

echo Step 2: Navigating to frontend directory...
cd front
echo.

echo Step 3: Logging into Vercel...
echo Please follow the browser login prompt...
call vercel login
echo.

echo Step 4: Deploying to Vercel...
call vercel --prod
echo.

echo ========================================
echo Deployment Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Copy the deployment URL from above
echo 2. Set environment variable with:
echo    vercel env add VITE_API_URL
echo    Value: https://kim-store-production.up.railway.app/api
echo 3. Redeploy: vercel --prod
echo.
pause
