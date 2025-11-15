@echo off
echo ========================================
echo   Vercel Deployment Helper
echo   Kimmy's Fragrance Frontend
echo ========================================
echo.

cd /d "%~dp0"

echo [1/4] Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    npm install -g vercel
) else (
    echo Vercel CLI found!
)
echo.

echo [2/4] Testing build...
call npm run build:client
if %errorlevel% neq 0 (
    echo Build failed! Please fix errors before deploying.
    pause
    exit /b 1
)
echo Build successful!
echo.

echo [3/4] Deploying to Vercel...
echo.
echo IMPORTANT: When prompted, ensure Root Directory is set to "front"
echo.
pause

vercel --prod

echo.
echo [4/4] Deployment complete!
echo.
echo Next steps:
echo 1. Go to your Vercel dashboard
echo 2. Add environment variable: VITE_API_URL
echo 3. Set value to your Django backend URL
echo 4. Redeploy to apply changes
echo.
pause
