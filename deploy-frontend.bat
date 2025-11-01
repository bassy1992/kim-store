@echo off
echo ========================================
echo   Kimmy's Fragrance - Vercel Deploy
echo ========================================
echo.

echo [1/3] Testing build...
cd front
call npm run build:client
if %errorlevel% neq 0 (
    echo.
    echo ❌ Build failed! Fix errors before deploying.
    pause
    exit /b 1
)

echo.
echo ✅ Build successful!
echo.
echo [2/3] Ready to deploy to Vercel
echo.
echo Choose deployment method:
echo   1. Deploy via Vercel Dashboard (Recommended)
echo   2. Deploy via Vercel CLI
echo   3. Exit
echo.
set /p choice="Enter choice (1-3): "

if "%choice%"=="1" (
    echo.
    echo 📋 Manual Deployment Steps:
    echo.
    echo 1. Go to: https://vercel.com/new
    echo 2. Import your Git repository
    echo 3. Set Root Directory to: front
    echo 4. Click Deploy
    echo 5. Add environment variable: VITE_API_URL
    echo.
    echo Opening Vercel in browser...
    start https://vercel.com/new
    pause
) else if "%choice%"=="2" (
    echo.
    echo [3/3] Deploying via CLI...
    echo.
    where vercel >nul 2>nul
    if %errorlevel% neq 0 (
        echo ⚠️  Vercel CLI not found. Installing...
        call npm install -g vercel
    )
    echo.
    echo Running: vercel --prod
    call vercel --prod
) else (
    echo.
    echo Exiting...
    exit /b 0
)

echo.
echo ========================================
echo   Deployment Complete! 🎉
echo ========================================
echo.
echo Next steps:
echo   1. Add VITE_API_URL environment variable
echo   2. Deploy Django backend
echo   3. Update VITE_API_URL with backend URL
echo   4. Test your live site
echo.
pause
