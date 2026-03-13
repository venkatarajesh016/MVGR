@echo off
title Campus Navigator - Auto Setup
color 0A

echo.
echo ========================================
echo   CAMPUS NAVIGATOR - AUTO SETUP
echo ========================================
echo.
echo This will:
echo 1. Kill any running Node processes
echo 2. Install all required packages
echo 3. Start backend server
echo 4. Start frontend server
echo 5. Open browser
echo.
echo Please wait, this may take 2-3 minutes...
echo.
pause

echo.
echo ========================================
echo   Step 1: Cleaning up old processes
echo ========================================
echo.
taskkill /F /IM node.exe 2>nul
if %errorlevel% equ 0 (
    echo Old Node processes stopped
) else (
    echo No Node processes were running
)
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Step 2: Installing Frontend Packages
echo ========================================
echo.
cd /d "%~dp0frontend"
echo Current directory: %CD%
echo Running: npm install
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Frontend package installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)
echo.
echo Frontend packages installed successfully!
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Step 3: Installing Backend Packages
echo ========================================
echo.
cd /d "%~dp0backend"
echo Current directory: %CD%
echo Running: npm install
call npm install
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Backend package installation failed!
    echo Please check your internet connection and try again.
    pause
    exit /b 1
)
echo.
echo Backend packages installed successfully!
timeout /t 2 /nobreak >nul

echo.
echo ========================================
echo   Step 4: Starting Backend Server
echo ========================================
echo.
cd /d "%~dp0backend"
start "Campus Navigator - Backend" cmd /k "title Backend Server && color 0B && echo Starting Backend Server... && npm start"
echo Backend server starting on port 5000...
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   Step 5: Starting Frontend Server
echo ========================================
echo.
cd /d "%~dp0frontend"
start "Campus Navigator - Frontend" cmd /k "title Frontend Server && color 0C && echo Starting Frontend Server... && npm run dev"
echo Frontend server starting on port 3000...
timeout /t 8 /nobreak >nul

echo.
echo ========================================
echo   Step 6: Opening Browser
echo ========================================
echo.
echo Opening http://localhost:3000 in your browser...
timeout /t 3 /nobreak >nul
start http://localhost:3000

echo.
echo ========================================
echo   SETUP COMPLETE!
echo ========================================
echo.
echo Your Campus Navigator is now running!
echo.
echo Backend:  http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Two server windows have opened:
echo - Backend Server (Blue)
echo - Frontend Server (Red)
echo.
echo Your browser should open automatically.
echo If not, manually go to: http://localhost:3000
echo.
echo To stop the servers: Close the server windows
echo.
echo ========================================
echo   WHAT TO DO NEXT
echo ========================================
echo.
echo 1. Wait for browser to open (should happen automatically)
echo 2. You'll see a beautiful login page
echo 3. Click "Sign up" to create your account
echo 4. Fill in your details and create account
echo 5. Start exploring the campus map!
echo.
echo ========================================
echo.
pause
