@echo off
title Installing Authentication System
color 0E

echo.
echo ========================================
echo   INSTALLING AUTHENTICATION SYSTEM
echo ========================================
echo.
echo This will:
echo 1. Install react-router-dom package
echo 2. Install backend auth packages
echo 3. Activate authentication system
echo 4. Restart servers
echo.
pause

echo.
echo [1/5] Installing Frontend Package...
cd /d "%~dp0frontend"
call npm install react-router-dom
if %errorlevel% neq 0 (
    echo ERROR: Failed to install react-router-dom
    pause
    exit /b 1
)
echo Frontend package installed!

echo.
echo [2/5] Installing Backend Packages...
cd /d "%~dp0backend"
call npm install bcryptjs jsonwebtoken
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend packages
    pause
    exit /b 1
)
echo Backend packages installed!

echo.
echo [3/5] Activating Authentication System...
cd /d "%~dp0frontend\src"
copy /Y App_backup.jsx App.jsx >nul
echo Authentication system activated!

echo.
echo [4/5] Stopping old servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul

echo.
echo [5/5] Starting servers...
cd /d "%~dp0backend"
start "Backend Server" cmd /k "title Backend && color 0B && npm start"
timeout /t 5 /nobreak >nul

cd /d "%~dp0frontend"
start "Frontend Server" cmd /k "title Frontend && color 0C && npm run dev"
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   INSTALLATION COMPLETE!
echo ========================================
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo Your browser should open to the LOGIN page!
echo.
echo Next steps:
echo 1. Click "Sign up"
echo 2. Create your account
echo 3. Start using the app!
echo.
pause
