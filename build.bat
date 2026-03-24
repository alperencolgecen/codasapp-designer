@echo off
echo Starting build process...
cd /d "C:\Users\Çölgeçen\Desktop\Codasapp"
echo Running TypeScript compilation...
call tsc
echo Running Vite build...
call npx vite build
echo Build completed!
echo.
echo Checking dist folder...
if exist "dist" (
    echo Build successful! dist folder created.
    dir dist
) else (
    echo Build failed! dist folder not found.
)
echo.
pause
