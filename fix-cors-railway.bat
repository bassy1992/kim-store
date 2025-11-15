@echo off
echo Fixing CORS issue for Railway deployment...
echo.
echo IMMEDIATE FIX:
echo 1. Go to Railway Dashboard
echo 2. Select your project: kim-store-production
echo 3. Go to Variables tab
echo 4. Add this variable:
echo    CORS_ALLOW_ALL_ORIGINS=True
echo 5. Deploy the changes
echo.
echo TESTING:
echo After deployment, test these URLs:
echo - https://kim-store-production.up.railway.app/health/
echo - https://kim-store-production.up.railway.app/api/cors-test/
echo - https://kim-store-production.up.railway.app/api/status/
echo.
echo FRONTEND TEST:
echo In your browser console on front-pi-nine.vercel.app, run:
echo fetch('https://kim-store-production.up.railway.app/api/cors-test/')
echo   .then(r => r.json())
echo   .then(console.log)
echo.
echo SECURITY NOTE:
echo CORS_ALLOW_ALL_ORIGINS=True is temporary for debugging.
echo Once working, set it to False and use specific origins.
echo.
pause