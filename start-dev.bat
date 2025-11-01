@echo off
echo ========================================
echo Starting E-Commerce Development Servers
echo ========================================
echo.

echo Starting Django Backend...
start "Django Backend" cmd /k "cd back && python manage.py runserver"

timeout /t 3 /nobreak > nul

echo Starting React Frontend...
start "React Frontend" cmd /k "cd front && npm run dev"

echo.
echo ========================================
echo Servers are starting...
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/api/docs/
echo ========================================
echo.
echo Press any key to stop all servers...
pause > nul

echo Stopping servers...
taskkill /FI "WINDOWTITLE eq Django Backend*" /T /F > nul 2>&1
taskkill /FI "WINDOWTITLE eq React Frontend*" /T /F > nul 2>&1
echo Servers stopped.
