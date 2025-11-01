@echo off
echo ========================================
echo   Kimmy's Fragrance - Vercel Deployment
echo ========================================
echo.

echo Step 1: Installing Vercel CLI...
call npm install -g vercel
echo.

echo Step 2: Building Frontend...
cd front
call npm install
call npm run build:client
echo.

echo Step 3: Deploying to Vercel...
call vercel --prod
echo.

echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your site should now be live on Vercel.
echo Check the URL provided above.
echo.
pause
