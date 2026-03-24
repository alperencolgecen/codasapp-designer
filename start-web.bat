@echo off
echo Starting Codasapp Web Server...
echo.
echo ========================================
echo Codasapp Development Server
echo ========================================
echo.
echo Server will start at: http://localhost:5173
echo Press Ctrl+C to stop the server
echo.
cd /d "C:\Users\Çölgeçen\Desktop\Codasapp"
echo Installing dependencies (if needed)...
call npm install
echo.
echo Starting development server...
call npm run dev
pause
