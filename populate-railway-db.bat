@echo off
echo Populating Railway Database...
echo.
echo Option 1: Automatic (already configured in railway.json)
echo The database will be populated automatically on next deployment
echo.
echo Option 2: Manual via Railway CLI
echo railway shell
echo cd back
echo python manage.py populate_database
echo.
echo Option 3: Manual via Railway Dashboard
echo 1. Go to Railway Dashboard
echo 2. Open your service
echo 3. Click "Deploy" tab
echo 4. Click "Open Shell"
echo 5. Run: cd back && python manage.py populate_database
echo.
echo The populate command will create:
echo - Product categories (Men's, Women's, Unisex, Oils, Air Fresheners)
echo - Sample products with images
echo - Promo codes (WELCOME10, SAVE20, FREESHIP)
echo - Blog posts about fragrances
echo.
pause