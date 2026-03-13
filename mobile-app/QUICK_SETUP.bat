@echo off
REM Campus Navigation Mobile App - Quick Setup Script

echo.
echo ========================================
echo Campus Navigation Mobile App Setup
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed!
    echo Please download from: https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Checking Node.js version...
node --version
echo.

REM Clear npm cache
echo [2/5] Clearing npm cache...
call npm cache clean --force
echo.

REM Remove old node_modules
echo [3/5] Removing old dependencies...
if exist node_modules (
    rmdir /s /q node_modules
    echo Removed old node_modules
)
if exist package-lock.json (
    del package-lock.json
    echo Removed package-lock.json
)
echo.

REM Install dependencies
echo [4/5] Installing dependencies (this may take 5-10 minutes)...
call npm install --legacy-peer-deps
if errorlevel 1 (
    echo ERROR: Installation failed!
    echo Try running: npm install --legacy-peer-deps --force
    pause
    exit /b 1
)
echo.

REM Install Expo CLI globally
echo [5/5] Installing Expo CLI...
call npm install -g expo-cli
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit src/services/api.js and update the backend URL
echo 2. Run: npm start
echo 3. Press 'a' for Android or 'i' for iOS
echo.
pause
