@echo off
echo Creating superuser on Railway...
echo.
echo Make sure you have set these environment variables in Railway:
echo - DJANGO_SUPERUSER_USERNAME
echo - DJANGO_SUPERUSER_EMAIL  
echo - DJANGO_SUPERUSER_PASSWORD
echo.
echo Option 1: Using Railway CLI
echo railway shell
echo cd back
echo python manage.py createsuperuser
echo.
echo Option 2: Automatic (already configured in railway.json)
echo Just redeploy your app and superuser will be created automatically
echo.
pause