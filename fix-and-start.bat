@echo off
echo Fixing PowerShell Execution Policy...
echo.
echo This will allow npm commands to run properly
echo.

powershell -Command "Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser -Force"

echo.
echo Execution Policy fixed! Now you can run npm commands.
echo.
echo Starting Codasapp Development Server...
echo.

cd /d "C:\Users\Çölgeçen\Desktop\Codasapp"

echo Running: npm run dev
call npm run dev

pause
