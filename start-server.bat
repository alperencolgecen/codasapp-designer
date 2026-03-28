@echo off
echo Starting Codasapp Web Server...
echo.
echo ========================================
echo Codasapp Development Server
echo ========================================
echo.
cd /d "C:\Users\Çölgeçen\Desktop\Codasapp"

echo Checking if port 3000 is in use...
netstat -ano | findstr :3000
echo.

echo Starting Vite development server...
npx vite --host --port 3000

pause
