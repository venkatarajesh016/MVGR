@echo off
title Campus Navigator - Startup

echo ========================================
echo   Campus Navigator - Starting...
echo ========================================
echo.

echo Checking if packages are installed...
echo.

cd frontend
if not exist "node_modules\react-router-dom" (
    echo [1/3] Installing frontend packages...
    call npm install react-router-dom
    echo.
) else (
    echo [1/3] Frontend packages already installed
    echo.
)

cd ..\backend
if not exist "node_modules\bcryptjs" (
    echo [2/3] Installing backend packages...
    call npm install bcryptjs jsonwebtoken
    echo.
) else (
    echo [2/3] Backend packages already installed
    echo.
)

echo [3/3] Starting servers...
echo.
echo ========================================
echo   Starting Backend Server...
echo ========================================
echo.
start "Backend Server" cmd /k "cd /d %~dp0backend && npm start"

timeout /t 3 /nobreak >nul

echo.
echo ========================================
echo   Starting Frontend Server...
echo ========================================
echo.
start "Frontend Server" cmd /k "cd /d %~dp0frontend && npm run dev"

timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   Campus Navigator Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two new windows have opened:
echo 1. Backend Server (port 5000)
echo 2. Frontend Server (port 3000)
echo.
echo Opening browser in 3 seconds...
timeout /t 3 /nobreak >nul

start http://localhost:3000

echo.
echo ========================================
echo   All Done!
echo ========================================
echo.
echo Your browser should open automatically.
echo If not, go to: http://localhost:3000
echo.
echo To stop servers: Close the server windows
echo.
pause
